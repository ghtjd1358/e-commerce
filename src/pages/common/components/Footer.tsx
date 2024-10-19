import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-gray-700 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
        <div>
          <h3 className="text-gold font-semibold mb-4">About LUXE</h3>
          <p className="text-sm">
            Redefining luxury for the modern connoisseur. LUXE brings you a
            curated selection of the world's finest products.
          </p>
        </div>
        <div>
          <h3 className="text-gold font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gold transition-colors">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold transition-colors">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gold font-semibold mb-4">Stay Connected</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for exclusive offers and insights.
          </p>
          <div className="flex">
            <Input
              type="email"
              placeholder="Your email"
              className="bg-gray-700 text-white rounded-r-none focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Email for newsletter"
            />
            <Button className="bg-gold hover:bg-gold/90 text-gray-900 rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>&copy; 2024 LUXE. All rights reserved.</p>
      </div>
    </footer>
  );
};
