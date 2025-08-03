import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, Copy, RefreshCw, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StringGenerator = () => {
  const [generatedString, setGeneratedString] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateRandomString = useCallback(() => {
    let charset = "";
    
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedString(result);
    setHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 strings
    
    toast({
      title: "Generated",
      description: "New random string generated successfully!",
    });
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "String copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy string",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Generate initial string on component mount
  useEffect(() => {
    generateRandomString();
  }, []);

  // Auto-generate when settings change
  useEffect(() => {
    if (generatedString) {
      generateRandomString();
    }
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <div className="min-h-screen bg-gradient-background pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              PS Random String Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Generate secure random strings with customizable options
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generator Controls */}
            <Card className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shuffle className="h-5 w-5" />
                  Generator Settings
                </CardTitle>
                <CardDescription>
                  Customize your random string generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="length">String Length: {length}</Label>
                  <Input
                    id="length"
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Character Types</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={includeUppercase}
                      onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                    />
                    <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={includeLowercase}
                      onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                    />
                    <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                    />
                    <Label htmlFor="numbers">Numbers (0-9)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={includeSymbols}
                      onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                    />
                    <Label htmlFor="symbols">Symbols (!@#$%...)</Label>
                  </div>
                </div>

                <Button
                  onClick={generateRandomString}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate New String
                </Button>
              </CardContent>
            </Card>

            {/* Generated Output */}
            <div className="space-y-6">
              {/* Current String */}
              <Card className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Generated String</CardTitle>
                  <CardDescription>
                    Your randomly generated string
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="font-mono text-lg bg-background/50 p-4 rounded-lg border break-all">
                        {generatedString || "Generate a string to see it here"}
                      </div>
                      {generatedString && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(generatedString)}
                        >
                          {copied ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {generatedString && (
                      <div className="text-sm text-muted-foreground">
                        Length: {generatedString.length} characters
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* History */}
              {history.length > 0 && (
                <Card className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Strings</CardTitle>
                    <CardDescription>
                      Previously generated strings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {history.map((str, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-background/30 p-2 rounded border group"
                        >
                          <code className="font-mono text-sm truncate flex-1 mr-2">
                            {str}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(str)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringGenerator;