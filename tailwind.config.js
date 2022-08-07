/** @type {import('tailwindcss').Config} */
module.exports = {
    // important: '#app',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './component/**/*.{js,ts,jsx,tsx}',
        './constants/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                body: '#02000a',
                main: '#470bb5',
                'main-light': '#a696c8',
                'main-title': '#130f49',
                bold: '#2f2f2f',
                'bold-light': '#111117',
                input: '#29292e',
                para: '#babac4',
                active: '#17b978',
                deactive: '#ff304f',
                edit: '#93B5C6',
            },
        },
    },
    plugins: [],
}
