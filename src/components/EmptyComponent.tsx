import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

export interface CardProps {
  /**
   * Mensaje del componente vacio
   */
  msg: string;
  /**
   * Titulo del mensaje
   */
  titleMsg: string;
}

const EmptyfC: FC<CardProps> = props => {
  const {msg, titleMsg} = props;
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center'}}>
        <MaterialCommunityIcons
          name="md-sad-outline"
          color={colors.nice_blue}
          size={90}
        />
      </View>
      <View style={{paddingVertical: 0}}>
        <Text
          style={{
            color: colors.nice_blue,
            fontSize: 26,
            textAlign: 'center',
            paddingVertical: 10,
          }}>
          {titleMsg}
        </Text>
        <Text
          style={{
            color: colors.nice_blue,
            fontSize: 22,
            textAlign: 'center',
          }}>
          {msg}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    bottom: '10%',
  },
  textTitle: {
    fontSize: 16,
  },
});

export default EmptyfC;
