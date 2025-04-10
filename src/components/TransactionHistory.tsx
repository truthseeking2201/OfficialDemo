
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowDownUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Define the Transaction type
export type Transaction = {
  id: string;
  date: string;
  type: "deposit" | "withdrawal";
  amount: number;
  status: string;
  description: string;
};

// Sample transaction data
const transactionData: Transaction[] = [
  {
    id: "txn-001",
    date: "2023-11-15",
    type: "deposit",
    amount: 500.00,
    status: "completed",
    description: "Initial deposit to CosmosYield vault"
  },
  {
    id: "txn-002",
    date: "2023-11-28",
    type: "deposit",
    amount: 250.00,
    status: "completed",
    description: "Additional deposit to CosmosYield vault"
  },
  {
    id: "txn-003",
    date: "2023-12-05",
    type: "withdrawal",
    amount: 100.00,
    status: "completed",
    description: "Partial withdrawal from NexusAI vault"
  },
  {
    id: "txn-004",
    date: "2023-12-20",
    type: "deposit",
    amount: 1000.00,
    status: "pending",
    description: "End of year deposit to AlphaSync vault"
  }
];

const TransactionHistory: React.FC = () => {
  const [transactions] = useState<Transaction[]>(transactionData);
  const [filter, setFilter] = useState("all");
  
  // Filter transactions based on selected filter
  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <Card className="glass-card p-6 rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Transaction History</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <Input 
            placeholder="Search transactions" 
            className="pl-8 bg-white/5 border-white/10 focus:border-white/20"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-nodo-dark border border-white/10 text-white">
              <DropdownMenuItem className="hover:bg-white/10">Completed</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Pending</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Date
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-nodo-dark border border-white/10 text-white">
              <DropdownMenuItem className="hover:bg-white/10">Last 7 days</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Last 30 days</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Last 90 days</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Custom range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
            <ArrowDownUp className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-nodo-dark border border-white/10">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
            onClick={() => setFilter("all")}
          >
            All Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="deposits" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
            onClick={() => setFilter("deposit")}
          >
            Deposits
          </TabsTrigger>
          <TabsTrigger 
            value="withdrawals" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
            onClick={() => setFilter("withdrawal")}
          >
            Withdrawals
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-white/70">Date</TableHead>
              <TableHead className="text-white/70">Type</TableHead>
              <TableHead className="text-white/70">Amount</TableHead>
              <TableHead className="text-white/70">Status</TableHead>
              <TableHead className="text-white/70">Description</TableHead>
              <TableHead className="text-white/70 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow 
                key={transaction.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <TableCell className="font-mono">{transaction.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${transaction.type === "deposit" 
                        ? "border-green-500/30 text-green-500" 
                        : "border-amber-500/30 text-amber-500"
                      }
                    `}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className={`font-mono ${
                  transaction.type === "deposit" ? "text-green-500" : "text-amber-500"
                }`}>
                  {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${transaction.status === "completed" 
                        ? "border-green-500/30 text-green-500" 
                        : transaction.status === "pending"
                        ? "border-blue-500/30 text-blue-500"
                        : "border-red-500/30 text-red-500"
                      }
                    `}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white/70">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-white/50">
          No transactions found matching your criteria
        </div>
      )}
    </Card>
  );
};

export default TransactionHistory;
