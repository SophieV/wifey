Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: ['network.detail'] });

Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client',
  waitOn: function(){
  	return [
      Meteor.subscribe('allNetworks'),
      Meteor.subscribe('allUsers')
    ];
  }
});

Router.route('/networks/:_id', {
  name: 'network.detail',
  controller: 'NetworksController',
  action: 'detail',
  where: 'client',
  waitOn: function(){
    return [
      Meteor.subscribe('NetworkDetail', this.params._id),
      Meteor.subscribe('allUsers')
    ];
  }
});

Router.route('/network/create', {
  name: 'network.create',
  controller: 'NetworksController',
  where: 'client',
  action: 'create',
  waitOn: function(){
    return [
      Meteor.subscribe('allNetworks'),
      Meteor.subscribe('allUsers')
    ];
  }
});


Router.route('/networks/:_id/edit', {
  name: 'network.edit',
  controller: 'NetworksController',
  action: 'edit',
  where: 'client'
});
