Router.configure({
layoutTemplate: 'layout',
// waitOn: function() { return Meteor.subscribe('debates'); },
// data: function() {
//   return {debates : Debates.find().fetch()}
// }
});

Router.map(function() {
  this.route('/home', {
    path: '/',
    template: 'home'
  });

  this.route('/map', {
    path: '/map',
    template: 'map'
  });

  this.route('/upload', {
    path: '/upload',
    template: 'upload'
  });

  this.route('/settings', {
    path: '/settings',
    template: 'settings'
  });

  this.route('place', {
    path: '/place/:_id',
    template: 'place',
    data: function() {
      return Places.findOne({_id: this.params._id});
    }
  });

});
