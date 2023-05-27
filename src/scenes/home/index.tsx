import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/RootStackNavigator';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import EmptyfC from '../../components/EmptyComponent';
import useIndicators from '../../hooks/useIndicators';
import CardComponent from '../../components/Card';

interface Props extends StackScreenProps<RootStackParams, 'IndicatorsScreen'> {}

const IndicatorsScreen: React.FC<Props> = ({navigation}) => {
  //Obtenemos los valores de nuestro hook personalizado
  const {isLoading, indicatorState, restrictedAccess} = useIndicators();
  const {colors} = useTheme();

  //Navegar a la pantalla "DetailsScreen" pasando como parametro "item" y "routeId".
  //En item enviamos la data del indicador en cuestion
  //En routeId enviamos un id para identificar que datos mostrar en la pantalla a navegar.
  const navigateToDetailsScreen = (item, routeId) => {
    navigation.navigate('DetailsScreen', {
      currency: item,
      routeId: routeId,
    });
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={colors.nice_blue} />
        </View>
      ) : (
        <React.Fragment>
          {indicatorState.length !== 0 ? (
            <View style={styles.container}>
              <Text style={{...styles.contyainerTitle, color: colors.black}}>
                Indicadores{' '}
              </Text>
              {indicatorState?.map((item, key) => (
                <View style={{paddingVertical: 10}} key={key}>
                  <CardComponent
                    title={item.currency}
                    onPressIcon={() => navigateToDetailsScreen(item, 1)}
                    onPressTitle={() => navigateToDetailsScreen(item, 2)}
                    colors={colors}
                  />
                </View>
              ))}
            </View>
          ) : (
            <React.Fragment>
              {restrictedAccess && (
                <EmptyfC
                  titleMsg={'Acceso restringido!'}
                  msg={
                    'Esta funcionalidad está restringida a ciertas ubicaciones geográficas Para acceder, te recomendamos utilizar una VPN.'
                  }
                />
              )}
              {indicatorState.length === 0 && !restrictedAccess && (
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
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  contyainerTitle: {fontSize: 30, marginBottom: 10, alignSelf: 'center'},
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IndicatorsScreen;
