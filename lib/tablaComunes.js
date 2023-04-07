import Image from 'next/image';

export default function TablaComunes(props) {
    
    const { info } = props;

    //console.log(info)

    const tablaData = [];

    if(!info){
        return;
    }

    info.forEach(
        e => {
            e.data.forEach( b => {
                tablaData.push(
                    {
                        avatar: b.avatar,
                        personaname: b.personaname,
                        personastate: b.personastate,
                        realname: b.realname,
                        timecreated: b.timecreated,
                        antiguedad: Math.floor((Date.now() - new Date(b.timecreated*1000))/(1000*60*60*24*365)),
                        comunityvisibility: b.communityvisibilitystate,
                        estado: () => {
                            switch(b.personastate){
                                case 0:
                                    return "Offline";
                                case 1:
                                    return "En linea";
                                case 2:
                                    return "Ocupado";
                                case 3:
                                    return "Ausente";
                                case 4:
                                    return "No molestar";
                                case 5: 
                                    return "Para tradear";
                                case 6:
                                    return "Deseando jugar";
                            }
                        },
                        privacidad: () => {
                            switch(b.communityvisibilitystate){
                                case 1:
                                    return "Privado/Solo amigos";
                                case 3:
                                    return "Publico";
                            }
                        },
                        profileurl: b.profileurl
                    }
                );
            })
        }
    )

    //console.log(tablaData);

    return (
        <div style={{display:"flex", flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "13px",
        minHeight: "100vh"}}>
            <table>
                {
                    tablaData.length !== 0 ? (<thead>
                    <tr>
                        <th></th>
                        <th>Apodo</th>
                        <th>Estado</th>
                        <th>Visibilidad</th>
                        <th>Antiguedad</th>
                    </tr>
                </thead>) : (<></>)
                }
                

                <tbody>

            
            {
                tablaData.map(
                    jugador => (
                        <tr key={jugador.steamid}>
                            <td><a href={jugador.profileurl} target='_blank'>
                                <Image 
                                    src={jugador.avatar}
                                    alt={jugador.personaname}
                                    height={32}
                                    width={32}
                                />
                                </a></td>
                            <td>{jugador.personaname}</td>
                            <td>{jugador.estado()}</td>
                            <td>{jugador.privacidad()}</td>
                            <td>{jugador.antiguedad} años</td>
                        </tr>
                    )
                )
            }
                </tbody>
            </table>
        </div>
    )
}