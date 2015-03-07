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

});
