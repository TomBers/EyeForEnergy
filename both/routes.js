Router.map(function() {
  this.route('/', {
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

  this.route('place', {
    path: '/place/:_id',
    template: 'place',
    data: function() {
      return Places.findOne({_id: this.params._id});
    }
  });

});
