import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type CourseInput = {
  subject: string;
  credits: string;
  grade: string;
};

const gradeToPoints = (grade: string): number | null => {
  switch (grade.toUpperCase()) {
    case 'A+':
      return 4.3;
    case 'A':
      return 4.0;
    case 'A-':
      return 3.7;
    case 'B+':
      return 3.3;
    case 'B':
      return 3.0;
    case 'B-':
      return 2.7;
    case 'C+':
      return 2.3;
    case 'C':
      return 2.0;
    case 'C-':
      return 1.7;
    case 'D+':
      return 1.3;
    case 'D':
      return 1.0;
    case 'D-':
      return 0.7;
    case 'F':
      return 0.0;
    case 'P':
    case 'NP':
    case 'I':
    case 'W':
      return null;
    default:
      return parseFloat(grade);
  }
};

const GPACalculator = () => {
  const [inputs, setInputs] = useState<CourseInput[]>([{ subject: '', credits: '', grade: '-' }]);
  const [gpa, setGpa] = useState<string | null>(null);
  const [allCredit, setAllCredit] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs for each TextInput
  const subjectRefs = useRef<TextInput[]>([]);
  const creditsRefs = useRef<TextInput[]>([]);
  const gradeRefs = useRef<Picker[]>([]);

  const addRow = () => {
    setInputs([...inputs, { subject: '', credits: '', grade: '-' }]);
  };

  const handleChange = (index: number, field: keyof CourseInput, value: string) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const calculateGPA = () => {
    setError(null);
    let totalCredits = 0;
    let totalPoints = 0;
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.grade === '-') {
        setError(`Please provide a valid grade for item #${i + 1}.`);
        
        return;
      }
      const credits = parseFloat(input.credits);
      const points = gradeToPoints(input.grade);
      if (!isNaN(credits) && points !== null && !isNaN(points)) {
        totalCredits += credits;
        totalPoints += credits * points;
      }
    }
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'Invalid input';
    setGpa(gpa);
    setAllCredit(totalCredits);
  };

  const clearAll = () => {
    setInputs([{ subject: '', credits: '', grade: '-' }]);
    setGpa(null);
    setError(null);
    setAllCredit(null);
  };
  const focusNextInput = (index: number, refType: 'subject' | 'credits' | 'grade') => {
    switch (refType) {
      case 'subject':
        creditsRefs.current[index]?.focus();
        break;
      case 'credits':
        gradeRefs.current[index]?.focus();
        break;
      default:
        // When 'grade', move to next row if available
        if (index + 1 < inputs.length) {
          subjectRefs.current[index + 1]?.focus();
        }
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>GPA Calculator</Text>
        {inputs.map((input, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                ref={(ref) => (subjectRefs.current[index] = ref as TextInput)}
                style={styles.input}
                placeholder="Subject"
                placeholderTextColor="white"
                value={input.subject}
                onChangeText={(value) => handleChange(index, 'subject', value)}
                onSubmitEditing={() => focusNextInput(index, 'subject')}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Credits</Text>
              <TextInput
                ref={(ref) => (creditsRefs.current[index] = ref as TextInput)}
                style={styles.input}
                placeholder="Credits"
                placeholderTextColor="white"
                keyboardType="numeric"
                value={input.credits}
                onChangeText={(value) => handleChange(index, 'credits', value)}
                onSubmitEditing={() => focusNextInput(index, 'credits')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Grade</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={input.grade}
                  style={styles.picker}
                  onValueChange={(value) => handleChange(index, 'grade', value)}
                >
                  <Picker.Item label="-" value="-" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A" value="A" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B" value="B" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="C+" value="C+" />
                  <Picker.Item label="C" value="C" />
                  <Picker.Item label="C-" value="C-" />
                  <Picker.Item label="D+" value="D+" />
                  <Picker.Item label="D" value="D" />
                  <Picker.Item label="D-" value="D-" />
                  <Picker.Item label="F" value="F" />
                  <Picker.Item label="P" value="P" />
                  <Picker.Item label="NP" value="NP" />
                  <Picker.Item label="I" value="I" />
                  <Picker.Item label="W" value="W" />
                </Picker>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.buttonWrapper} >
          
          <Button title="Add Course" color="orange"  onPress={addRow} />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateGPA}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {gpa && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Total Credits: <Text style={styles.result}>{allCredit}</Text></Text>
            <Text style={styles.resultText}>Overall GPA: <Text style={styles.result}>{gpa}</Text></Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 50,
    borderColor: 'orange',
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerWrapper: {
    backgroundColor: 'orange',
    borderRadius: 5,
    width:'100%',
   
  },
  picker: {
    height: 50,
    width:'100%',
    color: 'white',
    borderRadius: 5,
  },
  buttonWrapper: {
    marginVertical: 5,
    borderRadius: 5,
    overflow: 'hidden',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calculateButton: {
    backgroundColor: 'orange',
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 50,
    marginTop:10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    fontWeight: 'bold',
    marginTop:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    borderRadius: 5,
  },
  resultText: {
    fontSize: 20,
    marginVertical: 5,
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    color: 'white',
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default GPACalculator;
