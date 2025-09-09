import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Wallet, TrendingUp, Shield } from "lucide-react";

interface BotConfigProps {
  onConfigSave?: (config: any) => void;
}

export const BotConfig = ({ onConfigSave }: BotConfigProps) => {
  const [config, setConfig] = useState({
    network: "ethereum",
    rpcProvider: "alchemy",
    walletAddress: "",
    slippage: "5",
    buyAmount: "0.1",
    gasPrice: "20",
    maxGasPrice: "100",
    takeProfit: "50",
    stopLoss: "20",
    antiHoneypot: true,
    autoSell: false,
    minLiquidity: "5",
    maxBuyTax: "10",
    maxSellTax: "10"
  });

  const handleConfigChange = (key: string, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onConfigSave?.(config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Bot Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Network Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Network & Provider</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="network">Network</Label>
              <Select value={config.network} onValueChange={(value) => handleConfigChange("network", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpcProvider">RPC Provider</Label>
              <Select value={config.rpcProvider} onValueChange={(value) => handleConfigChange("rpcProvider", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alchemy">Alchemy</SelectItem>
                  <SelectItem value="infura">Infura</SelectItem>
                  <SelectItem value="quicknode">QuickNode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Wallet Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Wallet Settings</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              placeholder="0x..."
              value={config.walletAddress}
              onChange={(e) => handleConfigChange("walletAddress", e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Trading Parameters */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Trading Parameters</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buyAmount">Buy Amount (ETH)</Label>
              <Input
                id="buyAmount"
                type="number"
                step="0.01"
                value={config.buyAmount}
                onChange={(e) => handleConfigChange("buyAmount", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slippage">Slippage (%)</Label>
              <Input
                id="slippage"
                type="number"
                step="0.1"
                value={config.slippage}
                onChange={(e) => handleConfigChange("slippage", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gasPrice">Gas Price (Gwei)</Label>
              <Input
                id="gasPrice"
                type="number"
                value={config.gasPrice}
                onChange={(e) => handleConfigChange("gasPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxGasPrice">Max Gas Price (Gwei)</Label>
              <Input
                id="maxGasPrice"
                type="number"
                value={config.maxGasPrice}
                onChange={(e) => handleConfigChange("maxGasPrice", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Risk Management */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Risk Management</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="takeProfit">Take Profit (%)</Label>
              <Input
                id="takeProfit"
                type="number"
                value={config.takeProfit}
                onChange={(e) => handleConfigChange("takeProfit", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss (%)</Label>
              <Input
                id="stopLoss"
                type="number"
                value={config.stopLoss}
                onChange={(e) => handleConfigChange("stopLoss", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minLiquidity">Min Liquidity (ETH)</Label>
              <Input
                id="minLiquidity"
                type="number"
                step="0.1"
                value={config.minLiquidity}
                onChange={(e) => handleConfigChange("minLiquidity", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxBuyTax">Max Buy Tax (%)</Label>
              <Input
                id="maxBuyTax"
                type="number"
                value={config.maxBuyTax}
                onChange={(e) => handleConfigChange("maxBuyTax", e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="antiHoneypot">Anti-Honeypot Check</Label>
            <Switch
              id="antiHoneypot"
              checked={config.antiHoneypot}
              onCheckedChange={(checked) => handleConfigChange("antiHoneypot", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="autoSell">Auto-Sell Feature</Label>
            <Switch
              id="autoSell"
              checked={config.autoSell}
              onCheckedChange={(checked) => handleConfigChange("autoSell", checked)}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  );
};