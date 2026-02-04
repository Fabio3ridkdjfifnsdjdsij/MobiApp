const BASE_URL = process.env.REACT_APP_API_URL 
    ? `${process.env.REACT_APP_API_URL}/api/mobiliarios` 
    : "http://localhost:5019/api/mobiliarios";
    
export async function getMobiliarios(){
    const res=await fetch(BASE_URL);
    if(!res.ok) throw new Error("Error al cargar servicios");
    return await res.json();
}

export async function crearMobiliarios(payload){
    const res=await fetch(BASE_URL,{
        method : "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(payload),

    });

    if(!res.ok){
        const msg= await res.text();
        throw new Error(msg || "Error creando servicios")
    }

    return res.json();
}

export async function actualizarMobiliarios(id, payload){
const res= await fetch(`${BASE_URL}/${id}`,{
  method:"PUT",
  headers:{"Content-Type": "application/json"},
  body: JSON.stringify(payload),
});

if(!res.ok){
    const msg= await res.text();
    throw new Error(msg || "Error actualizando servicio");
}

return res.json();


}

export async function eliminarMobiliario(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("No se pudo eliminar el mobiliario");
    return true;
}
