import { useState } from "react";
import { BotConfig } from "@/components/dashboard/BotConfig";
import { BotStatus } from "@/components/dashboard/BotStatus";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Analytics } from "@/components/dashboard/Analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Bot, BarChart3, History, Settings } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">DeFi Sniper Bot</h1>
              <p className="text-muted-foreground">Automated token monitoring and trading dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Config
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <BotStatus isRunning={isRunning} onToggleBot={handleToggleBot} />
              </div>
              <div className="lg:col-span-2">
                <Analytics />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <BotConfig onConfigSave={handleConfigSave} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics className="w-full" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
