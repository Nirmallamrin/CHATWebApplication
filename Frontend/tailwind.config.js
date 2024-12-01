/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('/src/assets/Frontend/src/assets/Bg-chat.png')", // Update the path accordingly
      },
    },
  },
  plugins: [],
};
