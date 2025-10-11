import { useState } from "react";
import { ChevronDown, Clock, AlertCircle, Calendar } from "lucide-react";

export default function ImportantNotice() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full border-y-2 border-black/20 bg-black/[0.04] shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-5 flex items-center justify-between group transition-all duration-300 hover:opacity-80"
          aria-expanded={isExpanded}
          aria-label="Toggle important information"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-black/80" strokeWidth={2} />
            <span className="text-base sm:text-lg font-semibold tracking-wide text-black uppercase">
              Important Information
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-black/70 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            strokeWidth={2}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[800px] opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-black/60" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/80">
                  Collection Info
                </h3>
              </div>
              <div className="pl-6 border-l border-border">
                <p className="text-sm leading-relaxed text-black/70">
                  Green Point collections available <strong>Monday to Sunday</strong> between{" "}
                  <strong>9am and 2pm</strong>.
                </p>
                <p className="text-sm leading-relaxed text-black/70 mt-2">
                  Weekend orders close on <strong>Fridays at 2pm</strong>. Some items are only
                  available on certain days or require prep time.
                </p>
                <p className="text-sm leading-relaxed text-black/70 mt-2">
                  Please honour your selected collection date & times as we plan our production
                  accordingly.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-black/60" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/80">
                  Pricing Notice
                </h3>
              </div>
              <div className="pl-6 border-l border-border">
                <p className="text-sm leading-relaxed text-black/70">
                  Products and prices are subject to change without prior notice.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-black/60" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/80">
                  Pre-order Policy
                </h3>
              </div>
              <div className="pl-6 border-l border-border">
                <p className="text-sm leading-relaxed text-black/70">
                  We require <strong>24 hours notice</strong> and <strong>full payment</strong> to
                  confirm all pre-orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
