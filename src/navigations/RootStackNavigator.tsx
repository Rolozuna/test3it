import {createStackNavigator} from '@react-navigation/stack';
import IndicatorsScreen from '../scenes/home';
import DetailsScreen from '../scenes/details';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../scenes/settings';

export type RootStackParams = {
  IndicatorsScreen: undefined;
  DetailsScreen: {
    currency: any;
    routeId: number;
  };
  SettingsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const RootStackNavigator = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="IndicatorsScreen"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: colors.nice_blue,
      }}>
      <Stack.Screen
        name="IndicatorsScreen"
        component={IndicatorsScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              color={colors.black}
              backgroundColor={colors.white}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        options={{title: 'DetailsScreen'}}
        component={DetailsScreen}
      />
      <Stack.Screen
        name="SettingsScreen"
        options={{title: 'Ajustes'}}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};
