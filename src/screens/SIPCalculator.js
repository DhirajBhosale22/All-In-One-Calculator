import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Svg, Rect, G, Circle, Text as SvgText, Line } from 'react-native-svg';

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



const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [estimatedReturn, setEstimatedReturn] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [chartData, setChartData] = useState([]);

   // Create refs for the inputs
   const monthlyInvestmentRef = useRef(null);
   const expectedReturnRateRef = useRef(null);
   const timePeriodRef = useRef(null);
 

  // Function to calculate the SIP return
  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturnRate) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n)) {
      alert('Please fil all input fields correctly.');
      return;
    }

    // Formula for SIP: A = P * [ (1 + r)^n - 1] * (1 + r) / r
    const totalAmount = P * ((Math.pow(1 + r, n) - 1) * (1 + r)) / r;
    const investedAmount = P * n;
    const estimatedReturn = totalAmount - investedAmount;

    setInvestedAmount(Math.round(investedAmount));
    setEstimatedReturn(Math.round(estimatedReturn));
    setTotalAmount(Math.round(totalAmount));

    // Update chart data
    const updatedChartData = Array.from({ length: timePeriod }, (_, index) => {
      const year = index + 1;
      const invested = P * 12 * year;
      const returns = P * ((Math.pow(1 + r, year * 12) - 1) * (1 + r)) / r - P * year * 12;
      return { year, invested, returns };
    });

    setChartData(updatedChartData);
  };

  // Function to clear all inputs and results
  const clearAll = () => {
    setMonthlyInvestment('');
    setExpectedReturnRate('');
    setTimePeriod('');
    setInvestedAmount('');
    setEstimatedReturn('');
    setTotalAmount('');
    setChartData([]);
  };

  const StackedBarChart = ({ data }) => {
    const barWidth = 20;
    const chartHeight = 180;
    const maxAmount = Math.max(...data.map(item => item.invested + item.returns));

    return (
      <Svg height={chartHeight + 50} width={(data.length * barWidth + (data.length - 1) * 10) + 40}>
        {/* Y-Axis Labels */}
        {[...Array(5).keys()].map(i => (
          <SvgText
            key={i}
            x={10}
            y={(chartHeight - (i * chartHeight / 5)) + 7}
            fill="white"
            fontSize="12"
          >
            {(maxAmount * i / 5 / 100000).toFixed(1)} L
          </SvgText>
        ))}
        <SvgText
          x={10}
          y={(chartHeight - (5.9 * chartHeight / 6)) + 5.4}
          fill="white"
          fontSize="12"
        >
          {(maxAmount / 100000).toFixed(1)} L
        </SvgText>
        {/* Horizontal Dotted Lines */}
        {[...Array(6).keys()].map(i => (
          <Line
            key={i}
            x1={40}
            y1={(chartHeight - (i * chartHeight / 5))}
            x2={(data.length * barWidth + (data.length - 1) * 10) + 40}
            y2={(chartHeight - (i * chartHeight / 5))}
            stroke="white"
            strokeWidth="1"
            strokeDasharray="1"
          />
        ))}
        {/* X-Axis Labels */}
        {data.map((item, index) => (
          <SvgText
            key={index}
            x={40 + index * (barWidth + 10)}
            y={chartHeight + 20}
            fill="white"
            fontSize="12"
            textAnchor="middle"
          >
            {item.year}Y
          </SvgText>
        ))}

        {data.map((item, index) => {
          const investedHeight = (item.invested / maxAmount) * chartHeight;
          const returnsHeight = Math.max(0, (item.invested + item.returns - item.invested) / maxAmount * chartHeight);
          return (
            <G key={index} x={40 + (index * (barWidth + 10))}>
              <Rect
                y={chartHeight - investedHeight - returnsHeight}
                width={barWidth}
                height={returnsHeight}
                fill="orange"
              />
              <Rect
                y={chartHeight - investedHeight}
                width={barWidth}
                height={investedHeight}
                fill="white"
              />
            </G>
          );
        })}
      </Svg>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>SIP Calculator</Text>

        <Text style={styles.label}>Monthly Investment Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Monthly Investment"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={monthlyInvestment}
          onChangeText={setMonthlyInvestment}
          ref={monthlyInvestmentRef}
          returnKeyType="next"
          onSubmitEditing={() => expectedReturnRateRef.current.focus()}
          blurOnSubmit={false}
        />

        <Text style={styles.label}>Expected Return Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Expected Return Rate (%)"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={expectedReturnRate}
          onChangeText={setExpectedReturnRate}
          ref={expectedReturnRateRef}
          returnKeyType="next"
          onSubmitEditing={() => timePeriodRef.current.focus()}
          blurOnSubmit={false}
        />

        <Text style={styles.label}>Time Period (Years)</Text>
        <TextInput
          style={styles.input}
          placeholder="Time Period (Years)"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={timePeriod}
          onChangeText={setTimePeriod}
          ref={timePeriodRef}
          returnKeyType="done"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={calculateSIP}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.redButton]} onPress={clearAll}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>

        {chartData.length > 0 && (
          <View>
            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <Svg height={20} width={20}>
                  <Circle cx={10} cy={10} r={5} fill="white" />
                </Svg>
                <Text style={styles.legendText}>Total Investment</Text>
              </View>
              <View style={styles.legendItem}>
                <Svg height={20} width={20}>
                  <Circle cx={10} cy={10} r={5} fill="orange" />
                </Svg>
                <Text style={styles.legendText}>Estimated Return</Text>
              </View>
            </View>
            <View style={[styles.chartContainer, { overflow: 'scroll' }]}>
              <ScrollView horizontal={true}>
                <StackedBarChart data={chartData} />
              </ScrollView>
            </View>
          </View>
        )}

        {totalAmount ? (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultText, { color: 'orange' }]}>Total Investment:</Text>
            <Text style={styles.color}> ₹ {investedAmount.toLocaleString('en-IN')} ({convertToIndianWords(investedAmount)})</Text>
            <Text style={[styles.resultText, { color: 'orange' }]}>Interest Earned:</Text>
            <Text style={styles.color}> ₹ {estimatedReturn.toLocaleString('en-IN')} ({convertToIndianWords(estimatedReturn)})</Text>
            <Text style={[styles.resultText, { color: 'orange' }]}>Total Amount:</Text>
            <Text style={styles.color}> ₹ {totalAmount.toLocaleString('en-IN')} ({convertToIndianWords(totalAmount)})</Text>
           
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    borderColor: 'orange',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    width: '48%',
  },
  redButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  color: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});

export default SIPCalculator;
