// 4SQ code

Template.upload.rendered = function () {

  $('.spinner-container').hide();

  this.autorun(function () {
    Session.set('loc',Geolocation.latLng());
  })
}

Template.upload.helpers({
  'venues' : function(){
    // console.log(Session.get('venues'));
    return Session.get('venues');
  }

})

Template.upload.events({
  'click .takePic': function(){

    MeteorCamera.getPicture({width:250,height:250,quality:100},function(err,img){

      if(img !== undefined){

      $('.spinner-container').show();
      Session.set('image',img);
      Meteor.call('getLocalDat',Session.get('loc'), function(error,res){
        $('.spinner-container').hide();
        Session.set('venues',res.data.response.venues);
      });
    }
    });
},
'click button.venu': function(e){
  // console.log(e);


  // console.log(e);

  var no = e.currentTarget.id;
  var venue = $.grep(Session.get('venues'), function(e){ return e.id == no; })[0];

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
  Meteor.call('addPlace',geeson, function(error,res){
    Session.set('venues',null);
    Router.go('/place/'+res);

  });

}

})
