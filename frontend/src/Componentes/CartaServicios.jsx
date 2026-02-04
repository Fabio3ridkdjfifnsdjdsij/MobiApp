function CartaServicios({servicio,onEdit}){
    return(
        <div className="service-item">
          <h3>{servicio.tipo}</h3>
          <p>{servicio.codigo}</p>
          <p>{servicio.descripcion}</p>
          <p>{servicio.ubicacion}</p>
          <p>{servicio.estado}</p>

      
           

        </div>
    )
}