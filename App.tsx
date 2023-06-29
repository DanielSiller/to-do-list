import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './src/routes/app.routes';

import theme from './src/global/styles/theme';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const linking = {
  prefixes: ['todolist://todolist'],
  config: {
    screens: {
      List: {
        path: 'list/:listId/:listName'
      }
    }
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer linking={linking}>
          <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default gestureHandlerRootHOC(App)