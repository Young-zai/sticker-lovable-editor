import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logoImg from "@/assets/logo.png";

const stickerTypes = [
  { label: "Die Cut Stickers", href: "/stickers/die-cut" },
  { label: "Kiss Cut Stickers", href: "/stickers/kiss-cut" },
  { label: "Sticker Sheets", href: "/stickers/sheets" },
  { label: "Sticker Packs", href: "/stickers/packs" },
  { label: "Heavy Duty Stickers", href: "/stickers/heavy-duty" },
  { label: "Static Clings", href: "/stickers/static-clings" },
  { label: "View All Types", href: "/stickers/types" },
];

const stickerMaterials = [
  { label: "Vinyl Stickers", href: "/stickers/vinyl" },
  { label: "Clear Stickers", href: "/stickers/clear" },
  { label: "Holographic Stickers", href: "/stickers/holographic" },
  { label: "Glitter Stickers", href: "/stickers/glitter" },
  { label: "Metallic Stickers", href: "/stickers/metallic" },
  { label: "Glow-in-the-dark Stickers", href: "/stickers/glow-in-the-dark" },
  { label: "View All Materials", href: "/stickers/materials" },
];

const labelFormats = [
  { label: "Roll Labels", href: "/labels/roll" },
  { label: "Sheet Labels", href: "/labels/sheet" },
  { label: "View All Formats", href: "/labels/formats" },
];

const labelMaterials = [
  { label: "White BOPP Labels", href: "/labels/white-bopp" },
  { label: "Clear BOPP Labels", href: "/labels/clear-bopp" },
  { label: "Matte Labels", href: "/labels/matte" },
  { label: "Gloss Labels", href: "/labels/gloss" },
  { label: "View All Materials", href: "/labels/materials" },
];

const browseByUseItems = [
  { label: "Logo Stickers", href: "/use-cases/logo" },
  { label: "Bottle / Jar Stickers", href: "/use-cases/bottle" },
  { label: "Candle Labels", href: "/use-cases/candle" },
  { label: "Packaging Labels", href: "/use-cases/packaging" },
  { label: "Laptop Stickers", href: "/use-cases/laptop" },
  { label: "Bumper Stickers", href: "/use-cases/bumper" },
  { label: "Window Clings", href: "/use-cases/window" },
];

