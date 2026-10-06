import { useState } from 'react';
import FormularioInscripcion from './FormularioInscripcion';
import './App.css';

function App() {

  const [inscripcion, setInscripcion] = useState(null)

  // La componente hija emite el evento 'onEnviar' con los datos capturados
  function recibirDatos(datos) {
    const jornadas = {
      manana: 'Mañana',
      tarde: 'Tarde',
      noche: 'Noche'
    }

    const mensaje =
      'DATOS DE LA INSCRIPCIÓN\n\n' +
      'Nombre: ' + datos.nombre + '\n' +
      'Correo: ' + datos.email + '\n' +
      'Contraseña: ' + '*'.repeat(datos.clave.length) + '\n' +
      'Teléfono: ' + datos.telefono + '\n' +
      'Fecha de inicio: ' + datos.fechaInicio + '\n' +
      'Experiencia: ' + datos.experiencia + ' de 5\n' +
      'Jornada: ' + jornadas[datos.jornada] + '\n' +
      'Curso: ' + datos.curso + '\n' +
      'Temas: ' + datos.temas.join(', ') + '\n' +
      'Términos: ' + (datos.terminos ? 'aceptados' : 'no aceptados')

    alert(mensaje)
    setInscripcion(datos)
  }

  return (
    <div className="contenedor">
      <FormularioInscripcion onEnviar={recibirDatos} />

      <hr />

      {inscripcion === null ? (
        <p>Aún no se ha registrado ninguna inscripción.</p>
      ) : (
        <div>
          <h3>Última inscripción registrada</h3>
          <ul>
            <li>Nombre: {inscripcion.nombre}</li>
            <li>Correo: {inscripcion.email}</li>
            <li>Contraseña: {'*'.repeat(inscripcion.clave.length)}</li>
            <li>Teléfono: {inscripcion.telefono}</li>
            <li>Fecha de inicio: {inscripcion.fechaInicio}</li>
            <li>Experiencia: {inscripcion.experiencia} de 5</li>
            <li>Jornada: {inscripcion.jornada}</li>
            <li>Curso: {inscripcion.curso}</li>
            <li>
              Temas:
              <ul>
                {inscripcion.temas.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </li>
            <li>Términos: {inscripcion.terminos ? 'aceptados' : 'no aceptados'}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
