var map;
var myApp = angular.module('myApp', []);


function global ($scope){	
		//inicialización de variables
		$scope.contindshow = "containerindex";
		$scope.contcardshow = "containercardhid";
		$scope.advanced_search = "advanced_search_hid"
		$scope.id = "";
		$scope.order = "commonname";
		$scope.imgGallery = "imgGallery_off";
		
		//Métodos
		$scope.hideindex = function (x) {
			$scope.contindshow = "containerindexhid";
			$scope.contcardshow = "containercard";
			$scope.id = x;
			window.scrollTo(0, 0);
			initMap();
			return   /*$scope.contindshow, $scope.contcardshow;*/
		};
		$scope.hidecard = function () {
			$scope.contindshow = "containerindex";
			$scope.contcardshow = "containercardhid";
			/*return   $scope.contindshow,$scope.contcardshow;*/
		};
		
		$scope.imgGalleryswitch_on = function () {
			$scope.imgGallery = "imgGallery_on";
		};
		$scope.imgGalleryswitch_off = function () {
			$scope.imgGallery = "imgGallery_off";
		};
		
		$scope.showadsearch = function () {
			$scope.advanced_search = "advanced_search"		
			/*return   $scope.contindshow,$scope.contcardshow;*/
		};
		$scope.hideadsearch = function () {
			$scope.advanced_search = "advanced_search_hid"		
			/*return   $scope.contindshow,$scope.contcardshow;*/
		};
		


		$scope.showpeces = function () {
			$scope.type_filter = "pez";
			return   $scope.type_filter;
		};
		$scope.showinvert = function () {
			$scope.type_filter = "invertebrado";
			return   $scope.type_filter;
		};
		$scope.showall = function () {
			$scope.type_filter = "";
			type_color = ' ';
			return   $scope.type_filter;
		};		
}

function initMap () {
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
}

