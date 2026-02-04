import{useState} from "react";

function FormServicios({onGuardar,Cargar}){
    const [codigo, setCodigo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [ubicacion,setUbicacion]=useState("");
    const[estado,setEstado]=useState("");
  
    const submit =async (e)=>{
        e.preventDefault();
        setMsg("");

         if(!codigo.trim() || !descripcion.trim() || ubicacion.trim() || estado.trim()){
        setMsg("Nombre y descripcion son obligatorios.");
        return;
    }
    if(tipo.trim().length<3){
        setMsg("El tipo de mobiliario debe tener al menos 3 caracteres.");
        return;
    }

    const ok= await onGuardar({
       codigo:codigo.trim(),
       descripcion:descripcion.trim(),
       ubicacion:ubicacion.trim(),
       estado:estado.trim()
    });

  
    if(ok){
        setCodigo("");
        setDescripcion("");
        setUbicacion("");
        setEstado("");
    }

    };

    return(
        <form onSubmit={submit} style={{marginBottom:12}}>
          
          <h3>Nuevo Servicio</h3>

          <input
          type="text"
          placeholder="Codigo"
          
          ></input>



        </form>


    );


}