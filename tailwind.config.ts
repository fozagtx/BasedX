import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		animation: {
  			'fade-out': '1s fadeOut 3s ease-out forwards'
  		},
  		keyframes: {
  			fadeOut: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			}
  		}
  	},
  	keyframes: {
  		typing: {
  			'0%, 100%': {
  				transform: 'translateY(0)',
  				opacity: '0.5'
  			},
  			'50%': {
  				transform: 'translateY(-2px)',
  				opacity: '1'
  			}
  		},
  		'loading-dots': {
  			'0%, 100%': {
  				opacity: '0'
  			},
  			'50%': {
  				opacity: '1'
  			}
  		},
  		wave: {
  			'0%, 100%': {
  				transform: 'scaleY(1)'
  			},
  			'50%': {
  				transform: 'scaleY(0.6)'
  			}
  		},
  		blink: {
  			'0%, 100%': {
  				opacity: '1'
  			},
  			'50%': {
  				opacity: '0'
  			}
  		}
  	},
  	'text-blink': {
  		'0%, 100%': {
  			color: 'var(--primary)'
  		},
  		'50%': {
  			color: 'var(--muted-foreground)'
  		}
  	},
  	'bounce-dots': {
  		'0%, 100%': {
  			transform: 'scale(0.8)',
  			opacity: '0.5'
  		},
  		'50%': {
  			transform: 'scale(1.2)',
  			opacity: '1'
  		}
  	},
  	'thin-pulse': {
  		'0%, 100%': {
  			transform: 'scale(0.95)',
  			opacity: '0.8'
  		},
  		'50%': {
  			transform: 'scale(1.05)',
  			opacity: '0.4'
  		}
  	},
  	'pulse-dot': {
  		'0%, 100%': {
  			transform: 'scale(1)',
  			opacity: '0.8'
  		},
  		'50%': {
  			transform: 'scale(1.5)',
  			opacity: '1'
  		}
  	},
  	'shimmer-text': {
  		'0%': {
  			backgroundPosition: '150% center'
  		},
  		'100%': {
  			backgroundPosition: '-150% center'
  		}
  	},
  	'wave-bars': {
  		'0%, 100%': {
  			transform: 'scaleY(1)',
  			opacity: '0.5'
  		},
  		'50%': {
  			transform: 'scaleY(0.6)',
  			opacity: '1'
  		}
  	},
  	shimmer: {
  		'0%': {
  			backgroundPosition: '200% 50%'
  		},
  		'100%': {
  			backgroundPosition: '-200% 50%'
  		}
  	},
  	'spinner-fade': {
  		'0%': {
  			opacity: '0'
  		},
  		'100%': {
  			opacity: '1'
  		}
  	}
  },
  plugins: [],
};
export default config;
