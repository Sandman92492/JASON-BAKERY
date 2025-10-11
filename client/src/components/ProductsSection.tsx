import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breadProducts = [
  {
    id: 1,
    name: "Bree Street Sourdough",
    description: "Our signature sourdough with a crispy crust and perfect crumb",
    price: "68",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&h=300&q=80",
    category: "breads"
  },
  {
    id: 2,
    name: "66% Sourdough Rye",
    description: "Rich, hearty rye sourdough with complex flavors",
    price: "72",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&h=300&q=80",
    category: "breads"
  },
  {
    id: 3,
    name: "Multigrain Seed Loaf",
    description: "Wholesome loaf packed with nutritious seeds and grains",
    price: "75",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&h=300&q=80",
    category: "breads"
  },
  {
    id: 4,
    name: "Challah",
    description: "Traditional braided bread, soft and slightly sweet",
    price: "88",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&h=300&q=80",
    category: "breads"
  },
  {
    id: 5,
    name: "Brioche Style Loaf",
    description: "Rich, buttery brioche loaf for the ultimate toast",
    price: "125",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&h=300&q=80",
    category: "breads"
  },
  {
    id: 6,
    name: "Ciabatta",
    description: "Classic Italian bread with a light, airy texture",
    price: "40",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&h=300&q=80",
    category: "breads"
  },
];

const pastryProducts = [
  {
    id: 7,
    name: "Classic Croissant",
    description: "Buttery, flaky layers of perfection",
    price: "38",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=300&q=80",
    category: "pastries",
    badge: "Popular"
  },
  {
    id: 8,
    name: "Pain au Chocolat",
    description: "Croissant dough filled with premium Belgian chocolate",
    price: "52",
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=400&h=300&q=80",
    category: "pastries",
    badge: "Popular"
  },
  {
    id: 9,
    name: "Almond Deluxe Croissant",
    description: "Classic croissant filled with almond cream and topped with almonds",
    price: "68",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=300&q=80",
    category: "pastries"
  },
  {
    id: 10,
    name: "Blueberry Cinnabun Danish",
    description: "Sweet Danish pastry with blueberries and cinnamon swirl",
    price: "55",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&h=300&q=80",
    category: "pastries"
  },
  {
    id: 11,
    name: "Grandma Babs' White Choc Chip Brownie",
    description: "Rich, fudgy brownie with white chocolate chips",
    price: "58",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=400&h=300&q=80",
    category: "pastries"
  },
  {
    id: 12,
    name: "Pasteis de Nata",
    description: "Portuguese custard tart with caramelized top",
    price: "32",
    image: "https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=400&h=300&q=80",
    category: "pastries"
  },
];

const provisionsProducts = [
  {
    id: 13,
    name: "Jason Bakery Granola",
    description: "House-made granola with honey, coconut, seeds and dried cranberries",
    price: "135",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&h=300&q=80",
    category: "provisions"
  },
  {
    id: 14,
    name: "Jason Bakery Hot Chocolate",
    description: "Premium hot chocolate mix made with 70% dark Belgian chocolate",
    price: "250",
    image: "https://images.unsplash.com/photo-1542990253-a781e04c0082?auto=format&fit=crop&w=400&h=300&q=80",
    category: "provisions"
  },
  {
    id: 15,
    name: "Dulce de Leche Rusks",
    description: "Traditional twice-baked rusks with dulce de leche flavor",
    price: "130",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&h=300&q=80",
    category: "provisions"
  },
  {
    id: 16,
    name: "Croissant Biscuits",
    description: "Crispy biscuits made from our famous croissant dough",
    price: "45",
    image: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=400&h=300&q=80",
    category: "provisions"
  },
  {
    id: 17,
    name: "Neapolitan Cheese Pizza Base (FROZEN)",
    description: "Authentic pizza base topped with premium cheese, ready to bake",
    price: "135",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&h=300&q=80",
    category: "provisions"
  },
  {
    id: 18,
    name: "Neapolitan Pizza Base (FROZEN)",
    description: "Authentic Italian-style pizza base, frozen and ready to top",
    price: "50",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&h=300&q=80",
    category: "provisions"
  },
];

const savouryProducts = [
  {
    id: 19,
    name: "Bacon Croissant",
    description: "Flaky croissant filled with crispy bacon",
    price: "45",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=300&q=80",
    category: "savoury"
  },
  {
    id: 20,
    name: "Chorizo Eggie",
    description: "Savory pastry with chorizo and egg filling",
    price: "38",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=400&h=300&q=80",
    category: "savoury"
  },
  {
    id: 21,
    name: "Sundried Tomato Eggie",
    description: "Flaky pastry with sundried tomato and egg",
    price: "38",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=300&q=80",
    category: "savoury"
  },
  {
    id: 22,
    name: "Piggie in a Blanket",
    description: "Classic sausage wrapped in buttery pastry",
    price: "78",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=400&h=300&q=80",
    category: "savoury"
  },
  {
    id: 23,
    name: "Brioche Style Burger Buns",
    description: "Soft, buttery brioche buns perfect for burgers",
    price: "14",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&h=300&q=80",
    category: "savoury"
  },
  {
    id: 24,
    name: "Bagels",
    description: "Fresh bagels - Plain, Sesame, or Mixed Seed",
    price: "20",
    image: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=400&h=300&q=80",
    category: "savoury"
  },
];

export default function ProductsSection() {
  const renderProductCard = (product: any) => (
    <Card 
      key={product.id} 
      className="rounded-sm border border-gray-800 hover:border-white transition-all duration-300 bg-white overflow-hidden group"
    >
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <Badge 
            className="absolute top-3 right-3 bg-black text-white border-0"
          >
            {product.badge}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-base sm:text-lg font-semibold leading-tight">
            {product.name}
          </CardTitle>
          <span className="text-base font-bold whitespace-nowrap">
            R{product.price}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-black text-white hover:bg-gray-900 transition-colors rounded-sm"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            SHOP
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pre-order fresh baked goods and provisions for collection
          </p>
          <div className="mt-6 inline-block">
            <Badge variant="outline" className="text-xs text-gray-500 border-gray-700 bg-transparent">
              Demo Section - Can integrate with Shopify API
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="breads" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-0 mb-8 bg-transparent">
            <TabsTrigger 
              value="breads"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-gray-700 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-white hover:border-gray-500 transition-all text-white"
            >
              Breads
            </TabsTrigger>
            <TabsTrigger 
              value="pastries"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-gray-700 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-white hover:border-gray-500 transition-all text-white"
            >
              Pastries
            </TabsTrigger>
            <TabsTrigger 
              value="savoury"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-gray-700 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-white hover:border-gray-500 transition-all text-white"
            >
              Savoury
            </TabsTrigger>
            <TabsTrigger 
              value="provisions"
              className="min-h-[48px] px-4 py-3 text-sm sm:text-base font-medium border border-gray-700 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-white hover:border-gray-500 transition-all text-white"
            >
              Provisions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breads">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breadProducts.map(renderProductCard)}
            </div>
          </TabsContent>

          <TabsContent value="pastries">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastryProducts.map(renderProductCard)}
            </div>
          </TabsContent>

          <TabsContent value="savoury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savouryProducts.map(renderProductCard)}
            </div>
          </TabsContent>

          <TabsContent value="provisions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {provisionsProducts.map(renderProductCard)}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black transition-all rounded-sm px-8"
            onClick={() => {
              const element = document.getElementById("products");
              if (element) {
                const headerOffset = 64;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
          >
            View Full Store
          </Button>
        </div>
      </div>
    </section>
  );
}
