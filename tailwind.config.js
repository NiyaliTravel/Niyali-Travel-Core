import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Niyali Travel Custom Colors
        'niyali-cream': 'var(--niyali-cream)',
        'niyali-teal': 'var(--niyali-teal)',
        'niyali-turquoise': 'var(--niyali-turquoise)',
        'niyali-sky-blue': 'var(--niyali-sky-blue)',
        'niyali-white': 'var(--niyali-white)',
        // Legacy mappings
        'niyali-gold': 'var(--niyali-gold)',
        'niyali-gold-dark': 'var(--niyali-gold-dark)',
        'niyali-navy': 'var(--niyali-navy)',
        'niyali-navy-dark': 'var(--niyali-navy-dark)',
        'coral': 'var(--coral)',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        'niyali-gradient': 'var(--niyali-gradient)',
        'niyali-subtle': 'var(--niyali-subtle)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        typing: {
          '0%, 60%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.5' 
          },
          '30%': { 
            transform: 'scale(1.2)', 
            opacity: '1' 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "typing": "typing 1.4s infinite ease-in-out",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.glass-morphism': {
          'backdrop-filter': 'blur(16px) saturate(180%)',
          'background-color': 'rgba(255, 255, 255, 0.75)',
          'border': '1px solid rgba(255, 255, 255, 0.125)',
        },
        '.gradient-text': {
          'background': 'var(--niyali-gradient)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.hover-lift': {
          'transition': 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        '.hover-lift:hover': {
          'transform': 'translateY(-8px)',
          'box-shadow': '0 25px 50px rgba(30, 58, 138, 0.15)',
        },
        '.parallax-bg': {
          'background-attachment': 'fixed',
          'background-size': 'cover',
          'background-position': 'center',
        },
        '@media (max-width: 768px)': {
          '.parallax-bg': {
            'background-attachment': 'scroll',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
