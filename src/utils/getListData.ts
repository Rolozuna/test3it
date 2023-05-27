export const getListData = array => {
  //Creamos un nuevo arreglo de objetos a partir del arreglo original, extrayendo y organizando propiedades específicas de cada objeto. Esto es para tener en un solo arreglo nuestros indicadores
  const dataList = array.map(item => {
    const currency = item.Currency;
    const value = item.Valor;
    const date = item.Fecha;
    const indicators = item.Indicators;

    return {
      currency,
      value,
      date,
      indicators,
    };
  });

  return dataList;
};
