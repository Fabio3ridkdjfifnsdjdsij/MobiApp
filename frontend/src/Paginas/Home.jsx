import {useEffect, useState} from "react";
import { getMobiliarios,crearMobiliarios, actualizarMobiliarios, eliminarMobiliario } from "../servicios/api";


import MobiliariosForm from "../Componentes/MobiliariosFom";
import MobiliariosCard from "../Componentes/MobiliariosCard";
import EditarMobiliarios from "../Componentes/EditarMobiliarios";
import Cargar from "../Componentes/Cargar";
import Buscar from "../Componentes/Buscar";
import Toast from "../Componentes/Toast";
import Modal from "../Componentes/Modal";


function Home(){

const [mobiliarios,setMobiliarios]=useState([]);
const [filtro,setFiltro]=useState("");
const [cargar, setCargar]=useState(true);
const [guardando, setGuardando]=useState(false);
const [editOpen,setEditOpen]=useState(false);
const [seleccionado, setSeleccionado]=useState(null);
const [actualizando, setActualizando]=useState(false);
const [toast,setToast]=useState({type:" ", text:" "});

const showToast=(type,text)=>{
    setToast({type,text});
    setTimeout(()=>setToast({type:"",text:""}),3000);
};

const Cargar1=()=>{
    setCargar(true);
    getMobiliarios()
    .then(setMobiliarios)
    .catch(()=>showToast("error","No se puedieron cargar los mobiliarios"))
    .finally(()=>setCargar(false));
};


useEffect(()=>{
    Cargar1();
},[]);

const guardarMobiliario=async (payload)=>{
    try{
        setGuardando(true);
        await crearMobiliarios(payload);
        showToast("Logrado","Mobiliario creado con exito");
        Cargar1();
        return true;
    }catch (e){
        showToast("error",e.Message || "Error guardando el mobiliario");
        return false;
    } finally{
        setGuardando(false);
    }
};

const abrirEdicion=(mobiliarios)=>{
    setSeleccionado(mobiliarios);
    setEditOpen(true);
};

const guardarCambios =async (payload)=>{
    try{
        setActualizando(true);
        await actualizarMobiliarios(seleccionado.id,payload);
        showToast("Logrado","Mobiliario actualizado con exito");
        setEditOpen(false);
        setSeleccionado(null);
        Cargar1();
        return true ;
       
    } catch(e){
            showToast("error", e.message || "Error al actualizar el mobiliario");
           return false;
        }finally{
            setActualizando(false);
        }
};

const filtrados= mobiliarios.filter((s)=>
(s.codigo + " " + s.tipo + " " + s.descripcion + " " + s.ubicacion + " " + s.estado)
.toLowerCase().
includes(filtro.toLowerCase())
);

if(cargar) return <Cargar/>


const borrarMobiliario = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este mobiliario?")) {
        try {
            await eliminarMobiliario(id);
            showToast("Logrado", "Mobiliario eliminado");
            Cargar1(); // Recarga la lista
        } catch (e) {
            showToast("error", "Error al eliminar");
        }
    }
};


    return (
        <div className="container">
            {/* Toast para mensajes */}
            {toast.text && <Toast type={toast.type} text={toast.text} />}

            {/* Header con estadísticas */}
            <div className="header-container">
                <h2 className="titulo-seccion">Gestión de Mobiliario</h2>
                <div className="header-stats">
                    <div className="stat-item">
                        Total: <strong>{mobiliarios.length}</strong>
                    </div>
                    <div className="stat-item">
                        Mostrando: <strong>{filtrados.length}</strong>
                    </div>
                </div>
            </div>

            {/* Contenedor del formulario */}
            <div className="form-container">
                <MobiliariosForm 
                    onGuardar={guardarMobiliario} 
                    cargar={guardando} 
                />
            </div>

            {/* Buscador mejorado */}
            <div className="search-container">
                <div className="search-wrapper">
                    <span className="search-icon"></span>
                    <input 
                        type="text" 
                        className="buscar-input" 
                        placeholder="Buscar mobiliario por código, tipo, descripción, ubicación o estado..." 
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    {filtro && (
                        <button 
                            className="clear-search" 
                            onClick={() => setFiltro("")}
                            title="Limpiar búsqueda"
                        >
                            ×
                        </button>
                    )}
                </div>
                
                {filtro && (
                    <div className="search-results-info">
                        {filtrados.length === 0 
                            ? "No se encontraron resultados para tu búsqueda" 
                            : `Se encontraron ${filtrados.length} mobiliario(s)`}
                    </div>
                )}
            </div>

            {/* Grid de mobiliarios */}
            <div className="mobiliarios-grid-container">
                {filtrados.length > 0 ? (
                    <div className="mobiliarios-grid">
                        {filtrados.map((m) => (
                            <MobiliariosCard 
                                key={m.id} 
                                mobiliario={m} 
                                onEdit={abrirEdicion} 
                                onDelete={borrarMobiliario} 
                            />
                        ))}
                    </div>
                ) : mobiliarios.length > 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">📦</div>
                        <h3>No se encontraron mobiliarios</h3>
                        <p>No hay resultados que coincidan con tu búsqueda. Intenta con otros términos.</p>
                    </div>
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">🛋️</div>
                        <h3>No hay mobiliarios registrados</h3>
                        <p>Comienza agregando tu primer mobiliario usando el formulario de arriba.</p>
                    </div>
                )}
            </div>

            {/* Modal para editar */}
            <Modal open={editOpen} onClose={() => setEditOpen(false)}>
                {seleccionado && (
                    <EditarMobiliarios 
                        mobiliario={seleccionado} 
                        onGuardar={guardarCambios} 
                        cargar={actualizando} 
                    />
                )}
            </Modal>

            {/* Footer del grid */}
            {filtrados.length > 0 && (
                <div className="grid-footer">
                    Mostrando {filtrados.length} de {mobiliarios.length} mobiliarios
                    {filtro && " (filtrados)"}
                </div>
            )}
        </div>
    );
}

export default Home;
