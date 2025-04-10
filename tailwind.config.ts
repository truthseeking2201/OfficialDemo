
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
			fontFamily: {
				sans: ['Space Grotesk', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
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
				},
				// NODO AI Custom Colors - Updated for golden-orange theme
				"nodo-dark": "#1A1718",
				"nodo-darker": "#12100F",
				nova: {
					DEFAULT: "#F97316", // Orange
					light: "#FDBA74", // Light Orange
					dark: "#C2410C", // Dark Orange
				},
				orion: {
					DEFAULT: "#F59E0B", // Amber
					light: "#FCD34D", // Light Amber
					dark: "#B45309", // Dark Amber
				},
				aero: {
					DEFAULT: "#D97706", // Yellow
					light: "#FBBF24", // Light Yellow
					dark: "#92400E", // Dark Yellow
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', filter: 'brightness(1)' },
					'50%': { opacity: '0.8', filter: 'brightness(1.2)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'neon-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(155, 135, 245, 0.8), 0 0 10px rgba(155, 135, 245, 0.5)' },
					'50%': { boxShadow: '0 0 10px rgba(155, 135, 245, 1), 0 0 20px rgba(155, 135, 245, 0.8)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'scale-up': 'scale-up 0.3s ease-out forwards',
				'shimmer': 'shimmer 3s infinite linear',
				'neon-pulse': 'neon-pulse 2s infinite'
			},
			backgroundImage: {
				'neo-grid': 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			backgroundSize: {
				'neo-grid': '30px 30px',
			},
			boxShadow: {
				'neon-glow': '0 0 5px rgba(249, 115, 22, 0.8), 0 0 10px rgba(249, 115, 22, 0.5)',
				'neon-nova': '0 0 5px rgba(249, 115, 22, 0.8), 0 0 10px rgba(249, 115, 22, 0.5)',
				'neon-orion': '0 0 5px rgba(245, 158, 11, 0.8), 0 0 10px rgba(245, 158, 11, 0.5)',
				'neon-aero': '0 0 5px rgba(217, 119, 6, 0.8), 0 0 10px rgba(217, 119, 6, 0.5)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
