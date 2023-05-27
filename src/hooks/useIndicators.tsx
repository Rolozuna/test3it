import {useEffect, useState} from 'react';
import api from '../api/apiDB';
import {getListData} from '../utils/getListData';
import showAlert from '../utils/alert';

const useIndicators = () => {
  // Estado para indicar si se están cargando los datos
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar los indicadores
  const [indicatorState, setIndicatorState] = useState([]);
  // Estado para indicar si se tiene acceso restringido
  const [restrictedAccess, setRestrictedAccess] = useState(false);

  // Verifica si la solicitud a la api fue rechazada
  const checkRejectedRequest = data => {
    return typeof data.includes === 'function' && data.includes('Rejected');
  };

  const getIndicatorValue = async indicator => {
    const url = `/${indicator}`;
    try {
      const response = await api.get(url);
      // Obtenemos los datos de la respuesta
      const data = response.data;
      if (checkRejectedRequest(data)) {
        // Si la solicitud fue rechazada, establece acceso restringido
        setRestrictedAccess(true);
      } else {
        //Obtenemos un arreglo con las claves de los datos y buscamos una clave que contenga el indicador especificado
        const foundIndicator = Object.keys(data).find(key =>
          key.toLowerCase().includes(indicator.toLowerCase()),
        );
        if (foundIndicator) {
          //Asignamos el primer objeto de datos correspondiente a esa clave a objetoDatos
          const dataObject = data[foundIndicator][0];
          //Agregamos la propiedad Currency al objeto objetoDatos
          dataObject.Currency = foundIndicator;
          //Agregamos la propiedad Indicators al objeto objetoDatos
          dataObject.Indicators = indicator;
          return dataObject;
        } else {
          throw new Error(
            `No se encontraron datos para el indicador ${indicator}`,
          );
        }
      }
    } catch (error) {
      if (error.response) {
        // Mostramos una alerta con el mensaje de error
        showAlert(error.response.data.Mensaje + ' para el ' + indicator);
      }
      return null;
    }
  };

  // Lista de indicadores
  const indicators = ['dolar', 'euro', 'ipc', 'uf', 'utm'];
  const obtenerValoresIndicadores = async () => {
    const valoresIndicadores = [];

    try {
      for (const indicator of indicators) {
        // Obtenemos el valor del indicador
        const indicatorValue = await getIndicatorValue(indicator);
        if (indicatorValue !== null) {
          // Agregamos el valor del indicador a la lista
          valoresIndicadores.push(indicatorValue);
        }
      }

      // Obtenemos los datos de los indicadores
      const valArr = getListData(valoresIndicadores);
      // Guardamos los indicadores en el estado
      setIndicatorState(valArr);
      setIsLoading(false);
    } catch (error) {
      // Mostramos una alerta con el mensaje de error
      if (error.response) {
        showAlert(error.response.data.Mensaje);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Ejecutamos la función para obtener los valores de los indicadores
    obtenerValoresIndicadores();
  }, [restrictedAccess]);

  return {
    isLoading,
    indicatorState,
    restrictedAccess,
  };
};

export default useIndicators;
