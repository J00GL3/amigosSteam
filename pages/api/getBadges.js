import axios from "axios";

export default async function handler(req, res) {

  const busqueda = req.body

  const promises = busqueda.map(steamId => (
    axios.get(`https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=${process.env.API_KEY}&steamid=${steamId.id64}`)
      .then(response => ({
        steamId: steamId.id64,
        badgesCount: response.data.response.badges.length,
        steamLevel : response.data.response.player_level
      }))
      .catch(() => ({
        steamId: steamId.id64,
        badgesCount: 0,
        steamLevel : 0
      }))
  ))

  Promise.all( promises )
    .then( results => {
      res.status(200).json(results)
    })
    .catch(() => {
      res.status(500).json([])
    })
}
