import React, { useState, useMemo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

const ScientificCalculator = () => {
const [input, setInput] = useState('');
const [expression, setExpression] = useState('');
const [history, setHistory] = useState<string[]>([]);
const [isDeg, setIsDeg] = useState(true); // Track degree/radian mode
const [isResult, setIsResult] = useState(false);

const handleInput = (value: string) => {
if (isResult) {
setInput(value);
setIsResult(false);
} else if (input === '0' || input === '') {
setInput(value);
} else {
const lastChar = input.slice(-1);
if (lastChar === 'π' && /\d/.test(value)) {
setInput(prevInput => prevInput + '*' + value); // Insert '*' before the number
} else if (/\d/.test(lastChar) && value === 'π') {
setInput(prevInput => prevInput + '*' + value); // Insert '*' before 'π'
} else {
setInput(prevInput => prevInput + value);
}
}
};

const handleOperation = (value: string) => {
if (value === 'AC') {
setInput('');
setExpression('');
setHistory(prevHistory => prevHistory.slice(0, -1));
setIsResult(false);
} else if (value === 'BACK') {
if (input === 'Error' || isResult) {
setInput('');
setIsResult(false);
} else if (input.length > 0) {
const lastChar = input.slice(-1);
if (/\d|\)/.test(lastChar)) {
setInput(input.slice(0, -1));
} else if (lastChar === '*' && input.slice(-2) === '**') {
setInput(input.slice(0, -2));
} else if (lastChar === '(') {
const functionPattern = /(sin|cos|tan|sin-1|cos-1|tan-1|exp|log|ln|sqrt|1\/|³√)\($/;
const match = input.match(functionPattern);
if (match) {
setInput(input.slice(0, -match[0].length));
} else {
setInput(input.slice(0, -1));
}
} else {
setInput(input.slice(0, -1));
}
}
} else if (value === '=') {
calculateResult();
} else if (value === 'x!') {
setInput(prevInput => prevInput + '!');
} else if (value === 'Ans') {
if (history.length > 0) {
const lastResult = history[history.length - 1];
const resultValue = lastResult.split(' ')[2];
setInput(resultValue);
setIsResult(true);
}
} else {
// Handle continuing calculations after pressing '='
if (isResult) {
setExpression(input); // Set the current result as the expression
setInput(input + value); // Start a new operation with the previous result
setIsResult(false); // Reset isResult flag
} else {
setInput(prevInput => prevInput + value); // Continue adding to the current input
}
}
};


const calculateResult = () => {
try {
let expr = input;
expr = expr.replace(/³√\(([^)]+)\)/g, (match, p1) => Math.cbrt(eval(p1)).toString());
expr = expr.replace(/π/g, Math.PI.toString());
expr = expr.replace(/(\d+)!/g, (match, num) => factorial(parseInt(num)).toString());
expr = expr.replace(/x\^y/g, '**');
expr = expr.replace(/÷/g, '/').replace(/×/g, '*');
expr = expr.replace(/([0-9]+)(sin|cos|tan|sin-1|cos-1|tan-1|exp|log|ln|sqrt|1\/)/g, '$1*$2'); // Automatically add multiplication sign before functions
expr = expr.replace(/(sin|cos|tan|sin-1|cos-1|tan-1|exp|log|ln|sqrt|1\/)\(([^)]+)\)([0-9]+)/g, '$1($2)*$3'); // Automatically add multiplication sign after functions

expr = expr.replace(/sin\(([^)]+)\)/g, (match, p1) => adjustTrigResult(Math.sin(isDeg ? toRadians(eval(p1)) : eval(p1))).toString());
expr = expr.replace(/cos\(([^)]+)\)/g, (match, p1) => adjustTrigResult(Math.cos(isDeg ? toRadians(eval(p1)) : eval(p1))).toString());



