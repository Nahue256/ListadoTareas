if (localStorage.savedData != null) {
  console.log("Se han encontrando datos, llenando Tabla...");
  var data = JSON.parse(localStorage.getItem("savedData"));
  var taskTable = document.getElementById("taskTable");
  console.log(data);
  // Lleno la tabla recorriendo mis datos guardados.
  for (var i = 0; i <= data.length - 1; i++) {
    var row = taskTable.insertRow(i + 1);

    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    var col4 = row.insertCell(3);

    col1.innerHTML = i + 1;
    col2.innerHTML = data[i].taskText;

    if (data[i].taskTime == "" || data[i].taskTime == null) {
      col3.innerHTML = "-";
    } else {
      col3.innerHTML = data[i].taskTime;
    }

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    col4.appendChild(checkBox);
  }
} else {
  console.log("No se han encontrado datos.");
}
