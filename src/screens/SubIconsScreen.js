import React, { useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Alert, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SubIconsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { iconName, subIcons } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: iconName });
  }, [iconName]);

  const handlePress = (subIcon) => {
    executeSubIconAction(subIcon.name);
  };

  const executeSubIconAction = (subIconName) => {
    switch (subIconName) {
      case 'Scientific':
        navigation.navigate('ScientificCalculator');
        break;
      case 'Volume':
        navigation.navigate('VolumeCalculator');
        break;
      case 'CI':
        navigation.navigate('CompoundInterestCalculator');
        break;
      case 'SI':
        navigation.navigate('SimpleInterest');
        break;
      case 'GPA':
        navigation.navigate('GPACalculator');
        break;
      case 'RATIO':
        navigation.navigate('RatioCalculator');
        break;
      case 'Percentage':
        navigation.navigate('CalculatorPercentage');
        break;
      case 'BMI':
        navigation.navigate('BMICalculator');
        break;
      case 'AGE':
        navigation.navigate('AgeCalculator');
        break;
      case 'Capacitor':
        navigation.navigate('CapacitorCalculator');
        break;
      case 'Voltage':
        navigation.navigate('VoltageDividerCalculator');
        break;
      case 'DateDiff':
        navigation.navigate('DateDiff');
        break;
      case 'Distance':
        navigation.navigate('DistanceCalculator');
        break;
      case 'FuelEfficiency':
        navigation.navigate('FuelEfficiencyCalculator');
        break;
      case 'Loan':
        navigation.navigate('LoanCalculator');
        break;
      case 'SIP':
        navigation.navigate('SIPCalculator');
        break;
      case 'FD':
        navigation.navigate('FDCalculator');
        break;
      case 'ITAX':
        navigation.navigate('IncomeTaxCalculator');
        break;
      case 'MutualFund':
        navigation.navigate('MutualFundCalculator');
        break;
      case 'CAGR':
        navigation.navigate('CAGRCalculator');
        break;
      case 'Retirement':
        navigation.navigate('RetirementCalculator');
        break;
      case 'HomeBudget':
        navigation.navigate('HomeBudgetCalculator');
        break;
      case 'Savings':
        navigation.navigate('SavingsCalculator');
        break;
      case 'Investment':
        navigation.navigate('InvestmentScreen');
        break;
      case 'Insurance':
        navigation.navigate('InsuranceCalculator');
        break;
      case 'TAX':
        navigation.navigate('TaxCalculator');
        break;
      case 'DebtPayoff':
        navigation.navigate('DebtPayoffCalculator');
        break;
      case 'Inflation':
        navigation.navigate('InflationCalculator');
        break;
      case 'NPS':
        navigation.navigate('NPSCalculator');
        break;
      default:
        Alert.alert('SubIcon Action', `You selected: ${subIconName}`);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.subIconContainer} onPress={() => handlePress(item)}>
      <Image source={item.image} style={styles.subIconImage} />
      <Text style={styles.subIconText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subIcons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  flatListContainer: {
    justifyContent: 'center',
  },
  subIconContainer: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 10,
  },
  subIconImage: {
    width: 30,
    height: 30,
  },
  subIconText: {
    marginTop: 5,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SubIconsScreen;