expr = expr.replace(/tan\(([^)]+)\)/g, (match, p1) => {
const angle = isDeg ? toRadians(eval(p1)) : eval(p1);
if (Math.abs(angle % Math.PI - Math.PI / 2) < 1e-10) {
throw new Error("Not defined");
}
return adjustTrigResult(Math.tan(angle)).toString();
});
expr = expr.replace(/sin-1\(([^)]+)\)/g, (match, p1) => adjustTrigResult(isDeg ? toDegrees(Math.asin(eval(p1))) : Math.asin(eval(p1))).toString());
expr = expr.replace(/cos-1\(([^)]+)\)/g, (match, p1) => adjustTrigResult(isDeg ? toDegrees(Math.acos(eval(p1))) : Math.acos(eval(p1))).toString());
expr = expr.replace(/tan-1\(([^)]+)\)/g, (match, p1) => adjustTrigResult(isDeg ? toDegrees(Math.atan(eval(p1))) : Math.atan(eval(p1))).toString());
expr = expr.replace(/exp\(([^)]+)\)/g, (match, p1) => Math.exp(eval(p1)).toString());
expr = expr.replace(/log\(([^)]+)\)/g, (match, p1) => Math.log10(eval(p1)).toString());
expr = expr.replace(/ln\(([^)]+)\)/g, (match, p1) => Math.log(eval(p1)).toString());
expr = expr.replace(/√\(([^)]+)\)/g, (match, p1) => Math.sqrt(eval(p1)).toString());

expr = expr.replace(/1\/\(([^)]+)\)/g, (match, p1) => (1 / eval(p1)).toString());

expr = expr.replace(/%/g, '/100'); // Convert percentages to decimal form
const result = eval(expr);
setExpression(`${input} = ${result}`);
setInput(result.toString());
setHistory(prevHistory => [...prevHistory, `${input} = ${result}`]);
setIsResult(true);
} catch (error) {
if (error.message === "Not defined") {
setInput("Not defined");
} else {
setInput('Error');
}
}
};

const toRadians = (angle: number): number => {
return angle * (Math.PI / 180);
};

const toDegrees = (angle: number): number => {
return angle * (180 / Math.PI);
};

const factorial = (n: number): number => {
if (n < 0) return NaN;
if (n <= 1) return 1;
let result = 1;
for (let i = 2; i <= n; i++) {
result *= i;
}
return result;
};

const adjustTrigResult = (result: number): number => {
return Math.abs(result) < 1e-10 ? 0 : parseFloat(result.toFixed(10));
};

const renderButton = (label: string, onPress: (value: string) => void, style: object = {}, textStyle: object = {}) => (
<TouchableOpacity onPress={() => onPress(label)} style={[styles.button, style]}>
<Text style={[styles.buttonText, textStyle]}>{label}</Text>
</TouchableOpacity>
);

const handleTrigFunction = (func: string, displaySymbol?: string) => {
if (isResult) {
setInput(prevInput => prevInput + `*${displaySymbol || func}(`);
setIsResult(false);
} else {
const lastChar = input.slice(-1);
if (!/\d|\)/.test(lastChar)) {
setInput(prevInput => `${prevInput}${displaySymbol || func}(`);
} else {
const trimmedInput = input.trim();
const lastNumberIndex = trimmedInput.lastIndexOf(/[0-9]/);
const lastNumber = trimmedInput.substring(lastNumberIndex);
setInput(prevInput => `${lastNumber}*${displaySymbol || func}(`);
}
}
};


const handleDegRadToggle = () => {
setIsDeg(!isDeg);
};

return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.display}>
          <Text style={styles.expressionText}>{expression}</Text>
          <TextInput
          value={input}
          onChangeText={handleInput}
          placeholder="0"
          placeholderTextColor="#ccc"
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          keyboardType="numeric"
          showSoftInputOnFocus={false}
          textAlignVertical="bottom"
          autoCapitalize="none"
          autoFocus={true}
          
        />
        </View>
        </ScrollView>
      </View>

