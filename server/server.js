Meteor.methods({
    addPlace: function(geeson) {
	 return Places.insert({loc:geeson});
 },
 getLocalDat: function(loc){

  //  return HTTP.get(Meteor.absoluteUrl("/sqDat.json")).data;

   var url = 'https://api.foursquare.com/v2/venues/search';
   var ll = loc.lat+','+loc.lng;
   var clientid = 'I3TXKI3D2NFLC1QJHCEFYDQK1CQMKN5MML0AQYP3KB5SOTDV';
   var clientsecret = 'WPDSFP0L0WNNOFZWLKRHI5O0SA15SD1K0YXSQCXIFTF0JYWS';
   var v = '20150302';
   
   try{
     var result =  HTTP.call("POST", url,
          {params: {ll: ll, client_id:clientid,client_secret:clientsecret,v:v}});
          return result;
        } catch(e){
          return false;
        }
 }
});
