import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
const SimpleInterest = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [calculatedPrincipal, setCalculatedPrincipal] = useState(null);
  const [interest, setInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const rateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const calculateInterest = () => {
    const principalAmount = parseFloat(principal);
    const rateOfInterest = parseFloat(rate);
    const timePeriod = parseFloat(time);
    if (isNaN(principalAmount) || isNaN(rateOfInterest) || isNaN(timePeriod)) {
      alert('Please fill all input fields correctly.');
      return;
    }
      const simpleInterest = (principalAmount * rateOfInterest * timePeriod) / 100;
      const totalAmount = principalAmount + simpleInterest;
      setCalculatedPrincipal(Math.round(principalAmount ));
      setInterest(Math.round(simpleInterest ));
      setTotalAmount(Math.round(totalAmount ));
    
  };
  const clearFields = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCalculatedPrincipal(null);
    setInterest(null);
    setTotalAmount(null);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Simple Interest Calculator</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Principal Amount :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={principal}
          onChangeText={setPrincipal}
          returnKeyType="next"
          onSubmitEditing={() => rateInputRef.current.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rate of Interest:</Text>
        <TextInput
          ref={rateInputRef}
          style={styles.input}
          placeholder="Rate of Interest(%)"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
          returnKeyType="next"
          onSubmitEditing={() => timeInputRef.current.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time Period:</Text>
        <TextInput
          ref={timeInputRef}
          style={styles.input}
          placeholder="Time in Years"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={time}
          onChangeText={setTime}
          returnKeyType="done"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateInterest}
        >
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {interest !== null && totalAmount !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>
            Principal Amount:
            <Text style={styles.resultValue}> ₹ {calculatedPrincipal}</Text>
          </Text>
          <Text style={styles.resultLabel}>
            Total Interest:
            <Text style={styles.resultValue}> ₹ {interest}</Text>
          </Text>
          <Text style={styles.resultLabel}>
            Total Amount:
            <Text style={styles.resultValue}> ₹ {totalAmount}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    padding: 20,
    backgroundColor: "#000000", // Black background
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 22,
    color: "#FFFFFF", // White text
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    fontSize: 15,
    height: 40,
    borderColor: "orange", // Orange border
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "#FFFFFF", // White text
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: "orange", // Orange background
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  clearButton: {
    backgroundColor: "red", // Red background
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontSize: 15,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginVertical: 20,
    alignItems: "center", // Center align the result
  },
  resultLabel: {
    fontSize: 20,
    color: "orange", // Orange text
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // White text for result
  },
});
export default SimpleInterest;