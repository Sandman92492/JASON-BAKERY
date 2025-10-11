import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center bg-background">
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-20">
        <div className="mb-12">
          <svg 
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 text-foreground" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M40 100C40 100 50 60 100 60C150 60 160 100 160 100C160 100 150 140 100 140C50 140 40 100 40 100Z" 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none"
            />
            <path 
              d="M55 95C55 95 60 80 85 75C95 73 105 73 115 75C140 80 145 95 145 95" 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none"
            />
            <path 
              d="M70 105C70 105 75 115 100 120C125 115 130 105 130 105" 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none"
            />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-hero-headline">
          PERFECTION IN PASTRY.
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
          Cape Town's iconic artisanal bakery
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection("menu")}
          className="text-base sm:text-lg px-8 py-6 border-2"
          data-testid="button-explore-menu"
        >
          EXPLORE THE MENU
        </Button>
      </div>
    </section>
  );
}