const navLinks = [
  { label: "SAMPLE PACK", href: "/sample-pack" },
  { label: "QUOTES", href: "/quotes" },
  { label: "REORDER", href: "/reorder" },
  { label: "ABOUT", href: "/about" },
];
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickersOpen, setStickersOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);
  const [browseByUseOpen, setBrowseByUseOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isStickersActive = location.pathname.startsWith("/stickers");
  const isLabelsActive = location.pathname.startsWith("/labels");
  const isBrowseByUseActive = location.pathname.startsWith("/use-cases");
  
  
  return <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Sticker Kiko" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Stickers Mega Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={() => navigate("/stickers")}
                    className={`px-6 py-3 rounded-2xl font-bold text-base transition-all cursor-pointer ${isStickersActive ? "bg-primary text-primary-foreground shadow-lg" : "text-foreground hover:bg-primary/10"}`}
                  >
                    STICKERS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-6 w-[500px] bg-background border border-border rounded-xl shadow-xl">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Sticker Type Column */}
                        <div>
                          <h3 className="font-bold text-primary mb-3 text-sm uppercase tracking-wide">Sticker Type</h3>
                          <ul className="space-y-2">
                            {stickerTypes.map((item) => (
                              <li key={item.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="block py-1.5 text-foreground hover:text-primary transition-colors font-medium"
                                  >
                                    {item.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Sticker Material Column */}
                        <div>
                          <h3 className="font-bold text-primary mb-3 text-sm uppercase tracking-wide">Sticker Material</h3>
                          <ul className="space-y-2">
                            {stickerMaterials.map((item) => (
                              <li key={item.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="block py-1.5 text-foreground hover:text-primary transition-colors font-medium"
                                  >
                                    {item.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* View All Link */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/stickers"
                            className="block py-2 text-primary hover:text-primary/80 transition-colors font-bold text-center"
                          >
                            View All Stickers →
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Labels Mega Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={() => navigate("/labels")}
                    className={`px-6 py-3 rounded-2xl font-bold text-base transition-all cursor-pointer ${isLabelsActive ? "bg-primary text-primary-foreground shadow-lg" : "text-foreground hover:bg-primary/10"}`}
                  >
                    LABELS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-6 p-6 w-[420px] bg-background border border-border rounded-xl shadow-xl">
                      {/* Label Formats Column */}
                      <div>
                        <h3 className="font-bold text-teal mb-3 text-sm uppercase tracking-wide">Label Formats</h3>
                        <ul className="space-y-2">
                          {labelFormats.map((item) => (
                            <li key={item.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block py-1.5 text-foreground hover:text-teal transition-colors font-medium"
                                >
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Label Materials Column */}
                      <div>
                        <h3 className="font-bold text-teal mb-3 text-sm uppercase tracking-wide">Label Materials</h3>
                        <ul className="space-y-2">
                          {labelMaterials.map((item) => (
                            <li key={item.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.href}
                                  className="block py-1.5 text-foreground hover:text-teal transition-colors font-medium"
                                >
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* View All Labels Link */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/labels"
                            className="block py-2 text-primary hover:text-primary/80 transition-colors font-bold text-center"
                          >
                            View All Labels →
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Browse By Use Mega Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={() => navigate("/use-cases")}
                    className={`px-6 py-3 rounded-2xl font-bold text-base transition-all cursor-pointer ${isBrowseByUseActive ? "bg-primary text-primary-foreground shadow-lg" : "text-foreground hover:bg-primary/10"}`}
                  >
                    BROWSE BY USE
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-6 w-[280px] bg-background border border-border rounded-xl shadow-xl">
                      <ul className="space-y-2">
                        {browseByUseItems.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href}
                                className="block py-1.5 text-foreground hover:text-teal transition-colors font-medium"
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="pt-2 border-t border-border mt-2">
                          <NavigationMenuLink asChild>
                            <Link
                              to="/use-cases"
                              className="block py-1.5 text-teal hover:text-teal/80 transition-colors font-bold"
                            >
                              View All Use Cases →
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Other Nav Links */}
            {navLinks.map(link => <Link key={link.label} to={link.href} className={`px-6 py-3 rounded-2xl font-bold text-base transition-all ${location.pathname === link.href ? "bg-primary text-primary-foreground shadow-lg" : "text-foreground hover:bg-primary/10 hover:scale-105"}`}>
                {link.label}
              </Link>)}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {/* Stickers Collapsible */}
              <Collapsible open={stickersOpen} onOpenChange={setStickersOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full font-bold py-3 text-foreground hover:text-primary transition-colors">
                  <span>STICKERS</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${stickersOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="animate-accordion-down">
                  <div className="pl-4 pb-3 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Sticker Type</p>
                      <div className="space-y-1">
                        {stickerTypes.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Sticker Material</p>
                      <div className="space-y-1">
                        {stickerMaterials.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Labels Collapsible */}
              <Collapsible open={labelsOpen} onOpenChange={setLabelsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full font-bold py-3 text-foreground hover:text-primary transition-colors border-t border-border">
                  <span>LABELS</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${labelsOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="animate-accordion-down">
                  <div className="pl-4 pb-3 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">Label Formats</p>
                      <div className="space-y-1">
                        {labelFormats.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-teal transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">Label Materials</p>
                      <div className="space-y-1">
                        {labelMaterials.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-sm text-muted-foreground hover:text-teal transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Browse By Use Collapsible */}
              <Collapsible open={browseByUseOpen} onOpenChange={setBrowseByUseOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full font-bold py-3 text-foreground hover:text-primary transition-colors border-t border-border">
                  <span>BROWSE BY USE</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${browseByUseOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="animate-accordion-down">
                  <div className="pl-4 pb-3 space-y-1">
                    {browseByUseItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-teal transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Other Nav Links */}
              <div className="border-t border-border pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-bold py-3 transition-colors ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>;
};

export default Navbar;