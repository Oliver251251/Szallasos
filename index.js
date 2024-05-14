let test = document.getElementById("main");
let adatok = [];
let szam = 0;

Lekeres();
function Lekeres() {
  test.innerHTML = "";
  fetch("https://nodejs.sulla.hu/data")
    .then((res) => res.json())
    .then((datas) => {
      datas.forEach((element) => {
        adatok.push(element);
        Divek(element);
        szam++;
        console.log(element);
      });
    });
}

function Divek(element) {
  let div = document.createElement("div");
  div.classList.add("card");
  let divv = document.createElement("div");
  divv.classList.add("card-body");
  divv.innerHTML = "Hostnév: " + element.hostname + "<br>";
  divv.innerHTML += "Hely: " + element.location + "<br>";
  divv.innerHTML += "Minimum éjszakák: " + element.minimum_nights + "<br>";
  divv.innerHTML += "Név: " + element.name + "<br>";
  divv.innerHTML += "Ár (forintban): " + element.price + " Ft<br>";
  divv.innerHTML += `<button class='btn btn-danger'onclick='Torol(${element.id})'>Törlés</button>`;
  divv.innerHTML += `<button class='btn btn-success' onclick='Modosit(${szam})'>Módosít</button>`;
  divv.innerHTML += `<button class='btn btn-primary' onclick='Reszletek()'>Részletek</button>`;

  div.appendChild(divv);
  test.appendChild(div);
}

function Torol(id) {
  //bele hogy mit?
  if (confirm(`Biztosan törli?`)) {
    alert("Sikeres törlés");

    fetch("https://nodejs.sulla.hu/data/" + id, {
      method: "DELETE",
    }).then((res) => {
      location.reload();
    });

    return;
  }

  alert("Törlés megszakítva");
}

function Modosit(elem) {
  UjSzallas(elem);
  let adatok2 = {
    id: eredmeny[indeex].id,
    isGlutenFree: document.getElementById("isGlutenFreee1").value,
    kepURL: document.getElementById("kep1").value,
    name: document.getElementById("nev1").value,
  };
  fetch("https://nodejs.sulla.hu/data/" + adatok[elem].id, {
    method: "PUT",
    body: JSON.stringify(adatok2),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function () {
      location.reload();
    })
    .catch((error) => {
      console.error("Hiba történt a kérés során:", error);
      alert("Hiba történt az adatok lekérése közben.");
    });
}

function Reszletek() {}

function UjSzallas(elem) {
  test.innerHTML = "";
  test.innerHTML = `
  <form>
  <div class="form-group">
    <label for="hotname">Hostnév</label>
    <input class="form-control" id="hostname" placeholder="Írja be a nevet" value="${adatok[elem].hostname}">
  </div>
  <div class="form-group">
    <label for="location">Hely</label>
    <input class="form-control" id="location" placeholder="Hely" value="${adatok[elem].location}">
  </div>
    <div class="form-group">
    <label for="minimun_nights">Minimum éjszakák</label>
    <input type="number" class="form-control" id="minimun_nights" placeholder="Minimum éjszakák" value="${adatok[elem].minimum_nights}">
  </div>
    <div class="form-group">
    <label for="name">Név</label>
    <input class="form-control" id="name" placeholder="Név" value="${adatok[elem].name}">
  </div>
    <div class="form-group">
    <label for="price">Ár (Forintban)</label>
    <input type="number" class="form-control" id="price" placeholder="Ár (forintban)" value="${adatok[elem].price}">
  </div>
  <button type="submit" class="btn btn-primary" onclick="Kuld()">Küld</button>
</form>`;
}

function Kuld() {
  let adatok = {
    hostname: document.getElementById("hostname").value,
    location: document.getElementById("location").value,
    minimun_nights: document.getElementById("minimun_nights").value,
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
  };

  fetch("https://nodejs.sulla.hu/data", {
    method: "POST",
    body: JSON.stringify(adatok),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    location.reload();
  });
}
