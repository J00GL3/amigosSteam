import comunes from './comunes';
import Image from 'next/image';

export default function TablaPrueba(props) {

  const {info, onData} = props;
  
  const [profileInfo, friendsProfile] = info;
  
  function enviarData(informacion){
    props.onData(informacion);
  }

  const data = [];
  const header = [
    { name: "", imagen: "", steamid: "0", profile: "" }
  ];

  const informacion = profileInfo[0]?.data;

  const letras = "ABCDEFGHIJ";

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
          amigos: profile.friends
        });
      }
    });
  });

  //console.log(array)

  for (let cab = 0; cab < array.length; cab++) {
    header.push({
      name: array[cab].name,
      imagen: array[cab].imagen,
      profile: array[cab].profile,
      steamid: array[cab].steamid
    });
  }
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
        amistad: a
      })
    }

    data.push(columna);
  }

  //console.log(data)

  return (
    <table style={{margin: "30px 0"}}>
      <thead>
        <tr>
          {data[0].map((headerItem, index) =>
            <th key={index}>
              <a href={headerItem.profile} target="_blank">
                <Image 
                  src={headerItem.imagen}
                  alt={headerItem.name}
                  title={headerItem.name}
                  width={32}
                  height={32}
                />
              </a>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex, fila) =>
          <tr key={rowIndex}>
            {
                row.map((cell, cellIndex) => (
                <td key={cellIndex} style={(cell.amistad && cell.totalComunes > 0) ? {backgroundColor:"#16abff33"}:{backgroundColor: ""}}>
                  <div style={{display:"flex", justifyContent: "flex-end"}}>
                    <a href={cell.profile} target="_blank" style={{display:"flex", alignItems: "center", flexDirection: "row", textDecoration: "none", color: "black"}}>
                      <p style={{display: "block"}}>{cell.name}</p>
                      {
                        !cell.totalComunes != "" && cell.amistad != "" && cell.arrayComunes != ""? (<Image 
                        src={cell.imagen}
                        alt={cell.name}
                        title={cell.name}
                        width={32}
                        height={32}
                      />) : (<></>)
                      }
                      
                    </a>
                  </div>
                  <p style={{display:"flex",alignItems: "center", justifyContent: "center", cursor: "pointer"}} onClick={() => enviarData(cell.arrayComunes)}>{cell.totalComunes}</p>
                  
                </td>
            ))
            }
            
          </tr>
        )}
      </tbody>
    </table>
  );
}
