import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;

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
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    const body = await request.json();
    const { status, message, location } = body;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { orderNumber },
      data: { status },
    });

    // Add tracking entry
    await prisma.orderTracking.create({
      data: {
        orderId: order.id,
        status,
        message: message || getDefaultMessage(status),
        location,
      },
    });

    // Create notification based on status
    const notificationData = getNotificationData(status, orderNumber);
    if (notificationData) {
      await prisma.notification.create({
        data: {
          email: order.customerEmail,
          type: notificationData.type,
          title: notificationData.title,
          message: notificationData.message,
          orderId: order.id,
        },
      });
    }

    return NextResponse.json({ order: updatedOrder, success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

function getDefaultMessage(status: string): string {
  switch (status) {
    case "confirmed":
      return "Your order has been confirmed and is being prepared";
    case "processing":
      return "Your order is being packed and prepared for shipping";
    case "shipped":
      return "Your order has been shipped and is on its way";
    case "delivered":
      return "Your order has been delivered. Enjoy!";
    case "cancelled":
      return "Your order has been cancelled";
    default:
      return "Order status updated";
  }
}

function getNotificationData(status: string, orderNumber: string) {
  switch (status) {
    case "shipped":
      return {
        type: "order_shipped",
        title: "Your Order is On Its Way!",
        message: `Great news! Order #${orderNumber} has been shipped. Track your delivery in your account.`,
      };
    case "delivered":
      return {
        type: "order_delivered",
        title: "Order Delivered!",
        message: `Order #${orderNumber} has been delivered. We hope you enjoy your purchase!`,
      };
    case "cancelled":
      return {
        type: "order_cancelled",
        title: "Order Cancelled",
        message: `Order #${orderNumber} has been cancelled. If you have questions, please contact us.`,
      };
    default:
      return null;
  }
}
