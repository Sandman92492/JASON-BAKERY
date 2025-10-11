import { useState } from "react";
import { ImageIcon } from "lucide-react";

const galleryImages = [
  { id: 1, src: "/gallery/gal1.jpg", alt: "Jason Bakery showcase 1" },
  { id: 2, src: "/gallery/gal2.jpg", alt: "Jason Bakery showcase 2" },
  { id: 3, src: "/gallery/gal3.jpg", alt: "Jason Bakery showcase 3" },
  { id: 4, src: "/gallery/gal4.jpg", alt: "Jason Bakery showcase 4" },
  { id: 5, src: "/gallery/gal5.jpg", alt: "Jason Bakery showcase 5" },
  { id: 6, src: "/gallery/gal6.jpg", alt: "Jason Bakery showcase 6" },
];

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden bg-black/5 group">
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/5 to-black/10">
          <ImageIcon className="w-16 h-16 text-black/20" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-foreground tracking-tight">
          GALLERY
        </h2>
        <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
          A glimpse into our craft
        </p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {galleryImages.map((image) => (
            <GalleryImage key={image.id} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
