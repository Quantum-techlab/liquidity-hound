import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Settings, 
  Wallet,
  TrendingUp,
  Award,
  Clock,
  Bell
} from "lucide-react";

export const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "DeFi enthusiast and algorithmic trader with 5+ years of experience in crypto markets.",
    avatar: "",
    joinDate: "2024-01-15",
    tier: "Pro",
    totalProfit: 2847.50,
    totalTrades: 156,
    winRate: 76.3,
    notifications: {
      email: true,
      sms: false,
      push: true,
      trading: true
    }
  });

  const stats = [
    { label: "Total Profit", value: `$${profile.totalProfit.toFixed(2)}`, icon: TrendingUp, color: "text-primary" },
    { label: "Total Trades", value: profile.totalTrades.toString(), icon: Award, color: "text-blue-500" },
    { label: "Win Rate", value: `${profile.winRate}%`, icon: Shield, color: "text-green-500" },
    { label: "Member Since", value: new Date(profile.joinDate).toLocaleDateString(), icon: Clock, color: "text-muted-foreground" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card shadow-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    <Badge variant="secondary" className="gradient-primary text-primary-foreground">
                      {profile.tier} Member
                    </Badge>
                  </div>

                  <Button className="w-full gradient-primary">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="font-medium">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="glass-card shadow-card">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card className="glass-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Connected Wallets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">MetaMask</p>
                            <p className="text-sm text-muted-foreground">0x1234...5678</p>
                          </div>
                        </div>
                        <Badge variant="default">Connected</Badge>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Connect New Wallet
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card shadow-card border-warning/20">
                  <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground">
                      <p className="font-medium text-warning mb-1">Demo Mode</p>
                      <p>Wallet connections require Supabase backend integration.</p>
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
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {profile.notifications.email ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Trading Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified about trading opportunities</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {profile.notifications.trading ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Browser push notifications</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {profile.notifications.push ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Download Account Data
                    </Button>
                    <Separator />
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};