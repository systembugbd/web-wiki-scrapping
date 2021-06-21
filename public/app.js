const dropdown = document.querySelector("#dropdown");
const dataContainer = document.querySelector("#data");
 
async function getUSStateData() {
  const response = await fetch("/api/states");
  const data = await response.json();
  setData(data);
}

function setData(data) {
  data.forEach((state) => {
    let option = document.createElement("option");
    option.setAttribute("value", state.code);
    option.textContent = state.name;
    dropdown.append(option);
  });

  dropdown.addEventListener("change", (event) => {
    let filteredData = data.filter((state) => {
      if (event.target.value == state.code) {
        return state;
      }
    });

    showDataOnTable(filteredData, event);
  });
}

function showDataOnTable(data, e) {
  dataContainer.innerHTML = "";
  for (const property in data[0]) {
    let div = document.createElement("div");
    let img = document.createElement("img");
       if ( property == 'flag' ) {
           
            img.src = data[0][property]
            img.width = "40"
            img.height = "40"
          div.append(property.toUpperCase() + ": ")
            div.append(img);
          //   div.append(property.toUpperCase() + ":" + img);
            
       } else {
          div.append(property.replaceAll("_", " ").toUpperCase() + " : ");        
          div.append(data[0][property]);
      }
    
    div.style.fontWeight = "bold";
    dataContainer.appendChild(div);
  }

  // console.log(data)
}

getUSStateData();
