const form = document.getElementById("myForm");

myForm.addEventListener("submit", AgregarTarea);

function AgregarTarea(event) {
  console.log("Tarea agregandose");
  event.preventDefault();

  const taskText = document.getElementById("taskText");
  const taskTime = document.getElementById("taskTime");
  var taskTable = document.getElementById("taskTable");

  // Si la tarea es valida se agrega a la lista de tareas, sino, la tarea no se agrega y se muestra una advertencia
  if (!NoEsValido(taskText)) {
    // Recorro las filas de la tabla, si la proxima esta vacia, inserto las celdas con sus elementos, guardo las tareas y vacio el input de la tarea.
    for (var i = 0; i <= taskTable.rows.length; i++) {
      if (taskTable.rows[i + 1] == null) {
        var row = taskTable.insertRow(i + 1);

        var col1 = row.insertCell(0);
        var col2 = row.insertCell(1);
        var col3 = row.insertCell(2);
        var col4 = row.insertCell(3);

        col1.innerHTML = i + 1;
        col2.innerHTML = taskText.value;
        if (taskTime.value == "") {
          col3.innerHTML = "-";
        } else {
          col3.innerHTML = taskTime.value;
        }

        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        col4.appendChild(checkBox);

        ActualizarTareas();
        VaciarInputs();
        break;
      }
    }
  } else {
    window.alert("Ingrese una tarea valida");
  }
}

function EliminarTareas() {
  console.log("Tareas eliminandose");
  var taskTable = document.getElementById("taskTable");
  var exists = false;

  // Recorro las filas de la tabla y compruebo si la celda numero 3 esta checkeada, si lo está se elimina la fila

  for (var i = 1; i <= taskTable.rows.length - 1; i++) {
    if (taskTable.rows[i].cells[3].children[0].checked == true) {
      console.log("Eliminando fila: " + i);
      taskTable.deleteRow(i);
      exists = true;
    }
  }
  // Si existe una tarea marcada se reorganizan los numero de la celda 0, si no, muestro una advertencia.
  exists ? ReasignarNumero() : window.alert("No hay tareas marcadas!");
  ActualizarTareas();
}

function NoEsValido(taskText) {
  // Valido la tarea ingresada y le agrego una clase al input
  if (
    taskText.value == null ||
    taskText.value == "" ||
    taskText.value.length > 50
  ) {
    document.getElementById("taskText").className = "form-control is-invalid";
    return true;
  } else {
    document.getElementById("taskText").className = "form-control is-valid";
    return false;
  }
}

function VaciarInputs() {
  document.getElementById("taskText").value = "";
  document.getElementById("taskTime").value = "";
}

function ReasignarNumero() {
  var taskTable = document.getElementById("taskTable");

  for (var i = 1; i <= taskTable.rows.length - 1; i++) {
    taskTable.rows[i].cells[0].innerHTML = i;
  }
}

// Actualizo las tareas guardadas al guardar o eliminar tareas

function ActualizarTareas() {
  var data;

  var taskTable = document.getElementById("taskTable");

  for (var i = 1; i <= taskTable.rows.length - 1; i++) {
    var obj = {
      taskText: taskTable.rows[i].cells[1].innerHTML,
      taskTime: taskTable.rows[i].cells[2].innerHTML,
    };

    if (data == null) {
      data = [obj];
    } else {
      data.push(obj);
    }
  }

  // Si no hay tareas para guardar borro el localStorage, si las hay actualizo en el localStorage
  if (data == null) {
    localStorage.removeItem("savedData");
  } else {
    localStorage.removeItem("savedData");
    localStorage.setItem("savedData", JSON.stringify(data));
  }
}
