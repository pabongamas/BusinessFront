/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      width: {
        'wLayoutCollapsed': 'calc(100vw - 3rem)',
        'wLayout': 'calc(100vw - 12rem)',
      },
      maxHeight: {
        'divTableSearch': 'calc(100vh - 15em)',
      },
      borderWidth: {
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      spacing: {
        "6px": "6px",
      },
      zIndex: {
        1500: "1500",
      },
      gridTemplateColumns: {
        layout: "12rem auto",
        layoutCollapsed: "3rem auto",
      },
      colors: {
        grayFirst: "#F1F1FB",
        mainApp: "#EFEFEF",
        "gray_main": {
          "DEFAULT": "#F7F7F8"
        },
        "grayInactive":{
          "DEFAULT":"#B3B3B3"
        },
        "federal_blue": {
          "DEFAULT": "#03045e",
          "100": "#010113",
          "200": "#010226",
          "300": "#020338",
          "400": "#02044b",
          "500": "#03045e",
          "600": "#0508ae",
          "700": "#0f12f8",
          "800": "#5f61fa",
          "900": "#afb0fd"
        },
        "marian_blue": {
          "DEFAULT": "#023e8a",
          "100": "#000c1b",
          "200": "#011836",
          "300": "#012451",
          "400": "#02306d",
          "500": "#023e8a",
          "600": "#035cd1",
          "700": "#2381fc",
          "800": "#6cabfd",
          "900": "#b6d5fe"
        },
        "honolulu_blue": {
          "DEFAULT": "#0077b6",
          "100": "#001825",
          "200": "#003049",
          "300": "#00486e",
          "400": "#005f93",
          "500": "#0077b6",
          "600": "#00a2f9",
          "700": "#3bbaff",
          "800": "#7cd1ff",
          "900": "#bee8ff"
        },
        "blue_green": {
          "DEFAULT": "#0096c7",
          "100": "#001e28",
          "200": "#003c50",
          "300": "#005a77",
          "400": "#00779f",
          "500": "#0096c7",
          "600": "#06c1ff",
          "700": "#44d0ff",
          "800": "#83e0ff",
          "900": "#c1efff"
        },
        "pacific_cyan": {
          "DEFAULT": "#00b4d8",
          "100": "#00242b",
          "200": "#004756",
          "300": "#006b81",
          "400": "#008fab",
          "500": "#00b4d8",
          "600": "#12d8ff",
          "700": "#4ee1ff",
          "800": "#89ebff",
          "900": "#c4f5ff"
        },
        "vivid_sky_blue": {
          "DEFAULT": "#48cae4",
          "100": "#082d34",
          "200": "#105a69",
          "300": "#17879d",
          "400": "#1fb4d1",
          "500": "#48cae4",
          "600": "#6dd5e9",
          "700": "#92dfef",
          "800": "#b6eaf4",
          "900": "#dbf4fa"
        },
        "non_photo_blue": {
          "DEFAULT": "#90e0ef",
          "100": "#0a3a43",
          "200": "#137586",
          "300": "#1dafc9",
          "400": "#4ccfe6",
          "500": "#90e0ef",
          "600": "#a6e7f2",
          "700": "#bcedf5",
          "800": "#d2f3f9",
          "900": "#e9f9fc"
        },
        "non_photo_blue": {
          "DEFAULT": "#ade8f4",
          "100": "#0a3f4a",
          "200": "#147e93",
          "300": "#1ebddd",
          "400": "#65d4ea",
          "500": "#ade8f4",
          "600": "#beedf6",
          "700": "#cff1f8",
          "800": "#dff6fb",
          "900": "#effafd"
        },
        "light_cyan": {
          "DEFAULT": "#caf0f8",
          "100": "#0a444f",
          "200": "#15889f",
          "300": "#2ac4e3",
          "400": "#79daee",
          "500": "#caf0f8",
          "600": "#d4f3f9",
          "700": "#dff6fb",
          "800": "#e9f9fc",
          "900": "#f4fcfe"
        }
      },
      height: {
        asidevh: "88vh",
      },
    },
  },
  plugins: [],
};
