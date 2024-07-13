// App.js

import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import mobileAds, { BannerAd, BannerAdSize, TestIds, MaxAdContentRating } from 'react-native-google-mobile-ads';

import HomeScreen from './src/components/HomeScreen';
import SubIconsScreen from './src/screens/SubIconsScreen';
import ScientificCalculator from './src/screens/ScientificCalculator'; // Import your CalculatorScreen
import RatioCalculator from './src/screens/RatioCalculator';
import MutualFundCalculator from './src/screens/MutualFundCalculator';
import FDCalculator from './src/screens/FDCalculator';
import IncomeTaxCalculator from'./src/screens/IncomeTaxCalculator';
import GPACalculator from './src/screens/GPACalculator';
import VolumeCalculator from './src/screens/VolumeCalculator';
import CalculatorPercentage from './src/screens/CalculatorPercentage';
import CAGRCalculator from './src/screens/CAGRCalculator';
import RetirementCalculator from './src/screens/RetirementCalculator';
import HomeBudgetCalculator from './src/screens/HomeBudgetCalculator';
import SimpleInterest from './src/screens/SimpleInterest';
import CompoundInterestCalculator from './src/screens/CompoundInterestCalculator';
import EmiCalculator from './src/screens/Emi';
import SIPCalculator from './src/screens/SIPCalculator';
import SavingsCalculator from './src/screens/SavingsCalculator';
import InvestmentScreen from './src/screens/InvestmentScreen';
import InsuranceCalculator from './src/screens/InsuranceCalculator'; 
import TaxCalculator from './src/screens/TaxCalculator';
import DebtPayoffCalculator from './src/screens/DebtPayoffCalculator';
import InflationCalculator from './src/screens/InflationCalculator';
import NPSCalculator from './src/screens/NPSCalculator';
import CapacitorCalculator from './src/screens/CapacitorCalculator';
import VoltageDividerCalculator from './src/screens/VoltageDividerCalculator';
import DateDiff from './src/screens/DateDiff';
import DistanceCalculator from './src/screens/DistanceCalculator';
import FuelEfficiencyCalculator from './src/screens/FuelEfficiencyCalculator';
import BMICalculator from './src/screens/BMICalculator';
import AgeCalculator from './src/screens/AgeCalculator';
import PaymentDetails from './src/screens/PaymentDetails';
import LoanCalculator from './src/screens/LoanCalculator';
// import LoanDetail from './src/screens/LoanDetail';
import InterestCalculator from './src/screens/InterestCalculator';
import LoanTenure from './src/screens/LoanTenure';


// Initialize ads
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4761293324240417/8424909911'; 




const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};
const Tab = createMaterialTopTabNavigator();

const LoanCalculatorTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: 'orange', // Set the background color of the tab bar
      },
      tabBarLabelStyle: {
        color: 'white', // Set the text color of the tab bar items
      },
      tabBarIndicatorStyle: {
        backgroundColor: 'white', // Set the color of the indicator line below the active tab
      },
    }}
  >
    <Tab.Screen name="EMI" component={EmiCalculator} />
    <Tab.Screen name="Loan" component={LoanCalculator} />
    <Tab.Screen name="Interest" component={InterestCalculator} />
    <Tab.Screen name="Period" component={LoanTenure} />
  </Tab.Navigator>
);
const App = () => {
  React.useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
       
      })
      .then(() => {
        console.log('Request config successfully set!');
      });
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}options={{ headerShown: false }} />
        <Stack.Screen name="SubIconsScreen" component={SubIconsScreen} />
        <Stack.Screen name="ScientificCalculator" component={ScientificCalculator} options={{ title: 'Scientific' }}/>
        <Stack.Screen name="RatioCalculator" component={RatioCalculator} options={{ title: 'Ratio' }}/>
        <Stack.Screen name="MutualFundCalculator" component={MutualFundCalculator} options={{ title: 'Mutual Fund' }}/>
        <Stack.Screen name="FDCalculator" component={FDCalculator} options={{ title: 'FD' }}/>
        <Stack.Screen name="IncomeTaxCalculator" component={IncomeTaxCalculator}options={{ title: 'ITax' }}/>
        <Stack.Screen name="GPACalculator" component={GPACalculator} options={{ title: 'GPA' }}/>
        <Stack.Screen name="VolumeCalculator" component={VolumeCalculator} options={{ title: 'Volume' }} />
        <Stack.Screen name="CalculatorPercentage" component={CalculatorPercentage} options={{ title: 'Percentage' }} />
        <Stack.Screen name="CAGRCalculator" component={CAGRCalculator} options={{ title: 'CAGR' }}/>
        <Stack.Screen name="RetirementCalculator" component={RetirementCalculator} options={{ title: 'Retirement' }}/>
        <Stack.Screen name="HomeBudgetCalculator" component={HomeBudgetCalculator} options={{ title: 'Home Budget' }}/>
        <Stack.Screen name="SimpleInterest" component={SimpleInterest} options={{ title: 'SI' }}/>
        <Stack.Screen name="CompoundInterestCalculator" component={CompoundInterestCalculator} options={{ title: 'CI' }}/>
        <Stack.Screen name="LoanCalculator" component={LoanCalculatorTabs} options={{ title: 'Loan' }} />
        <Stack.Screen name="SIPCalculator" component={SIPCalculator} options={{ title: 'SIP' }}/>
        <Stack.Screen name="SavingsCalculator" component={SavingsCalculator} options={{ title: 'Savings' }}/>
        <Stack.Screen name="InvestmentScreen" component={InvestmentScreen} options={{ title: 'Investment' }}/>
        <Stack.Screen name="InsuranceCalculator" component={InsuranceCalculator} options={{ title: 'Insurance' }}/>
        <Stack.Screen name="TaxCalculator" component={TaxCalculator} options={{ title: 'TAX' }}/>
        <Stack.Screen name="DebtPayoffCalculator" component={DebtPayoffCalculator} options={{ title: 'Debt Payoff' }}/>
        <Stack.Screen name="InflationCalculator" component={InflationCalculator} options={{ title: 'Inflation' }}/>
        <Stack.Screen name="NPSCalculator" component={NPSCalculator} options={{ title: 'NPS' }}/>
        <Stack.Screen name="CapacitorCalculator" component={CapacitorCalculator} options={{ title: 'Capacitor' }}/>
        <Stack.Screen name="VoltageDividerCalculator" component={VoltageDividerCalculator} options={{ title: 'Voltage' }}/>
        <Stack.Screen name="DateDiff" component={DateDiff} options={{ title: 'Date Difference' }}/>
        <Stack.Screen name="DistanceCalculator" component={DistanceCalculator} options={{ title: 'Distance' }}/>
        <Stack.Screen name="FuelEfficiencyCalculator" component={FuelEfficiencyCalculator} options={{ title: 'Fuel Efficiency' }}/>
        <Stack.Screen name="BMICalculator" component={BMICalculator} options={{ title: 'BMI' }}/>
        <Stack.Screen name="AgeCalculator" component={AgeCalculator} options={{ title: 'Age' }}/>
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} options={{ title: 'Summary' }} />
        {/* <Stack.Screen name="LoanDetail" component={LoanDetail} options={{ title: 'Summary' }} /> */}
        
        











        {/* Add more screens as needed */}
      </Stack.Navigator>
      <View style={styles.adContainer}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={adUnitId}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advert failed to load: ', error);
          }}
        />
      </View>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  adContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
});

export default App;
