angular.module('sargo', [])
	.controller('global', function ($scope){	
		//inicialización de variables

		$scope.advanced_search = "advanced_search_hid"
		$scope.id = "";
		$scope.order = "commonname";
		$scope.imgGallery = "imgGallery_off";
		$scope.input_adsearch = "adsearch_hid";
		$scope.btn_adsearch = "btn_adsearch";
		$scope.switch_adsearch = "Más...";
		$scope.select_adsearch = "adsearch_hid";
		$scope.type = {};
		$scope.favArray = [];
		
		//Set y Get cookie
		function setCookie(cname,cvalue)
			{
			window.localStorage.setItem(cname, cvalue);
			
			};

		function getCookie(cname)
			{
			return window.localStorage.getItem(cname);;
			};
		//Métodos
		$scope.trysetcookie = function (x, filtro, color, forma, familia) {
			var id = x;
			setCookie("currentfish", x);
			setCookie("filtro", filtro);
			setCookie("color", color);
			setCookie("forma", forma);
			setCookie("familia", familia);
		}
		$scope.trygetcookie = function () {
			var prueba = getCookie("currentfish");
			alert (prueba);
		}
		// Recupera desde cookies el ID del animal seleccionado (ficha) y recupera de cookies los filtros hechos por el ususario.
		$scope.pruebacookie = function () {
			var t = getCookie("currentfish");
			$scope.id = t;
			// Si no se recupera comparandolo con undefined, te la marca como undefined y los fltros no funcionan
			if ( getCookie("filtro") != "undefined"){
				$scope.type.filter_top = getCookie("filtro");
			}
			else {
				$scope.type.filter_top = "";
			};
			if ( getCookie("color") != "undefined"){
				$scope.type.color = getCookie("color");
			}
			else {
				$scope.type.color = "";
			};
			if ( getCookie("forma") != "undefined"){
				$scope.type.form = getCookie("forma");
			}
			else {
				$scope.type.form = "";
			};

			$scope.type.family = getCookie("familia");
		};
		
		$scope.pruebacookie();
		
		$scope.imgGalleryswitch_on = function () {
			$scope.imgGallery = "imgGallery_on";
		};
		$scope.imgGalleryswitch_off = function () {
			$scope.imgGallery = "imgGallery_off";
		};
		
		$scope.showsearch = function () {
			$scope.advanced_search = "advanced_search"		
		};
		$scope.hideadsearch = function () {
			$scope.advanced_search = "advanced_search_hid"	
			$scope.input_adsearch = "adsearch_hid";		
			$scope.select_adsearch = "adsearch_hid";
			$scope.switch_adsearch = "Más...";			
		};
		$scope.showAdsearch = function () {
			if ($scope.switch_adsearch == "Más...") {
				$scope.input_adsearch = "input_search";
				$scope.select_adsearch = "select_adsearch";
				$scope.switch_adsearch = "Menos...";
			}
			else {
				$scope.input_adsearch = "adsearch_hid";
				$scope.select_adsearch = "adsearch_hid";
				$scope.btn_adsearch = "btn_adsearch";
				$scope.switch_adsearch = "Más...";
			};
		};
		
		$scope.showpeces = function () {
			$scope.type.filter = "pez";
			return   $scope.type.filter;
		};
		$scope.showinvert = function () {
			$scope.type.filter = "invertebrado";
			return   $scope.type.filter;
		};
		$scope.showall = function () {
			$scope.type = {};
			$scope.trysetcookie("", "", "", "", "");

		};

		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		var sargoDB = {};
		sargoDB.indexedDB = {};
		sargoDB.indexedDB.db = null;

		function init() {
			sargoDB.indexedDB.open(); // open displays the data previously saved
		}

		$scope.addFavorite = function(id) {
			//var id = document.getElementById('id_input');		//Coger el valor del input en HTML que tenga de la id "id_input"

			sargoDB.indexedDB.addFav(id);	//LLamar al método addFav(id)
		}

		//Esta funcion abre la DB y si no existe, la crea
		sargoDB.indexedDB.open = function() {
			var version = 5;
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
			};

			request.onerror = sargoDB.indexedDB.onerror;
		};
		
		//Para añadir datos a la db
		sargoDB.indexedDB.addFav = function(id) {
			var db = sargoDB.indexedDB.db;
			var trans = db.transaction(["sargo"], "readwrite");
			var store = trans.objectStore("sargo");
			//alert(id);
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
		
		//Esto lo recolecta todo y lo renderiza (solo para el ejemplo)
		sargoDB.indexedDB.getAllItems = function() {
			var db = sargoDB.indexedDB.db;
			var trans = db.transaction(["sargo"], "readwrite");
			var store = trans.objectStore("sargo");

			// Get everything in the store;
			var keyRange = IDBKeyRange.lowerBound(0);
			$scope.favArray = [];
			var cursorRequest = store.openCursor(keyRange);
			
			//Construir una estructura y entregarla al ... scope?
			cursorRequest.onsuccess = function(e) {
				var result = e.target.result;
				if(!!result == false)
				  return;
				alert($scope.data[result.value.id - 1]);
				$scope.favArray.push($scope.data[result.value.id - 1]);
				renderFav(result.value.id);
				result.continue();
			};

			cursorRequest.onerror = sargoDB.indexedDB.onerror;
		};
		
		var listener;
		
		function renderFav(id) {
			var fav_icon = document.getElementById(id);
			listener = function(e) {
				sargoDB.indexedDB.deleteFav(id);
			};
			fav_icon.addEventListener("click", listener);
			fav_icon.className = "fav_icon_active";
		}

		//Para borrar datos...
		sargoDB.indexedDB.deleteFav = function(id) {
			var db = sargoDB.indexedDB.db;
			var trans = db.transaction(["sargo"], "readwrite");
			var store = trans.objectStore("sargo");

			var request = store.delete(id);

			request.onsuccess = function(e) {
				var fav_icon = document.getElementById(id);
				fav_icon.removeEventListener("click", listener);
				fav_icon.className = "fav_icon_inactive";
				sargoDB.indexedDB.getAllItems();  // Refresh the screen
			};

			request.onerror = function(e) {
				console.log(e);
			};
		};

		window.addEventListener("DOMContentLoaded", init, false);


		
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		
		
		
});

/*function initMap () {
	//Valores temporales de coordenadas
	var x=new google.maps.LatLng(52.395715,4.888916);
	var stavanger=new google.maps.LatLng(58.983991,5.734863);
	var amsterdam=new google.maps.LatLng(52.395715,4.888916);
	var london=new google.maps.LatLng(51.508742,-0.120850);
	
	if(!map) {
		mapProp = {
			center:x,
			zoom:4,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	}
	
	var myTrip=[stavanger,amsterdam,london,stavanger];
	var flightPath=new google.maps.Polygon({
		path:myTrip,
		strokeColor:"#0000FF",
		strokeOpacity:0.8,
		strokeWeight:2,
		fillColor:"#0000FF",
		fillOpacity:0.4
	});

	flightPath.setMap(map);
	map.setCenter(x);
}*/

