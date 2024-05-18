/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx,js,jsx}',
        './components/**/*.{ts,tsx,js,jsx}',
        './app/**/*.{ts,tsx,js,jsx}',
        './src/**/*.{ts,tsx,js,jsx}',
        './index.html',
        './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
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
                'accent-200': 'var(--accent-200)',
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
