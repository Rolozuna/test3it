import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useWindowDimensions} from 'react-native';
import {DrawerContent} from '../scenes/drawer';
import {RootStackNavigator} from './RootStackNavigator';

export type DrawerStackParams = {
  Root: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParams>();

export const DrawerStackNavigator = route => {
  const {width} = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
        headerShown: false,
      }}>
      <Drawer.Screen name="Root" component={RootStackNavigator} />
    </Drawer.Navigator>
  );
};
