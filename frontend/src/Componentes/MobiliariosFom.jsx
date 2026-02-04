import{useState} from "react";

function MobiliariosForm({onGuardar,Cargar}){
    const [codigo, setCodigo]=useState("");
    const[tipo,setTipo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [ubicacion,setUbicacion]=useState("");
    const[estado,setEstado]=useState("");
    const [msg, setMsg] = useState("");
  
    const submit =async (e)=>{
        e.preventDefault();
        setMsg("");

         if(!codigo.trim() || !descripcion.trim() || !tipo.trim() ||  !ubicacion.trim() || !estado.trim()){
        setMsg("Nombre y descripcion son obligatorios.");
        return;}
         if(tipo.trim().length<3){
        setMsg("El tipo de mobiliario debe tener al menos 3 caracteres.");
        return;
    }


       const ok= await onGuardar({
       codigo:codigo.trim(),
       tipo:tipo.trim(),
       descripcion:descripcion.trim(),
       ubicacion:ubicacion.trim(),
       estado:estado.trim()
    });

  
    if(ok){
        setCodigo("");
        setTipo("");
        setDescripcion("");
        setUbicacion("");
        setEstado("");
    }

    };


   
    return (
        <form className="mobiliario-form" onSubmit={submit}>
            <input
                type="text"
                placeholder="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                required
            />
            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
            >
                <option value="">Seleccione un estado ▼</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
                <option value="Reparación">Reparación</option>
            </select>
            <button type="submit" className="btn-agregar">AGREGAR</button>
            
            {msg && <div style={{ color: 'red', marginTop: '10px', width: '100%' }}>{msg}</div>}
        </form>
    );


}

export default MobiliariosForm;