/*function fish ($scope){

  $scope.mainimage = "img/main/001.jpg"
  $scope.commonname = "Sargo común";
  $scope.scientificname = "Diplodus sargus";

  $scope.shortdesc = [
  {
    "title" : "Coloración",
    "body" : "Plateada, lineas verticales negras",
	"id" : "p001"
  },
   {
    "title" : "Morfología",
    "body" : "Fusiforme, aplanado latero-lateralmente"
  },
   {
    "title" : "Modo de vida",
    "body" : "Normalmente va en bancos aunque puede ir en solitoario."
  },
   {
    "title" : "Habitat",
    "body" : "Bentónico, fondo rocoso"
  },
   {
    "title" : "Alimentación",
    "body" : "Omnivoro"
  }];
   
  $scope.descbody = [
  {
    "title" : "Descripción",
    "body" : "Cuerpo comprimido lateralmente de perfil ovalado Coloración plateada de base con una mancha en el pedúnculo caudal y cinco líneas oscuras transversales y otras más tenues entre ellas, que casi desaparecen en los ejemplares adultos. Puede alcanzar los 40 centímetros de longitud."
  },
   {
    "title" : "Biología",
    "body" : "Fondos rocosos y praderas entre los -6 y -50 metros. Abundante en todo el litoral. Suele formar grupos. Alimentación omnívora en los ejemplares jóvenes y carnívora de adulto. Época de reproducción entre marzo y junio."
  }];
  
  $scope.edges = [
  {
    "edge" : "new google.maps.LatLng(52.395715,4.888916)"
  },
   {
    "edge" : "new google.maps.LatLng(58.983991,5.734863)"
  },
  {
    "edge" : "new google.maps.LatLng(52.395715,4.888916)"
  },
  {
    "edge" : "new google.maps.LatLng(51.508742,-0.120850)"
  }];
    $scope.data = [
  {
	"id": "p001",   
	"mainimage": "img/main/p001.jpg",
	"mini_img" : "img/mini/p001.jpg",
	"commonname" : "Sargo común",
    "scientificname" : "Diplodus sargus",
	"type" : "pez",
	"shortdesc" : "plateado, fusiforme, lineas, verticales, negras, omnivoro, bentonico",
	"color": "Plateada, lineas verticales negras",
	"form": "Fusiforme, aplanado latero-lateralmente",
	"wayoflife" : "Normalmente va en bancos aunque puede ir en solitoario.",
	"habitat":  "Bentónico, fondo rocoso",
	"feeding": "Omnivoro",
	"description" : "Cuerpo comprimido lateralmente de perfil ovalado Coloración plateada de base con una mancha en el pedúnculo caudal y cinco líneas oscuras transversales y otras más tenues entre ellas, que casi desaparecen en los ejemplares adultos. Puede alcanzar los 40 centímetros de longitud.",
	"biology" : "Fondos rocosos y praderas entre los -6 y -50 metros. Abundante en todo el litoral. Suele formar grupos. Alimentación omnívora en los ejemplares jóvenes y carnívora de adulto. Época de reproducción entre marzo y junio."
  },
    {
	"id": "i001",   
	"mainimage": "img/main/i001.jpg",
	"mini_img" : "img/mini/i001.jpg",
	"commonname" : "Coral rojo",
    "scientificname" : "Corallium rubrum",
	"type" : "invertebrado",
	"shortdesc" : "rojo, polipos blancos, arborescente, Sesil, bentonico, filtracion, partículas, suspensión,  plateado",
	"color": "Esqueleto rojo intenso con los pólipos blancos.",
	"form": "Arborescente",
	"wayoflife" : "Sésil, bentónico.",
	"habitat":  "Fondos rocosos entre los -10 y los -400 metros",
	"feeding": "Por filtración de partículas en suspensión en el agua.",
	"description" : "Los pequeños pólipos forman colonias arborescentes de ramificación irregular que podrían llegar a medir hasta 30 centímetros. El tamaño habitual no pasa de los 7 u 8 centímetros debido a la presión pesquera a la que está sometida esta especie muy apreciada en joyería.",
	"biology" : "Se asienta siempre sobre sustratos duros y preferentemente en los fondos cubiertos por algas calcáreas en lugares muy protegidos de la luz, grutas y oquedades. Sólo a partir de los 40 a 50 metros de profundidad sería posible observarlo en lugares expuestos. Los pólipos capturan con sus 8 tentáculos las pequeñas partículas de alimento suspendidas en el agua alimentando así a la colonia.",
  }];

}

/*function index ($scope){

	$scope.type_filter = "";  
  $scope.indexbody = [
  {
    "mini_img": "img/main/p001.jpg",
	"commonname" : "Sargo común",
    "scientificname" : "Diplodus sargus",
	"type" : "pez",
	"shortdesc" : "rojo cuadrado carnivoro",
	"id": "p001",
  },
    {
    "mini_img": "img/main/i001.jpg",
	"commonname" : "Sargo común2",
    "scientificname" : "Diplodus sargus",
	"type" : "invertebrado",
	"shortdesc" : "verde circulo herviboro",
	"id": "i001",
  },
    {
    "mini_img": "img/main/p001.jpg",
	"commonname" : "Sargo común3",
    "scientificname" : "Diplodus sargus",
	"type" : "pez",
	"shortdesc" : "azul linea omnivoro",
	"id": "003",
  },
    {
    "mini_img": "img/main/i001.jpg",
	"commonname" : "Sargo común4",
    "scientificname" : "Diplodus sargus",
	"type" : "invertebrado",
	"shortdesc" : "rojo circulo herviboro",
	"id": "004",
  },
    {
    "mini_img": "img/main/p001.jpg",
	"commonname" : "Sargo común5",
    "scientificname" : "Diplodus sargus",
	"type" : "pez",
	"shortdesc" : "amarillo cuadrado",
	"id": "005",
  },
    {
    "mini_img": "img/main/p001.jpg",
	"commonname" : "Sargo común6",
    "scientificname" : "Diplodus sargus",
	"type" : "invertebrado",
	"id": "006",
  },
    {
    "mini_img": "img/main/i001.jpg",
	"commonname" : "Sargo común7",
    "scientificname" : "Diplodus sargus",
	"type" : "pez",
	"id": "007",
  },
    {
    "mini_img": "img/main/p001.jpg",
	"commonname" : "Sargo común8",
    "scientificname" : "Diplodus sargus",
	"type" : "invertebrado",
	"id": "008",
  },
    {
    "mini_img": "img/main/i001.jpg",
	"commonname" : "Sargo común9",
    "scientificname" : "Diplodus sargus",
	"type" : "pez",
	"id": "009",
  },
    {
    "mini_img": "img/main/p001.jpg",
	"commonname" : "Sargo común10",
    "scientificname" : "Diplodus sargus",
	"type" : "invertebrado",
	"id": "010",
  },
];
  
  $scope.showpeces = function () {
		$scope.type_filter = "pez";
		return   $scope.type_filter;
		};
	$scope.showinvert = function () {
		$scope.type_filter = "invertebrado";
		return   $scope.type_filter;
		};
	$scope.showall = function () {
		$scope.type_filter = "";
		return   $scope.type_filter;
		};



}*/
