import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages, Shuffle, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const tools = [
    {
      title: "PS Text Transfer",
      description: "Translate English text to multiple languages instantly using AI translation services",
      icon: Languages,
      path: "/translator",
      color: "from-blue-500 to-purple-600",
      features: ["Multi-language support", "Instant translation", "Copy to clipboard"]
    },
    {
      title: "PS Random String Generator", 
      description: "Generate secure random strings with customizable character sets and length",
      icon: Shuffle,
      path: "/string-generator",
      color: "from-green-500 to-teal-600",
      features: ["Customizable length", "Multiple character types", "Generation history"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PS Tools Suite
            </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A collection of powerful development tools built with React. 
              Translate text, generate random strings, and more - all in one beautiful interface.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                React + TypeScript
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Tailwind CSS
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                React Router
              </span>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.path} className="group shadow-card border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    <CardTitle className="flex items-center gap-3 relative z-10">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="relative z-10">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Features:</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button asChild className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                        <Link to={tool.path} className="flex items-center justify-center gap-2">
                          Open Tool
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;
