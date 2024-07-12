import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import calendardays from '../assets/images/calendardays.png';

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState(new Date());
  const [showBirthdatePicker, setShowBirthdatePicker] = useState(false);
  const [ageResult, setAgeResult] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [nextBirthday, setNextBirthday] = useState(null);

  const calculateAge = () => {
    const currentDate = new Date(); // Get current date from system
    const differenceInTime = currentDate.getTime() - birthdate.getTime();
    const differenceInSeconds = differenceInTime / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    const differenceInMonths = differenceInDays / 30.436875; // average days in a month
    const differenceInYears = differenceInDays / 365.25; // average days in a year

    const years = Math.floor(differenceInYears);
    const months = Math.floor((differenceInMonths % 12));
    const days = Math.floor(differenceInDays % 30.436875);
    const hours = Math.floor(differenceInHours % 24);
    const minutes = Math.floor(differenceInMinutes % 60);
    const seconds = Math.floor(differenceInSeconds % 60);

    setAgeResult({
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });

    // Calculate next birthday
    const nextBirthdayDate = new Date(birthdate.getFullYear() + years + 1, birthdate.getMonth(), birthdate.getDate());
    const daysUntilNextBirthday = Math.floor((nextBirthdayDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    setNextBirthday(daysUntilNextBirthday);
  };

  const clearAll = () => {
    setBirthdate(new Date());
    setAgeResult({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setNextBirthday(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Select Your Birthdate</Text>
        <TouchableOpacity onPress={() => setShowBirthdatePicker(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.dateText}>
              {birthdate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
            <Text>     </Text>
            
            <Image source={calendardays} style={{ width: 24, height: 24, marginRight: 10 }} />
          </View>
        </TouchableOpacity>
        {showBirthdatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowBirthdatePicker(false);
              if (selectedDate) {
                setBirthdate(selectedDate);
              }
            }}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateAge}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Age</Text>
        <View style={styles.resultValues}>
          <Text style={styles.valueText}>
            Years: {ageResult.years}
          </Text>
          <Text style={styles.valueText}>
            Months: {ageResult.months}
          </Text>
          <Text style={styles.valueText}>
            Days: {ageResult.days}
          </Text>
        </View>
        {nextBirthday !== null && (
          <View style={styles.nextBirthdayContainer}>
            <Text style={styles.nextBirthdayText}>
              Your next birthday is in {nextBirthday} days!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // light gray background
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'pace-between',
    marginBottom: 20,
  },
  calculateButton: {
    backgroundColor: 'orange', // blue button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#ff0000', // red button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white', // dark gray label
    fontSize: 18,
    marginBottom:10,
  },
  dateText: {
    color: 'orange', // dark gray date text
    fontSize: 18,
    marginLeft: 10,
  },
  resultContainer: {
    marginTop: 10,
    backgroundColor: 'orange', // dark gray result container
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    color: '#fff', // white result text
    fontSize: 24,
    marginBottom: 10,
  },
  resultValues: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    width: '100%',
    marginBottom: 10,
  },
  valueText: {
    color: '#fff', // white value text
    fontSize: 18,
    marginHorizontal: 10, // Add horizontal margin between items
    marginBottom: 5,
  },
  nextBirthdayContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  nextBirthdayText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AgeCalculator;