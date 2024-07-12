import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Svg, Rect, G, Text as SvgText, Line, Circle } from "react-native-svg";

const InvestmentScreen = () => {
  const [investmentType, setInvestmentType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");
  const [totalInvestment, setTotalInvestment] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [result, setResult] = useState("");
  const [chartData, setChartData] = useState([]);

  const amountRef = useRef(null);
  const interestRateRef = useRef(null);
  const durationRef = useRef(null);

  const handleTabPress = (currentRef) => {
    if (currentRef === amountRef.current) {
      interestRateRef.current.focus();
    } else if (currentRef === interestRateRef.current) {
      durationRef.current.focus();
    } 
  };
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



  const calculateInvestment = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(duration);
    let maturityAmount = 0;
    let totalInvested = 0;
    let monthlyRate;

    if (investmentType === "one-time") {
      const timesCompoundedPerYear = 1;
      maturityAmount = principal * Math.pow(1 + annualRate / timesCompoundedPerYear, timesCompoundedPerYear * years);
      totalInvested = principal;
    } else if (investmentType === "recurring") {
      monthlyRate = annualRate / 12;
      const numberOfMonths = years * 12;
      for (let i = 0; i < numberOfMonths; i++) {
        maturityAmount += principal * Math.pow(1 + monthlyRate, numberOfMonths - i);
      }
      totalInvested = principal * numberOfMonths;
    }

    const interestEarned = maturityAmount - totalInvested;

    setResult(`Maturity Amount:  ${Math.round(maturityAmount).toLocaleString('en-IN')} (${convertToIndianWords(Math.round(maturityAmount))})`);
    setTotalInvestment(`Total Investment Till Now:  ${Math.round(totalInvested).toLocaleString('en-IN')} (${convertToIndianWords(Math.round(totalInvested))})`);
    setInterestAmount(`Interest Earned:  ${Math.round(interestEarned).toLocaleString('en-IN')} (${convertToIndianWords(Math.round(interestEarned))})`);
    
    // Update chart data
    const updatedChartData = Array.from({ length: years }, (_, index) => {
      const year = index + 1;
      const invested = investmentType === "one-time" ? principal : principal * 12 * year;
      const returns = investmentType === "one-time"
        ? principal * Math.pow(1 + annualRate, year) - invested
        : principal * ((Math.pow(1 + monthlyRate, year * 12) - 1) * (1 + monthlyRate)) / monthlyRate - invested;
      return { year, invested, returns };
    });

    setChartData(updatedChartData);
  };

  const clearFields = () => {
    setAmount("");
    setInterestRate("");
    setDuration("");
    setResult("");
    setTotalInvestment("");
    setInterestAmount("");
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
            {(maxAmount * i / 5 / 100000).toFixed(1)}L
          </SvgText>
        ))}
        <SvgText
          x={10}
          y={(chartHeight - (5.9 * chartHeight / 6)) + 5.4}
          fill="white"
          fontSize="12"
        >
          {(maxAmount / 100000).toFixed(1)}L
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
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.header}>Investment Calculator</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          onPress={() => setInvestmentType("one-time")}
          style={styles.radioButton}
        >
          <View
            style={[
              styles.radioCircle,
              investmentType === "one-time" && styles.selectedRadio,
            ]}
          />
          <Text style={styles.radioText}>One-time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setInvestmentType("recurring")}
          style={styles.radioButton}
        >
          <View
            style={[
              styles.radioCircle,
              investmentType === "recurring" && styles.selectedRadio,
            ]}
          />
          <Text style={styles.radioText}>Recurring</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>
        {investmentType === "one-time" ? "Total Investment(₹)" : "Monthly Investment(₹)"}
      </Text>
      <TextInput
        ref={amountRef}
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        returnKeyType="next"
        onSubmitEditing={() => handleTabPress(amountRef.current)}
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Interest Rate (%)</Text>
      <TextInput
        ref={interestRateRef}
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter annual rate"
        keyboardType="numeric"
        value={interestRate}
        onChangeText={setInterestRate}
        returnKeyType="next"
        onSubmitEditing={() => handleTabPress(interestRateRef.current)}
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Duration (years)</Text>
      <TextInput
        ref={durationRef}
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter duration in years"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        returnKeyType="done"
        onSubmitEditing={() => handleTabPress(durationRef.current)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateInvestment}
        >
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
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

<View style={styles.resultContainer}>
  {totalInvestment && (
    <>
      <Text style={[styles.resultText, { color: 'orange' }]}>Total Investment:</Text>
      <Text style={styles.color}> ₹{totalInvestment.split(": ")[1]}</Text>
    </>
  )}
  {interestAmount && (
    <>
      <Text style={[styles.resultText, { color: 'orange' }]}>Interest Earned:</Text>
      <Text style={styles.color}> ₹{interestAmount.split(": ")[1]}</Text>
    </>
  )}
  {result && (
    <>
      <Text style={[styles.resultText, { color: 'orange' }]}>Maturity Amount:</Text>
      <Text style={styles.color}> ₹{result.split(": ")[1]}</Text>
    </>
  )}
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,

  },
  contentContainer: {
    
    paddingBottom: 20,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,

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
  calculateButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
    fontWeight: "bold",

  },
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,

  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  resultContainer: {
    marginTop: 20,

  },
  resultText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,

  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,

  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
  selectedRadio: {
    backgroundColor: "orange",

  },
  radioText: {
    color: "white",
    marginLeft: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
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
  color: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});

export default InvestmentScreen;
