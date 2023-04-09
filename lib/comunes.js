export default function comunes(a, b) {
  var comunes = [];
  a.forEach(function(element) {
    b.forEach(function(element2) {
      if (element.steamid === element2.steamid) {
        comunes.push({steamid: element.steamid, friend_since: element.friend_since, friend_since_other: element2.friend_since});
      }
    });
  });
  return comunes;
}
