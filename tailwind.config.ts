
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0d3c61',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#25d366',
					foreground: '#ffffff',
				},
				highlight: {
					DEFAULT: '#ffc107',
					foreground: '#333333',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'roboto': ['Roboto', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'count-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'circuit-flow': {
					'0%': { 'stroke-dashoffset': '1000' },
					'100%': { 'stroke-dashoffset': '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'count-up': 'count-up 0.8s ease-out forwards',
				'fade-in': 'fade-in 0.8s ease-out forwards',
				'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
				'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
				'circuit-flow': 'circuit-flow 10s linear infinite'
			},
			boxShadow: {
				'neomorphic': '5px 5px 15px #d1d1d1, -5px -5px 15px #ffffff',
				'neomorphic-dark': '5px 5px 15px rgba(0,0,0,0.1), -5px -5px 15px rgba(255,255,255,0.1)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
			},
			backgroundImage: {
				'circuit-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,10 L30,10 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70' fill='none' stroke='%230d3c6122' stroke-width='1'/%3E%3Cpath d='M90,30 L70,30 L70,10 L50,10 L50,30 L30,30 L30,50 L10,50' fill='none' stroke='%230d3c6122' stroke-width='1'/%3E%3C/svg%3E\")",
				'gradient-primary': 'linear-gradient(135deg, #0d3c61 0%, #1a5c93 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
