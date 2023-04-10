export default function tratamiento(data) {
  var expresion64 = /(\d{17})/gs;
  var expresion = /(STEAM_\d*\:\d*\:\d*)/gs;
  var respuesta = [];

  if(data.match(expresion64)?.length > 0) {
    data.match(expresion64).map( e => respuesta.push({steamid64: e}));
    return respuesta;
  }

  var convertTo64 = steamid =>
    (BigInt(
      parseInt(steamid.split(":")[2]) * 2 + parseInt(steamid.split(":")[1])
    ) + BigInt(76561197960265728)).toString();

  for (var res of data.matchAll(expresion)) {
    respuesta.push({steamid: res[1], steamid64: convertTo64(res[1])});
  }
  return respuesta;
}