<View style={styles.buttonsContainer}>
<View style={styles.row}>
{renderButton('sin', () => handleTrigFunction('sin'), { flex: 1 })}
{renderButton('cos', () => handleTrigFunction('cos'), { flex: 1 })}
{renderButton('tan', () => handleTrigFunction('tan'), { flex: 1 })}
<View style={[styles.button, { flex: 1 }]}>
<TouchableOpacity onPress={handleDegRadToggle}>
<Text style={styles.buttonText}>{isDeg ? 'Deg' : 'Rad'}</Text>
</TouchableOpacity>
</View>
</View>
<View style={styles.row}>
{renderButton('sin⁻¹', () => handleTrigFunction('sin-1'), { flex: 1 })}
{renderButton('cos⁻¹', () => handleTrigFunction('cos-1'), { flex: 1 })}
{renderButton('tan⁻¹', () => handleTrigFunction('tan-1'), { flex: 1 })}
{renderButton('π', () => handleInput('π'),{ flex: 1 })}
{renderButton('e', () => setInput(prevInput => prevInput + Math.E.toString()), { flex: 1 })}
</View>
<View style={styles.row}>
{renderButton('xʸ', () => handleOperation('x^y'), { flex: 1 })}
{renderButton('x³', () => setInput(prevInput => prevInput + '**3'), { flex: 1 })}
{renderButton('x²', () => setInput(prevInput => prevInput + '**2'), { flex: 1 })}
{renderButton('eˣ', () => handleTrigFunction('exp'), { flex: 1 })}
{renderButton('10ˣ', () => setInput(prevInput => prevInput + '10**'), { flex: 1 })}
</View>
<View style={styles.row}>
{renderButton('ʸ√x', () => setInput(prevInput => prevInput + '**(1/'), { flex: 1 })}
{renderButton('³√x', () => handleTrigFunction('³√'), { flex: 1 })}
{renderButton('√x', () => handleTrigFunction('sqrt', '√'), { flex: 1 })}
{renderButton('ln', () => handleTrigFunction('ln'), { flex: 1 })}
{renderButton('log', () => handleTrigFunction('log'), { flex: 1 })}
</View>
<View style={styles.row}>
{renderButton('(', () => handleInput('('))}
{renderButton(')', () => handleInput(')'))}
{renderButton('1/x', () => handleTrigFunction('1/'), { flex: 1 })}
{renderButton('%', () => handleOperation('%'), { flex: 1 })}
{renderButton('x!', () => handleOperation('x!'), { flex: 1 })}
</View>
<View style={styles.row}>
{renderButton('7', () => handleInput('7'))}
{renderButton('8', () => handleInput('8'))}
{renderButton('9', () => handleInput('9'))}
{renderButton('+', () => handleOperation('+'), styles.operatorButton)}
{renderButton('BACK', () => handleOperation('BACK'), {...styles.operatorButton1, ...styles.boldText}, { color: 'white' })}
</View>
<View style={styles.row}>
{renderButton('4', () => handleInput('4'))}
{renderButton('5', () => handleInput('5'))}
{renderButton('6', () => handleInput('6'))}
{renderButton('-', () => handleOperation('-'), styles.operatorButton)}
{renderButton('Ans', () => handleOperation('Ans'), styles.operatorButton)}
</View>
<View style={styles.row}>
{renderButton('1', () => handleInput('1'))}
{renderButton('2', () => handleInput('2'))}
{renderButton('3', () => handleInput('3'))}
{renderButton('×', () => handleOperation('*'), styles.operatorButton)}
</View>
<View style={styles.row}>
{renderButton('0', () => handleInput('0'))}
{renderButton('.', () => handleInput('.'))}
{renderButton('÷', () => handleOperation('/'), styles.operatorButton)}
</View>
<View style={styles.row}>
{renderButton('Rnd', () => setInput(prevInput => prevInput + ' 0.8324366828'), { flex: 1 })}
{renderButton('AC', () => handleOperation('AC'), {...styles.operatorButton1}, { color: 'white' })}
{renderButton('=', () => handleOperation('='), { flex: 1 }, { fontSize: 24 })}
</View>
</View>
</View>
);
};

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: 200,
        width:'100%',  // Adjust max height based on your design
       
       
      },
container: {
flex: 1,
// justifyContent: 'center',
backgroundColor: '#000',

},
displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    margin:5,
    
   
  },
display: {
    
    backgroundColor: 'white',
    borderRadius: 10,
   
    width: '100%',
    alignItems: 'flex-end',
    height: '100%',
    //  marginBottom:20,
   
},
input: {
    height: 140,  // Adjust height based on your design
    fontSize: 24,
    alignItems: 'flex-end',  // Start input from the top
  },

expressionText: {
    color: '#777',
    fontSize: 20,
    marginTop:25,
   
},
buttonsContainer: {
    flex: 3,
    backgroundColor: 'black',
},
row: {
    flex: 1,
    flexDirection: 'row',
},
button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'white',

},
buttonText: {
fontSize: 20,
color: '#ffa500',
fontWeight: 'bold',

},
operatorButton: {
    fontSize: 20,
    color: '#ffa500',
    fontWeight: 'bold',
    
},
operatorButton1: {
backgroundColor: 'red',
fontSize: 20,
},

});

export default ScientificCalculator;