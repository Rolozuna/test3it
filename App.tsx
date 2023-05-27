import 'react-native-gesture-handler';

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {themePaperCustom} from './src/theme/colors';
import {DrawerStackNavigator} from './src/navigations/DrawerStackNavigator';

const App = () => {
  return (
    <PaperProvider theme={themePaperCustom}>
      <NavigationContainer>
        <DrawerStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
