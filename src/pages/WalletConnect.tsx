import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/layout/Navigation";
import { toast } from "@/hooks/use-toast";
import { 
  Wallet, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Copy,
  Zap,
  Globe,
  Smartphone
} from "lucide-react";

interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  installed: boolean;
  popular?: boolean;
}

export const WalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const walletProviders: WalletProvider[] = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      description: "Connect using browser extension",
      installed: typeof window !== 'undefined' && !!(window as any).ethereum,
      popular: true
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "🔗",
      description: "Connect using mobile wallet",
      installed: true,
      popular: true
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Connect using Coinbase Wallet",
      installed: false
    },
    {
      id: "trust",
      name: "Trust Wallet",
      icon: "🛡️",
      description: "Connect using Trust Wallet",
      installed: false
    }
  ];

  const handleWalletConnect = async (walletId: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (walletId === "metamask" && (window as any).ethereum) {
        // Real MetaMask connection would go here
        const mockAddress = "0x1234567890123456789012345678901234567890";
        setConnectedWallet(walletId);
        setWalletAddress(mockAddress);
        
        toast({
          title: "Wallet Connected",
          description: "MetaMask wallet connected successfully!",
        });
      } else {
        // Mock connection for other wallets
        const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
        setConnectedWallet(walletId);
        setWalletAddress(mockAddress);
        
        toast({
          title: "Wallet Connected",
          description: `${walletProviders.find(w => w.id === walletId)?.name} connected successfully!`,
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
    setWalletAddress(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary rounded-xl animate-float">
                <Wallet className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
              <p className="text-muted-foreground mt-2">
                Connect your wallet to start using the DeFi Sniper Bot
              </p>
            </div>
          </div>

          {/* Connection Status */}
          {connectedWallet ? (
            <Card className="glass-card shadow-card border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Wallet Connected</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {walletProviders.find(w => w.id === connectedWallet)?.name}
                        </span>
                        <Badge variant="default" className="text-xs">Active</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {walletAddress && formatAddress(walletAddress)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyAddress}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No wallet connected. Please connect a wallet to use the bot features.
              </AlertDescription>
            </Alert>
          )}

          {/* Wallet Providers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {walletProviders.map((wallet) => (
              <Card 
                key={wallet.id} 
                className={`glass-card shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer ${
                  connectedWallet === wallet.id ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => !connectedWallet && handleWalletConnect(wallet.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{wallet.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{wallet.name}</h3>
                          {wallet.popular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{wallet.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {wallet.installed ? (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Installed
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Install Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {connectedWallet === wallet.id ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <Button 
                        variant="outline" 
                        disabled={isConnecting || !!connectedWallet}
                        className="min-w-[80px]"
                      >
                        {isConnecting ? "..." : "Connect"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="glass-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Secure Connection</h4>
                    <p className="text-sm text-muted-foreground">
                      Your wallet connection is encrypted and secure
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">No Private Keys</h4>
                    <p className="text-sm text-muted-foreground">
                      We never store or access your private keys
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Decentralized</h4>
                    <p className="text-sm text-muted-foreground">
                      Direct blockchain interaction, no intermediaries
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Notice */}
          <Card className="glass-card border-warning/20">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium text-warning mb-1">Demo Mode</p>
                <p>This is a UI mockup. Real wallet integration requires Web3 libraries and backend setup.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};