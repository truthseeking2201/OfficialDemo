import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { useWallet } from "@/hooks/useWallet";
import { SimplifiedDepositDrawer } from "@/components/dashboard/SimplifiedDepositDrawer";
import { SimplifiedWithdrawDrawer } from "@/components/dashboard/SimplifiedWithdrawDrawer";
import { ConnectWalletModal } from "@/components/wallet/ConnectWalletModal";

import {
  TrendingUp,
  Brain,
  Zap,
  ArrowUpRight,
  PlusCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { UserInvestment } from "@/types/vault";
import "@/styles/design-tokens.css";
import LeftContent from "@/components/dashboard/LeftContent";
import RightContent from "@/components/dashboard/RightContent";

import { TxTable } from "@/components/dashboard/TxTable";

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
    tx_type: "remove" as const,
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
];

export default function NodoAIVaults() {
  // Use the wallet hook for connection status
  const { isConnected, balance } = useWallet();

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

  // Mock vault data for deposit drawer
  const mockVaultData = {
    id: "nodo-ai-vault",
    name: "NODO AI Vault",
    type: "nova" as const,
    tvl: 1293,
    apr: 24.8,
    apy: 27.6,
    description: "Maximizing DeFi Yields With Autonomous Risk Management",
    lockupPeriods: [
      { days: 7, aprBoost: 0 },
      { days: 30, aprBoost: 2.5 },
      { days: 90, aprBoost: 5.0 },
    ],
    riskLevel: "medium" as const,
    strategy: "Multi-protocol AI optimizer",
    performance: {
      daily: Array(14)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (13 - i) * 86400000)
            .toISOString()
            .split("T")[0],
          value: 1000 * (1 + 0.001 * (i + 1)),
        })),
      weekly: Array(8)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (7 - i) * 7 * 86400000)
            .toISOString()
            .split("T")[0],
          value: 1000 * (1 + 0.007 * (i + 1)),
        })),
      monthly: Array(6)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (5 - i) * 30 * 86400000)
            .toISOString()
            .split("T")[0],
          value: 1000 * (1 + 0.02 * (i + 1)),
        })),
    },
  };

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
    <div className="min-h-screen main-bg" ref={containerRef}>
      <PageContainer>
        <div style={{ maxWidth: "1400px" }}>
          {/* Main Header */}
          <header className="text-center mb-8">
            <h1 className="font-heading-xl text-100 mb-2">
              <span>NODO </span>
              <span style={{ color: "var(--c-brand-magenta)" }}>AI</span>
              <span style={{ color: "var(--c-brand-orange)" }}> Vaults</span>
            </h1>
            <p className="font-body text-075">
              Maximizing DeFi Yields With Autonomous Risk Management
            </p>
          </header>

          {/* 3-Column Layout */}
          <div className="flex gap-[64px] justify-between w-full">
            {/* Left Rail */}
            <LeftContent />

            {/* Main Content (Center) */}
            <div className="flex-shrink-0">
              {/* Main Vault Card */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8">
                {/* Tabs for Deposit/Withdraw */}
                <div className="flex border-b border-[#1A1A1A] mb-6">
                  <button
                    className={`tab px-6 ${
                      depositWithdrawTab === "deposit" ? "active" : ""
                    }`}
                    onClick={() => setDepositWithdrawTab("deposit")}
                    aria-label="Deposit tab - press Command+1 to access"
                  >
                    <div className="flex items-center">
                      <PlusCircle size={16} className="mr-2" />
                      <span>Deposit</span>
                    </div>
                  </button>
                  <button
                    className={`tab px-6 ${
                      depositWithdrawTab === "withdraw" ? "active" : ""
                    }`}
                    onClick={() => setDepositWithdrawTab("withdraw")}
                    aria-label="Withdraw tab - press Command+2 to access"
                  >
                    <div className="flex items-center">
                      <ArrowUpRight size={16} className="mr-2" />
                      <span>Withdraw</span>
                    </div>
                  </button>
                </div>

                {/* Deposit Tab Content */}
                {depositWithdrawTab === "deposit" && (
                  <div>
                    <div className="mb-6">
                      <div className="flex justify-between">
                        <div className="font-body text-075">Amount (USDC)</div>
                        <div className="font-body text-075">
                          Balance: {isConnected ? "1250.45 USDC" : "--"}
                        </div>
                      </div>
                      <div className="relative mb-2">
                        <input
                          type="text"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="0.00"
                          className="input w-full font-heading-lg"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm">
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-surface-075 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-caption text-075">
                          You will get
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-brand-orange-light flex items-center justify-center mr-2">
                            <Zap size={12} className="text-surface-000" />
                          </div>
                          <span>--</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <div className="font-caption text-075">
                          Conversion Rate
                        </div>
                        <div>18.7%</div>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <div className="font-caption text-075">
                          Transaction Fee
                        </div>
                        <div>--</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="font-caption text-075">Network</div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                            <span className="text-xs text-white font-bold">
                              S
                            </span>
                          </div>
                          <span>SUI</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary w-full flex items-center justify-center"
                      onClick={
                        isConnected ? handleDeposit : handleConnectWallet
                      }
                    >
                      <span>{isConnected ? "Deposit" : "Connect Wallet"}</span>
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                )}

                {/* Withdraw Tab Content */}
                {depositWithdrawTab === "withdraw" && (
                  <div>
                    {isConnected ? (
                      <>
                        <div className="mb-6">
                          <div className="flex justify-between">
                            <div className="font-body text-075">
                              Amount (USDC)
                            </div>
                            <div className="font-body text-075">
                              Available: 1250.45 USDC
                            </div>
                          </div>
                          <div className="relative mb-2">
                            <input
                              type="text"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                              placeholder="0.00"
                              className="input w-full font-heading-lg"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm">
                              MAX
                            </button>
                          </div>
                        </div>

                        <div className="mb-6 p-4 bg-surface-075 rounded-lg">
                          <div className="font-caption text-050 mb-1">
                            You will receive
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-heading-md text-100">
                                1250.45 USDC
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div
                                className="px-3 py-1 rounded-full bg-semantic-warning/30 text-semantic-warning font-data text-xs flex items-center"
                                role="timer"
                                aria-live="polite"
                              >
                                <RefreshCw
                                  size={10}
                                  className="mr-1 animate-spin"
                                />
                                <span>Unlock in 2d:05h</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6 flex space-x-4">
                          <div className="flex-1 p-3 border border-[#2C2C2C] rounded-lg">
                            <div className="flex items-center mb-1">
                              <TrendingUp size={12} className="mr-1 text-075" />
                              <span className="font-caption text-075">
                                Total Profit
                              </span>
                            </div>
                            <div className="font-data text-100">+$12.50</div>
                          </div>
                          <div className="flex-1 p-3 border border-[#2C2C2C] rounded-lg">
                            <div className="flex items-center mb-1">
                              <Brain size={12} className="mr-1 text-075" />
                              <span className="font-caption text-075">
                                Current APR
                              </span>
                            </div>
                            <div className="font-data text-100">24.8%</div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary w-full flex items-center justify-center"
                          onClick={handleWithdraw}
                        >
                          <ArrowUpRight size={18} className="mr-2" />
                          <span>Withdraw Funds</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center pt-8 pb-6">
                        <div className="mb-4">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Connect Wallet First
                        </h3>
                        <p className="text-sm text-white/60 text-center mb-6 max-w-[260px]">
                          You need to connect your wallet to access withdrawal
                          features
                        </p>
                        <button
                          className="btn btn-primary w-full flex items-center justify-center"
                          onClick={handleConnectWallet}
                        >
                          <span>Connect Wallet</span>
                          <ArrowRight size={16} className="ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Vault Activities Section */}
              <div className="mb-8">
                <TxTable
                  transactions={sampleTransactions}
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
      <footer className="py-6 text-center text-050 font-caption border-t border-[#1A1A1A] bg-transparent">
        <div
          style={{
            maxWidth: "var(--layout-desktop-container)",
            margin: "0 auto",
            padding: "0 36px",
          }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div>©{currentYear} NODO. All rights reserved</div>
          <div>
            NODO Global Limited 10 Anson Road #22-06 International Plaza,
            Singapore 079903
          </div>
        </div>
      </footer>

      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        open={isConnectWalletModalOpen}
        onClose={() => setIsConnectWalletModalOpen(false)}
      />

      {/* Deposit Drawer */}
      <SimplifiedDepositDrawer
        open={isDepositDrawerOpen}
        onClose={() => setIsDepositDrawerOpen(false)}
        vault={mockVaultData}
      />

      {/* Withdraw Drawer */}
      {selectedInvestment && (
        <SimplifiedWithdrawDrawer
          open={isWithdrawDrawerOpen}
          onClose={() => setIsWithdrawDrawerOpen(false)}
          investment={selectedInvestment}
        />
      )}
    </div>
  );
}
