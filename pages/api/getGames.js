import axios from "axios";

export default async function handler(req, res) {

  const busqueda = req.body

  const promises = busqueda.map(steamId => (
    axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.API_KEY}&steamid=${steamId.id64}`)
      .then(response => ({
        steamId: steamId.id64,
        gamesCount: response.data.response.game_count,
        playedGames: response.data.response.games
      }))
      .catch(() => ({
        steamId: steamId.id64,
        gamesCount: 0,
        playedCounter: 0
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
