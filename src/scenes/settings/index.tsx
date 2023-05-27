import * as React from 'react';
import {Platform, ScrollView, StatusBar, View} from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';
import RNPermissions, {Permission, PERMISSIONS} from 'react-native-permissions';

//Permisos para plataformas ANDROID
const PERMISSIONS_ANDROID = [
  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
];

//Permisos para plataformas IOS
const PERMISSIONS_IOS = [
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PERMISSIONS.IOS.LOCATION_ALWAYS,
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.IOS.NOTIFICATIONS,
];

// Selección de permisos dependiendo de la plataforma
const PERMISSIONS_VALUES: Permission[] = Platform.select({
  android: PERMISSIONS_ANDROID,
  ios: PERMISSIONS_IOS,
  default: [],
});

// Nombres de los permisos
const PERMISSIONS_NAMES_ES: {[key: string]: string} = {
  ACCESS_COARSE_LOCATION: 'Acceso a ubicación aproximada',
  ACCESS_FINE_LOCATION: 'Acceso a ubicación precisa',
  CAMERA: 'Cámara',
  POST_NOTIFICATIONS: 'Notificaciones',
  LOCATION_WHEN_IN_USE: 'Ubicación cuando se usa la app',
  LOCATION_ALWAYS: 'Ubicación siempre',
  NOTIFICATIONS: 'Notificaciones',
};

// Verificamos el estado de un permiso específico
const checkPermission = (
  permission: Permission,
  name: string,
  showSnackbar: (title: string, response: unknown) => void,
) => {
  RNPermissions.check(permission)
    .then(status => {
      showSnackbar(`check(${name})`, status);
    })
    .catch(error => {
      console.error(error);
    });
};

// Solicitamos un permiso específico
const requestPermission = (
  permission: Permission,
  name: string,
  showSnackbar: (title: string, response: unknown) => void,
) => {
  RNPermissions.request(permission)
    .then(status => {
      showSnackbar(`request(${name})`, status);
    })
    .catch(error => {
      console.error(error);
    });
};

// Verificamos el estado de los permisos de notificación
const checkNotificationPermissions = (
  showSnackbar: (title: string, response: unknown) => void,
) => {
  RNPermissions.checkNotifications()
    .then(response => {
      showSnackbar('checkNotifications()', response);
    })
    .catch(error => {
      console.error(error);
    });
};

// Solicitamos los permisos de notificación
const requestNotificationPermissions = (
  showSnackbar: (title: string, response: unknown) => void,
) => {
  RNPermissions.requestNotifications(['alert', 'badge', 'sound'])
    .then(response => {
      showSnackbar('requestNotifications()', response);
    })
    .catch(error => {
      console.error(error);
    });
};

const SettingsScreen = () => {
  const [snackbarContent, setSnackbarContent] = React.useState<string>();
  // Mostramos el mensaje de respuesta
  const showSnackbar = (title: string, response: unknown) =>
    setSnackbarContent(title + '\n\n' + JSON.stringify(response, null, 2));
  // Ocultamos mensaje de respuesta
  const hideSnackbar = () => setSnackbarContent(undefined);
  const {colors} = useTheme();

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />

      <Appbar.Header>
        <Appbar.Content title="PERMISOS" />
      </Appbar.Header>

      <ScrollView>
        {PERMISSIONS_VALUES.map((item, index) => {
          if (!item) {
            return null;
          }
          const name = PERMISSIONS_NAMES_ES[item.split('.')[2]];
          return (
            <React.Fragment key={item}>
              <View style={{padding: 20, alignSelf: 'center'}}>
                <Text numberOfLines={1} variant="bodyMedium">
                  {name}
                </Text>

                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <Button
                    buttonColor={colors.nice_blue}
                    icon="eye-outline"
                    mode="contained"
                    onPress={() => checkPermission(item, name, showSnackbar)}>
                    Comprobar
                  </Button>

                  <View style={{width: 8}} />

                  <Button
                    buttonColor={colors.nice_blue}
                    icon="information-outline"
                    mode="contained"
                    onPress={() => requestPermission(item, name, showSnackbar)}>
                    Solicitar
                  </Button>
                </View>
              </View>

              <Divider />
            </React.Fragment>
          );
        })}

        <View style={{padding: 20, paddingBottom: 32, alignSelf: 'center'}}>
          <Text numberOfLines={1} variant="bodyMedium">
            Notificaciones
          </Text>

          <View style={{flexDirection: 'row', marginTop: 12}}>
            <Button
              buttonColor={colors.nice_blue}
              icon="eye-outline"
              mode="contained"
              onPress={() => checkNotificationPermissions(showSnackbar)}>
              Comprobar
            </Button>

            <View style={{width: 8}} />

            <Button
              buttonColor={colors.nice_blue}
              icon="information-outline"
              mode="contained"
              onPress={() => requestNotificationPermissions(showSnackbar)}>
              Solicitar
            </Button>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarContent != null}
        duration={10000}
        onDismiss={hideSnackbar}
        action={{
          label: 'Ocultar',
          onPress: hideSnackbar,
        }}>
        {snackbarContent}
      </Snackbar>
    </View>
  );
};

export default SettingsScreen;
