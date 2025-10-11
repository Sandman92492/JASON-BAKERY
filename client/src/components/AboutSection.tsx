export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-foreground tracking-tight" data-testid="text-about-headline">
          IT'S ALL ABOUT THE DOUGH
        </h2>
        
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg text-foreground/90 leading-relaxed" data-testid="text-about-description">
            More than just a bakery, Jason Bakery is a Cape Town institution. We're obsessed with dough and dedicated to crafting the finest croissants, pastries, and breads.
          </p>
          <p className="text-base text-foreground/70 leading-relaxed">
            Everything is made fresh, in-house, every day and prepared to order. Our meats and eggs are always free-range and we value locally sourced, high-quality ingredients. We avoid preservatives, unnatural additives, flavour enhancers, and microwaves.
          </p>
          <p className="text-sm text-foreground/70 italic mt-8">
            "Thank you for supporting local"
          </p>
        </div>
      </div>
    </section>
  );
}
