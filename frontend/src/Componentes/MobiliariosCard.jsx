function MobiliariosCard({ mobiliario, onEdit, onDelete }) {
return (
    <div className="mobiliario-card">
      <div className="barra-lateral">
        <span className="estado-vertical">{mobiliario.estado}</span>
      </div>

      <div className="card-body">
        <div className="card-info">
          <div className="tipo-texto">{mobiliario.tipo}</div>
          <div className="codigo-grande">{mobiliario.codigo}</div>
          <div className="detalle-texto"><strong>Descripción:</strong> {mobiliario.descripcion}</div>
          <div className="detalle-texto"><strong>Ubicación:</strong> {mobiliario.ubicacion}</div>
          <div className="detalle-texto"><strong>Estado:</strong> {mobiliario.estado}</div>
        </div>

        <div className="acciones">
          <button className="btn-editar" onClick={() => onEdit(mobiliario)}>
            EDITAR
          </button>
          <button className="btn-eliminar" onClick={() => onDelete(mobiliario.id)}>
            ELIMINAR
          </button>
        </div>
      </div>
    </div>
  );

}
export default MobiliariosCard;