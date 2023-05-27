import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Card, useTheme} from 'react-native-paper';
import {chartConfig} from '../utils/chartConfig';
export interface CardDProps {
  /**
   * Divisa/indicadores financieros
   */
  indicators: string;

  /**
   * Fecha del Divisa/indicador
   */
  dateCurrency: string;

  /**
   * Array de fechas
   */
  datesArray: any[];

  /**
   * Array de valores
   */
  valuesArray: any;

  /**
   * Nombre de la de Divisa/indicador
   */
  currency: string;
  /**
   * Valor de la Divisa/indicador
   */

  valueCurrency: number;
}

const CardDetails: FC<CardDProps> = props => {
  const {
    indicators,
    dateCurrency,
    datesArray,
    valuesArray,
    currency,
    valueCurrency,
  } = props;
  const {colors} = useTheme();

  const data = {
    labels: datesArray,
    datasets: [
      {
        data: valuesArray,
        color: (opacity = 1) => `rgba(23, 121, 186, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [currency],
  };
  return (
    <View style={styles.container}>
      {valuesArray ? (
        <View style={styles.subContainer}>
          <Card>
            <View style={styles.valueTextContainer}>
              <Text style={{...styles.valueCurrency, color: colors.nice_blue}}>
                ${valueCurrency}
              </Text>
            </View>
            <View style={styles.containerTextName}>
              <Text style={{...styles.textName, color: colors.black}}>
                Nombre
              </Text>
              <Text style={{fontSize: 18, top: 20}}>{indicators}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.containerTextDate}>
              <Text style={{...styles.dateText, color: colors.black}}>
                Fecha{' '}
              </Text>
              <Text style={{fontSize: 18}}>{dateCurrency}</Text>
            </View>
          </Card>

          <View style={{paddingTop: 20}}>
            <Card>
              <View style={styles.containerLineChart}>
                <LineChart
                  segments={10}
                  withDots={true}
                  withVerticalLabels={true}
                  withHorizontalLabels={true}
                  withVerticalLines={true}
                  withHorizontalLines={false}
                  data={data}
                  width={380}
                  height={250}
                  chartConfig={chartConfig}
                />
              </View>
            </Card>
          </View>
        </View>
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={colors.nice_blue} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
  },
  subContainer: {
    marginHorizontal: 20,
    paddingVertical: 30,
  },
  valueTextContainer: {
    alignSelf: 'center',
    top: 30,
  },
  containerTextName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  separator: {
    borderColor: '#D8D8D8',
    borderWidth: 0.8,
    marginHorizontal: 15,
    justifyContent: 'center',
    top: 5,
  },
  containerTextDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  containerLineChart: {padding: 5, paddingLeft: -20},
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueCurrency: {fontSize: 40, marginBottom: 10},
  textName: {fontSize: 20, top: 20},
  dateText: {fontSize: 20},
});

export default CardDetails;
