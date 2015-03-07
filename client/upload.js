// 4SQ code

Template.upload.rendered = function () {
  this.autorun(function () {
  Session.set('loc',Geolocation.latLng());
})
}

Template.upload.events({
  'click button': function(){

    MeteorCamera.getPicture({width:100,height:100,quality:100},function(err,img){

      Session.set('image',img);

    Meteor.call('getLocalDat', function(error,res){
      console.log(res);
      Session.set('venues',res.response.venues);
      var cnt = 0;
      res.response.venues.forEach(function(venue){
        var icon = venue.categories[0].icon.prefix + 'bg_64.png';
        //
        $( "#venues" ).append("<div class='venu' id='"+ cnt++ +"'><img src='"+icon+"'><p>"+venue.name+"</p></div>");
      });
    });



    });
  },
  'click .venu': function(e){
    // console.log(e);
    var no = e.currentTarget.id;
    var venue = Session.get('venues')[no];
    var geeson = {
      // this feature is in the GeoJSON format: see geojson.org
      // for the full specification
      type: 'Feature',
      geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [Session.get('loc').lng,Session.get('loc').lat]
      },
      properties: {
        title: venue.name,
        description: venue,
        'marker-symbol': "star",
        'marker-size': "medium",
        'marker-color': "#f44",
        image: Session.get('image')

      }
    };
    Meteor.call('addPlace',geeson);

  }

})
