import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import SocialLinks from "./social-links";
import NiyaliLogo from "@assets/Niyali Main Logo_1755576205013.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/guest-houses", label: "Guest Houses" },
    { href: "/ferry-schedule", label: "Ferry Schedule" },
    { href: "/domestic-airlines", label: "Domestic Airlines" },
    { href: "/blog", label: "Travel Blog" },
  ];

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/booking-policy", label: "Booking Policy" },
    { href: "/cancellation", label: "Cancellation" },
    { href: "/agent-portal", label: "Agent Support" },
    { href: "/contact", label: "Contact Us" },
    { href: "/admin-login", label: "Admin" },
  ];



  return (
    <footer className="bg-niyali-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={NiyaliLogo} 
                alt="Niyali Logo" 
                className="w-8 h-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold">NIYALI</span>
                <span className="text-xs opacity-75 -mt-1">Transcend the travel</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-sm">
              Experience authentic Maldivian hospitality with our curated network of luxury guest houses and cultural experiences.
            </p>
            <SocialLinks />
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white transition-colors"
                    data-testid={`footer-support-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span>Male, Maldives</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:info@niyalitravel.com" className="hover:text-white transition-colors">
                  info@niyalitravel.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <a href="tel:+9601234567" className="hover:text-white transition-colors">
                  +960 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Niyali Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
