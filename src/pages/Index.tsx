import { useState } from "react";
import { BotConfig } from "@/components/dashboard/BotConfig";
import { BotStatus } from "@/components/dashboard/BotStatus";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Analytics } from "@/components/dashboard/Analytics";
import { Navigation } from "@/components/layout/Navigation";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { BarChart3, History, Settings, TrendingUp, Zap, Shield, Activity, Wallet, Bot, Play, Square, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("ETH");
  const [monitoringCoins, setMonitoringCoins] = useState(["ETH", "PEPE"]);

  const handleToggleBot = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "Bot Stopped" : "Bot Started",
      description: isRunning 
        ? "DeFi sniper bot has been stopped successfully." 
        : "DeFi sniper bot is now monitoring for new tokens.",
    });
  };

  const handleConfigSave = (config: any) => {
    toast({
      title: "Configuration Saved",
      description: "Bot configuration has been updated successfully.",
    });
  };

  const availableCoins = [
    { symbol: "ETH", name: "Ethereum", logo: "⟠", price: 2387.45, change: 2.34 },
    { symbol: "BTC", name: "Bitcoin", logo: "₿", price: 43250.67, change: -1.23 },
    { symbol: "PEPE", name: "Pepe", logo: "🐸", price: 0.00000123, change: 15.67 },
    { symbol: "SHIB", name: "Shiba Inu", logo: "🐕", price: 0.00000856, change: -3.45 },
    { symbol: "DOGE", name: "Dogecoin", logo: "🐶", price: 0.087, change: 5.23 },
  ];

  const handleAddCoinToMonitor = () => {
    if (!monitoringCoins.includes(selectedCoin)) {
      setMonitoringCoins([...monitoringCoins, selectedCoin]);
      toast({
        title: "Coin Added to Monitor",
        description: `${selectedCoin} is now being monitored by the bot`,
      });
    }
  };

  const handleRemoveCoinFromMonitor = (coin: string) => {
    setMonitoringCoins(monitoringCoins.filter(c => c !== coin));
    toast({
      title: "Coin Removed",
      description: `${coin} is no longer being monitored`,
    });
  };

  const quickStats = [
    { label: "Active Monitors", value: "12", icon: Activity, color: "text-blue-500" },
    { label: "Success Rate", value: "76.3%", icon: TrendingUp, color: "text-primary" },
    { label: "Total Profit", value: "$2,847", icon: Zap, color: "text-green-500" },
    { label: "Security Score", value: "A+", icon: Shield, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Bot Control Header */}
        <Card className="glass-card shadow-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">DeFi Sniper Bot</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={isRunning ? "default" : "secondary"}>
                      {isRunning ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Monitoring {monitoringCoins.length} coins
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCoins.map((coin) => (
                      <SelectItem key={coin.symbol} value={coin.symbol}>
                        <div className="flex items-center gap-2">
                          <span>{coin.logo}</span>
                          <span>{coin.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddCoinToMonitor} variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Monitor
                </Button>
                <Button
                  onClick={handleToggleBot}
                  variant={isRunning ? "destructive" : "default"}
                  className={isRunning ? "" : "gradient-primary"}
                >
                  {isRunning ? (
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Coins */}
        {monitoringCoins.length > 0 && (
          <Card className="glass-card shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Monitored Coins</h3>
                <Badge variant="outline">{monitoringCoins.length} active</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monitoringCoins.map((coinSymbol) => {
                  const coin = availableCoins.find(c => c.symbol === coinSymbol);
                  if (!coin) return null;
                  return (
                    <div key={coin.symbol} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{coin.logo}</span>
                          <div>
                            <div className="font-medium">{coin.symbol}</div>
                            <div className="text-sm text-muted-foreground">${coin.price.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${coin.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                            {coin.change >= 0 ? '+' : ''}{coin.change}%
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCoinFromMonitor(coin.symbol)}
                            className="text-xs mt-1"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="glass-card shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <BotStatus isRunning={isRunning} onToggleBot={handleToggleBot} />
                </div>
              </div>
              <div className="lg:col-span-2">
                <div>
                  <Analytics />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div>
              <TransactionHistory />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <Analytics className="w-full" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
