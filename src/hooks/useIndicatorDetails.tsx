import {useState, useEffect} from 'react';
import api from '../api/apiDB';
import showAlert from '../utils/alert';

const useIndicatorsDetails = indicators => {
  // Estado para indicar si se están cargando los datos
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar los indicadores de valor
  const [valueIndicators, setValueIndicators] = useState<any[]>(null);
  // Estado para almacenar los valores de los indicadores
  const [valuesArray, setValuesArray] = useState(null);
  //Estado para almacenar las fechas de los indicadores
  const [datesArray, setDatesArray] = useState([]);

  useEffect(() => {
    //Obtenemos la fecha, el  día, el mes para pasarle a la api
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    //Url1: url para obtener datos de los ultimos 30 días
    const url1 = `/${indicators}/posteriores/${year}/${month}/dias/${day}`;
    //url2: url para obtener los datos del año en curso
    const url2 = `/${indicators}/${year}`;

    // Definimos la url principal dependiendo del indicador
    const url = indicators === 'ipc' || indicators === 'utm' ? url2 : url1;

    //Realizamos la solicitud
    api
      .get(url)
      .then((response: {data: {[x: string]: any}}) => {
        //Obtenemos las claves de los indicadores
        const indicatorKeys = Object.keys(response.data);

        //Encontramos el primer indicador válido
        const firstIndicator = indicatorKeys.find(indicator =>
          Array.isArray(response.data[indicator]),
        );

        if (firstIndicator) {
          //Obtenemos los datos del primer indicador válido
          const newData = response.data[firstIndicator];
          setValueIndicators(newData);

          //Obttenemos los últimos 10 valores, aca esto se puede aumentar, en principio solo obtenemos 10 para que los datos entren en el grafico y la ui se vea de forma correcta.
          const lastObjects = newData.slice(-10);
          const values = lastObjects.map(obj =>
            parseFloat(obj.Valor.replace(',', '.')),
          );
          //Obtenemos las últimas 4 fechas, aca esto se puede aumentar, en principio solo obtenemos 4 para que los datos entren en el grafico y la ui se vea de forma correcta.
          const lastObjectsDates = newData.slice(-4);
          const dates = lastObjectsDates.map(obj => obj.Fecha);
          setValuesArray(values);
          setDatesArray(dates);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          showAlert(error.response.data.Mensaje);
        }
        setIsLoading(false);
        throw error;
      });
  }, [indicators]);

  //Devolvemos los valores necesarios a usar
  return {valueIndicators, valuesArray, datesArray, isLoading};
};

export default useIndicatorsDetails;
