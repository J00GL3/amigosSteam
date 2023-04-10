import comunes from './comunes';
import Image from 'next/image';

export default function TablaPrueba(props) {

  const {info, onData} = props;
  
  const [profileInfo, friendsProfile, badges, games] = info;
  
  function enviarData(informacion){
    props.onData(informacion);
  }

  const data = [];
  const header = [
    { name: "", imagen: "", steamid: "0", profile: "" }
  ];

  const informacion = profileInfo[0]?.data;

  const array = [];

  if(!informacion) {
    return;
  }

  informacion.forEach(jug => {
    friendsProfile.forEach(profile => {
      if (jug.steamid == profile.steamId) {
        array.push({
          name: jug.personaname,
          imagen: jug.avatar,
          profile: jug.profileurl,
          steamid: jug.steamid,
          amigos: profile.friends,
          privacy: jug.communityvisibilitystate == 3 ? true : false
        });
      }
    });
  });

  for (let cab = 0; cab < array.length; cab++) {
    header.push({
      name: array[cab].name,
      imagen: array[cab].imagen,
      profile: array[cab].profile,
      steamid: array[cab].steamid,
      privacidad: array[cab].privacy
    });
  }

  header.push( {title: "Badges", privacidad: true, imagen: '/insignia.png', name: "Insignias"})
  header.push( {title: "Level", privacidad: true, imagen: "/steam.png", name: "Nivel de Steam"})
  header.push( {title: "Games", privacidad: true, imagen: "/mando.png", name: "Juegos de Steam en la biblioteca"})
  header.push( {title: "Time", privacidad: true, imagen: "/reloj.png", name: "Horas registradas públicas al counter"})

  data.push(header);

  for (let fila = 0; fila < array.length; fila++) {
    const columna = [
      {
        name: array[fila].name,
        imagen: array[fila].imagen,
        profile: array[fila].profile,
        steamid: array[fila].steamid,
        amigos: array[fila].amigos
      }
    ];

    for (let col = 0; col < array.length; col++) {
      let a;

      if (comunes([{steamid: array[fila].steamid}], array[col].amigos).length > 0) {
        a = true;
      } else {
        a = false;
      }
      columna.push({
        totalComunes: comunes(array[col].amigos, array[fila].amigos).length,
        arrayComunes: comunes(array[col].amigos, array[fila].amigos),
        arrayComunes_other: comunes(array[fila].amigos, array[col].amigos),
        amistad: a,
        jugadora: array[col].name,
        jugadorb: array[fila].name,
        imagen: "dato",
        amigos: true
      })
    }

    badges.map( badge => {
      if (badge.steamId == array[fila].steamid) {
        columna.push({
          contenido: badge.badgesCount,
          imagen: "dato",
          amigos: false
        })
        columna.push({
          contenido: badge.steamLevel,
          imagen: "dato",
          amigos: false
        })
      }
    })

    games.map( game => {
      if(game.steamId == array[fila].steamid) {
        columna.push({
          contenido: game.gamesCount,
          imagen:"dato",
          amigos: false
        })
        try {
          game.playedGames.map( g => {
          if(g.appid == 730) {
            columna.push({
            contenido: Math.floor(g.playtime_forever / 60),
            imagen: "dato",
            amigos: false})

          }
        })
        } catch (error) {
          columna.push({
              contenido: "",
              imagen: "dato",
              amigos: false
        })
        }
        
        
      }
    })

    data.push(columna);
  }

  return (
    <div >
      <table style={{margin: "20px 0 5px 0"}}>
        <thead>
          <tr>
            {data[0].map((headerItem, index) =>
              index == 0 ? (<th key={index}>
                <p style={{display:"flex", justifyContent:"flex-end"}}></p>
              </th>) : 
              (<th key={index} className={headerItem.privacidad ? "": "fondo-rojo"}>
                <a href={headerItem.profile} target="_blank">
                  {headerItem.imagen ? (<Image 
                    src={headerItem.imagen}
                    alt={headerItem.name}
                    title={headerItem.name}
                    width={32}
                    height={32}
                  />) : (<></>)}
                </a>
              </th>)
            )}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex, fila) =>
            <tr key={rowIndex}>
              {
                  row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={!cell.amigos ? "separado": ""} style={(cell.amistad && cell.totalComunes > 0) ? {backgroundColor:"#16abff33"}:{backgroundColor: ""}}>
                    <div className={cellIndex == 0 ? "flex-center": ""}>
                      <a href={cell.profile} target="_blank" style={{display:"flex", justifyContent: "center",alignItems: "center", flexDirection: "row", textDecoration: "none", color: "black"}}>
                        <p style={{textAlign: "center"}}>{cell.name}</p>
                        {
                          cell.imagen == "dato" ? (
                          !cell.amigos ? (<p className='texto-centrado'>{cell.contenido}</p>) : (
                          <p style={{color: "black", cursor: "pointer"}} onClick={() => enviarData([cell.jugadora, cell.jugadorb, cell.arrayComunes, cell.arrayComunes_other])}>{cell.totalComunes}</p>)): 
                          (<Image 
                          src={cell.imagen}
                          alt={cell.name}
                          title={cell.name}
                          width={32}
                          height={32}
                        />) 
                        }
                        
                      </a>
                    </div>
                    
                    
                  </td>
              ))
              }
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  );
}
