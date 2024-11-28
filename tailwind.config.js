/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			grey: {
  				dark: {
  					'1': "#021C2F",
  					'2': "#354959",
  					'3': "#808d97",
  					'4': '#F2F4F5'
  				}
  			},
  			blue: {
				'1': '#071012',
				'2': '#224E59',
				'3': '#90A6AC',
  				'4': '#D3DCDE',
  				'5': '#F4F6F7'
  			},
			red: {
				'1': '#230303',
				'2': '#b0100d',
				'3': '#D78786',
				'4': '#EFCFCF',
				'5': '#FBF3F3',
			},
  			'light-blue': {
  				'1': '#22302E',
  				'2': '#A8EEE7',
  				'3': '#D3F7F3',
  				'4': '#EEFCFA',
				'5': '#FBFEFE'
  			},
  			text: {
  				secondary: '#354959',
  				primary: '#021C2F',
  				tertiary: '#808D97'
  			},
			background: {
				tertiary: '#b0100d',
				secondary: "#071012",
				"secondary-2": "#A8EEE7"
			},
  			"back-ground": 'hsl(var(--background))',
  			green: {
  				'0': '#11240E',
  				'1': '#55b648',
  				'2': '#aadba3',
  				'3': '#ddf0da',
  				'4': '#f6fbf6',
  				base: '#008E5B'
  			},
  			amber: '#EE8100',
  			accent: {
  				tertiary: '#224E59',
  				primary: '#B0100D',
  				secondary: '#A8EEE7',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'light-green': '#EFFFE1',
  			'light-red': '#FFF4F4',
  			'dark-green': {
  				'0': '#041401',
  				'1': '#136207',
  				'2': '#89b083',
  				'3': '#d0e0cd',
  				'4': '#f3f7f3'
  			},
  			yellow: {
  				'0': '#323007',
  				'1': '#fcee21',
  				'2': '#fdf790',
  				'3': '#fefcd3',
  				'4': '#fffef4'
  			},
  			semantics: {
  				error: '#dd2418',
  				amber: '#df9900',
  				success: '#24c790'
  			},
  			'portal-bg': '#f8f9fa',
  			'input-filled': '#dadcdd',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
}

