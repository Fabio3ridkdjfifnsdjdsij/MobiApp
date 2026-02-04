using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controller;

[ApiController]
[Route("api/mobiliarios")]

public class MobiliariosController : ControllerBase
{
 



    private static readonly List<MobiliarioDto> _mobiliarios = new(){};


    [HttpGet]

    public IActionResult Get()
    {
        return Ok(_mobiliarios);
    }
   
   public class CrearMobiliarioRequest
    {
        public string? Codigo{get;set;}

          public string? Tipo{get;set;}
        public string? Descripcion{get;set;}

        public string? Ubicacion{get;set;}

        public string? Estado{get;set;}
    }

    [HttpPost]

    public IActionResult Post([FromBody] CrearMobiliarioRequest req)
    {

        
        if(req==null || string.IsNullOrWhiteSpace(req.Codigo)|| string.IsNullOrWhiteSpace(req.Tipo)|| string.IsNullOrWhiteSpace(req.Descripcion)|| string.IsNullOrWhiteSpace(req.Ubicacion) || string.IsNullOrWhiteSpace(req.Estado))
            return BadRequest("Todos los campos son obligatorios.");
        var nuevoId= _mobiliarios.Count == 0 ? 1 : _mobiliarios.Max(s=>s.Id)+1;

        var nuevo=new MobiliarioDto
        {
            Id=nuevoId,
            Codigo=req.Codigo.Trim(),
            Tipo=req.Tipo.Trim(),
            Descripcion=req.Descripcion.Trim(),
            Ubicacion=req.Ubicacion.Trim(),
            Estado=req.Estado.Trim()
        };

        _mobiliarios.Add(nuevo);

        return Ok(nuevo);
    }


      public class ActualizarMobiliarioRequest
    {
            public string? Codigo{get;set;}

          public string? Tipo{get;set;}
        public string? Descripcion{get;set;}

        public string? Ubicacion{get;set;}

        public string? Estado{get;set;}
    }

    [HttpPut("{id:int}")]

    public IActionResult Put(int id, [FromBody]  ActualizarMobiliarioRequest req)
    {
        var existente=_mobiliarios.FirstOrDefault(S=>S.Id==id);
        
        if(existente==null) return NotFound("Mobiliario no encontrado.");

        if(req==null || string.IsNullOrWhiteSpace(req.Codigo)|| string.IsNullOrWhiteSpace(req.Tipo)|| string.IsNullOrWhiteSpace(req.Descripcion)|| string.IsNullOrWhiteSpace(req.Ubicacion) || string.IsNullOrWhiteSpace(req.Estado))
            return BadRequest("Todos los campos son obligatorios.");

     
       existente.Codigo = req.Codigo.Trim();
existente.Tipo = req.Tipo.Trim();
existente.Descripcion = req.Descripcion.Trim();
existente.Ubicacion = req.Ubicacion.Trim();
existente.Estado = req.Estado.Trim();


                return Ok(existente);

    }




[HttpDelete("{id:int}")]
public IActionResult Delete(int id)
{
    var existente = _mobiliarios.FirstOrDefault(s => s.Id == id);
    if (existente == null) return NotFound("Mobiliario no encontrado.");

    _mobiliarios.Remove(existente);
    return Ok(new { message = "Eliminado correctamente" });
}


       public class MobiliarioDto
    {
        public int Id {get; set;}

        public string Codigo{get;set;}="";

          public string Tipo{get;set;}="";
        public string Descripcion{get;set;}="";

        public string Ubicacion{get;set;}="";

        public string Estado{get;set;}="";


    }

}