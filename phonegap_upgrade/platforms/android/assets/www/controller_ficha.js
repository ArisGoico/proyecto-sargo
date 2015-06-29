angular.module('sargo', [])
	.controller('global', function ($scope, $http, $location, $anchorScroll){	
	
		
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
	$scope.json_data = [];

	
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
	
	// Codigo para los dropdown de familias
	$scope.arrayContainsFam = function (array, x) {
			for (var i=0; i<array.length; i++) {
				if ( x == array[i].familia) {
					return true;
				};
			};
	};
	$scope.familyfishDrop = [];
		$scope.createFamArray = function (typeFamily) {
			for (var i=1; i<$scope.json_data.length; i++) {
				if ( !$scope.arrayContainsFam ($scope.familyfishDrop, $scope.json_data[i].familia) && $scope.json_data[i].type == typeFamily) {
					$scope.familyfishDrop.push ($scope.json_data[i]);
				};
			}
	};
	

	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//--------------------------------------------------------------------FUNCIONES PARA FAVORITOS ---------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	function init() {
	//Leer el json con los datos de los peces con angular si no hay datos en localStorage
		
			$http.get('data.json').success(function(data) {
				$scope.json_data = data;
				addLog("Fichero de datos JSON cargado.");
				var typeOfDoc = document.getElementById('fish');
				addLog('La veriable typeOfDoc es' + typeOfDoc + '.');
				if (typeOfDoc !== null){
					$scope.createFamArray ('pez');
					addLog('Hemos llegado a saber que estamos en peces');
				} else {
					$scope.createFamArray ('invertebrado');
					addLog('Hemos llegado a saber que estamos en invertebrados');
				}
			}).
			error(function(data) {
			addLog("No se ha podido cargar el fichero con los datos.");
			alert("No se ha podido cargar el fichero con los datos.");
			});
			
			
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

