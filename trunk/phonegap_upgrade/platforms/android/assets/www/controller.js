angular.module('sargo', [])
	.controller('global', function ($scope, $http){	
		
		
  //inicialización de variables

	$scope.advanced_search = "advanced_search_hid"
	$scope.id = "";
	$scope.idcookie = "0050";
	$scope.order = "commonname";
	$scope.imgGallery = "imgGallery_off";
	$scope.input_adsearch = "adsearch_hid";
	$scope.btn_adsearch = "btn_adsearch";
	$scope.switch_adsearch = "Más...";
	$scope.select_adsearch = "adsearch_hid";
	$scope.type = {};
	$scope.type.filter_top = "";
	$scope.type.form = "";
	$scope.type.color = "";
	$scope.idcookie = "";
	$scope.type.family = "";

	
	//-------------Variables necesarias para el uso de favoritos-------------------
	$scope.favArray = [];
	$scope.webStorage = true;
	
	//-------------Variables para mantener el log de eventos de la app-------------
	$scope.log = "";
	$scope.debugMode = true;		//Esta linea hace que salgan por consola toda la información de los sucesos que ocurren en cuanto a favs (la parte de Aris)
	
	
	
	//Set y Get cookie
	function setCookie(cname,cvalue) {
		window.localStorage.setItem(cname, cvalue);
	};

	function getCookie(cname) {
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
		$scope.idcookie = t;
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
	//--------------------------------------------------------------------FUNCIONES PARA FAVORITOS ---------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	function init() {
	//Leer el json con los datos de los peces con angular si no hay datos en localStorage
		if (window.localStorage.getItem("areFavs") !== "true") {
			$http.get('data.json').success(function(data) {
				$scope.json_data = data;
				addLog("Fichero de datos JSON cargado.");
			}).
			error(function(data) {
			addLog("No se ha podido cargar el fichero con los datos.");
			alert("No se ha podido cargar el fichero con los datos.");
			});
		} else {
			var toJson = window.localStorage.getItem("favs").toString();
			toJson = toJson.replace("\"$$hashKey\":\"[0-9][0-9][A-Z]\"}","}");
			$scope.json_data = JSON.parse(toJson);
			//adLog(typeof $scope.json_data);
			//addLog($scope.json_data.toString());
		}
		if(typeof(Storage) !== "undefined") {
			// Existe LocalStorage y se puede usar
			$scope.webStorage = true;
			addLog("Comprobación de localStorage satisfactoria.");
		} else {
			// No se puede usar LocalStorage
			$scope.webStorage = false;
			addLog("Comprobación de localStorage fallada. No se usará localStorage.");
		}
	}
	
	$scope.addFavorite = function(id) {
		//Comprobamos que hay posibilidad de usar LocalStorage, y en caso contrario no hacemos nada
		if (!$scope.webStorage)	return;
		var fav_icon = document.getElementById(id);
		addLog("Se lanza un 'addFavorite' en el elemento de id=" + fav_icon.id + " y clase=" + fav_icon.className + ".");
		//Comprobamos en que estado está el item: favorito ya o no
		if (fav_icon.className == "true")
			setInactiveFav(id);
		else
			setActiveFav(id);
	}
	
	function setActiveFav(id) {
		var number = parseInt(id) - 1;
		if (!isNaN(number)) {
			setFav(number, true);
			addLog("La ficha con id=" + id + " ha sido añadida como favorito.");
		}
		else {
			addLog("La ficha con id=" + id + " no se puede parsear a un numero correcto.");
			alert("La ficha con id=" + id + " no se puede parsear a un numero correcto.");
		}	
	}
	
	function setInactiveFav(id) {
		var number = parseInt(id) - 1;
		if (!isNaN(number)) {
			setFav(number, false);
			addLog("La ficha con id=" + id + " ha sido eliminada como favorito.");
		}
		else {
			addLog("La ficha con id=" + id + " no se puede parsear a un numero correcto.");
			alert("La ficha con id=" + id + " no se puede parsear a un numero correcto.");
		}	
	}
	
	function setFav(id, value) {
		$scope.json_data[id].fav = value;
		var strJson = JSON.stringify($scope.json_data);
		window.localStorage.setItem("favs",strJson);
		window.localStorage.setItem("areFavs","true");
		addLog("Variables guardadas en localStorage.");
	}
	


		
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//--------------------------------------------------------------------FUNCIONES AUXILIARES--------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	function addLog(text) {
		var formattedText = "[" + getFormattedTime() + "] - " + text;
		$scope.log += formattedText;
		if ($scope.debugMode)
			console.log(formattedText);
	}
	
	function getFormattedTime() {
		var output = new Date();
		output = output.toUTCString();
		return output;
	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//--------------------------------------------------------------------INICIALIZACIÓN DEL SCRIPT---------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
	init();	
	
});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//--------------------------------------------------------------------FUNCIONES DE CONTROL DE MAPS------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
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

