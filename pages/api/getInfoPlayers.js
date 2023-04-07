// http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4BACDD85BC89768CC033D865342BAA43&steamids=76561198080445934
import axios from "axios";


export default async function handler(req, res)  {

  const {apikey, jugadores} = req.body;

  const busqueda = jugadores;

  const partes = Math.floor(busqueda.length / 100);
  const resto = busqueda.length % 100;

  var steamIds = [];

  if(busqueda.length <= 100) {
    steamIds.push(busqueda.join(","));
  }

  else {
    for (var parte = 0; parte < partes; parte++) {
      steamIds.push(busqueda.slice(parte * 100, (parte + 1) * 100).join(","));
    }
    if(resto > 0) {
        steamIds.push(busqueda.slice(partes * 100, busqueda.length).join(","));
    }
  }

  steamIds.map( steamid=> {
    console.log(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${steamid}`)
  })

  const promises = steamIds.map(steamId => (
    axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${steamId}`)
      .then(response => ( {
        data: response.data.response.players
      }))
      .catch(() => ({
        respuesta: 0,
      }))
  ))

  Promise.all( promises )
    .then( results => {
      res.status(200).json(results)
    })
    .catch(() => {
      res.status(500).json([])
    })

};
