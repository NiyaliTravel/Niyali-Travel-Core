import { Button } from "@/components/ui/button";
import { DollarSign, Settings, Users } from "lucide-react";

export default function AgentPortalCTA() {
  const handleBecomeAgent = () => {
    // Navigate to agent registration
    window.location.href = "/agent-portal";
  };

  const handleAgentLogin = () => {
    // Navigate to agent login
    window.location.href = "/agent-portal";
  };

  return (
    <section id="agent-portal" className="py-20 bg-niyali-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Agent Network</h2>
        <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
          Become a certified Niyali Travel Agent and earn commission while helping travelers discover authentic Maldivian experiences. Access our AI-powered booking tools and VR preview system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Competitive Commission</h3>
            <p className="opacity-90">Earn up to 25% commission on every booking with tier-based bonuses</p>
          </div>
          
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Tools</h3>
            <p className="opacity-90">Access cutting-edge booking engine with VR previews and automated communication</p>
          </div>
          
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Network</h3>
            <p className="opacity-90">Connect with travelers worldwide and build your international client base</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            size="lg"
            className="bg-white text-niyali-navy hover:bg-gray-100 transition-colors"
            onClick={handleBecomeAgent}
            data-testid="button-become-agent"
          >
            Become an Agent
          </Button>
          <Button 
            size="lg"
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-niyali-navy transition-all"
            onClick={handleAgentLogin}
            data-testid="button-agent-login"
          >
            Agent Login
          </Button>
        </div>
      </div>
    </section>
  );
}
