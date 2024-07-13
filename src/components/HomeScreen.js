import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Calculator from '../components/Calculator';
import IconGroup from '../components/IconGroup';
import { useNavigation } from '@react-navigation/native';

// Main icon images
import ss from '../assets/images/ss.png';
import aa from '../assets/images/aa.png';
import jj from '../assets/images/jj.png';

// Subicon images
import Scientific from '../assets/images/Scientific.png';
import volume from '../assets/images/volume.png';
import ci from '../assets/images/ci.png';
import si from '../assets/images/si.png';
import gpa from '../assets/images/gpa.png';
import ratio from '../assets/images/ratio.png';
import percentage from '../assets/images/percentage.png';
import bmi from '../assets/images/bmi.png';
import age from '../assets/images/age.png';
import capacitor from '../assets/images/capacitor.png';
import voltage from '../assets/images/voltage.png';
import datediff from '../assets/images/datediff.png';
import distance from '../assets/images/distance.png';
import fuel from '../assets/images/fuel.png';
import loan from '../assets/images/loan.png';
import sip from '../assets/images/sip.png';
import fd from '../assets/images/fd.png';
import itax from '../assets/images/itax.png';
import mutualfund from '../assets/images/mutualfund.png';
import cagr from '../assets/images/cagr.png';
import retirement from '../assets/images/retirement.png';
import homebudget from '../assets/images/homebudget.png';
import savings from '../assets/images/savings.png';
import investment from '../assets/images/investment.png';
import insurance from '../assets/images/insurance.png';
import tax from '../assets/images/tax.png';
import debt from '../assets/images/debt.png';
import inflation from '../assets/images/inflation.png';
import nps from '../assets/images/nps.png';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToSubIcons = (iconName, subIcons) => {
    navigation.navigate('SubIconsScreen', { iconName, subIcons });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconGroup
          iconName="MATH"
          iconImage={aa}
          subIcons={[
            { name: 'Scientific', image: Scientific,iconName:'Scientific' },
            { name: 'Volume', image: volume },
            { name: 'CI', image: ci },
            { name: 'SI', image: si },
            { name: 'GPA', image: gpa },
            { name: 'RATIO', image: ratio },
            { name: 'Percentage', image: percentage },
          ]}
          onPress={() => handleNavigateToSubIcons('%', [
            { name: 'Scientific', image: Scientific },
            { name: 'Volume', image: volume },
            { name: 'CI', image: ci },
            { name: 'SI', image: si },
            { name: 'GPA', image: gpa },
            { name: 'RATIO', image: ratio },
            { name: 'Percentage', image: percentage },
          ])}
        />
        <IconGroup
          iconName="OTHER"
          iconImage={ss}
          subIcons={[
            { name: 'BMI', image: bmi },
            { name: 'AGE', image: age },
            { name: 'Capacitor', image: capacitor },
            { name: 'Voltage', image: voltage },
            { name: 'DateDiff', image: datediff },
            { name: 'Distance', image: distance },
            { name: 'FuelEfficiency', image: fuel },
          ]} 
          onPress={() => handleNavigateToSubIcons('=', [
            { name: 'BMI', image: bmi },
            { name: 'AGE', image: age },
            { name: 'Capacitor', image: capacitor },
            { name: 'Voltage', image: voltage },
            { name: 'DateDiff', image: datediff },
            { name: 'Distance', image: distance },
            { name: 'FuelEfficiency', image: fuel },
          ])}
        />
        <IconGroup
          iconName="Financial"
          iconImage={jj}
          subIcons={[
            { name: 'Loan', image: loan },
            { name: 'SIP', image: sip },
            { name: 'FD', image: fd },
            { name: 'ITAX', image: itax },
            { name: 'MutualFund', image: mutualfund },
            { name: 'CAGR', image: cagr },
            { name: 'Retirement', image: retirement },
            { name: 'HomeBudget', image: homebudget },
            { name: 'Savings', image: savings },
            { name: 'Investment', image: investment },
            { name: 'Insurance', image: insurance },
            { name: 'TAX', image: tax },
            { name: 'DebtPayoff', image: debt },
            { name: 'Inflation', image: inflation },
            { name: 'NPS', image: nps },
          ]}
          onPress={() => handleNavigateToSubIcons('$', [
            { name: 'Loan', image: loan },
            { name: 'SIP', image: sip },
            { name: 'FD', image: fd },
            { name: 'ITAX', image: itax },
            { name: 'MutualFund', image: mutualfund },
            { name: 'CAGR', image: cagr },
            { name: 'Retirement', image: retirement },
            { name: 'HomeBudget', image: homebudget },
            { name: 'Savings', image: savings },
            { name: 'Investment', image: investment },
            { name: 'Insurance', image: insurance },
            { name: 'TAX', image: tax },
            { name: 'DebtPayoff', image: debt },
            { name: 'Inflation', image: inflation },
            { name: 'NPS', image: nps },
          ])}
        />
      </View>
      
      <View style={styles.calculatorContainer}>
        <Calculator />
      </View>
      {/* <View style={styles.rectangleBox}>
        <Text style={styles.rectangleBoxText}>Show Ad Here</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
    
  },
  calculatorContainer: {
    flex: 1,
  
    paddingTop: 10,
  },
  rectangleBox: {
    height:60,
    marginTop: 5,
    padding: 20,
    borderWidth:1,
    borderColor: '#333',
    // borderRadius: 10,
    alignItems: 'center',
  },
  rectangleBoxText: {
    fontSize: 15,
    color: '#FFF',
   
  },
});

export default HomeScreen;
