'use strict';


function initialize()
{
var x=new google.maps.LatLng(52.395715,4.888916);
var stavanger=new google.maps.LatLng(58.983991,5.734863);
var amsterdam=new google.maps.LatLng(52.395715,4.888916);
var london=new google.maps.LatLng(51.508742,-0.120850);
var mapProp = {
  center:x,
  zoom:4,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

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


function fish ($scope){
  $scope.mainimage = "img/main/001.jpg"
  $scope.commonname = "Sargo común";
  $scope.scientificname = "Diplodus sargus";

  $scope.shortdesc = [
  {
    "title" : "Librea",
    "body" : "Plateada, lineas verticales negras"
  },
   {
    "title" : "Forma",
    "body" : "Fusiforme, aplanado latero-lateralmente"
  },
   {
    "title" : "Forma de vida",
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

}
