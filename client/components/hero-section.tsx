import HeroSearch from "./hero-search";


export default function HeroSection() {
  return (
    <section className="relative min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-bg"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 w-full max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Authentic <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Maldives</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto">
          Experience local culture, pristine beaches, and warm hospitality across 26 beautiful atolls
        </p>
        
        {/* Advanced Search Bar */}
        <div className="w-full px-4">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
