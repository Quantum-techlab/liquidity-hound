import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Activity, Play, Square, Wifi, WifiOff, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface BotStatusProps {
  isRunning?: boolean;
  onToggleBot?: () => void;
}

export const BotStatus = ({ isRunning = false, onToggleBot }: BotStatusProps) => {
  const stats = {
    tokensScanned: 1247,
    buyAttempts: 23,
    successfulBuys: 18,
    failedBuys: 5,
    avgResponseTime: "0.8s",
    lastActivity: "2 minutes ago"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Bot Status
          </div>
          <Badge variant={isRunning ? "default" : "secondary"} className="flex items-center gap-1">
            {isRunning ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            {isRunning ? "Running" : "Stopped"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isRunning ? <Wifi className="h-4 w-4 text-primary" /> : <WifiOff className="h-4 w-4 text-muted-foreground" />}
            <span className="text-sm">Network Connection</span>
          </div>
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Mempool Monitoring</span>
          </div>
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? "Active" : "Inactive"}
          </Badge>
        </div>

        <Separator />

        {/* Statistics */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Session Statistics</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-2xl font-bold">{stats.tokensScanned.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Tokens Scanned</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold">{stats.buyAttempts}</p>
              <p className="text-xs text-muted-foreground">Buy Attempts</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">{stats.successfulBuys}</p>
              <p className="text-xs text-muted-foreground">Successful</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-destructive">{stats.failedBuys}</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Performance Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Performance</h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Response Time</span>
            <Badge variant="outline">{stats.avgResponseTime}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Success Rate</span>
            <Badge variant="outline">
              {((stats.successfulBuys / stats.buyAttempts) * 100).toFixed(1)}%
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Activity</span>
            <span className="text-sm">{stats.lastActivity}</span>
          </div>
        </div>

        <Separator />

        {/* Control Button */}
        <Button 
          onClick={onToggleBot} 
          variant={isRunning ? "destructive" : "default"}
          className="w-full"
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

        {/* Alerts */}
        {!isRunning && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Bot is currently stopped. Start to begin monitoring.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};