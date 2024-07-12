import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { evaluate } from 'mathjs';
import timepast from '../assets/images/timepast.png'; // Adjust the path according to your project structure

const Calculator = () => {
  const [expression, setExpression] = useState('0');
  const [newInputFlag, setNewInputFlag] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [memory, setMemory] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const editInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const renderButton1 = (label, onPress, style = {}, textStyle = {}) => {
    if (label === 'History') {
      return (
        <TouchableOpacity onPress={() => setIsHistoryVisible(true)} style={[styles.button, style]}>
          <Image source={timepast} style={styles.historyIconImage} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => onPress(label)} style={[styles.button, style]}>
          <Text style={[styles.buttonText, textStyle]}>{label}</Text>
        </TouchableOpacity>
      );
    }
  };

  const handleInput = useCallback((value) => {
    setExpression((prevExpression) => {
      if (value === '.' && prevExpression.slice(-1) === '.') return prevExpression;
      if (newInputFlag) {
        setNewInputFlag(false);
        return value;
      }
      return prevExpression === '0' && value !== '.' ? value : prevExpression + value;
    });
  }, [newInputFlag]);

  const handleOperation = useCallback((value) => {
    if (value === 'AC') {
      setExpression('0');
      setNewInputFlag(false);
      return;
    }
    if (value === '←') {
      setExpression((prevExpression) => {
        const newExpression = prevExpression.length > 1 ? prevExpression.slice(0, -1) : '0';
        setNewInputFlag(false);
        return newExpression;
      });
      return;
    }
    if (value === '=') {
      let trimmedExpression = expression.replace(/[+\-*\/]$/, '');
      try {
        const result = evaluate(trimmedExpression);
        const historyItem = `${trimmedExpression} = ${result}`;
        setHistory((prevHistory) => {
          if (editIndex !== null) {
            const updatedHistory = [...prevHistory];
            updatedHistory[editIndex] = historyItem;
            setEditIndex(null);
            return updatedHistory;
          }
          return [...prevHistory, historyItem];
        });
        setExpression(result.toString());
        setNewInputFlag(true);
      } catch (e) {
        setExpression('Error');
        setNewInputFlag(true);
      }
      return;
    }
    setExpression((prevExpression) => {
      if (newInputFlag) {
        setNewInputFlag(false);
        return prevExpression + value;
      }
      return prevExpression + value;
    });
  }, [expression, editIndex, newInputFlag]);

  const handleMemoryOperation = useCallback((operation) => {
    const currentInput = parseFloat(expression);
    setMemory((prevMemory) => {
      switch (operation) {
        case 'MS':
          return currentInput;
        case 'MC':
          return 0;
        case 'MR':
          setExpression(prevMemory.toString());
          setNewInputFlag(true);
          return prevMemory;
        case 'M+':
          return prevMemory + currentInput;
        case 'M-':
          return prevMemory - currentInput;
        default:
          return prevMemory;
      }
    });
  }, [expression]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const editHistoryItem = useCallback((index) => {
    setEditIndex(index);
    const historyItem = history[index];
    if (historyItem) {
      const expressionIndex = historyItem.indexOf('=');
      const expressionToEdit = historyItem.substring(0, expressionIndex).trim();
      setExpression(expressionToEdit);
      setIsHistoryVisible(false);
      setTimeout(() => {
        if (editInputRef.current) {
          editInputRef.current.focus();
        }
      }, 100);
    }
  }, [history]);

  const updateHistoryItem = useCallback((newItem) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      updatedHistory[editIndex] = newItem;
      return updatedHistory;
    });
    setExpression(newItem);
    setEditIndex(null);
    setIsHistoryVisible(false);
  }, [editIndex]);

  const renderItem = useCallback(({ item, index }) => {
    const handleEdit = () => {
      editHistoryItem(index);
    };

    const handleUpdate = () => {
      updateHistoryItem(`${expression} = ${evaluate(expression)}`);
    };

    if (editIndex === index) {
      return (
        <View style={styles.editableItem}>
          <TextInput
            ref={editInputRef}
            style={styles.editableTextInput}
            value={expression}
            onChangeText={setExpression}
            onSubmitEditing={handleUpdate}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.historyItemContainer}
          onPress={handleEdit}
        >
          <Text style={styles.historyItemText}>{item}</Text>
        </TouchableOpacity>
      );
    }
  }, [editHistoryItem, updateHistoryItem, editIndex, expression]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [expression]);

  const memoizedHistory = useMemo(() => history, [history]);

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <View style={styles.display}>
          <TextInput
            ref={editInputRef}
            style={styles.displayText}
            value={expression}
            onChangeText={(text) => setExpression(text)}
            keyboardType="numeric"
            showSoftInputOnFocus={false}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="bottom"
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={isHistoryVisible}
        onRequestClose={() => setIsHistoryVisible(!isHistoryVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.historyTitle}>Calculation History:</Text>
            <FlatList
              data={memoizedHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
            <TouchableOpacity onPress={clearHistory} style={styles.clearHistoryButton}>
              <Text style={styles.clearHistoryButtonText}>Clear History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsHistoryVisible(false)} style={styles.closeHistoryButton}>
              <Text style={styles.closeHistoryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.row}>
        {renderButton1('History', handleOperation, styles.operatorButton)}
        {renderButton('AC', handleOperation, styles.operatorButton)}
        {renderButton('←', handleOperation, styles.operatorButton)}
        {renderButton('%', handleOperation, styles.operatorButton)}
        {renderButton('/', handleOperation, styles.operatorButton)}
      </View>
      <View style={styles.row}>
        {renderButton('MC', handleMemoryOperation, styles.operatorButton)}
        {renderButton('7', handleInput)}
        {renderButton('8', handleInput)}
        {renderButton('9', handleInput)}
        {renderButton('*', handleOperation, styles.operatorButton)}
      </View>
      <View style={styles.row}>
        {renderButton('MR', handleMemoryOperation, styles.operatorButton)}
        {renderButton('4', handleInput)}
        {renderButton('5', handleInput)}
        {renderButton('6', handleInput)}
        {renderButton('-', handleOperation, styles.operatorButton)}
      </View>
      <View style={styles.row}>
        {renderButton('M+', handleMemoryOperation, styles.operatorButton)}
        {renderButton('1', handleInput)}
        {renderButton('2', handleInput)}
        {renderButton('3', handleInput)}
        {renderButton('+', handleOperation, styles.operatorButton)}
      </View>
      <View style={styles.row}>
        {renderButton('M-', handleMemoryOperation, styles.operatorButton)}
        {renderButton('MS', handleMemoryOperation, styles.operatorButton)}
        {renderButton('0', handleInput)}
        {renderButton('.', handleInput)}
        {renderButton('=', handleOperation, styles.equalsButton)}
      </View>
    </View>
  );
};

const renderButton = (value, onPress, buttonStyle = styles.button) => (
  <TouchableOpacity
    key={value}
    style={buttonStyle}
    onPress={() => onPress(value)}
  >
    <Text style={styles.buttonText}>{value}</Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    

    margin:2,
  },
  displayContainer: {
    padding: 5,
    backgroundColor: 'black',
   
  },
  display: {
    backgroundColor: 'white',
    borderRadius: 5,
    minHeight: 100,
    justifyContent: 'center',
    padding: 5,
  },
  displayText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
 
  equalsButton: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 10,
  },
  operatorButton: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItemContainer: {
    paddingVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  historyItemText: {
    fontSize: 16,
  },
  clearHistoryButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  clearHistoryButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  closeHistoryButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  
  historyIconImage: {
    width: 30,
    height: 30,
  },
  closeHistoryButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  editableItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editableTextInput: {
    flex: 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginRight: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Calculator;
