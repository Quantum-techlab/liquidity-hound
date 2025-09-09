import { useState } from "react";
import { BotConfig } from "@/components/dashboard/BotConfig";
import { BotStatus } from "@/components/dashboard/BotStatus";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Analytics } from "@/components/dashboard/Analytics";
import { Navigation } from "@/components/layout/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { BarChart3, History, Settings, TrendingUp, Zap, Shield, Activity } from "lucide-react";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);

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

  const quickStats = [
    { label: "Active Monitors", value: "12", icon: Activity, color: "text-blue-500" },
    { label: "Success Rate", value: "76.3%", icon: TrendingUp, color: "text-primary" },
    { label: "Total Profit", value: "$2,847", icon: Zap, color: "text-green-500" },
    { label: "Security Score", value: "A+", icon: Shield, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
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
          <TabsList className="grid w-full grid-cols-4 glass-card">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:gradient-primary">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="animate-float">
                  <BotStatus isRunning={isRunning} onToggleBot={handleToggleBot} />
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="animate-float" style={{ animationDelay: "0.2s" }}>
                  <Analytics />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <div className="animate-float">
              <BotConfig onConfigSave={handleConfigSave} />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="animate-float">
              <TransactionHistory />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="animate-float">
              <Analytics className="w-full" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
