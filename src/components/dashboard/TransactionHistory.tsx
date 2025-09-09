import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, ExternalLink, TrendingUp, TrendingDown, Clock } from "lucide-react";

interface Transaction {
  id: string;
  timestamp: string;
  token: string;
  type: "BUY" | "SELL";
  amount: string;
  price: string;
  gas: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  txHash: string;
  pnl?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    timestamp: "2024-01-09 14:32:15",
    token: "PEPE",
    type: "BUY",
    amount: "0.1 ETH",
    price: "$245.50",
    gas: "0.005 ETH",
    status: "SUCCESS",
    txHash: "0x1234...5678",
    pnl: 15.2
  },
  {
    id: "2",
    timestamp: "2024-01-09 14:28:43",
    token: "SHIB",
    type: "SELL",
    amount: "1000000 SHIB",
    price: "$180.00",
    gas: "0.003 ETH",
    status: "SUCCESS",
    txHash: "0x9876...4321",
    pnl: -8.5
  },
  {
    id: "3",
    timestamp: "2024-01-09 14:25:10",
    token: "DOGE",
    type: "BUY",
    amount: "0.05 ETH",
    price: "$122.75",
    gas: "0.004 ETH",
    status: "FAILED",
    txHash: "0xabcd...efgh"
  },
  {
    id: "4",
    timestamp: "2024-01-09 14:20:55",
    token: "FLOKI",
    type: "BUY",
    amount: "0.08 ETH",
    price: "$196.30",
    gas: "0.006 ETH",
    status: "PENDING",
    txHash: "0x5555...6666"
  }
];

export const TransactionHistory = () => {
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "SUCCESS":
        return "default";
      case "FAILED":
        return "destructive";
      case "PENDING":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPnLColor = (pnl?: number) => {
    if (!pnl) return "text-muted-foreground";
    return pnl > 0 ? "text-primary" : "text-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Gas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="font-medium">{tx.token}</TableCell>
                  <TableCell>
                    <Badge variant={tx.type === "BUY" ? "default" : "secondary"} className="text-xs">
                      {tx.type === "BUY" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{tx.amount}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.price}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.gas}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(tx.status)} className="text-xs">
                      {tx.status === "PENDING" && <Clock className="h-3 w-3 mr-1" />}
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-mono text-xs ${getPnLColor(tx.pnl)}`}>
                    {tx.pnl ? `${tx.pnl > 0 ? "+" : ""}${tx.pnl.toFixed(1)}%` : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};