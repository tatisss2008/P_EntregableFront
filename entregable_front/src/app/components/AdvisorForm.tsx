import { useEffect, useState } from "react";


interface Program{
    name:string;
    code:number;    
    _links: Record<string, {href:string}>
}

interface Advisor{
    name:string;
    email:string;
    phone:string;
    program:string;
}

const AdvisorForm =()=>{

    const [programs, setPrograms]= useState<Program[]>([])
    const handleSubmit= async (e:any)=>{
         
        e.preventDefault()
        const myAdvisor:Advisor={
            name:e.target.name.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            program:e.target.program.value
        }
        console.log(myAdvisor)

        try{
            const response = await fetch ('http://localhost:9090/advisors',{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(myAdvisor)
            })

            const data=await response.json()
            console.log(data)

        }catch(error){
            console.error(error)
        }
    }

    useEffect(
        ()=>{
            const fetchPrograms= async()=>{
                try{
                    const response=await fetch("http://localhost:9090/programs")
                    const data=await response.json()
                    setPrograms(data._embedded.programs)

                }catch(error){
                    console.error(error)
                }
            };
            
            fetchPrograms();
            
        },[]
    )

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre"
            />
            <input
                type="email"
                name="email"
                placeholder="Correo"
            />
            <input
                type="text"
                name="phone"
                placeholder="Telefono"
            />
            <select name="program">
                <option key="" value="">Seleccione un programa </option>
                {
                    programs.map(
                        (program)=>(                            
                            <option key={program.code} value={program._links.program.href}>
                                {program.name}
                            </option>
                            ))                    
                }
            </select>
            <button type="submit">Guardar</button>
        </form>
    )
}

export default AdvisorForm;