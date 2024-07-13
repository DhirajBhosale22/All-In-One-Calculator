// MainNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SubIconsScreen from './SubIconsScreen';
import CalculationScreen from './ScientificCalculator'; // Ensure CalculatorScreen is correctly imported

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SubIconsScreen" component={SubIconsScreen} />
      <Stack.Screen name="CalculatorScreen" component={CalculationScreen} />
      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
