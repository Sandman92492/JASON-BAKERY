import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// To use a custom logo:
// 1. Place your logo file in src/assets/ (e.g., logo.png or logo.svg)
// 2. Uncomment the line below and update the filename
// import logo from "@/assets/logo.png";
const logo = null; // Set to imported logo or null for text fallback

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {logo ? (
              <img 
                src={logo} 
                alt="Jason Bakery" 
                className="h-8 sm:h-10 w-auto" 
              />
            ) : (
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-wide">
                JASON BAKERY
              </h1>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide text-sm"
              data-testid="link-menu"
            >
              MENU
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide text-sm"
              data-testid="link-shop"
            >
              SHOP
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide text-sm"
              data-testid="link-about"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide text-sm"
              data-testid="link-contact"
            >
              CONTACT
            </button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide"
              data-testid="link-menu-mobile"
            >
              MENU
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide"
              data-testid="link-shop-mobile"
            >
              SHOP
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide"
              data-testid="link-about-mobile"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors font-medium tracking-wide"
              data-testid="link-contact-mobile"
            >
              CONTACT
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
