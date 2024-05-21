/** @format */

//To do
//részletek gomb add function

let test = document.getElementById("main");
let adatok = [];
let szam = 0;

Lekeres();
function Lekeres() {
	adatok = [];
	szam = 0;
	test.innerHTML = "";
	fetch("https://nodejs.sulla.hu/data")
		.then((res) => res.json())
		.then((datas) => {
			datas.forEach((element) => {
				adatok.push(element);
				Divek(adatok[adatok.indexOf(element)]);
				szam++;
				console.log(element);
				console.log(element.minimum_nights);
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
	divv.innerHTML += `<button class='btn btn-primary' onclick='Reszletek(${szam})'>Részletek</button>`;
	div.appendChild(divv);
	test.appendChild(div);
}

function Torol(id) {
	if (confirm(`Biztosan törli?`)) {
		alert("Sikeres törlés");

		fetch("https://nodejs.sulla.hu/data/" + id, {
			method: "DELETE"
		}).then((res) => {
			location.reload();
		});

		return;
	}

	alert("Törlés megszakítva");
}

function Modosit(elem) {
	let mi = adatok[elem];
	console.log(mi);
	UjSzallas(mi);
}

function Modosit2(elem) {
	let adatok2 = {
		hostname: document.getElementById("hostname").value,
		location: document.getElementById("location").value,
		minimum_nights: document.getElementById("minimum_nightss").value,
		name: document.getElementById("name").value,
		price: document.getElementById("price").value
	};

	if (
		adatok2.hostname === "" ||
		adatok2.location === "" ||
		adatok2.minimum_nights === "" ||
		adatok2.name === "" ||
		adatok2.price === ""
	) {
		alert("Ne hagyj mezőt üresen!");
		return;
	}

	fetch("https://nodejs.sulla.hu/data/" + elem, {
		method: "PUT",
		body: JSON.stringify(adatok2),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(function () {
			location.reload();
		})
		.catch((error) => {
			console.error("Hiba történt a kérés során:", error);
			alert("Hiba történt az adatok lekérése közben.");
		});
}

function Reszletek(szam) {
	let cards = document.querySelectorAll(".card");
	let div2 = document.createElement("div");
	div2.innerHTML = `
  <h2>Részletek</h2>
  <p>Hostnév: ${adatok[szam].hostname}</p>
  <p>Hely: ${adatok[szam].location}</p>
  <p>Éjszakák: ${adatok[szam].minimum_nights}</p>
  <p>Név:: ${adatok[szam].name}</p>
  <p>Ár (ft): ${adatok[szam].price} Ft</p>
  <p>Leírás: Nagyon nagyon nagyon nagyon... ...nagyon jó hely!!</p>
  <img src="Images/kep${0}.jpg" title="kép" alt="kép">
  `;
	div2.className = "popup";

	if (cards[szam].childElementCount < 2) {
		cards[szam].appendChild(div2);
		return;
	}
	cards[szam].lastChild.remove();
}

function RandomImg() {
	return Math.floor(Math.random() * 3);
}

function UjSzallas(elem) {
	test.innerHTML = "";
	test.innerHTML = `
  <form>
  <div class="form-group">
    <label for="hostname">Hostnév</label>
    <input class="form-control" id="hostname" placeholder="Írja be a nevet">
  </div>
  <div class="form-group">
    <label for="location">Hely</label>
    <input class="form-control" id="location" placeholder="Hely">
  </div>
    <div class="form-group">
    <label for="minimum_nightss">Minimum éjszakák</label>
    <input type="text" class="form-control" id="minimum_nightss" placeholder="Minimum éjszakák">
  </div>
    <div class="form-group">
    <label for="name">Név</label>
    <input class="form-control" id="name" placeholder="Név">
  </div>
    <div class="form-group">
    <label for="price">Ár (Forintban)</label>
    <input type="number" class="form-control" id="price" placeholder="Ár (forintban)">
  </div>
  <button type="submit" id="kuld" class="btn btn-primary">Küld</button>
</form>`;
	document.getElementById("kuld").addEventListener("click", function Func() {
		Kuld(elem);
	});

	if (adatok.includes(elem)) {
		document.getElementById("hostname").value = elem.hostname;
		document.getElementById("location").value = elem.location;
		document.getElementById("minimum_nightss").value = elem.minimum_nights;
		document.getElementById("name").value = elem.name;
		document.getElementById("price").value = elem.price;
	}
}

function Kuld(elem) {
	let adatook = {
		hostname: document.getElementById("hostname").value,
		location: document.getElementById("location").value,
		minimum_nights: document.getElementById("minimum_nightss").value,
		name: document.getElementById("name").value,
		price: document.getElementById("price").value
	};

	if (
		adatook.hostname === "" ||
		adatook.location === "" ||
		adatook.minimum_nights === "" ||
		adatook.name === "" ||
		adatook.price === ""
	) {
		alert("Ne hagyj mezőt üresen!");
		return;
	}

	if (adatok.includes(elem)) {
		Modosit2(elem.id);
		return;
	}

	fetch("https://nodejs.sulla.hu/data", {
		method: "POST",
		body: JSON.stringify(adatook),
		headers: {
			"Content-Type": "application/json"
		}
	}).then((res) => {
		location.reload();
	});
}
