/*****************************************************************************/
/* VenueCreate: Event Handlers */
/*****************************************************************************/
Template.VenueCreate.events({
	'click #location_name': function(){
		var coords = [Session.get('lat'), Session.get('lon')];
  	var venues = Meteor.call('getVenues', coords, function (e, r) {
  		if (!e)
		  	return r;
		  else
		  	return e;
  	});
  },
	'keypress #location_address':function(e){
		setTimeout(function(){
			Session.set('streetAddress', e.currentTarget.value);
			console.log("Approximate street address is: " + Session.get('streetAddress'));
		}, 5000);
	},
	'submit #network_create': function(e, tmpl){
		e.preventDefault();
		var venue = {
			'name': tmpl.find('#location_name').val,
			'network':{
				'ssid': tmpl.find('#network_name').val,
				'password': tmpl.find('#network_password').val,
				'isPublic': tmpl.find('#network_isPublic').checked,
				'verified': false
			},
			'location': {
				'name': tmpl.find('#location_name').val,
				'lat': Session.get('lat'),
				'lon': Session.get('lon'),
				'streetAddress': tmpl.find('#location_address').val,
				'address': Session.get('locationData')
			}
		};
		Meteor.call('addVenue', venue)
		tmpl.find('form').reset();
		return false;
	}
});

/*****************************************************************************/
/* VenueCreate: Helpers */
/*****************************************************************************/
Template.VenueCreate.helpers({
	streetAddress: function(){
		return Session.get('streetAddress');
	},
	locationData: function(){
		return Session.get('locationData');
	},
	venues: function(){
		return Session.get('allVenues');
	}
});

/*****************************************************************************/
/* VenueCreate: Lifecycle Hooks */
/*****************************************************************************/

Template.VenueCreate.created = function () {
	getUserGeolocation();
};

Template.VenueCreate.rendered = function () {
};

Template.VenueCreate.destroyed = function () {
};
