import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navigation } from "@/components/layout/Navigation";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Book, 
  Video, 
  FileText,
  ExternalLink,
  Search
} from "lucide-react";

export const Help = () => {
  const faqs = [
    {
      question: "How do I start using the DeFi Sniper Bot?",
      answer: "First, connect your wallet on the Wallet Connect page. Then configure your trading parameters in Settings, select the coins you want to monitor on the Dashboard, and activate the bot."
    },
    {
      question: "What wallets are supported?",
      answer: "We support MetaMask, WalletConnect, Coinbase Wallet, and Trust Wallet. More wallet integrations are coming soon."
    },
    {
      question: "How does the bot detect new tokens?",
      answer: "The bot monitors blockchain transactions in real-time, looking for new token deployments and liquidity additions on decentralized exchanges."
    },
    {
      question: "What are the fees?",
      answer: "The bot charges a 1% fee on successful trades. You also pay standard blockchain gas fees for transactions."
    },
    {
      question: "Is my wallet secure?",
      answer: "Yes, we never store your private keys. The bot only has permission to execute trades you've pre-approved through smart contract interactions."
    },
    {
      question: "Can I set stop losses?",
      answer: "Yes, you can configure stop loss and take profit levels in the bot settings. These will be automatically executed when conditions are met."
    }
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: Book,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      link: "#"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: FileText,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary rounded-xl animate-float">
                <HelpCircle className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Help & Support</h1>
              <p className="text-muted-foreground mt-2">
                Find answers to common questions and get help with DeFi Sniper Bot
              </p>
            </div>
          </div>

          {/* Search */}
          <Card className="glass-card shadow-card">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.title} className="glass-card shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <Card className="glass-card shadow-card">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="glass-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe your issue or question..."
                  rows={4}
                />
              </div>
              
              <Button className="gradient-primary">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-card shadow-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Mail className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    support@defisniperbot.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Response within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card shadow-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};