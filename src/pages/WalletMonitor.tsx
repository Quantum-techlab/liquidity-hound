import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/layout/Navigation";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Zap
} from "lucide-react";

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change24h: number;
  logo: string;
}

interface Transaction {
  id: string;
  type: "buy" | "sell" | "transfer";
  token: string;
  amount: string;
  value: number;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  hash: string;
}

export const WalletMonitor = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [walletAddress] = useState("0x1234567890123456789012345678901234567890");
  const [totalValue, setTotalValue] = useState(12847.32);
  const [change24h] = useState(5.67);

  const tokenBalances: TokenBalance[] = [
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "3.45",
      value: 8234.50,
      change24h: 2.34,
      logo: "⟠"
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "2,450.00",
      value: 2450.00,
      change24h: 0.01,
      logo: "💵"
    },
    {
      symbol: "PEPE",
      name: "Pepe",
      balance: "1,000,000",
      value: 1234.56,
      change24h: 15.67,
      logo: "🐸"
    },
    {
      symbol: "SHIB",
      name: "Shiba Inu",
      balance: "50,000,000",
      value: 928.26,
      change24h: -3.45,
      logo: "🐕"
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      token: "PEPE",
      amount: "500,000",
      value: 617.28,
      timestamp: "2024-01-09 14:32:15",
      status: "completed",
      hash: "0xabc123..."
    },
    {
      id: "2",
      type: "sell",
      token: "SHIB",
      amount: "10,000,000",
      value: 185.64,
      timestamp: "2024-01-09 13:45:22",
      status: "completed",
      hash: "0xdef456..."
    },
    {
      id: "3",
      type: "buy",
      token: "ETH",
      amount: "0.5",
      value: 1195.50,
      timestamp: "2024-01-09 12:18:45",
      status: "pending",
      hash: "0xghi789..."
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "buy":
        return "text-primary";
      case "sell":
        return "text-destructive";
      case "transfer":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl animate-float">
                <Eye className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Wallet Monitor</h1>
                <p className="text-muted-foreground">Track your connected wallet performance</p>
              </div>
            </div>
            <Button onClick={handleRefresh} disabled={isRefreshing} className="gradient-primary">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Wallet Overview */}
          <Card className="glass-card shadow-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Connected Wallet</span>
                    </div>
                    <code className="text-lg font-mono">{formatAddress(walletAddress)}</code>
                    <Badge variant="default" className="mt-2">
                      <Activity className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Value</span>
                    </div>
                    <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">24h Change</span>
                    </div>
                    <div className={`text-2xl font-bold ${change24h >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {change24h >= 0 ? '+' : ''}{change24h}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Token Balances */}
                <div className="lg:col-span-2">
                  <Card className="glass-card shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Token Holdings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {tokenBalances.map((token) => (
                        <div key={token.symbol} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{token.logo}</div>
                            <div>
                              <div className="font-semibold">{token.symbol}</div>
                              <div className="text-sm text-muted-foreground">{token.name}</div>
                              <div className="text-sm font-mono">{token.balance}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${token.value.toLocaleString()}</div>
                            <div className={`text-sm ${token.change24h >= 0 ? 'text-primary' : 'text-destructive'}`}>
                              {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                            </div>
                            <Progress 
                              value={(token.value / totalValue) * 100} 
                              className="w-20 h-2 mt-1"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card className="glass-card shadow-card">
                    <CardHeader>
                      <CardTitle className="text-base">Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Best Performer</span>
                        <div className="text-right">
                          <div className="font-medium">PEPE</div>
                          <div className="text-sm text-primary">+15.67%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Worst Performer</span>
                        <div className="text-right">
                          <div className="font-medium">SHIB</div>
                          <div className="text-sm text-destructive">-3.45%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Tokens</span>
                        <div className="font-medium">{tokenBalances.length}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card shadow-card">
                    <CardHeader>
                      <CardTitle className="text-base">Bot Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active Monitors</span>
                        <Badge variant="default">3</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Today's Trades</span>
                        <Badge variant="secondary">7</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <Badge variant="default">85%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(tx.status)}
                            <div className={`p-2 rounded-full ${
                              tx.type === 'buy' ? 'bg-primary/10' : 
                              tx.type === 'sell' ? 'bg-destructive/10' : 'bg-muted'
                            }`}>
                              {tx.type === 'buy' ? <TrendingUp className="h-4 w-4 text-primary" /> :
                               tx.type === 'sell' ? <TrendingDown className="h-4 w-4 text-destructive" /> :
                               <Activity className="h-4 w-4 text-muted-foreground" />}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium capitalize">{tx.type} {tx.token}</div>
                            <div className="text-sm text-muted-foreground">{tx.amount} tokens</div>
                            <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getTypeColor(tx.type)}`}>
                            ${tx.value.toLocaleString()}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Portfolio Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tokenBalances.map((token) => (
                        <div key={token.symbol} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{token.symbol}</span>
                            <span>{((token.value / totalValue) * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={(token.value / totalValue) * 100} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Trading Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">76%</div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">$2,847</div>
                        <div className="text-sm text-muted-foreground">Total Profit</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">156</div>
                        <div className="text-sm text-muted-foreground">Total Trades</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">$18.26</div>
                        <div className="text-sm text-muted-foreground">Avg Profit</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Wallet Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">New Token Detected</div>
                          <div className="text-sm text-muted-foreground">
                            PEPE token added to your wallet - Bot monitoring enabled
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <div className="font-medium">Price Alert</div>
                          <div className="text-sm text-muted-foreground">
                            ETH price increased by 5% - Consider taking profits
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">4 hours ago</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">Transaction Completed</div>
                          <div className="text-sm text-muted-foreground">
                            Successfully sold 10M SHIB tokens for $185.64
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">6 hours ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Demo Notice */}
          <Card className="glass-card border-warning/20">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium text-warning mb-1">Demo Mode</p>
                <p>This is a UI mockup showing sample wallet data. Real integration requires Web3 providers and blockchain APIs.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};