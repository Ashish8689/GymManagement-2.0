/** @type {import('tailwindcss').Config} */
module.exports = {
    // important: '#app',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                body: '#F3F6FB',
                primary: '#470bb5',
                'primary-light': '#a696c8',
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
