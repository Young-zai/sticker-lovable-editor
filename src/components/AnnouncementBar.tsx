import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-background border-b border-border py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
        </div>

        {/* Announcement */}
        <div className="flex-1 flex items-center justify-center gap-2 text-sm">
          <span className="text-primary">⏰</span>
          <span className="font-semibold text-foreground">
            25% OFF DECEMBER DEAL • Code DEC2025 • Excludes Deals
          </span>
        </div>

        {/* Login */}
        <a href="#" className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors">
          Login
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
