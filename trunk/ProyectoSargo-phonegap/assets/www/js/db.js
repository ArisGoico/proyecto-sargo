var sargoDB = {};
sargoDB.indexedDB = {};
sargoDB.indexedDB.db = null;

function init() {
  sargoDB.indexedDB.open(); // open displays the data previously saved
}

//Para un posible botón o interaccion?

function addFavorite() {
  var id = document.getElementById('id_input');		//Coger el valor del input en HTML que tenga de la id "id_input"
  
  sargoDB.indexedDB.addFav(id.innerHTML);	//LLamar al método addFav(id)
}

//Esta funcion abre la DB y si no existe, la crea
sargoDB.indexedDB.open = function() {
  var version = 2;
  var request = indexedDB.open("sargo", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = sargoDB.indexedDB.onerror;

    if(db.objectStoreNames.contains("sargo")) {
      db.deleteObjectStore("sargo");
    }

	//keyPath son los atributos que tienen que existir por huevos, las keys de la BBDD
    var store = db.createObjectStore("sargo",
      {keyPath: "id"});
  };

  //Se requiere acceder siempre con un .onsuccess porque todo es asincrono
  request.onsuccess = function(e) {
    sargoDB.indexedDB.db = e.target.result;
    sargoDB.indexedDB.getAllItems();
	//añado un campo a pelo...
	//sargoDB.indexedDB.addFav("id");
  };

  request.onerror = sargoDB.indexedDB.onerror;
};


//Esto lo recolecta todo y lo renderiza (solo para el ejemplo)
sargoDB.indexedDB.getAllItems = function() {
  var slides = document.getElementById("fav_icon");

  var db = sargoDB.indexedDB.db;
  var trans = db.transaction(["sargo"], "readwrite");
  var store = trans.objectStore("sargo");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  //Construir una estructura y entregarla al ... scope?
  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    renderFav(result.value);
    result.continue();
  };

  cursorRequest.onerror = sargoDB.indexedDB.onerror;
};

//El metodo para renderizar... Se puede entender "renderizar" como "construir visualizacion" en este contexto.
function renderFav(row) {
  var slides = document.getElementById("fav_icon");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode(row.text);
  //t.data = row.text;

  a.addEventListener("click", function(e) {
    sargoDB.indexedDB.deleteFav(row.text);
  });

  a.textContent = " [Delete]";
  li.appendChild(t);
  li.appendChild(a);
  slides.appendChild(li);
}

//Para añadir datos a la db
sargoDB.indexedDB.addFav = function(id) {
  var db = sargoDB.indexedDB.db;
  var trans = db.transaction(["sargo"], "readwrite");
  var store = trans.objectStore("sargo");
  alert(id);
  var request = store.put({
    "id" : id
  });

  request.onsuccess = function(e) {
    // Re-render all the items
    sargoDB.indexedDB.getAllItems();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};


//Para borrar datos...
sargoDB.indexedDB.deleteFav = function(id) {
  var db = sargoDB.indexedDB.db;
  var trans = db.transaction(["sargo"], "readwrite");
  var store = trans.objectStore("sargo");

  var request = store.delete(id);

  request.onsuccess = function(e) {
    sargoDB.indexedDB.getAllItems();  // Refresh the screen
  };

  request.onerror = function(e) {
    console.log(e);
  };
};

window.addEventListener("DOMContentLoaded", init, false);