# Jason Bakery PWA - Design Guidelines

## Design Approach
**Minimalist Black & White Aesthetic**: Inspired by Jason Bakery's actual website - clean, sophisticated, high-contrast design that puts the focus on the bakery's quality and craftsmanship.

## Core Design Elements

### A. Color Palette
**Monochromatic Theme:**
- Background: `#000000` (Pure black for main backgrounds)
- Foreground: `#FFFFFF` (Pure white for text on black)
- Card Background: `#FFFFFF` (White cards on black background)
- Card Text: `#000000` (Black text on white cards)
- Accent: `#1A1A1A` (Very dark grey for subtle variation)
- Borders: `#333333` (Dark grey for subtle separation)

**Text Hierarchy:**
- Primary Text: High contrast (white on black, or black on white)
- Secondary Text: `#666666` for subtle, less important information
- All text should be highly readable with maximum contrast

### B. Typography
**Fonts:**
- Headings (h1, h2, h3): `Poppins` - Bold, clean, professional
- Body Text: `Inter` - Modern, highly readable
- Letter spacing: Slightly increased for elegant, spacious feel

**Implementation:**
- Import both fonts from Google Fonts in HTML `<head>`
- Use font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- Maintain generous line-height for readability

### C. Layout System
**Spacing & Structure:**
- Border Radius: `6px` - minimal, clean corners
- Container: `.container` class for consistent content width
- Generous white space between sections
- Clean, uncluttered layouts

### D. Component Styling

**Navigation:**
- Black background header
- White text logo (JASON BAKERY)
- Clean navigation links
- Responsive hamburger menu for mobile

**Buttons:**
- Primary: White text on black background with subtle border
- Ghost: Transparent with white text and white border
- Minimal hover states with subtle transitions

**Cards:**
- White background cards on black sections
- Black background cards on white sections (for contrast variation)
- Minimal borders, clean typography
- Subtle shadows for depth

**Icons:**
- Simple line icons
- Consistent stroke width
- High contrast (white or black depending on background)

### E. Section Structure

**1. Hero Section:**
- Black background with centered content
- Bold, large headline in white
- Minimal imagery or clean black/white photography
- Simple CTA button

**2. Menu Section:**
- Organized by categories (All Day Breakfast, Lunch, Sandwiches, Pastries, Breads, Drinks)
- Clean grid layout with actual menu items
- Include prices in a secondary, smaller font
- Category headers in bold

**3. About Section:**
- Two-column layout alternating black/white backgrounds
- High-quality black & white photography
- Concise, impactful copy

**4. Contact Section:**
- Clean information cards with icons
- Embedded map
- Black or white background with high contrast text

**5. Footer:**
- Black background
- White text and icons
- Social media links
- Minimal, clean design

## Images

**Photography Style:**
- High-contrast black and white photography preferred
- If color photos used, apply subtle desaturation
- Professional, high-quality food photography
- Clean compositions

## Technical Requirements
- Single-page PWA structure
- Service worker with offline capability
- Mobile-first responsive design
- Smooth scroll navigation
- Fast loading times
- Semantic HTML5
- Accessible (WCAG AA minimum)
