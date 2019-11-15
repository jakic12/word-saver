export const themes = {
  light: {
    background1: `rgb(236, 236, 236)`, // grey
    background2: `white`, // white
    accentColor: `#29c5ff`, // light blue #29c5ff
    accentColor2: `#ffcf4b`, // yellow #ffcf4b
    accentTextColor: `white`, // white
    textColor: `black`,
    borderColor: `rgb(231, 231, 231)`, // rgb(231, 231, 231)
    loginRegisterBackground: `white`
  },
  dark: {
    background1: `#191919`, // grey
    background2: `#222222`, // white
    accentColor: `#2ecc71`, // light blue #29c5ff
    accentColor2: `#ffcf4b`, // yellow #ffcf4b
    accentTextColor: `white`, // white
    textColor: `white`,
    borderColor: `#191919`, // rgb(231, 231, 231)
    loginRegisterBackground: `#191919`
  }
};

export const setTheme = theme => {
  if (themes[theme]) {
    Object.keys(themes[theme]).forEach(key => {
      setCssVar(key, themes[theme][key]);
    });
  }
};

const setCssVar = (key, value) => {
  document.documentElement.style.setProperty(`--${key}`, value);
};
