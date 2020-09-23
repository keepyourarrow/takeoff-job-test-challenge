module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      spacing: {
        7: "1.75rem",
        50: "12.4rem",
        72: "18rem",
        80: "20rem",
      },
      colors: {
        "body-main": "#cbeefd",
        "thin-border": "#c6c6c6",
      },
      boxShadow: {
        "contacts-container": "0px 1px 11px 0px rgba(0,0,0,0.75)",
        "image-outline": "0 0 0 4px rgba(66, 153, 225, 1)",
        "modal-shadow": "0px 1px 22px 0px rgba(0,0,0,0.85)",
      },
    },
    customForms: (theme) => ({
      default: {
        select: {},
        checkbox: {
          height: theme("spacing.6"),
          width: theme("spacing.6"),
          iconColor: theme("colors.white"),
        },
        radio: {
          height: theme("spacing.6"),
          width: theme("spacing.6"),
        },
      },
    }),
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("tailwind-scrollbar"),
  ],
};
