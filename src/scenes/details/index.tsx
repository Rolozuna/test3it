import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/RootStackNavigator';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CardDetails from '../../components/CardDetails';
import {useTheme} from 'react-native-paper';
import EmptyfC from '../../components/EmptyComponent';
import useIndicatorsDetails from '../../hooks/useIndicatorDetails';
import CardComponent from '../../components/Card';

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> {}

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  //Obtenemos los valores que pasamos al navegar entre pantallas
  const {indicators, currency, value, date} = route?.params?.currency;
  const {routeId} = route?.params;

  //Usamos hook de material para agregar color
  const {colors} = useTheme();

  //Obtenemos los valores de nuestro hook personalizado
  const {valueIndicators, valuesArray, datesArray, isLoading} =
    useIndicatorsDetails(indicators);

  //En este efecto agregamos el titulo del indicador en el header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: indicators.toUpperCase(),
    });
  }, []);

  return (
    <React.Fragment>
      {routeId === 1 ? (
        <CardDetails
          indicators={indicators}
          dateCurrency={date}
          datesArray={datesArray}
          valuesArray={valuesArray}
          currency={currency}
          valueCurrency={value}
        />
      ) : (
        <React.Fragment>
          {isLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={colors.nice_blue} />
            </View>
          ) : (
            <React.Fragment>
              {valueIndicators?.length !== 0 ? (
                <View style={{width: '100%'}}>
                  <ScrollView>
                    <View>
                      {valueIndicators?.map((item, key) => (
                        <View style={{marginHorizontal: 20}} key={key}>
                          <CardComponent
                            title={item.Fecha}
                            titleDetail={item.Valor}
                            colors={colors}
                          />
                          <View style={{paddingBottom: 15}} />
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              ) : (
                <EmptyfC
                  titleMsg={'Lo sentimos'}
                  msg={
                    'El recurso correspondiente no esta disponible en este momento.'
                  }
                />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
