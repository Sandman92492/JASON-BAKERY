import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 text-card-foreground tracking-tight" data-testid="text-contact-headline">
          FIND US
        </h2>
        <p className="text-center text-muted-foreground mb-12">Green Point, Cape Town</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4 pb-6 border-b border-card-border">
              <MapPin className="w-5 h-5 text-card-foreground flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground tracking-wide">OUR STORE</h3>
                <p className="text-muted-foreground" data-testid="text-address">
                  83 Main Road, Green Point<br />
                  Cape Town, 8005
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-card-border">
              <Clock className="w-5 h-5 text-card-foreground flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground tracking-wide">HOURS</h3>
                <div className="text-muted-foreground space-y-1" data-testid="text-hours">
                  <p>Monday to Saturday: 7am to 3pm</p>
                  <p>Sunday: 8am to 2pm</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-card-border">
              <Phone className="w-5 h-5 text-card-foreground flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground tracking-wide">PHONE</h3>
                <a href="tel:0214330538" className="text-muted-foreground hover:text-card-foreground transition-colors" data-testid="link-phone">
                  021 433 0538
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-card-foreground flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground tracking-wide">GENERAL ENQUIRIES</h3>
                <a href="mailto:orders@jasonbakery.com" className="text-muted-foreground hover:text-card-foreground transition-colors" data-testid="link-email">
                  orders@jasonbakery.com
                </a>
              </div>
            </div>
          </div>

          <div className="h-[500px] rounded-md overflow-hidden border border-card-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.5844446287776!2d18.40598931521!3d-33.90461408064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676c3f1c3c3d%3A0x7c9e7c0c0c0c0c0c!2s83%20Main%20Rd%2C%20Green%20Point%2C%20Cape%20Town%2C%208005%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jason Bakery Location"
              data-testid="map-location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
