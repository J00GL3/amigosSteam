import comunes from "./comunes";

var tablaFinal = function(array) {
  var data = [];
  var header = [" "];
  var letras = "ABCDEFGHIJ";
  for (var cab = 0; cab < array.length; cab++) {
    header.push(letras[cab]);
  }
  data.push(header);
  for (var fila = 0; fila < array.length; fila++) {
    var columna = [letras[fila]];
    for (var col = 0; col < array.length; col++) {
      var a;
      if (comunes([array[fila].id], array[col].amigos) > 0) {
        a = "*";
      } else {
        a = " ";
      }
      columna.push(comunes(array[col].amigos, array[fila].amigos) + a);
    }
    data.push(columna);
  }
  return data;
};

module.exports = tablaFinal;