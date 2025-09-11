import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/layout/Navigation";
import { toast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  Play, 
  Square, 
  BarChart3, 
  Zap,
  DollarSign,
  Volume2,
  Clock,
  Target,
  Shield,
  Activity
} from "lucide-react";

interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  logo: string;
}

export const TradingView = () => {
  const [selectedCoin, setSelectedCoin] = useState("ETH");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [buyAmount, setBuyAmount] = useState("0.1");
  const [sellAmount, setSellAmount] = useState("0.1");
  const [slippage, setSlippage] = useState("5");
  const [gasPrice, setGasPrice] = useState("20");

  const coins: CoinData[] = [
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2387.45,
      change24h: 2.34,
      volume: 15420000000,
      marketCap: 287000000000,
      logo: "⟠"
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43250.67,
      change24h: -1.23,
      volume: 28500000000,
      marketCap: 847000000000,
      logo: "₿"
    },
    {
      symbol: "PEPE",
      name: "Pepe",
      price: 0.00000123,
      change24h: 15.67,
      volume: 450000000,
      marketCap: 520000000,
      logo: "🐸"
    },
    {
      symbol: "SHIB",
      name: "Shiba Inu",
      price: 0.00000856,
      change24h: -3.45,
      volume: 320000000,
      marketCap: 5040000000,
      logo: "🐕"
    }
  ];

  const currentCoin = coins.find(coin => coin.symbol === selectedCoin) || coins[0];

  const handleBuy = () => {
    toast({
      title: "Buy Order Placed",
      description: `Attempting to buy ${buyAmount} ETH worth of ${selectedCoin}`,
    });
  };

  const handleSell = () => {
    toast({
      title: "Sell Order Placed", 
      description: `Attempting to sell ${sellAmount} ETH worth of ${selectedCoin}`,
    });
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    toast({
      title: isMonitoring ? "Monitoring Stopped" : "Monitoring Started",
      description: isMonitoring 
        ? `Stopped monitoring ${selectedCoin}` 
        : `Now monitoring ${selectedCoin} for trading opportunities`,
    });
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return price.toFixed(8);
    }
    return price.toLocaleString();
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    }
    if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    }
    return `$${(volume / 1e3).toFixed(2)}K`;
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
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Trading View</h1>
                <p className="text-muted-foreground">Monitor and trade cryptocurrencies</p>
              </div>
            </div>
            
            {/* Coin Selector */}
            <div className="flex items-center gap-4">
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {coins.map((coin) => (
                    <SelectItem key={coin.symbol} value={coin.symbol}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{coin.logo}</span>
                        <span>{coin.symbol}</span>
                        <span className="text-muted-foreground">- {coin.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Header */}
          <Card className="glass-card shadow-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{currentCoin.logo}</div>
                    <div>
                      <h2 className="text-2xl font-bold">{currentCoin.name}</h2>
                      <p className="text-muted-foreground">{currentCoin.symbol}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Price</Label>
                  <div className="text-2xl font-bold">${formatPrice(currentCoin.price)}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">24h Change</Label>
                  <div className={`text-2xl font-bold flex items-center gap-1 ${
                    currentCoin.change24h >= 0 ? 'text-primary' : 'text-destructive'
                  }`}>
                    {currentCoin.change24h >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                    {currentCoin.change24h >= 0 ? '+' : ''}{currentCoin.change24h}%
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">24h Volume</Label>
                  <div className="text-2xl font-bold">{formatVolume(currentCoin.volume)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Trading Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-3">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedCoin}/USDT Chart</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={isMonitoring ? "destructive" : "default"}
                        onClick={toggleMonitoring}
                        className={isMonitoring ? "" : "gradient-primary"}
                      >
                        {isMonitoring ? (
                          <>
                            <Square className="h-4 w-4 mr-2" />
                            Stop Bot
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Bot
                          </>
                        )}
                      </Button>
                      {isMonitoring && (
                        <Badge variant="default" className="animate-pulse">
                          <Activity className="h-3 w-3 mr-1" />
                          Monitoring
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Simulated Chart */}
                  <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                      <p className="text-lg font-medium text-muted-foreground">TradingView Chart</p>
                      <p className="text-sm text-muted-foreground">
                        Real implementation would integrate TradingView widget
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Panel */}
            <div className="space-y-6">
              {/* Buy/Sell Panel */}
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Trade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="buy" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="buy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        Buy
                      </TabsTrigger>
                      <TabsTrigger value="sell" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
                        Sell
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Amount (ETH)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Estimated Cost</Label>
                        <div className="p-3 bg-muted rounded-lg">
                          <span className="font-mono">
                            ${(parseFloat(buyAmount) * 2387.45).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Button onClick={handleBuy} className="w-full gradient-primary">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Buy {selectedCoin}
                      </Button>
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Amount (ETH)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={sellAmount}
                          onChange={(e) => setSellAmount(e.target.value)}
                          placeholder="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Estimated Receive</Label>
                        <div className="p-3 bg-muted rounded-lg">
                          <span className="font-mono">
                            ${(parseFloat(sellAmount) * 2387.45).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Button onClick={handleSell} variant="destructive" className="w-full">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Sell {selectedCoin}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Trading Settings */}
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Slippage (%)</Label>
                    <Select value={slippage} onValueChange={setSlippage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1%</SelectItem>
                        <SelectItem value="3">3%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gas Price (Gwei)</Label>
                    <Input
                      type="number"
                      value={gasPrice}
                      onChange={(e) => setGasPrice(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Market Stats */}
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Market Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Market Cap</span>
                    <span className="text-sm font-medium">{formatVolume(currentCoin.marketCap)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                    <span className="text-sm font-medium">{formatVolume(currentCoin.volume)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Bot Status</span>
                    <Badge variant={isMonitoring ? "default" : "secondary"}>
                      {isMonitoring ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};