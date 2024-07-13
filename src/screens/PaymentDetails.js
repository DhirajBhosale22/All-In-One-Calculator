import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Svg, Text as SvgText, G } from 'react-native-svg';

const PaymentDetails = ({ route }) => {
  const { paymentChart } = route.params;

  // Calculate total principal and interest
  const totalPrincipal = paymentChart.reduce((acc, item) => acc + parseFloat(item.principalPaid), 0);
  const totalInterest = paymentChart.reduce((acc, item) => acc + parseFloat(item.interest), 0);
  const totalAmount = totalPrincipal + totalInterest;

  const donutData = [
    {
      key: 'Principal',
      value: Math.round(totalPrincipal),
      svg: { fill: 'orange' },
      percentage: Math.round((totalPrincipal / totalAmount) * 100),
    },
    {
      key: 'Interest',
      value: Math.round(totalInterest),
      svg: { fill: 'white' },
      percentage: Math.round((totalInterest / totalAmount) * 100),
    },
  ];

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <G key={index}>
          <SvgText
            x={pieCentroid[0]}
            y={pieCentroid[1] - 5}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={14}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {data.value}
          </SvgText>
          <SvgText
            x={pieCentroid[0]}
            y={pieCentroid[1] + 15}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {`${data.percentage}%`}
          </SvgText>
        </G>
      );
    });
  };

  const renderHeader = () => (
    <>
      <View style={styles.chartContainer}>
        {/* Donut Pie Chart */}
        <PieChart
          style={{ width: '100%', height: 300 }}
          outerRadius={'80%'}
          innerRadius={'35%'}
          data={donutData}
        >
          <Labels />
        </PieChart>
        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <View style={[styles.legendBox, { backgroundColor: 'orange' }]} />
            <Text style={styles.legendText}>Principal</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendBox, { backgroundColor: 'white' }]} />
            <Text style={styles.legendText}>Interest</Text>
          </View>
        </View>
      </View>
      <View style={styles.paymentChartHeader}>
        <Text style={[styles.paymentChartHeaderText, styles.headerCell]}>Month</Text>
        <Text style={[styles.paymentChartHeaderText, styles.headerCell]}>Principal Paid</Text>
        <Text style={[styles.paymentChartHeaderText, styles.headerCell]}>Interest</Text>
        <Text style={[styles.paymentChartHeaderText, styles.headerCell]}>Total Payment</Text>
        <Text style={[styles.paymentChartHeaderText, styles.headerCell]}>Balance</Text>
      </View>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.paymentChartContainer}
      data={paymentChart}
      renderItem={({ item }) => (
        <View style={styles.paymentChartRow}>
          <Text style={[styles.paymentChartText, styles.cell]}>{item.month}</Text>
          <Text style={[styles.paymentChartText, styles.cell]}>₹ {Math.round(item.principalPaid)}</Text>
          <Text style={[styles.paymentChartText, styles.cell]}>₹ {Math.round(item.interest)}</Text>
          <Text style={[styles.paymentChartText, styles.cell]}>₹ {Math.round(item.totalPayment)}</Text>
          <Text style={[styles.paymentChartText, styles.cell]}>₹ {Math.round(item.balance)}</Text>
        </View>
      )}
      keyExtractor={(item) => item.month.toString()}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'orange',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  paymentChartContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 0,
    backgroundColor: 'black',
  },
  paymentChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paymentChartHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  paymentChartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  paymentChartText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  headerCell: {
    paddingHorizontal: 5,
  },
  cell: {
    paddingHorizontal: 5,
  },
  separator: {
    height: 1,
    backgroundColor: 'orange',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PaymentDetails;
