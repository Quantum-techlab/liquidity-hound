import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/Navigation";
import { toast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Bot, 
  Shield, 
  Bell, 
  Palette, 
  Database,
  Zap,
  AlertTriangle,
  Save,
  RotateCcw,
  Download,
  Upload
} from "lucide-react";

export const Settings = () => {
  const [settings, setSettings] = useState({
    // Bot Settings
    autoTrading: true,
    maxSlippage: "5",
    gasPrice: "20",
    maxGasPrice: "100",
    buyAmount: "0.1",
    takeProfit: "50",
    stopLoss: "20",
    
    // Security Settings
    twoFactorAuth: false,
    apiKeyAccess: true,
    webhookNotifications: false,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    tradingAlerts: true,
    priceAlerts: false,
    
    // UI Settings
    theme: "dark",
    language: "en",
    currency: "USD",
    refreshInterval: "5",
    
    // Advanced Settings
    debugMode: false,
    betaFeatures: false,
    dataCollection: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'defi-sniper-settings.json';
    link.click();
    
    toast({
      title: "Settings Exported",
      description: "Your settings have been exported successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl animate-float">
                <SettingsIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Configure your DeFi Sniper Bot</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSave} className="gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="bot" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="bot">Bot</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="interface">Interface</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>

            <TabsContent value="bot" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Trading Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Trading</Label>
                        <p className="text-sm text-muted-foreground">Enable automatic trading</p>
                      </div>
                      <Switch
                        checked={settings.autoTrading}
                        onCheckedChange={(checked) => handleSettingChange("autoTrading", checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Max Slippage (%)</Label>
                        <Input
                          type="number"
                          value={settings.maxSlippage}
                          onChange={(e) => handleSettingChange("maxSlippage", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Buy Amount (ETH)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={settings.buyAmount}
                          onChange={(e) => handleSettingChange("buyAmount", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Gas Price (Gwei)</Label>
                        <Input
                          type="number"
                          value={settings.gasPrice}
                          onChange={(e) => handleSettingChange("gasPrice", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Gas Price (Gwei)</Label>
                        <Input
                          type="number"
                          value={settings.maxGasPrice}
                          onChange={(e) => handleSettingChange("maxGasPrice", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Risk Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Take Profit (%)</Label>
                        <Input
                          type="number"
                          value={settings.takeProfit}
                          onChange={(e) => handleSettingChange("takeProfit", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Stop Loss (%)</Label>
                        <Input
                          type="number"
                          value={settings.stopLoss}
                          onChange={(e) => handleSettingChange("stopLoss", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-warning">Risk Warning</p>
                          <p className="text-muted-foreground">
                            Automated trading involves significant risk. Only trade with funds you can afford to lose.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                      />
                      {settings.twoFactorAuth && <Badge variant="default">Enabled</Badge>}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>API Key Access</Label>
                      <p className="text-sm text-muted-foreground">Allow API access to your account</p>
                    </div>
                    <Switch
                      checked={settings.apiKeyAccess}
                      onCheckedChange={(checked) => handleSettingChange("apiKeyAccess", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Webhook Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive security alerts via webhook</p>
                    </div>
                    <Switch
                      checked={settings.webhookNotifications}
                      onCheckedChange={(checked) => handleSettingChange("webhookNotifications", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Security Actions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Manage API Keys
                      </Button>
                      <Button variant="outline" className="justify-start">
                        View Login History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Trading Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about trading activities</p>
                    </div>
                    <Switch
                      checked={settings.tradingAlerts}
                      onCheckedChange={(checked) => handleSettingChange("tradingAlerts", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notifications for price movements</p>
                    </div>
                    <Switch
                      checked={settings.priceAlerts}
                      onCheckedChange={(checked) => handleSettingChange("priceAlerts", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interface" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Interface Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="JPY">JPY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Refresh Interval (seconds)</Label>
                      <Select value={settings.refreshInterval} onValueChange={(value) => handleSettingChange("refreshInterval", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 second</SelectItem>
                          <SelectItem value="5">5 seconds</SelectItem>
                          <SelectItem value="10">10 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Advanced Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed logging and debugging</p>
                    </div>
                    <Switch
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => handleSettingChange("debugMode", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Beta Features</Label>
                      <p className="text-sm text-muted-foreground">Access experimental features</p>
                    </div>
                    <Switch
                      checked={settings.betaFeatures}
                      onCheckedChange={(checked) => handleSettingChange("betaFeatures", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Help improve the bot with usage analytics</p>
                    </div>
                    <Switch
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) => handleSettingChange("dataCollection", checked)}
                    />
                  </div>
                  
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-destructive">Danger Zone</p>
                        <p className="text-muted-foreground mb-3">
                          These actions cannot be undone. Please proceed with caution.
                        </p>
                        <Button variant="destructive" size="sm">
                          Reset All Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <Card className="glass-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Backup & Restore
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Export Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Download your current settings as a backup file.
                      </p>
                      <Button onClick={handleExport} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Settings
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Import Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Restore settings from a previously exported backup file.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Settings
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Automatic Backups</h4>
                    <p className="text-sm text-muted-foreground">
                      Your settings are automatically backed up daily to ensure data safety.
                    </p>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Last backup</span>
                      <Badge variant="outline">2 hours ago</Badge>
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
                <p>Settings changes are for demonstration only. Real implementation requires backend integration.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};