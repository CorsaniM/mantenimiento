"use client";
import Link from "next/link";

import { api } from "~/trpc/react";

export default function Home() {

 
  const {data:equipos} = api.equipos.list.useQuery();

  const {mutateAsync: createEquipo} = api.equipos.create.useMutation()

  const {mutateAsync: editar} = api.equipos.editar.useMutation()



  async function Sumar(idRecibida: number) {
    
    let equipoSeleccionado = equipos?.find((x) => x.id === idRecibida)

    equipoSeleccionado?.name === "Editado"
    console.log(equipoSeleccionado?.name)

   await editar({id:idRecibida})

    return console.log("finalizado")
  }


async function crearEquipos() {
  

  await createEquipo({name:"Equipo 1"})
}

  return (
    <div>
      <h1>Buena suerte chicos</h1>
      <h1>Como estan?? esto es increible!!!</h1>
    <button onClick={crearEquipos}>Crear equipos</button>
    <div>
    {equipos?.map((equipo) => (
      <div key={equipo.id}>
        <Link href={`/equipos/${equipo.id}`}>{equipo.name} {equipo.id}</Link>
        <button onClick={() => Sumar(equipo.id)}>Sumar</button>
      </div>
    ))}
    </div>

    </div>
  );
}
