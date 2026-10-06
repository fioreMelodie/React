import { useState } from 'react';

// Valores iniciales en una constante para poder reutilizarlos en el botón reset
const INICIAL = {
  nombre: '',
  email: '',
  clave: '',
  telefono: '',
  fechaInicio: '',
  experiencia: 3,
  jornada: 'manana',
  curso: '',
  temas: [],
  terminos: false
}

function FormularioInscripcion(props) {

  const [datos, setDatos] = useState(INICIAL)

  // Un solo manejador para los controles simples
  // (text, email, password, tel, date, range, radio, select)
  function cambio(e) {
    const { name, value } = e.target
    setDatos((valores) => ({
      ...valores,
      [name]: value,
    }))
  }

  function cambioTerminos(e) {
    setDatos((valores) => ({
      ...valores,
      terminos: e.target.checked,
    }))
  }

  // En un <select multiple> hay que recorrer las opciones seleccionadas
  function cambioTemas(e) {
    const seleccionados = Array.from(e.target.selectedOptions, (op) => op.value)
    setDatos((valores) => ({
      ...valores,
      temas: seleccionados,
    }))
  }

  // Con controles controlados el reset del navegador no limpia el estado:
  // debemos volver a dejar la variable de estado con los valores iniciales
  function restaurar() {
    setDatos(INICIAL)
  }

  function procesar(e) {
    e.preventDefault();

    if (datos.clave.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (datos.curso === '') {
      alert('Debe seleccionar un curso.')
      return
    }
    if (datos.temas.length === 0) {
      alert('Seleccione al menos un tema de interés.')
      return
    }
    if (!datos.terminos) {
      alert('Debe aceptar los términos para continuar.')
      return
    }

    props.onEnviar(datos)
  }

  return (
    <form onSubmit={procesar}>
      <h2>Inscripción a cursos</h2>

      <p>
        Nombre completo:
        <input type="text" name="nombre" value={datos.nombre}
               onChange={cambio} required />
      </p>

      <p>
        Correo electrónico:
        <input type="email" name="email" value={datos.email}
               onChange={cambio} required />
      </p>

      <p>
        Contraseña:
        <input type="password" name="clave" value={datos.clave}
               onChange={cambio} minLength="6" required />
      </p>

      <p>
        Teléfono:
        <input type="tel" name="telefono" value={datos.telefono}
               onChange={cambio} pattern="[0-9]{7,10}"
               placeholder="3001234567" required />
      </p>

      <p>
        Fecha de inicio:
        <input type="date" name="fechaInicio" value={datos.fechaInicio}
               onChange={cambio} required />
      </p>

      <p>
        Nivel de experiencia (1 a 5):
        <input type="range" name="experiencia" value={datos.experiencia}
               min="1" max="5" step="1" onChange={cambio} />
        <strong> {datos.experiencia}</strong>
      </p>

      <fieldset>
        <legend>Jornada</legend>
        <label>
          <input type="radio" name="jornada" value="manana"
                 checked={datos.jornada === 'manana'} onChange={cambio} /> Mañana
        </label>
        <label>
          <input type="radio" name="jornada" value="tarde"
                 checked={datos.jornada === 'tarde'} onChange={cambio} /> Tarde
        </label>
        <label>
          <input type="radio" name="jornada" value="noche"
                 checked={datos.jornada === 'noche'} onChange={cambio} /> Noche
        </label>
      </fieldset>

      <p>
        Curso:
        <select name="curso" value={datos.curso} onChange={cambio}>
          <option value="">-- Seleccione --</option>
          <option value="React">Desarrollo con React</option>
          <option value="PHP">PHP y MySQL</option>
          <option value="Python">Python básico</option>
          <option value="BD">Bases de datos</option>
        </select>
      </p>

      <p>
        Temas de interés (Ctrl + clic para varios):
        <select name="temas" multiple size="4" value={datos.temas}
                onChange={cambioTemas}>
          <option value="Hooks">Hooks</option>
          <option value="Formularios">Formularios</option>
          <option value="API REST">API REST</option>
          <option value="Pruebas">Pruebas unitarias</option>
          <option value="Despliegue">Despliegue</option>
        </select>
      </p>

      <p>
        <label>
          <input type="checkbox" name="terminos" checked={datos.terminos}
                 onChange={cambioTerminos} />
          Acepto el tratamiento de mis datos personales
        </label>
      </p>

      <p className="botones">
        <input type="submit" value="Inscribirme" />
        <input type="reset" value="Limpiar" onClick={restaurar} />
        {/* type="image" es un botón de envío que se dibuja con una imagen */}
        <input type="image" src="/logo192.png" alt="Enviar inscripción"
               width="40" height="40" title="Enviar inscripción" />
      </p>
    </form>
  );
}

export default FormularioInscripcion;
