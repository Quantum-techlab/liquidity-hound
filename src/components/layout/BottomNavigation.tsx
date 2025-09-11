import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Settings, 
  User,
  Activity,
  Eye,
  Bot
} from "lucide-react";

export const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: BarChart3, label: "Dashboard" },
    { path: "/trading", icon: TrendingUp, label: "Trading" },
    { path: "/wallet-monitor", icon: Eye, label: "Monitor" },
    { path: "/wallet-connect", icon: Wallet, label: "Wallet" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full flex flex-col items-center gap-1 h-auto py-2 ${
                  isActive(item.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <div className="w-1 h-1 bg-primary rounded-full" />
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};