import axios from "axios";

export default async function handler(req, res) {

  const busqueda = req.body

  //console.log(busqueda)

  const promises = busqueda.map(steamId => (
    axios.get(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.API_KEY}&steamid=${steamId.id64}&relationship=friend`)
      .then(response => ({
        steamId: steamId.id64,
        friendsCount: response.data.friendslist.friends.length,
        friends: response.data.friendslist.friends
      }))
      .catch(() => ({
        steamId: steamId.id64,
        friendsCount: 0,
        friends: []
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
