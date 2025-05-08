import { useState } from "react";
import { TransactionHistory } from "@/types/vault";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLast,
  ChevronFirst,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface TxTableProps {
  transactions: TransactionHistory[];
  isLoading?: boolean;
  onSelect: (tx: TransactionHistory) => void;
}

export function TxTable({
  transactions,
  isLoading = false,
  onSelect,
}: TxTableProps) {
  const [filter, setFilter] = useState<"all" | "swap" | "add" | "remove">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.tx_type === filter);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTokenName = (vaultId: string) => {
    const nameMap = {
      "deep-sui": "DEEP-SUI",
      "cetus-sui": "CETUS-SUI",
      "sui-usdc": "SUI-USDC",
    };
    return (
      nameMap[vaultId] ||
      vaultId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-")
    );
  };

  const shortenHash = (hash: string) => {
    // Mock hash for demo purposes
    const mockHash = "0x7d83c975da6e3b5ff8259436d4f7da6d75";
    return `${mockHash.slice(0, 6)}...${mockHash.slice(-4)}`;
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash).then(() => {
      // In a real app, you'd show a toast notification
      console.log("Hash copied to clipboard");
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 md:justify-between">
        <h2 className="font-heading-lg text-100 mb-4">Vault Activities</h2>
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "primary" : "pagination-default"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "swap" ? "primary" : "pagination-default"}
            size="sm"
            onClick={() => setFilter("swap")}
          >
            Swap
          </Button>
          <Button
            variant={filter === "add" ? "primary" : "pagination-default"}
            size="sm"
            onClick={() => setFilter("add")}
          >
            Add Liquidity
          </Button>
          <Button
            variant={filter === "remove" ? "primary" : "pagination-default"}
            size="sm"
            onClick={() => setFilter("remove")}
          >
            Remove Liquidity
          </Button>
        </div>
      </div>

      <div className="glass-card overflow-hidden w-[650px]">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wide text-white/60">
                  Type
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-white/60 w-[120px]">
                  Date
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-white/60">
                  Vault address
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-white/60 text-right">
                  Tokens
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-white/60 text-right">
                  Value
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-white/60">
                  Tx Hash
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(itemsPerPage)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <TableCell>
                        <div className="h-5 w-20 bg-white/10 animate-pulse rounded"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-16 bg-white/10 animate-pulse rounded"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-24 bg-white/10 animate-pulse rounded"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-20 ml-auto bg-white/10 animate-pulse rounded"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-5 w-28 bg-white/10 animate-pulse rounded"></div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer even:bg-white/[0.02]"
                    onClick={() => onSelect(tx)}
                  >
                    <TableCell>
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                          tx.tx_type === "remove" && "bg-orion/20 text-orion"
                        } ${
                          tx.tx_type === "add" && "bg-emerald/20 text-emerald"
                        } ${tx.tx_type === "swap" && "bg-nova/20 text-nova"}
                        `}
                      >
                        {tx.tx_type.charAt(0).toUpperCase() +
                          tx.tx_type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {formatDate(tx.timestamp)}
                    </TableCell>
                    <TableCell
                      className="font-mono text-xs text-white/70 flex items-center space-x-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyHash(tx.id);
                      }}
                    >
                      <span className="hover:text-white transition-colors">
                        {shortenHash(tx.id)}
                      </span>
                    </TableCell>
                    <TableCell>{formatTokenName(tx.tokenId)}</TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {formatCurrency(tx.value)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `https://explorer.sui.io/txblock/${tx.id}`,
                            "_blank"
                          );
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14M14 4H20M20 4V10M20 4L10 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-white/60"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div className=" text-white text-xs">
          Showing {itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(itemsPerPage * currentPage, filteredTransactions.length)} of{" "}
          {filteredTransactions.length} activities
        </div>
        <div className="flex justify-end items-center mt-4 gap-2">
          <Button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            variant="pagination-default"
            size="pagination"
          >
            <ChevronFirst size={12} />
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="pagination-default"
            size="pagination"
          >
            <ChevronLeft size={12} />
          </Button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                variant={
                  currentPage === i + 1 ? "primary" : "pagination-default"
                }
                size="pagination"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="pagination-default"
            size="pagination"
          >
            <ChevronRight size={12} />
          </Button>
          <Button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            variant="pagination-default"
            size="pagination"
          >
            <ChevronLast size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}
