// Base de datos en memoria
let ninos = JSON.parse(localStorage.getItem('ninos')) || [];
let maestros = JSON.parse(localStorage.getItem('maestros')) || [];
let clases = JSON.parse(localStorage.getItem('clases')) || [];
let asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];

// Cambiar de sección
function cambiarSeccion(seccion) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(seccion).classList.add('active');
    event.target.classList.add('active');

    if (seccion === 'clases') actualizarSelectMaestros();
    if (seccion === 'asistencia') actualizarSelectNinos();
}

// Guardar niño
function guardarNino(e) {
    e.preventDefault();
    
    const fotoInput = document.getElementById('fotoNino');
    let fotoBase64 = null;

    if (fotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoBase64 = event.target.result;
            crearNino(fotoBase64);
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        crearNino(null);
    }
}

function crearNino(foto) {
    const nino = {
        id: Date.now(),
        nombre: document.getElementById('nombreNino').value,
        fechaNac: document.getElementById('fechaNacNino').value,
        tutor: document.getElementById('tutorNino').value,
        telefono: document.getElementById('telefonoNino').value,
        direccion: document.getElementById('direccionNino').value,
        foto: foto,
        observaciones: document.getElementById('observacionesNino').value
    };

    ninos.push(nino);
    localStorage.setItem('ninos', JSON.stringify(ninos));
    document.getElementById('formNino').reset();
    mostrarNinos();
    alert('✅ Niño guardado correctamente');
}

