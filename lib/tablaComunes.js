import Image from 'next/image';

export default function TablaComunes(props) {
    
    const {info}= props;

    const tablaData = [];

    if(!info[2]){
        return;
    }

    info[2].forEach(
        e => {
            e.data.forEach( b => {
                tablaData.push(
                    {
                        steamid: b.steamid,
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
                        visible: () => {
                            switch(b.communityvisibilitystate){
                                case 1:
                                    return false;
                                case 2:
                                    return false
                                case 3:
                                    return true;
                            }
                        },
                        privacidad: () => {
                            switch(b.communityvisibilitystate){
                                case 1:
                                    return "Privado";
                                case 2:
                                    return "Solo Amigos"
                                case 3:
                                    return "Publico";
                            }
                        },
                        profileurl: b.profileurl,
                        friend_since: b.since,
                        days_since: () => Math.floor((Date.now() - new Date(b.since*1000))/(1000*60*60*24))
                    }
                );
            })
        }
    )

  
    return (
        <div style={{display:"flex", flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "13px",
        minHeight: "100vh"}}>
            <div>
                <h3 style={{textAlign: "center"}} className='cabeza-amigos-comunes'><span className='nombre'>{info[0]}</span> con <span className='nombre'>{info[1]}</span></h3>
            
                <table className='tabla-amigos-comunes'>
                    {
                        tablaData.length !== 0 ? (<thead>
                        <tr>
                            <th></th>
                            <th>Apodo</th>
                            <th>Estado</th>
                            <th>Visibilidad</th>
                            <th>Cuenta</th>
                            <th>Antiguedad</th>
                            <th></th>
                        </tr>
                    </thead>) : (<></>)
                    }
                    

                    <tbody>

                
                {
                    tablaData.map(
                        (jugador,ind) => (
                            <tr key={jugador.steamid}>
                                <td>
                                    
                                    <Image 
                                        src={jugador.avatar}
                                        alt={jugador.personaname}
                                        height={32}
                                        width={32}
                                    />
                                    </td>
                                <td style={{width:"100px"}}>{jugador.personaname}</td>
                                <td>{jugador.estado()}</td>
                                <td>{jugador.privacidad()}</td>
                                <td>{jugador.visible() ? jugador.antiguedad + " años": (<span className='letras-rojas'>Privado</span>)}</td>
                                <td>{jugador.days_since()} días</td>
                                <td><a href={jugador.profileurl} target="_blank">Perfil</a></td>
                            </tr>
                        )
                    )
                }
                    </tbody>
                </table>
            </div>
        </div>
    )
}