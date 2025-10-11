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
          <img 
            src="/icon-187.png" 
            alt="Jason Bakery"
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8"
          />
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
