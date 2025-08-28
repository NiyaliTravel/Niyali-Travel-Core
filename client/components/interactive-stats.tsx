import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Route, Star, Users } from "lucide-react";

export default function InteractiveStats() {
  const [ref, inView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  const [counters, setCounters] = useState({
    guestHouses: 0,
    flightRoutes: 0,
    rating: 0.0,
    travelers: 0
  });

  const targetValues = {
    guestHouses: 250,
    flightRoutes: 45,
    rating: 4.9,
    travelers: 15000
  };

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const interval = 50;
      const steps = duration / interval;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          guestHouses: Math.floor(targetValues.guestHouses * progress),
          flightRoutes: Math.floor(targetValues.flightRoutes * progress),
          rating: Number((targetValues.rating * progress).toFixed(1)),
          travelers: Math.floor(targetValues.travelers * progress)
        });

        if (currentStep >= steps) {
          setCounters(targetValues);
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  const stats = [
    {
      icon: Building2,
      value: counters.guestHouses,
      label: "Guest Houses",
      suffix: "+",
      color: "text-blue-600"
    },
    {
      icon: Route,
      value: counters.flightRoutes,
      label: "Flight Routes",
      suffix: "+",
      color: "text-green-600"
    },
    {
      icon: Star,
      value: counters.rating,
      label: "Average Rating",
      suffix: "/5",
      color: "text-yellow-600"
    },
    {
      icon: Users,
      value: counters.travelers.toLocaleString(),
      label: "Happy Travelers",
      suffix: "+",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-niyali-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience authentic Maldivian hospitality with our carefully curated network of local guest houses and seamless travel connections
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-niyali-navy">
                    {typeof stat.value === 'number' && stat.value % 1 !== 0 
                      ? stat.value.toFixed(1) 
                      : stat.value}
                    <span className="text-lg text-gray-500">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium">Live statistics updated in real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}