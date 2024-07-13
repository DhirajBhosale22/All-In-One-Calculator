import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

// Function to convert number to Indian numbering system words
const convertToIndianWords = (number) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const numToWords = (num) => {
    if (num === 0) return '';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    const digit = num % 10;
    return `${tens[Math.floor(num / 10)]} ${ones[digit]}`.trim();
  };

  const inWords = (num) => {
    if (num === 0) return 'Zero';
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundreds = Math.floor((num % 1000) / 100);
    const remainder = num % 100;

    let words = '';
    if (crore > 0) {
      words += `${numToWords(crore)} Crore `;
    }
    if (lakh > 0) {
      words += `${numToWords(lakh)} Lakh `;
    }
    if (thousand > 0) {
      words += `${numToWords(thousand)} Thousand `;
    }
    if (hundreds > 0) {
      words += `${numToWords(hundreds)} Hundred `;
    }
    if (remainder > 0) {
      words += numToWords(remainder);
    }

    return words.trim();
  };

  return inWords(number);
};

const HomeBudgetCalculator = () => {
  const [income, setIncome] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [groceryAmount, setGroceryAmount] = useState('');
  const [healthcareAmount, setHealthcareAmount] = useState('');
  const [utilitiesAmount, setUtilitiesAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);


   // Refs for input fields
   const rentRef = useRef(null);
   const groceryRef = useRef(null);
   const healthcareRef = useRef(null);
   const utilitiesRef = useRef(null);
   const otherRef = useRef(null);
 
   // Function to handle tab navigation
   const handleTabNavigation = (nextRef) => {
     nextRef.current.focus();
   };


  const handleAddIncome = () => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      setTotalIncome(totalIncome + incomeValue);
      setIncome('');
    }
  };

  const handleAddExpenses = () => {
    const newExpenses = [
      { name: 'Rent', amount: parseFloat(rentAmount) },
      { name: 'Groceries', amount: parseFloat(groceryAmount) },
      { name: 'Healthcare', amount: parseFloat(healthcareAmount) },
      { name: 'Utilities', amount: parseFloat(utilitiesAmount) },
      { name: 'Other', amount: parseFloat(otherAmount) },
    ];

    const updatedExpenses = [...expenses];
    let newTotalExpenses = totalExpenses;

    newExpenses.forEach(newExpense => {
      if (!isNaN(newExpense.amount)) {
        const existingExpenseIndex = updatedExpenses.findIndex(expense => expense.name === newExpense.name);
        if (existingExpenseIndex > -1) {
          newTotalExpenses -= updatedExpenses[existingExpenseIndex].amount;
          updatedExpenses[existingExpenseIndex].amount = newExpense.amount;
        } else {
          updatedExpenses.push(newExpense);
        }
        newTotalExpenses += newExpense.amount;
      }
    });

    setExpenses(updatedExpenses);
    setTotalExpenses(newTotalExpenses);

    // Clear input values after adding expenses
    setRentAmount('');
    setGroceryAmount('');
    setHealthcareAmount('');
    setUtilitiesAmount('');
    setOtherAmount('');
  };

  const budget = totalIncome - totalExpenses;

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseName}>{item.name}</Text>
      <Text style={styles.expenseAmount}>₹ {Math.round(item.amount)}</Text>
    </View>
  );

  const data = [
    { key: 'header', type: 'header' },
    { key: 'income', type: 'income' },
    { key: 'expenses', type: 'expenses' },
    { key: 'results', type: 'results' },
    ...expenses.map((expense, index) => ({ ...expense, key: `expense-${index}`, type: 'expense' })),
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <Text style={styles.header}>Home Budget Calculator</Text>;
      case 'income':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Income:</Text>
              <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={income}
              onChangeText={setIncome}
              onSubmitEditing={() => handleTabNavigation(rentRef)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Income" onPress={handleAddIncome} color={'orange'} />
            </View>
          </View>
        );
      case 'expenses':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Expense:</Text>
            <Text style={styles.label1}>Rent</Text>
            <TextInput
              ref={rentRef}
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={rentAmount}
              onChangeText={setRentAmount}
              onSubmitEditing={() => handleTabNavigation(groceryRef)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Text style={styles.label1}>Groceries</Text>
            <TextInput
              ref={groceryRef}
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={groceryAmount}
              onChangeText={setGroceryAmount}
              onSubmitEditing={() => handleTabNavigation(healthcareRef)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Text style={styles.label1}>Healthcare</Text>
            <TextInput
              ref={healthcareRef}
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={healthcareAmount}
              onChangeText={setHealthcareAmount}
              onSubmitEditing={() => handleTabNavigation(utilitiesRef)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Text style={styles.label1}>Utilities</Text>
            <TextInput
              ref={utilitiesRef}
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={utilitiesAmount}
              onChangeText={setUtilitiesAmount}
              onSubmitEditing={() => handleTabNavigation(otherRef)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Text style={styles.label1}>Other</Text>
            <TextInput
              ref={otherRef}
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={otherAmount}
              onChangeText={setOtherAmount}
             returnKeyType="done"
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Expense" onPress={handleAddExpenses} color={'orange'} />
            </View>
          </View>
        );
      case 'results':
        return (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>Total Income: <Text style={styles.resulttext}> ₹ {totalIncome.toLocaleString('en-IN')} ({convertToIndianWords(totalIncome)})</Text> </Text>
            <Text style={styles.result}>Total Expenses: <Text style={styles.resulttext}> ₹ {totalExpenses.toLocaleString('en-IN')} ({convertToIndianWords(totalExpenses)})</Text> </Text>
            <Text style={styles.result}>Budget: <Text style={styles.resulttext}> ₹ {budget.toLocaleString('en-IN')} ({convertToIndianWords(budget)})</Text> </Text>
          </View>
        );
      case 'expense':
        return renderExpenseItem({ item });
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.key}-${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  label1: {
    fontSize: 17,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  resultContainer: {
    marginTop: 20,
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
    color: 'orange',
    fontWeight: 'bold',
  },
  resulttext: {
    color: 'white',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  expenseName: {
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
  },
  expenseAmount: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeBudgetCalculator;
