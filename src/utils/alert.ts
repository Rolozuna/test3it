import {Alert, AlertButton} from 'react-native';

//Alert "personalizado"
const showAlert = (
  title?: string,
  message?: string,
  buttons?: AlertButton[] = [{text: 'Aceptar'}],
): void => {
  Alert.alert(title, message, buttons);
};

export default showAlert;
