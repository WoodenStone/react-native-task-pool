import * as React from 'react';

import {createGlobalContext} from 'use-global-context';

import {themeChange, initialThemeState} from './src/store/theme';

import {layoutChange, initialLayoutState} from './src/store/cardLayout';

import AppRouter from './src/route/AppRouter';

export const [useGlobalContext, GlobalContextProvider] = createGlobalContext({
  appTheme: {
    reducer: themeChange,
    initialState: initialThemeState,
  },
  appLayout: {
    reducer: layoutChange,
    initialState: initialLayoutState,
  },
});

const App = () => {
  return (
    <>
      <GlobalContextProvider>
        <AppRouter />
      </GlobalContextProvider>
    </>
  );
};

export default App;
