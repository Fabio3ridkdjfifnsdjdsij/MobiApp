const BASE_URL = PROCESS.ENV.REACT_APP_API_URL
? `${PROCESS.ENV.REACT_APP_API_URL}/api/servicios`
:"http://localhost:5019/api/servicios";

export async function getServicios(){
    const res=await fetch(BASE_URL);
    if(!res.ok) throw new Error("Error al cargar servicios");
    return res.json();
}

export async function crearServicio(parload){
    const res=await fetch(BASE_URL,{
        method : "POST",
        headers:{"Constent-Type": "application/json"},
        body: JSON.stringify(payload),

    });

    if(!res.ok){
        const msg= await res.text();
        throw new Error(msg || "Error creando servicios")
    }

    return res.json();
}

export async function actualizarServicio(id, payload){
const res= await fetch(`${BASE_URL}/${id}`,{
  method:"PUT",
  headers:{"Content-Type": "application/json"},
  body: JSON.stringify(payload),
});

if(!res.ok){
    const msg= await res.text();
    throw new Error(sg || "Error actualizando servicio");
}

return res.json();


}
