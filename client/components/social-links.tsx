import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocialLinks() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/NiyaliTravel",
      color: "hover:bg-blue-600"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/NiyaliTravel",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
    },
    {
      name: "WhatsApp",
      icon: Phone,
      url: "https://wa.me/9609107338",
      color: "hover:bg-green-600"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:sales@niyalitravel.com",
      color: "hover:bg-red-600"
    }
  ];

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          className={`rounded-full transition-all ${link.color} hover:text-white`}
          onClick={() => window.open(link.url, "_blank")}
          aria-label={link.name}
          data-testid={`button-social-${link.name.toLowerCase()}`}
        >
          <link.icon className="w-5 h-5" />
        </Button>
      ))}
    </div>
  );
}