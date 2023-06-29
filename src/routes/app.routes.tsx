import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";

import { Home } from "../screens/Home";
import { ToDo } from "../screens/ToDo";

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator 
    initialRouteName="Home"
    screenOptions={{
      statusBarStyle: 'light',
      statusBarColor: theme.colors.primary,
      headerTransparent: true,
      headerTitleAlign: "center",
      headerTitle: 'todo',
      headerTitleStyle: {
        fontSize: 28,
        color: theme.colors.shape,
        fontWeight: 'bold'
      }
    }}>
      <Screen 
        name="Home"
        component={Home}
      />
      <Screen 
        name="List"
        component={ToDo}
      />
    </Navigator>
  );
}