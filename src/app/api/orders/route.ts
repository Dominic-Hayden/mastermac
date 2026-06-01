import { NextResponse } from "next/server";
import prisma from "@/lib/db";

function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `MM${year}${month}${day}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      items,
      subtotal,
      tax,
      deliveryFee,
      total,
      notes,
    } = body;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerEmail,
        customerName,
        customerPhone,
        shippingAddress,
        deliveryMethod,
        paymentMethod,
        subtotal,
        tax,
        deliveryFee,
        total,
        notes,
        status: "pending",
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number; name: string }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
        },
        tracking: {
          create: {
            status: "pending",
            message: "Order received and awaiting confirmation",
          },
        },
      },
      include: {
        items: true,
        tracking: true,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        email: customerEmail,
        type: "order_confirmation",
        title: "Order Confirmed",
        message: `Your order #${order.orderNumber} has been received. We'll notify you when it ships.`,
        orderId: order.id,
      },
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockQty: { decrement: item.quantity },
        },
      });
    }

    return NextResponse.json({ order, success: true });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      const order = await prisma.order.findUnique({
        where: { orderNumber },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
          tracking: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json({ order });
    }

    if (email) {
      const orders = await prisma.order.findMany({
        where: { customerEmail: email },
        include: {
          items: true,
          tracking: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ orders });
    }

    return NextResponse.json({ error: "Email or order number required" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
