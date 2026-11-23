// Elementos del DOM
const formulario = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contadorPendientes = document.getElementById('contador-pendientes');

// Actualizar el contador de tareas pendientes
function actualizarContador() {
  // Seleccionamos las tareas que no tienen la clase 'completada'
  const tareasPendientes = listaTareas.querySelectorAll('.tarea:not(.completada)');
  contadorPendientes.textContent = tareasPendientes.length;
}

// Crear el elemento HTML de una nueva tarea
function crearElementoTarea(texto) {
  const li = document.createElement('li');
  li.classList.add('tarea');

  // Texto de la tarea
  const spanTexto = document.createElement('span');
  spanTexto.classList.add('texto-tarea');
  spanTexto.textContent = texto;

  // Contenedor de botones
  const divAcciones = document.createElement('div');
  divAcciones.classList.add('acciones');

  // Botón completar
  const btnCompletar = document.createElement('button');
  btnCompletar.type = 'button';
  btnCompletar.classList.add('btn-completar');
  btnCompletar.textContent = '✓';
  btnCompletar.title = 'Marcar como completada';

  // Botón eliminar
  const btnEliminar = document.createElement('button');
  btnEliminar.type = 'button';
  btnEliminar.classList.add('btn-eliminar');
  btnEliminar.textContent = '✕';
  btnEliminar.title = 'Eliminar tarea';

  // Ensamblamos la estructura
  divAcciones.append(btnCompletar, btnEliminar);
  li.append(spanTexto, divAcciones);

  return li;
}

// Evento para agregar una tarea
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Evita que el formulario recargue la página

  const texto = inputTarea.value.trim();
  if (texto === '') return; // Evita agregar tareas con solo espacios en blanco

  const nuevaTarea = crearElementoTarea(texto);
  listaTareas.appendChild(nuevaTarea);

  // Limpiamos el campo de texto, devolvemos el foco y actualizamos el contador
  inputTarea.value = '';
  inputTarea.focus();
  actualizarContador();
});

// Delegación de eventos en la lista para completar o eliminar tareas
listaTareas.addEventListener('click', (evento) => {
  const elementoClickeado = evento.target;
  const itemTarea = elementoClickeado.closest('.tarea');

  if (!itemTarea) return;

  // Si se presionó el botón completar
  if (elementoClickeado.classList.contains('btn-completar')) {
    itemTarea.classList.toggle('completada');
    actualizarContador();
  }

  // Si se presionó el botón eliminar
  if (elementoClickeado.classList.contains('btn-eliminar')) {
    itemTarea.remove();
    actualizarContador();
  }
});
