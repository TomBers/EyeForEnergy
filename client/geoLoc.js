  Template.map.rendered = function () {
    Meteor.subscribe('Places');
    map = null;
    fc = null;
    Mapbox.load();


    this.autorun(function () {
      Session.set('pos',Geolocation.latLng() || { lat: 0, lng: 0 });
      if ( Mapbox.loaded() && Session.get('pos').lat != 0  && Session.get('pos').lng != 0 && map == null) {
        L.mapbox.accessToken = 'pk.eyJ1IjoidG9tYmVycyIsImEiOiJwdkVzMXF3In0.tYVES5240mnmR1Dzon0nxg';
        map = L.mapbox.map('map', 'tombers.lb0738je').setView(Session.get('pos'), 14);


        // map.on('click', onMapClick);

        var fixedMarker = L.marker(new L.LatLng(Session.get('pos').lat,Session.get('pos').lng), {
          icon: L.mapbox.marker.icon({
            'marker-color': 'ff8888'
          })
        }).bindPopup('Mapbox DC').addTo(map);

        fc = fixedMarker.getLatLng();
      }

      try{
        Places.find().forEach(function(place){
          // console.log(place);
          L.mapbox.featureLayer(place.loc)
          .bindPopup('<a href="/place/'+place._id+'">Go here</a>')
          .addTo(map);
        });
      }catch(e){

      }



    });


    // addMarker(Session.get('pos').lng,Session.get('pos').lat,false);
    // var ord = [];

    // // console.log(place);
    // var latlng = {lat:place.loc.geometry.coordinates[1] ,lng:place.loc.geometry.coordinates[0]}
    // var dist = (fc.distanceTo(latlng)).toFixed(0) + 'm';
    // // place.loc.properties.description = dist;
    // ord.push({title:place.loc.properties.title,dist:dist});
    // ord.sort(function (a,b){
    //   if(parseInt(a.dist) > parseInt(b.dist)){return 1;}
    //   else{return -1;}
    // })
    // Session.set('ord',ord);
  };

  Template.body.helpers({
    loc: function () {
      // return 0, 0 if the location isn't ready
      return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    error: Geolocation.error,
    //   places:function(){
    //   return Session.get('ord');
    // }
    // ,
    // img:function(){
    //   return Session.get('img');
    // }
  });





function addMarker(lng,lat,name,img){
  var geeson = {
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
      type: 'Point',
      // coordinates here are in longitude, latitude order because
      // x, y is the standard for GeoJSON and many formats
      coordinates: [lng,lat]
    },
    properties: {
      title: name,
      description: '<img src="'+img+'">',
      'marker-symbol': "star",
      'marker-size': "medium",
      'marker-color': "#f44"

    }
  };
  Meteor.call('addPlace',geeson);
  L.mapbox.featureLayer(geeson).addTo(map);


  // var tmp = Session.get('ord');
  // var tdist = (fc.distanceTo({lat:lat ,lng:lng})).toFixed(0) + 'm';
  // tmp.push({title:name,dist:tdist});
  // tmp.sort(function (a,b){
  //   if(parseInt(a.dist) > parseInt(b.dist)){return 1;}
  //   else{return -1;}
  // })
  // Session.set('ord',tmp);


}

function onMapClick(e) {

  var name = prompt("Please enter a name", "");
  if (name != null) {
    var lg = e.latlng.lng;
    var lt = e.latlng.lat;
    MeteorCamera.getPicture({width:100,height:100,quality:100},function(err,img){
      addMarker(lg,lt,name,img);
    });

  }
  // console.log(e.latlng);
  // alert((fc.distanceTo(e.latlng)).toFixed(0) + 'm');


}
