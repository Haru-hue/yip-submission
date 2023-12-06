document.addEventListener("DOMContentLoaded", function () {
  const logisticQueueData = [
    { id: 1, name: "Customer 1", pickup: "Location A", dropoff: "Location B" },
    { id: 2, name: "Customer 2", pickup: "Location C", dropoff: "Location D" },
    { id: 3, name: "Customer 3", pickup: "Location E", dropoff: "Location F" },
    { id: 4, name: "Customer 4", pickup: "Location G", dropoff: "Location H" },
    { id: 5, name: "Customer 5", pickup: "Location I", dropoff: "Location J" },
  ];

  const logisticTable = document.getElementById("logisticTable");

  logisticQueueData.forEach(rowData => {
    const row = logisticTable.insertRow();
    row.draggable = true;
    row.addEventListener('dragstart', function (e) {
      const dataString = `${rowData.name}\nPickup: ${rowData.pickup}\nDropoff: ${rowData.dropoff}`;
      e.dataTransfer.setData('text/plain', dataString);
    });

    row.addEventListener('dragend', function (e) {
      this.parentElement.removeChild(this);
    });
  
    Object.values(rowData).forEach(cellData => {
      const cell = row.insertCell();
      cell.textContent = cellData;
    });
  });
  

  logisticTable.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  logisticTable.addEventListener("drop", function (e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const row = document.createElement("tr");
    row.innerHTML = data;
    logisticTable.appendChild(row);
  });

  const plannerTable = document.getElementById("plannerTable");
  plannerTable.innerHTML = "";

  // Create date headers
  for (let i = 0; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateString = date.toLocaleDateString();

    const row = plannerTable.insertRow();
    const dateHeaderCell = document.createElement("th");
    dateHeaderCell.setAttribute("id", "date");
    dateHeaderCell.textContent = dateString;
    row.appendChild(dateHeaderCell);
  }

  plannerTable.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  plannerTable.addEventListener("drop", function (e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const row = document.createElement("td");
    row.innerHTML = data.replace(/\n/g, '<br>');

    const element = document.elementFromPoint(e.clientX, e.clientY);
    const closestTh = element.closest("table");

    if (closestTh) {
      const closestSlot = closestTh.querySelector("#slot");
      const closestDate = closestTh.querySelector('#date')
      console.log("closestSlot:", closestSlot, closestDate);

      if (closestSlot) {
        closestDate.parentNode.appendChild(row);
      }
    } else {
      console.log(
        "No th element found among the ancestors of the dropped element."
      );
    }
  });

  // Create slot headers
  const headerRow = plannerTable.insertRow(0);
  const emptyCell = document.createElement("th");
  headerRow.appendChild(emptyCell);
  for (let i = 1; i <= 5; i++) {
    const slotHeaderCell = document.createElement("th");
    slotHeaderCell.setAttribute("id", "slot");
    slotHeaderCell.textContent = `Slot ${i}`;
    headerRow.appendChild(slotHeaderCell);
  }
});
