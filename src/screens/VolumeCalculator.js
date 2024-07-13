import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
const VolumeCalculator = () => {
  const [selectedShape, setSelectedShape] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState('');

  const sideRef = useRef(null);
  const lengthRef = useRef(null);
  const widthRef = useRef(null);
  const heightRef = useRef(null);
  const radiusRef = useRef(null);
  const baseLengthRef = useRef(null);
  const baseWidthRef = useRef(null);
  
  const handleInputChange = (name, value) => {
    const updatedValues = { ...inputValues, [name]: value };
    setInputValues(updatedValues);
    calculateVolume(selectedShape, updatedValues);
  };
  const calculateVolume = (shape, values) => {
    let volume;
    switch (shape) {
      case 'Cube':
        const side = parseFloat(values.side);
        volume = side ** 3;
        break;
      case 'Cuboid':
        const length = parseFloat(values.length);
        const width = parseFloat(values.width);
        const height = parseFloat(values.height);
        volume = length * width * height;
        break;
      case 'Sphere':
        const radius = parseFloat(values.radius);
        volume = (4 / 3) * Math.PI * radius ** 3;
        break;
      case 'Cylinder':
        const radiusCylinder = parseFloat(values.radius);
        const heightCylinder = parseFloat(values.height);
        volume = Math.PI * radiusCylinder ** 2 * heightCylinder;
        break;
      case 'Cone':
        const radiusCone = parseFloat(values.radius);
        const heightCone = parseFloat(values.height);
        volume = (1 / 3) * Math.PI * radiusCone ** 2 * heightCone;
        break;
      case 'Pyramid':
        const baseLength = parseFloat(values.baseLength);
        const baseWidth = parseFloat(values.baseWidth);
        const pyramidHeight = parseFloat(values.height);
        volume = (1 / 3) * baseLength * baseWidth * pyramidHeight;
        break;
      default:
        volume = 'Invalid shape';
    }
    setResult(volume ? volume.toFixed(2) : 'Invalid input');
  };
  const handleShapeSelection = (shape) => {
    setSelectedShape(shape);
    setInputValues({});
    setResult('');
  };
  const renderInputs = () => {
    switch (selectedShape) {
      case 'Cube':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Side Length:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter side length"
              placeholderTextColor="white"
              onChangeText={(value) => handleInputChange('side', value)}
            />
          </View>
        );
      case 'Cuboid':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Length:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter length"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('length', value)}
                returnKeyType="next"
                onSubmitEditing={() => widthRef.current.focus()}
                blurOnSubmit={false}
                ref={lengthRef}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Width:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter width"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('width', value)}
                returnKeyType="next"
                onSubmitEditing={() => heightRef.current.focus()}
                blurOnSubmit={false}
                ref={widthRef}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter height"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('height', value)}
                returnKeyType="done"
                ref={heightRef}
              />
            </View>
          </>
        );
      case 'Sphere':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Radius:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter radius"
              placeholderTextColor='white'
              onChangeText={(value) => handleInputChange('radius', value)}
            />
          </View>
        );
      case 'Cylinder':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Radius:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter radius"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('radius', value)}
                returnKeyType="next"
                onSubmitEditing={() => heightRef.current.focus()}
                blurOnSubmit={false}
                ref={radiusRef}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter height"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('height', value)}
                returnKeyType="done"
                ref={heightRef}
              />
            </View>
          </>
        );
      case 'Cone':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Radius:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter radius"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('radius', value)}
                returnKeyType="next"
                onSubmitEditing={() => heightRef.current.focus()}
                blurOnSubmit={false}
                ref={radiusRef}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter height"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('height', value)}
                returnKeyType="done"
                ref={heightRef}
              />
            </View>
          </>
        );
      case 'Pyramid':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Base Length:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter base length"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('baseLength', value)}
                returnKeyType="next"
                onSubmitEditing={() => baseWidthRef.current.focus()}
                blurOnSubmit={false}
                ref={baseLengthRef}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Base Width:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter base width"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('baseWidth', value)}
                returnKeyType="next"
                onSubmitEditing={() => heightRef.current.focus()}
                blurOnSubmit={false}
                ref={baseWidthRef}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter height"
                placeholderTextColor='white'
                onChangeText={(value) => handleInputChange('height', value)}
                returnKeyType="done"
                ref={heightRef}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.calculationContainer}>
        {selectedShape && (
          <View style={styles.calculationContainer}>
            <Text style={styles.title}>{selectedShape} Volume Calculator</Text>
            {renderInputs()}
          </View>
        )}
        {selectedShape && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Volume of {selectedShape}:</Text>
            <Text style={styles.result}>{result}</Text>
          </View>
        )}
      </View>
      <View style={styles.rows}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleShapeSelection('Cube')}>
            <Text style={styles.buttonText}>Cube</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleShapeSelection('Cuboid')}>
            <Text style={styles.buttonText}>Cuboid</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleShapeSelection('Sphere')}>
            <Text style={styles.buttonText}>Sphere</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleShapeSelection('Cylinder')}>
            <Text style={styles.buttonText}>Cylinder</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleShapeSelection('Cone')}>
            <Text style={styles.buttonText}>Cone</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleShapeSelection('Pyramid')}>
            <Text style={styles.buttonText}>Pyramid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  resultContainer:{
    marginTop:40,
  },
  resultLabel:{
    color:'orange',
    fontSize:20,
  },
  result:{
    color:'#fff',
  },
  inputContainer:{
  },
  label:{
    color:'#fff',
  },
  input:{
    color:'white',
     borderColor:'orange',
    borderWidth:1,
    borderRadius:5,
  },
  container: {
    flexGrow: 1,
   
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: 'black',
    marginTop: 0
  },
  title: {
    fontSize:20,
    fontWeight:'bold',
    color: '#fff',
    marginTop:40,
    marginBottom:30
  },
  rows: {
    justifyContent: 'center',
    marginTop: 150
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }
})
export default VolumeCalculator;