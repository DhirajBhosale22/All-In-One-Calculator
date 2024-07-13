import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RatioCalculator = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [highlightedValue, setHighlightedValue] = useState('');
  const [ratioResult, setRatioResult] = useState('');

  const calculateRatio = () => {
    let result = '';
    if (a && b && c && !d) {
      const calculatedD = (c * b) / a;
      setD(calculatedD.toString());
      setHighlightedValue('D');
      result = `${c}:${calculatedD}`;
    } else if (a && b && !c && d) {
      const calculatedC = (a * d) / b;
      setC(calculatedC.toString());
      setHighlightedValue('C');
      result = `${calculatedC}:${d}`;
    } else if (a && !b && c && d) {
      const calculatedB = (a * d) / c;
      setB(calculatedB.toString());
      setHighlightedValue('B');
      result = `${a}:${calculatedB}`;
    } else if (!a && b && c && d) {
      const calculatedA = (c * b) / d;
      setA(calculatedA.toString());
      setHighlightedValue('A');
      result = `${calculatedA}:${b}`;
    } else {
      setRatioResult('Please enter only three values.');
      return;
    }
    setRatioResult(`${a || 'A'}:${b || 'B'} = ${result}`);
  };

  const clearRatioInputs = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setHighlightedValue('');
    setRatioResult('');
  };

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [factor, setFactor] = useState('');
  const [mode, setMode] = useState('shrink');
  const [scaledWidth, setScaledWidth] = useState('');
  const [scaledHeight, setScaledHeight] = useState('');
  const [scalingResult, setScalingResult] = useState('');
  const [scalingCalculated, setScalingCalculated] = useState(false);

   // Refs for TextInput fields
   const inputARef = useRef(null);
   const inputBRef = useRef(null);
   const inputCRef = useRef(null);
   const inputDRef = useRef(null);
   const widthRef = useRef(null);
   const heightRef = useRef(null);
   const factorRef = useRef(null);

   const handleTab = (currentRef) => {
    if (currentRef === inputARef.current) {
      inputBRef.current.focus();
    } else if (currentRef === inputBRef.current) {
      inputCRef.current.focus();
    } else if (currentRef === inputCRef.current) {
      inputDRef.current.focus();
    }  else if (currentRef === widthRef.current) {
      heightRef.current.focus();
    } else if (currentRef === heightRef.current) {
      factorRef.current.focus();
    } 
  };
  const calculateScaling = () => {
    if (width && height && factor) {
      let calculatedScaledWidth, calculatedScaledHeight;
      if (mode === 'shrink') {
        calculatedScaledWidth = width / factor;
        calculatedScaledHeight = height / factor;
      } else {
        calculatedScaledWidth = width * factor;
        calculatedScaledHeight = height * factor;
      }
      setScaledWidth(calculatedScaledWidth.toString());
      setScaledHeight(calculatedScaledHeight.toString());
      setScalingResult(` ${width}:${height} ${mode} ${factor} times = ${calculatedScaledWidth}:${calculatedScaledHeight}`);
      setScalingCalculated(true);
    } else {
      setScalingResult('Please enter all three values.');
    }
  };

  const clearScalingInputs = () => {
    setWidth('');
    setHeight('');
    setFactor('');
    setScaledWidth('');
    setScaledHeight('');
    setScalingResult('');
    setScalingCalculated(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Ratio Calculator</Text>
      <Text style={styles.instruction}>
        Please provide any <Text style={styles.bold}>Three</Text> values below to calculate the <Text style={styles.bold}>Fourth</Text> in the ratio
      </Text>
      <View style={styles.ratioBox}>
        <View style={styles.inputContainer}>
        <TextInput
            ref={inputARef}
            style={[styles.smallInput, highlightedValue === 'A' && styles.highlightedInput]}
            placeholder="A"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={a}
            onChangeText={setA}
            returnKeyType="next"
            onSubmitEditing={() => handleTab(inputARef.current)}
            blurOnSubmit={false}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            ref={inputBRef}
            style={[styles.smallInput, highlightedValue === 'B' && styles.highlightedInput]}
            placeholder="B"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={b}
            onChangeText={setB}
            returnKeyType="next"
            onSubmitEditing={() => handleTab(inputBRef.current)}
            blurOnSubmit={false}
          />
          <Text style={styles.equals}>=</Text>
          <TextInput
            ref={inputCRef}
            style={[styles.smallInput, highlightedValue === 'C' && styles.highlightedInput]}
            placeholder="C"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={c}
            onChangeText={setC}
            returnKeyType="next"
            onSubmitEditing={() => handleTab(inputCRef.current)}
            blurOnSubmit={false}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            ref={inputDRef}
            style={[styles.smallInput, highlightedValue === 'D' && styles.highlightedInput]}
            placeholder="D"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={d}
            onChangeText={setD}
            returnKeyType="done"
            onSubmitEditing={() => handleTab(inputDRef.current)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateRatio}
          >
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearRatioInputs}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {/* {ratioResult !== '' && (
          <Text style={styles.result}>{ratioResult}</Text>
        )} */}
      </View>

      <Text style={[styles.heading, styles.marginTop]}>Ratio Scaling Calculator</Text>
      <Text style={styles.instruction}>Please enter all <Text style={styles.bold}>Three</Text> values below to calculate</Text>
      <View style={styles.scalingBox}>
        <View style={styles.inputContainer}>
        <TextInput
            ref={widthRef}
            style={styles.smallInput}
            placeholder="Width"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={width}
            onChangeText={setWidth}
            returnKeyType="next"
            onSubmitEditing={() => handleTab(widthRef.current)}
            blurOnSubmit={false}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            ref={heightRef}
            style={styles.smallInput}
            placeholder="Height"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            returnKeyType="next"
            onSubmitEditing={() => handleTab(heightRef.current)}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={[styles.pickerContainer, { borderColor: 'orange' }]}>
            <Picker
              selectedValue={mode}
              style={styles.picker}
              onValueChange={(itemValue) => setMode(itemValue)}
            >
              <Picker.Item label="Shrink By" value="shrink" />
              <Picker.Item label="Enlarge BY" value="enlarge" />
            </Picker>
          </View>
          <TextInput
            ref={factorRef}
            style={styles.smallInput}
            placeholder="Factor"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={factor}
            onChangeText={setFactor}
            returnKeyType="done"
            onSubmitEditing={() => handleTab(factorRef.current)}
          />
        </View>
        {scalingCalculated && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.scaledInput]}
              placeholder="Scaled Width"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={scaledWidth}
              onChangeText={setScaledWidth}
              editable={false}
            />
            <Text style={styles.colon}>:</Text>
            <TextInput
              style={[styles.input, styles.scaledInput]}
              placeholder="Scaled Height"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={scaledHeight}
              onChangeText={setScaledHeight}
              editable={false}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateScaling}
          >
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearScalingInputs}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {scalingResult !== '' && (
          <Text style={styles.result1}>{scalingResult}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  ratioBox: {
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallInput: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    width: 60,
    textAlign: 'center',
    color: 'white',
  },
  highlightedInput: {
    borderColor: 'green',
    color: 'white',
  },
  colon: {
    fontSize: 24,
    color: 'white',
  },
  equals: {
    fontSize: 24,
    color: 'white',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  calculateButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
  result1: {
    marginTop: 20,
    fontSize: 18,
    color: 'orange',
  },
  scalingBox: {
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  marginTop: {
    marginTop: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    backgroundColor: 'orange',
    borderRadius: 5,
    borderColor: 'orange',
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    color: 'white',
    height: 50,
  },
  scaledInput: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    width: 60,
    textAlign: 'center',
    color: 'white',
  },
});

export default RatioCalculator;
