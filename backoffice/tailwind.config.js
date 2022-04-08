module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    // purge: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/styles/**/*.css'],
    theme: {
        extend: {
            colors: {
                primary: '#089BAB',
                secondary: '#E1F5F6',
                foreground: '#F1F6F9',
                background: '#000000',
            },
        },
    },
    plugins: [],
};
