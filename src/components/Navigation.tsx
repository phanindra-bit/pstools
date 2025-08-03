import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Languages, Shuffle, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/translator", label: "Translator", icon: Languages },
    { path: "/string-generator", label: "String Generator", icon: Shuffle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            DevTools
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Button
                  key={path}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={isActive ? "bg-gradient-primary" : ""}
                >
                  <Link to={path} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;