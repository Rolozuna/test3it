import React, {PureComponent} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface CardProps {
  /**
   * Titulo del indicador
   */
  title?: string;

  /**
   * Function onPresss que te lleva al detalle del indicador
   */
  onPressIcon?: ((event: GestureResponderEvent) => void) | undefined;
  onPressTitle?: ((event: GestureResponderEvent) => void) | undefined;

  /**
   * Titulo que se utiliza en el detalle del componente
   */
  titleDetail?: string;

  /**
   * Color proporcionado por useTheme
   */
  colors?: {
    black: string;
    nice_blue: string;
  };
}

class CardComponent extends PureComponent<CardProps> {
  render() {
    const {title, onPressTitle, onPressIcon, titleDetail, colors} = this.props;

    return (
      <Card>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={onPressTitle}
            style={{alignSelf: 'center'}}>
            <Text style={{...styles.textTitle, color: colors.black}}>
              {title}
            </Text>
          </TouchableOpacity>
          {titleDetail && (
            <TouchableOpacity
              onPress={onPressTitle}
              style={{alignSelf: 'center'}}>
              <Text style={{color: colors.nice_blue, fontSize: 16}}>
                {titleDetail}
              </Text>
            </TouchableOpacity>
          )}
          {onPressIcon && (
            <TouchableOpacity onPress={onPressIcon}>
              <MaterialCommunityIcons
                name="information-outline"
                color={colors.nice_blue}
                size={30}
              />
            </TouchableOpacity>
          )}
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    paddingVertical: 30,
  },
  textTitle: {
    fontSize: 16,
  },
});

export default CardComponent;
