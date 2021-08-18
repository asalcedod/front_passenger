export const getKilometros = (coord_init, coord_end) => {
  const rad = (x) => {
    return (x * Math.PI) / 180;
  };
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(parseFloat(coord_end.lat) - parseFloat(coord_init.lat));
  var dLong = rad(parseFloat(coord_end.lng) - parseFloat(coord_init.lng));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(parseFloat(coord_init.lat))) *
      Math.cos(rad(parseFloat(coord_end.lat))) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(3); //Retorna tres decimales
};
