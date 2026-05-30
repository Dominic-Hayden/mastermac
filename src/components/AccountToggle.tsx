"use client";

import { useState, createContext, useContext } from "react";
import { Building2, User, ChevronDown } from "lucide-react";

type AccountType = "retail" | "wholesale";

interface AccountContextType {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
  isWholesale: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountType, setAccountType] = useState<AccountType>("retail");

  return (
    <AccountContext.Provider
      value={{
        accountType,
        setAccountType,
        isWholesale: accountType === "wholesale",
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within AccountProvider");
  }
  return context;
}

export default function AccountToggle() {
  const { accountType, setAccountType } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#9f583c] transition-colors text-sm"
      >
        {accountType === "retail" ? (
          <>
            <User className="w-4 h-4 text-[#43b279]" />
            <span className="hidden sm:inline">Retail Shopper</span>
          </>
        ) : (
          <>
            <Building2 className="w-4 h-4 text-[#9f583c]" />
            <span className="hidden sm:inline">Wholesale</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-xl z-50 min-w-[200px] overflow-hidden">
            <button
              onClick={() => {
                setAccountType("retail");
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                accountType === "retail" ? "bg-[#f5f0e8]" : ""
              }`}
            >
              <User className="w-5 h-5 text-[#43b279]" />
              <div className="text-left">
                <p className="font-medium text-[#38332f]">Retail Shopper</p>
                <p className="text-xs text-gray-500">Standard pricing</p>
              </div>
            </button>
            <button
              onClick={() => {
                setAccountType("wholesale");
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t ${
                accountType === "wholesale" ? "bg-[#f5f0e8]" : ""
              }`}
            >
              <Building2 className="w-5 h-5 text-[#9f583c]" />
              <div className="text-left">
                <p className="font-medium text-[#38332f]">Wholesale Login</p>
                <p className="text-xs text-gray-500">Bulk pricing & discounts</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
