import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breakfastItems = [
  { id: 1, name: "Scrambled/Poached/Fried Eggs", description: "Served with oven-roasted rosa tomatoes and rocket", price: "80" },
  { id: 2, name: "Avo Smash (seasonal)", description: "Smashed avo topped with basil pesto, feta and micro-greens", price: "110" },
  { id: 3, name: "House Granola", description: "Rolled oats with honey, coconut, seeds, dried cranberries and yoghurt", price: "115" },
  { id: 4, name: "The Bomb", description: "Classic croissant filled with streaky bacon, emmental cheese and poached egg", price: "95" },
  { id: 5, name: "Dirty Eggs", description: "Scrambled eggs, cheddar, caramelised onions, chives and sriracha mayo", price: "100" },
  { id: 6, name: "Amasi Flapjack Stacks", description: "Three amasi flapjacks - Classic, Full, or Berry stack options", price: "120-205" },
];

const lunchItems = [
  { id: 1, name: "Smash Burger", description: "2x100g beef patties, pickles, cheddar, red onions, ketchup, mustard. With fries", price: "200" },
  { id: 2, name: "Classic Dawg", description: "Frankfurter, caramelized onions, ketchup and dijonaise on house-made bun", price: "80" },
  { id: 3, name: "Kick-Ass Pie (weekdays)", description: "Traditional pie pastry with daily changing filling", price: "90" },
];

const sandwichItems = [
  { id: 1, name: "Smashed Chickpea Sandwich", description: "Chickpeas with lime, coriander, avo, tomato, rocket, feta, pickled carrots", price: "130" },
  { id: 2, name: "The Bardough Chicken Mayo", description: "Roasted chicken with jalapeño mayo, rocket, tomato, coriander chutney", price: "165" },
  { id: 3, name: "[Thinking Outside The Lox] Bagel", description: "Smoked salmon trout, capers, cream cheese, red onion", price: "165" },
  { id: 4, name: "Bacon Chilli Popper Toastie", description: "Thick-cut bacon, cream cheese, emmental, smoked jalapeños", price: "180" },
  { id: 5, name: "Cheese & Tomato Toastie", description: "Tabasco roasted rosa tomatoes and fior di latte", price: "135" },
];

const pastriesItems = [
  { id: 1, name: "Classic Croissant", price: "38" },
  { id: 2, name: "Pain au Chocolat", price: "52" },
  { id: 3, name: "Almond Deluxe Croissant", price: "68" },
  { id: 4, name: "Blueberry Danish", price: "55" },
  { id: 5, name: "Grandma Babs' White Choc Chip Brownie", price: "58" },
  { id: 6, name: "Carrot Cake Cheesecake", price: "98" },
  { id: 7, name: "Pasteis de Nata", price: "32" },
  { id: 8, name: "Cookie of the Day", price: "45" },
  { id: 9, name: "Doughnut of the Day", price: "38" },
];

const breadsItems = [
  { id: 1, name: "Bree Street Sourdough", price: "68" },
  { id: 2, name: "66% Sourdough Rye", price: "72" },
  { id: 3, name: "Multi-Grain Seed Loaf", price: "75" },
  { id: 4, name: "Bagel - Plain/Sesame/Mixed Seed", price: "20" },
  { id: 5, name: "Pack of Bagels", price: "50" },
  { id: 6, name: "Ciabatta 400g", price: "40" },
];

const drinksItems = [
  { id: 1, name: "House-Made Hot Chocolate", description: "70% dark Belgian chocolate with brûléed marshmallow", price: "78" },
  { id: 2, name: "Matcha Latte", price: "58" },
  { id: 3, name: "Spicy Masala Chai Latte", price: "68" },
  { id: 4, name: "Iced Coffee Slush", description: "Double shot espresso, ice and secret syrup blended", price: "78" },
  { id: 5, name: "Morning Glory Milkshake", description: "Double shot espresso, peanut butter and vanilla ice cream", price: "100" },
  { id: 6, name: "Freshly Squeezed Orange Juice", price: "58" },
];

export default function MenuSection() {
  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 text-card-foreground tracking-tight" data-testid="text-menu-headline">
          OUR MENU
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Everything made fresh, in-house, every day
        </p>
        
        <Tabs defaultValue="breakfast" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-0 mb-8 bg-transparent">
            <TabsTrigger 
              value="breakfast" 
              data-testid="tab-breakfast"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-border data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black hover:border-black/50 transition-all"
            >
              Breakfast
            </TabsTrigger>
            <TabsTrigger 
              value="lunch" 
              data-testid="tab-lunch"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-border data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black hover:border-black/50 transition-all"
            >
              Lunch
            </TabsTrigger>
            <TabsTrigger 
              value="sandwiches" 
              data-testid="tab-sandwiches"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-border data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black hover:border-black/50 transition-all"
            >
              Sandwiches
            </TabsTrigger>
            <TabsTrigger 
              value="pastries" 
              data-testid="tab-pastries"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-border data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black hover:border-black/50 transition-all"
            >
              Pastries
            </TabsTrigger>
            <TabsTrigger 
              value="breads" 
              data-testid="tab-breads"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-border data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black hover:border-black/50 transition-all"
            >
              Breads
            </TabsTrigger>
            <TabsTrigger 
              value="drinks" 
              data-testid="tab-drinks"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-border data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black hover:border-black/50 transition-all"
            >
              Drinks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breakfast">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breakfastItems.map((item) => (
                <Card key={item.id} className="rounded-sm border border-border hover:border-black transition-all duration-200 bg-white" data-testid={`card-menu-item-${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{item.name}</CardTitle>
                      <span className="text-base font-bold whitespace-nowrap">R{item.price}</span>
                    </div>
                  </CardHeader>
                  {item.description && (
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lunch">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lunchItems.map((item) => (
                <Card key={item.id} className="rounded-sm border border-border hover:border-black transition-all duration-200 bg-white" data-testid={`card-lunch-item-${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{item.name}</CardTitle>
                      <span className="text-base font-bold whitespace-nowrap">R{item.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sandwiches">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sandwichItems.map((item) => (
                <Card key={item.id} className="rounded-sm border border-border hover:border-black transition-all duration-200 bg-white" data-testid={`card-sandwich-item-${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{item.name}</CardTitle>
                      <span className="text-base font-bold whitespace-nowrap">R{item.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pastries">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastriesItems.map((item) => (
                <Card key={item.id} className="rounded-sm border border-border hover:border-black transition-all duration-200 bg-white" data-testid={`card-pastry-item-${item.id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{item.name}</CardTitle>
                      <span className="text-base font-bold whitespace-nowrap">R{item.price}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="breads">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breadsItems.map((item) => (
                <Card key={item.id} className="rounded-sm border border-border hover:border-black transition-all duration-200 bg-white" data-testid={`card-bread-item-${item.id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{item.name}</CardTitle>
                      <span className="text-base font-bold whitespace-nowrap">R{item.price}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drinks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drinksItems.map((item) => (
                <Card key={item.id} className="rounded-sm border border-border hover:border-black transition-all duration-200 bg-white" data-testid={`card-drink-item-${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{item.name}</CardTitle>
                      <span className="text-base font-bold whitespace-nowrap">R{item.price}</span>
                    </div>
                  </CardHeader>
                  {item.description && (
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
