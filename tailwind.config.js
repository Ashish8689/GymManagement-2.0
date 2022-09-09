/** @type {import('tailwindcss').Config} */
module.exports = {
    // important: '#app',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                body: '#F8F9FA',
                primary: '#7147E8',
                'primary-light': '#7147E840',
                'primary-title': '#130f49',
                bold: '#2f2f2f',
                'bold-light': '#111117',
                para: '#babac4',
                active: '#17b978',
                deactive: '#ff304f',
                edit: '#93B5C6',
            },
            animation: {
                rotate: 'rotate 8s linear infinite',
            },
            keyframes: {
                rotate: {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0)' },
                    '100%': {
                        transform: 'translate(-50%, -50%) rotate(360deg)',
                    },
                },
            },
        },
    },
    plugins: [],
}
