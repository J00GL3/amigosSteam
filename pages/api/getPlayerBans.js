import axios from "axios";


export default async function handler(req, res)  {

  const busqueda = req.body;

  const partes = Math.floor(busqueda.length / 100);
  const resto = busqueda.length % 100;

  var steamIds = [];

  if(busqueda.length <= 100) {
    steamIds.push({
      ids: busqueda.map(e=> e.id64).join(",")});
  }


  else {
    for (var parte = 0; parte < partes; parte++) {
      steamIds.push({
        ids: busqueda.slice(parte * 100, (parte + 1) * 100).map(e=> e.id64).join(",")});
    }
    if(resto > 0) {
        steamIds.push({
          ids: busqueda.slice(partes * 100, busqueda.length).map(e=> e.id64).join(",")});
    }
  }

  const promises = steamIds.map((steamId) => (
    axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${process.env.API_KEY}&steamids=${steamId.ids}`)
      .then(function(response) {
        return {data:response.data.players};
      }
      )
      .catch(() => ({
        
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
