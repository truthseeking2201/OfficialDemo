import { PageContainer } from "../components/layout/PageContainer";
import { useWallet } from "../hooks/useWallet";
import { useRef, useState } from "react";

import LeftContent from "../components/dashboard/LeftContent";
import RightContent from "../components/dashboard/RightContent";
import "../styles/design-tokens.css";
import { UserInvestment } from "../types/vault";

import { TxTable } from "../components/dashboard/TxTable";
import NodoAIVaultsMainCard from "../components/vault/NodoAIVaultsMainCard";
import TelegramIcon from "../assets/icons/telegram.svg";
import XIcon from "../assets/icons/x.svg";

const sampleTransactions = [
  {
    id: "1",
    tx_type: "add" as const,
    timestamp: "2025-05-01T10:00:00Z",
    value: 1000,
    address: "0x1234567890abcdef1234567890abcdef12345678",
    tokenId: "USDC",
    txHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "2",
    tx_type: "swap" as const,
    timestamp: "2025-05-02T12:00:00Z",
    value: 500,
    address: "0xabcdef1234567890abcdef1234567890abcdef1234",
    tokenId: "USDC",
    txHash:
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "3",
    tx_type: "add" as const,
    timestamp: "2025-05-03T14:00:00Z",
    value: 2000,
    address: "0x7890abcdef1234567890abcdef1234567890abcd",
    tokenId: "USDC",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
  },
  {
    id: "4",
    tx_type: "remove" as const,
    timestamp: "2025-05-04T16:00:00Z",
    value: 300,
    address: "0x4567890abcdef1234567890abcdef1234567890ab",
    tokenId: "USDC",
    txHash: "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
  },
  {
    id: "5",
    tx_type: "add" as const,
    timestamp: "2025-05-05T18:00:00Z",
    value: 1500,
    address: "0xabcdef1234567890abcdef1234567890abcdef1234",
    tokenId: "USDC",
    txHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "6",
    tx_type: "add" as const,
    timestamp: "2025-05-06T10:00:00Z",
    value: 1200,
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    tokenId: "USDC",
    txHash:
      "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  },
  {
    id: "7",
    tx_type: "remove" as const,
    timestamp: "2025-05-07T12:00:00Z",
    value: 800,
    address: "0x1234567890abcdef1234567890abcdef12345678",
    tokenId: "USDC",
    txHash:
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "8",
    tx_type: "add" as const,
    timestamp: "2025-05-08T14:00:00Z",
    value: 2500,
    address: "0x7890abcdef1234567890abcdef1234567890abcd",
    tokenId: "USDC",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
  },
  {
    id: "9",
    tx_type: "remove" as const,
    timestamp: "2025-05-09T16:00:00Z",
    value: 400,
    address: "0x4567890abcdef1234567890abcdef1234567890ab",
    tokenId: "USDC",
    txHash: "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
  },
  {
    id: "10",
    tx_type: "add" as const,
    timestamp: "2025-05-10T18:00:00Z",
    value: 1800,
    address: "0xabcdef1234567890abcdef1234567890abcdef1234",
    tokenId: "USDC",
    txHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
];

export default function NodoAIVaults() {
  // Use the wallet hook for connection status
  const { isConnectWalletDialogOpen, openConnectWalletDialog, isConnected } =
    useWallet();

  const [activeTab, setActiveTab] = useState("all");
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositDrawerOpen, setIsDepositDrawerOpen] = useState(false);
  const [isWithdrawDrawerOpen, setIsWithdrawDrawerOpen] = useState(false);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [selectedInvestment, setSelectedInvestment] =
    useState<UserInvestment | null>(null);
  const [depositWithdrawTab, setDepositWithdrawTab] = useState("deposit");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleConnectWallet = () => {
    // Open the connect wallet modal
    setIsConnectWalletModalOpen(true);
  };

  const handleDeposit = () => {
    if (isConnected) {
      setIsDepositDrawerOpen(true);
    } else {
      handleConnectWallet();
    }
  };

  const handleWithdraw = () => {
    if (isConnected) {
      const defaultInvestment: UserInvestment = {
        vaultId: "nodo-ai-vault",
        principal: 1250,
        shares: 48.25,
        depositDate: new Date(
          Date.now() - 25 * 24 * 60 * 60 * 1000
        ).toISOString(),
        lockupPeriod: 60,
        unlockDate: new Date(
          Date.now() + 35 * 24 * 60 * 60 * 1000
        ).toISOString(),
        currentValue: 1250.45,
        profit: 12.5,
        isWithdrawable: true,
        currentApr: 24.8,
      };

      setSelectedInvestment(defaultInvestment);
      setIsWithdrawDrawerOpen(true);
    } else {
      handleConnectWallet();
    }
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSelectTransaction = (tx: any) => {
    console.log("Selected transaction:", tx);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="min-h-screen main-bg"
      ref={containerRef}
    >
      <PageContainer>
        <div style={{ maxWidth: "1400px" }}>
          {/* Main Header */}
          <header className="text-center mb-16">
            <h1 className="text-[60px] font-bold">
              <span>NODO </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #0090FF -29.91%, #FF6D9C 44.08%, #FB7E16 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "DM Sans",
                }}
              >
                AI Vaults
              </span>
            </h1>
            <p className="font-body text-">
              Maximizing DeFi Yields With Autonomous Risk Management
            </p>
          </header>

          {/* 3-Column Layout */}
          <div className="flex gap-[64px] justify-between w-full">
            {/* Left Rail */}
            <LeftContent />

            {/* Main Content (Center) */}
            <div className="w-full">
              {/* Main Vault Card */}
              <div className="w-full mb-8">
                <NodoAIVaultsMainCard />
              </div>

              {/* Vault Activities Section */}
              <div className="mb-8">
                <TxTable
                  transactions={sampleTransactions as any}
                  onSelect={handleSelectTransaction}
                />
              </div>
            </div>

            {/* Right Rail */}
            <RightContent />
          </div>
        </div>
      </PageContainer>
      {/* Footer */}
      <footer className="py-6 text-center text-100 font-caption border-t border-white/10 bg-transparent">
        <div
          style={{
            maxWidth: "var(--layout-desktop-breakpoint-xl)",
            margin: "0 auto",
            padding: "0 36px",
          }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <div>©{currentYear} NODO. All rights reserved</div>
            <div>
              <a
                href="https://t.me/Official_NODO_Community"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={TelegramIcon}
                  alt="Telegram"
                  className="w-5 h-5 mr-2"
                />
              </a>
            </div>
            <div>
              <a
                href="https://x.com/Official_NODO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={XIcon}
                  alt="X"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>
          <div>
            NODO Global Limited 10 Anson Road #22-06 International Plaza,
            Singapore 079903
          </div>
        </div>
      </footer>
    </div>
  );
}
