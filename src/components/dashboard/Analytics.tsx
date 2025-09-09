import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Zap } from "lucide-react";

interface AnalyticsProps {
  className?: string;
}

export const Analytics = ({ className }: AnalyticsProps) => {
  const stats = {
    totalPnL: 127.5,
    totalVolume: 2450.0,
    winRate: 76.3,
    avgGain: 12.8,
    avgLoss: -8.2,
    bestTrade: 45.6,
    worstTrade: -15.3,
    totalTrades: 47,
    profitableTrades: 36,
    dayPnL: 15.2,
    weekPnL: 89.7,
    monthPnL: 127.5
  };

  const topTokens = [
    { token: "PEPE", trades: 8, pnl: 34.2, volume: 450.0 },
    { token: "SHIB", trades: 6, pnl: 28.5, volume: 380.0 },
    { token: "DOGE", trades: 5, pnl: 19.8, volume: 320.0 },
    { token: "FLOKI", trades: 4, pnl: 16.3, volume: 280.0 },
    { token: "BONK", trades: 3, pnl: 12.1, volume: 190.0 }
  ];

  return (
    <div className={className}>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tokens">Top Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${stats.totalPnL.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{stats.dayPnL.toFixed(1)}% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.winRate.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.profitableTrades}/{stats.totalTrades} trades
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalVolume.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {stats.totalTrades} trades
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Period Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Today</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium text-primary">+${stats.dayPnL.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium text-primary">+${stats.weekPnL.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium text-primary">+${stats.monthPnL.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trade Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Gain</span>
                  <Badge variant="default" className="text-xs">+{stats.avgGain.toFixed(1)}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Loss</span>
                  <Badge variant="destructive" className="text-xs">{stats.avgLoss.toFixed(1)}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Trade</span>
                  <Badge variant="default" className="text-xs">+{stats.bestTrade.toFixed(1)}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Worst Trade</span>
                  <Badge variant="destructive" className="text-xs">{stats.worstTrade.toFixed(1)}%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{stats.totalTrades}</div>
                  <div className="text-xs text-muted-foreground">Total Trades</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.profitableTrades}</div>
                  <div className="text-xs text-muted-foreground">Profitable</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{stats.totalTrades - stats.profitableTrades}</div>
                  <div className="text-xs text-muted-foreground">Losses</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{((stats.avgGain + Math.abs(stats.avgLoss)) / 2).toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Avg Move</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Top Performing Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topTokens.map((token, index) => (
                  <div key={token.token} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{token.token}</div>
                        <div className="text-xs text-muted-foreground">{token.trades} trades</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${token.pnl > 0 ? 'text-primary' : 'text-destructive'}`}>
                        {token.pnl > 0 ? '+' : ''}{token.pnl.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">${token.volume.toFixed(0)} vol</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};