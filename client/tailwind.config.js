/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx,js,jsx}',
        './components/**/*.{ts,tsx,js,jsx}',
        './app/**/*.{ts,tsx,js,jsx}',
        './src/**/*.{ts,tsx,js,jsx}',
        './index.html',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                text: 'var(--text)',
                background: 'var(--background)',
                asideSectionBackground: 'var(--asideSectionBackground)',
                asideSectionText: 'var(--asideSectionText)',
                asideSectionSecondaryText: 'var(--asideSectionSecondaryText)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                secondaryBackground: 'var(--secondaryBackground)',
                secondaryText: 'var(--secondaryText)',
                sectionSecondaryText: 'var(--sectionSecondaryText)',
                'primary-200': 'var(--primary-200)',
                'primary-300': 'var(--primary-300)',
                'primary-400': 'var(--primary-400)',
                'primary-800': 'var(--primary-800)',
                'accent-50': 'var(--accent-50)',
                'accent-100': 'var(--accent-100)',
                'accent-200': 'var(--accent-200)',
                'accent-300': 'var(--accent-300)',
                'accent-400': 'var(--accent-400)',
                'accent-500': 'var(--accent-500)',
                'accent-600': 'var(--accent-600)',
                'accent-700': 'var(--accent-700)',
                'accent-800': 'var(--accent-800)',
                'accent-900': 'var(--accent-900)',
                'accent-950': 'var(--accent-950)',
            },
            fontFamily: {
                inter: ['"Inter"', 'sans-serif'],
                poppins: ['"Poppins"', 'sans-serif'],
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
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [import('tailwindcss-animate')],
}
