import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import calendardays from '../assets/images/calendardays.png';
import moment from 'moment';

const DateDiff = () => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [difference, setDifference] = useState({ years: 0, months: 0, days: 0 });

    const calculateDifference = () => {
        const from = moment(fromDate);
        const to = moment(toDate);
        
        const years = to.diff(from, 'year');
        from.add(years, 'years');

        const months = to.diff(from, 'months');
        from.add(months, 'months');

        const days = to.diff(from, 'days');

        setDifference({
            years,
            months,
            days,
        });
    };

    const clearFields = () => {
        setFromDate(new Date());
        setToDate(new Date());
        setDifference({ years: 0, months: 0, days: 0 });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Date Difference</Text>
            </View>
            <View style={styles.datePickerContainer}>
                <Text style={styles.label}>Select Start Date</Text>
                <View style={styles.dateRow}>
                    <TouchableOpacity onPress={() => setShowFromPicker(true)}>
                        <Text style={styles.dateText}>{fromDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <Text>  </Text>
                    <TouchableOpacity onPress={() => setShowFromPicker(true)}>
                        <Image source={calendardays} style={styles.calendarIcon} />
                    </TouchableOpacity>
                </View>
                {showFromPicker && (
                    <DateTimePicker
                        value={fromDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowFromPicker(false);
                            if (selectedDate) {
                                setFromDate(selectedDate);
                            }
                        }}
                    />
                )}
            </View>
            <View style={styles.datePickerContainer}>
                <Text style={styles.label}>Select End Date</Text>
                <View style={styles.dateRow}>
                    <TouchableOpacity onPress={() => setShowToPicker(true)}>
                        <Text style={styles.dateText}>{toDate.toDateString()}</Text>
                    </TouchableOpacity>
                    <Text>  </Text>
                    <TouchableOpacity onPress={() => setShowToPicker(true)}>
                        <Image source={calendardays} style={styles.calendarIcon} />
                    </TouchableOpacity>
                </View>
                {showToPicker && (
                    <DateTimePicker
                        value={toDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowToPicker(false);
                            if (selectedDate) {
                                setToDate(selectedDate);
                            }
                        }}
                    />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.calculateButton} onPress={calculateDifference}>
                    <Text style={styles.buttonText}>CALCULATE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
                    <Text style={styles.buttonText}>CLEAR ALL</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.differenceContainer}>
                <Text style={styles.differenceText}>Difference</Text>
                <View style={styles.differenceValues}>
                    <Text style={styles.valueText}>Years: {difference.years}</Text>
                    <Text style={styles.valueText}>Months: {difference.months}</Text>
                    <Text style={styles.valueText}>Days: {difference.days}</Text>
                </View>
                <View style={styles.dateInfo}>
                    <Text style={styles.dateInfoText}>From {fromDate.toDateString()}</Text>
                    <Text style={styles.dateInfoText}>To {toDate.toDateString()}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    datePickerContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontSize: 18,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: 'orange',
        fontSize: 18,
    },
    calendarIcon: {
        width: 24,
        height: 24,
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    calculateButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    differenceContainer: {
        backgroundColor: 'orange',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    differenceText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 10,
    },
    differenceValues: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    valueText: {
        color: 'white',
        fontSize: 18,
    },
    dateInfo: {
        alignItems: 'center',
    },
    dateInfoText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DateDiff;
