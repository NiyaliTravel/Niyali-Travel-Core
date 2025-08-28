import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import NotFound from "@/pages/not-found";
// import Destinations from "@/pages/destinations";
// import GuestHouses from "@/pages/guest-houses";
// import FerrySchedule from "@/pages/ferry-schedule";
// import DomesticAirlines from "@/pages/domestic-airlines";
// import AgentPortal from "@/pages/agent-portal";
// import AgentLogin from "@/pages/agent-login";
// import TravelerPortal from "@/pages/traveler-portal";
// import AdminDashboard from "@/pages/admin-dashboard";
// import AdminLogin from "@/pages/admin-login";
// import AdminAvailability from "@/pages/admin-availability";
// import BookingEngine from "@/pages/booking-engine";
// import IslandExplorer from "@/pages/island-explorer";
// import Islands from "@/pages/islands";
// import Packages from "@/pages/packages";
// import Booking from "@/pages/booking";
// import AdminContent from "@/pages/admin-content";
// import Admin from "@/pages/admin";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const isAuthenticated = !!localStorage.getItem("admin-token");
//   return isAuthenticated ? children : <Navigate to="/admin-login" />;
// };

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/destinations" element={<Destinations />} />
            <Route path="/experiences" element={<Packages />} />
            <Route path="/guest-houses" element={<GuestHouses />} />
            <Route path="/islands" element={<Islands />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/ferry-schedule" element={<FerrySchedule />} />
            <Route path="/domestic-airlines" element={<DomesticAirlines />} />
            <Route path="/agent-portal" element={<AgentPortal />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/traveler-portal" element={<TravelerPortal />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/availability" element={<PrivateRoute><AdminAvailability /></PrivateRoute>} />
            <Route path="/admin/content" element={<PrivateRoute><AdminContent /></PrivateRoute>} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/island-explorer" element={<IslandExplorer />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
  );
}

export default App;