// Mostrar niños
function mostrarNinos() {
    const lista = document.getElementById('listaNinos');
    
    if (ninos.length === 0) {
        lista.innerHTML = '<div class="empty-state"><h3>No hay niños registrados</h3><p>Agrega el primer niño usando el formulario</p></div>';
        return;
    }

    lista.innerHTML = ninos.map(nino => `
        <div class="card">
            <div class="card-header">
                ${nino.foto ? 
                    `<img src="${nino.foto}" class="card-image" alt="${nino.nombre}">` :
                    `<div class="card-image placeholder">${nino.nombre.charAt(0).toUpperCase()}</div>`
                }
                <div class="card-info">
                    <h3>${nino.nombre}</h3>
                    <p>👶 ${calcularEdad(nino.fechaNac)} años</p>
                </div>
            </div>
            <div class="card-body">
                <p><strong>Tutor:</strong> ${nino.tutor}</p>
                <p><strong>Teléfono:</strong> ${nino.telefono}</p>
                ${nino.direccion ? `<p><strong>Dirección:</strong> ${nino.direccion}</p>` : ''}
                ${nino.observaciones ? `<p><strong>Obs:</strong> ${nino.observaciones}</p>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-danger" onclick="eliminarNino(${nino.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

function calcularEdad(fechaNac) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function eliminarNino(id) {
    if (confirm('¿Estás seguro de eliminar este niño?')) {
        ninos = ninos.filter(n => n.id !== id);
        localStorage.setItem('ninos', JSON.stringify(ninos));
        mostrarNinos();
    }
}

// Guardar maestro
function guardarMaestro(e) {
    e.preventDefault();
    
    const fotoInput = document.getElementById('fotoMaestro');
    let fotoBase64 = null;

    if (fotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoBase64 = event.target.result;
            crearMaestro(fotoBase64);
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        crearMaestro(null);
    }
}

function crearMaestro(foto) {
    const maestro = {
        id: Date.now(),
        nombre: document.getElementById('nombreMaestro').value,
        cedula: document.getElementById('cedulaMaestro').value,
        telefono: document.getElementById('telefonoMaestro').value,
        email: document.getElementById('emailMaestro').value,
        especialidad: document.getElementById('especialidadMaestro').value,
        foto: foto
    };

    maestros.push(maestro);
    localStorage.setItem('maestros', JSON.stringify(maestros));
    document.getElementById('formMaestro').reset();
    mostrarMaestros();
    alert('✅ Maestro guardado correctamente');
}

function mostrarMaestros() {
    const lista = document.getElementById('listaMaestros');
    
    if (maestros.length === 0) {
        lista.innerHTML = '<div class="empty-state"><h3>No hay maestros registrados</h3><p>Agrega el primer maestro usando el formulario</p></div>';
        return;
    }

    lista.innerHTML = maestros.map(maestro => `
        <div class="card">
            <div class="card-header">
                ${maestro.foto ? 
                    `<img src="${maestro.foto}" class="card-image" alt="${maestro.nombre}">` :
                    `<div class="card-image placeholder">${maestro.nombre.charAt(0).toUpperCase()}</div>`
                }
                <div class="card-info">
                    <h3>${maestro.nombre}</h3>
                    <p>📋 ${maestro.cedula}</p>
                </div>
            </div>
            <div class="card-body">
                <p><strong>Teléfono:</strong> ${maestro.telefono}</p>
                ${maestro.email ? `<p><strong>Email:</strong> ${maestro.email}</p>` : ''}
                ${maestro.especialidad ? `<p><strong>Especialidad:</strong> ${maestro.especialidad}</p>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-danger" onclick="eliminarMaestro(${maestro.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

function eliminarMaestro(id) {
    if (confirm('¿Estás seguro de eliminar este maestro?')) {
        maestros = maestros.filter(m => m.id !== id);
        localStorage.setItem('maestros', JSON.stringify(maestros));
        mostrarMaestros();
    }
}

// Clases
function actualizarSelectMaestros() {
    const select = document.getElementById('maestroClase');
    select.innerHTML = '<option value="">Seleccionar maestro</option>' +
        maestros.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
}

function guardarClase(e) {
    e.preventDefault();
    
    const maestroId = parseInt(document.getElementById('maestroClase').value);
    const maestro = maestros.find(m => m.id === maestroId);

    const clase = {
        id: Date.now(),
        nombre: document.getElementById('nombreClase').value,
        maestroId: maestroId,
        maestroNombre: maestro ? maestro.nombre : '',
        horaEntrada: document.getElementById('horaEntrada').value,
        horaSalida: document.getElementById('horaSalida').value,
        capacidad: document.getElementById('capacidadClase').value
    };

    clases.push(clase);
    localStorage.setItem('clases', JSON.stringify(clases));
    document.getElementById('formClase').reset();
    mostrarClases();
    alert('✅ Clase guardada correctamente');
}

function mostrarClases() {
    const lista = document.getElementById('listaClases');
    
    if (clases.length === 0) {
        lista.innerHTML = '<div class="empty-state"><h3>No hay clases registradas</h3><p>Agrega la primera clase usando el formulario</p></div>';
        return;
    }

    lista.innerHTML = clases.map(clase => `
        <div class="card">
            <div class="card-header">
                <div class="card-image placeholder">📚</div>
                <div class="card-info">
                    <h3>${clase.nombre}</h3>
                    <p>👨‍🏫 ${clase.maestroNombre}</p>
                </div>
            </div>
            <div class="card-body">
                <p><strong>Horario:</strong> ${clase.horaEntrada} - ${clase.horaSalida}</p>
                ${clase.capacidad ? `<p><strong>Capacidad:</strong> ${clase.capacidad}</p>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-danger" onclick="eliminarClase(${clase.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

function eliminarClase(id) {
    if (confirm('¿Estás seguro de eliminar esta clase?')) {
        clases = clases.filter(c => c.id !== id);
        localStorage.setItem('clases', JSON.stringify(clases));
        mostrarClases();
    }
}

// Asistencia
function actualizarSelectNinos() {
    const select = document.getElementById('ninoAsistencia');
    select.innerHTML = '<option value="">Seleccionar niño</option>' +
        ninos.map(n => `<option value="${n.id}">${n.nombre}</option>`).join('');
    
    // Establecer fecha actual
    document.getElementById('fechaAsistencia').valueAsDate = new Date();
}

function guardarAsistencia(e) {
    e.preventDefault();
    
    const ninoId = parseInt(document.getElementById('ninoAsistencia').value);
    const nino = ninos.find(n => n.id === ninoId);

    const asistencia = {
        id: Date.now(),
        ninoId: ninoId,
        ninoNombre: nino ? nino.nombre : '',
        fecha: document.getElementById('fechaAsistencia').value,
        horaEntrada: document.getElementById('horaEntradaAsistencia').value,
        horaSalida: document.getElementById('horaSalidaAsistencia').value,
        estado: document.getElementById('estadoAsistencia').value
    };

    asistencias.push(asistencia);
    localStorage.setItem('asistencias', JSON.stringify(asistencias));
    document.getElementById('formAsistencia').reset();
    document.getElementById('fechaAsistencia').valueAsDate = new Date();
    mostrarAsistencias();
    alert('✅ Asistencia registrada correctamente');
}

function mostrarAsistencias() {
    const tbody = document.getElementById('bodyAsistencia');
    
    if (asistencias.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px; color: #6c757d;">No hay registros de asistencia</td></tr>';
        return;
    }

    tbody.innerHTML = asistencias.slice().reverse().map(a => `
        <tr>
            <td>${new Date(a.fecha).toLocaleDateString('es-ES')}</td>
            <td>${a.ninoNombre}</td>
            <td>${a.horaEntrada || '-'}</td>
            <td>${a.horaSalida || '-'}</td>
            <td>
                <span class="badge ${a.estado === 'presente' ? 'badge-success' : a.estado === 'tardanza' ? 'badge-warning' : ''}">
                    ${a.estado.toUpperCase()}
                </span>
            </td>
            <td>
                <button class="btn btn-danger" style="padding: 5px 10px; font-size: 0.85em;" onclick="eliminarAsistencia(${a.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function eliminarAsistencia(id) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
        asistencias = asistencias.filter(a => a.id !== id);
        localStorage.setItem('asistencias', JSON.stringify(asistencias));
        mostrarAsistencias();
    }
}

// Inicializar la aplicación
window.onload = function() {
    mostrarNinos();
    mostrarMaestros();
    mostrarClases();
    mostrarAsistencias();
};