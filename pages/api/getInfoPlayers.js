import axios from "axios";


export default async function handler(req, res)  {

  const busqueda = req.body;

  const partes = Math.floor(busqueda.length / 100);
  const resto = busqueda.length % 100;

  var steamIds = [];

  if(busqueda.length <= 100) {
    steamIds.push({
      since: busqueda.map(e=> e.friend_since), 
      since_other: busqueda.map(e=> e.friend_since_other), 
      ids: busqueda.map(e=> e.id64).join(","), id_array: busqueda.map(e=> e.id64)});
  }


  else {
    for (var parte = 0; parte < partes; parte++) {
      steamIds.push({
        since: busqueda.slice(parte * 100, (parte + 1) * 100).map(e=> e.friend_since), 
        since_other: busqueda.slice(parte * 100, (parte + 1) * 100).map(e=> e.friend_since_other), 
        ids: busqueda.slice(parte * 100, (parte + 1) * 100).map(e=> e.id64).join(","), 
        id_array: busqueda.slice(parte * 100, (parte + 1) * 100).map(e=> e.id64)});
    }
    if(resto > 0) {
        steamIds.push({
          since: busqueda.slice(partes * 100, busqueda.length).map(e=>e.friend_since), 
          since_other: busqueda.slice(partes * 100, busqueda.length).map(e=>e.friend_since_other),
          ids: busqueda.slice(partes * 100, busqueda.length).map(e=> e.id64).join(","), 
          id_array: busqueda.slice(partes * 100, busqueda.length).map(e=> e.id64)});
    }
  }

  const promises = steamIds.map((steamId, indicePeticion) => (
    axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamId.ids}`)
      .then(function(response) {
        const objeto_respueta = response.data.response.players;
        //console.log(objeto_respueta)
        busqueda.map( e => {
          objeto_respueta.map( objeto_respuesta => {
            if(objeto_respuesta.steamid == e.id64){
              objeto_respuesta.since = e.friend_since;
              objeto_respuesta.since_other = e.friend_since_other;
            }
          })
        })
        return ({data:objeto_respueta})
      }
      )
      .catch(() => ({
        respuesta: 0,
      }))
  ))

  Promise.all( promises )
    .then( results => {
      //console.log("Resultado",results)
      res.status(200).json(results)
    })
    .catch(() => {
      res.status(500).json([])
    })

};
