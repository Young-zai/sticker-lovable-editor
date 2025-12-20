import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
  			sans: [
  				'Montserrat',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			handwriting: [
  				'Caveat',
  				'cursive'
  			],
  			serif: [
  				'Cormorant Garamond',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'IBM Plex Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
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
  			coral: 'hsl(var(--coral))',
  			peach: 'hsl(var(--peach))',
  			mint: 'hsl(var(--mint))',
  			teal: 'hsl(var(--teal))',
  			lavender: 'hsl(var(--lavender))',
  			'warm-orange': 'hsl(var(--warm-orange))',
  			'soft-yellow': 'hsl(var(--soft-yellow))'
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
  			'fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			scroll: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-50%)'
  				}
  			},
  			'robot-arm': {
  				'0%, 100%': {
  					transform: 'translateY(0) rotate(0deg)'
  				},
  				'25%': {
  					transform: 'translateY(8px) rotate(-2deg)'
  				},
  				'50%': {
  					transform: 'translateY(12px) rotate(0deg)'
  				},
  				'75%': {
  					transform: 'translateY(8px) rotate(2deg)'
  				}
  			},
  			'gripper-grab': {
  				'0%, 100%': {
  					transform: 'rotate(0deg) scaleY(1)'
  				},
  				'50%': {
  					transform: 'rotate(0deg) scaleY(0.85)'
  				}
  			},
  			'gripper-left': {
  				'0%, 30%': {
  					transform: 'rotate(-15deg)'
  				},
  				'50%, 70%': {
  					transform: 'rotate(-5deg)'
  				},
  				'100%': {
  					transform: 'rotate(-15deg)'
  				}
  			},
  			'gripper-right': {
  				'0%, 30%': {
  					transform: 'rotate(15deg)'
  				},
  				'50%, 70%': {
  					transform: 'rotate(5deg)'
  				},
  				'100%': {
  					transform: 'rotate(15deg)'
  				}
  			},
  			'joint-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 0 0 hsl(var(--teal) / 0.7)'
  				},
  				'50%': {
  					boxShadow: '0 0 12px 4px hsl(var(--teal) / 0.4)'
  				}
  			},
  			'conveyor-move': {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-20px)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '200% 0'
  				},
  				'100%': {
  					backgroundPosition: '-200% 0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out forwards',
  			float: 'float 3s ease-in-out infinite',
  			scroll: 'scroll 20s linear infinite',
  			'robot-arm': 'robot-arm 2.5s ease-in-out infinite',
  			'gripper-grab': 'gripper-grab 2.5s ease-in-out infinite',
  			'gripper-left': 'gripper-left 2.5s ease-in-out infinite',
  			'gripper-right': 'gripper-right 2.5s ease-in-out infinite',
  			'joint-pulse': 'joint-pulse 2s ease-in-out infinite',
  			'conveyor-move': 'conveyor-move 0.5s linear infinite',
  			shimmer: 'shimmer 3s linear infinite'
  		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
