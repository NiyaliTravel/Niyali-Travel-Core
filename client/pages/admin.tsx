import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-niyali-navy">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/content">
            <a className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h2 className="text-xl font-bold text-niyali-navy mb-2">Manage Content</h2>
              <p className="text-gray-600">Update website content, including images and text.</p>
            </a>
          </Link>
          <Link href="/admin/availability">
            <a className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h2 className="text-xl font-bold text-niyali-navy mb-2">Manage Availability</h2>
              <p className="text-gray-600">Update room and package availability.</p>
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}