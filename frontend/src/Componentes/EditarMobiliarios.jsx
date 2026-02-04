import {useEffect, useState} from "react";

function EditarMobiliarios({mobiliario, onGuardar,Cargar}){
    const [codigo,setCodigo]=useState("");
    const [tipo,setTipo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [ubicacion,setUbicacion]=useState("");
    const [estado,setEstado]=useState("");
    const [msg,setMsg]=useState("");


    useEffect(()=>{
        if(mobiliario){
            setCodigo(mobiliario.codigo|| "");
            setTipo(mobiliario.tipo|| "");
            setDescripcion(mobiliario.descripcion|| "");
            setUbicacion(mobiliario.ubicacion|| "");
            setEstado(mobiliario.estado || "");
        }
    }, [mobiliario]);

     const submit=async (e)=> {
        e.preventDefault();
        setMsg("");

        if(!codigo.trim() || !tipo.trim() || !descripcion.trim() || !ubicacion.trim() ||!estado.trim()){        
            setMsg("Todos los campos so obligatorios")
             
    return;
        }

        const ok= await  onGuardar({
             codigo:codigo.trim(),
             tipo:tipo.trim(),
       descripcion:descripcion.trim(),
       ubicacion:ubicacion.trim(),
       estado:estado.trim()
        });

        if(!ok) setMsg("No se pudo actualizar( revise el error)")

     };

     return (
        <div className="modal-editar">
            <h3>Actualizar Mobiliario</h3>

            <form onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    disabled={Cargar}
                    required
                />

                <input
                    type="text"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    disabled={Cargar}
                    required
                />

                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    disabled={Cargar}
                    required
                />

                <input
                    type="text"
                    placeholder="Ubicación"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    disabled={Cargar}
                    required
                />

                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    disabled={Cargar}
                    required
                >
                    <option value="">Seleccione un estado</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Usado">Usado</option>
                    <option value="Reparación">Reparación</option>
                </select>

                <button type="submit" disabled={Cargar}>
                    {Cargar ? "Guardando..." : "Guardar"}
                </button>

                {msg && <p className="mensaje-error">{msg}</p>}
            </form>
        </div>
    );










     }


export default EditarMobiliarios










