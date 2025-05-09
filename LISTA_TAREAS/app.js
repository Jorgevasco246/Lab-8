// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas
const Entrada = document.getElementById('ingresar-tarea')
const boton = document.getElementById('boton-agregar')
const Tareas = document.getElementById('lista-tareas')

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  const tareasGuardadas = localStorage.getItem('tareas')
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : []
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareasParaGuardar) {
  localStorage.setItem('tareas', JSON.stringify(tareasParaGuardar))
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
  const tareasActuales = obtenerTareasLocalStorage()
  Tareas.innerHTML = '' // Limpiar lista
  tareasActuales.forEach((tareaItem, posicion) => {
    const contenedorTarea = document.createElement('div')
    contenedorTarea.classList.add('tarea')

    const parrafoTarea = document.createElement('p')
    parrafoTarea.classList.add('texto-tarea')
    parrafoTarea.textContent = tareaItem.texto
    if (tareaItem.completada) {
      parrafoTarea.style.textDecoration = 'line-through'
    }

    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('botones-tarea')

    const botonOk = document.createElement('button')
    botonOk.classList.add('btn_ok')
    botonOk.textContent = '✔️'
    botonOk.onclick = () => completarTarea(posicion)

    const botonBorrar = document.createElement('button')
    botonBorrar.classList.add('btn_eliminar')
    botonBorrar.textContent = '❌'
    botonBorrar.onclick = () => eliminarTarea(posicion)

    contenedorBotones.appendChild(botonOk)
    contenedorBotones.appendChild(botonBorrar)

    contenedorTarea.appendChild(parrafoTarea)
    contenedorTarea.appendChild(contenedorBotones)
    Tareas.appendChild(contenedorTarea)
  })
}

// Marcar la Tarea como completada
function completarTarea(index) {
  const tareas = obtenerTareasLocalStorage()
  tareas[index].completada = !tareas[index].completada
  guardarTareasLocalStorage(tareas)
  mostrarTareas()
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
  const tareas = obtenerTareasLocalStorage()
  tareas.splice(index, 1)
  guardarTareasLocalStorage(tareas)
  mostrarTareas()
}

// Crear una nueva Tarea
function nuevaTarea() {
  const textoIngresado = Entrada.value.trim()
  if (textoIngresado === '') return alert('Por favor, escribe una tarea.')

  const tareasExistentes = obtenerTareasLocalStorage()
  tareasExistentes.push({ texto: textoIngresado, completada: false })
  guardarTareasLocalStorage(tareasExistentes)
  Entrada.value = ''
  mostrarTareas()
}
  
// Escuchar el boton Agregar y en el evento click llamar a nuevaTarea
boton.addEventListener('click', nuevaTarea)

// Escuchar el inputTarea y en el evento keypress con la tecla Enter 
// llamar a nuevaTarea
Entrada.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    nuevaTarea()
  }
});

// Cargar tareas al iniciar con mostrarTareas
mostrarTareas()
