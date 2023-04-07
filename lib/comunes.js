export default function comunes(a, b) {
  var comunes = [];
  a.forEach(function(element) {
    b.forEach(function(element2) {
      if (element.steamid === element2.steamid) {
        comunes.push(element.steamid)
      }
    });
  });
  return comunes;
}
