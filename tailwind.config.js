module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        fontFamily: {
            "sans": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            "serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            "mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            "economica": '"Economica", serif',
            "palanquin": '"Palanquin", sans-serif',
        },
        extend: {
            spacing: {
                "1/2": "50%",
                "-1/2": "-50%",
            },
            colors: {
                "inherit": "inherit",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
