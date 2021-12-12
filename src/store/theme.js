const LIGHTMODE = {
  name: 'light',
  backgroundColor: '#fff',
  fontColor: '#010000',
  mainPageColor: '#FCFCFF',
  sentenceColor: '#010101',
};

const DARKMODE = {
  name: 'dark',
  backgroundColor: '#1a1a1a',
  fontColor: '#b2b2b2',
  mainPageColor: '#343434',
  sentenceColor: '#fff',
};

export const lightThemeSelected = () => ({type: 'LIGHT'});
export const darkThemeSelected = () => ({type: 'DARK'});

export const themeChange = (state, action) => {
  switch (action.type) {
    case 'LIGHT': {
      return {
        theme: (state.theme = LIGHTMODE),
      };
    }
    case 'DARK': {
      return {
        theme: (state.theme = DARKMODE),
      };
    }
    default: {
      return state;
    }
  }
};

export const initialThemeState = {
  theme: LIGHTMODE,
  error: null,
  status: null,
};
