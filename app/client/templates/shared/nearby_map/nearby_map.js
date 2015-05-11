/*****************************************************************************/
/* NearbyMap: Event Handlers */
/*****************************************************************************/
Template.NearbyMap.events({
});

/*****************************************************************************/
/* NearbyMap: Helpers */
/*****************************************************************************/
Template.NearbyMap.helpers({
	nearbyMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
	    var coords = [Session.get('lat'), Session.get('lon')]	
      return {
        center: new google.maps.LatLng(coords[0],coords[1]),
       	scrollwheel: false,
        zoom: 14
      };
    }
  }
});

/*****************************************************************************/
/* NearbyMap: Lifecycle Hooks */
/*****************************************************************************/
Template.NearbyMap.created = function () {
	// getUserGeolocation();
  GoogleMaps.ready('map', function(map) {
    
    var infowindow = new google.maps.InfoWindow(),
        marker = new google.maps.Marker();

  	Venues.find().forEach(function(doc){
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(doc.location.lat, doc.location.lon),
        map: map.instance,
        title: doc.location.name.toTitleCase()
      });
      marker.location = {
        name: doc.location.name,
        address: doc.location.address,
      };
    });

    // marker.addListener('click',function(){
    //   window.location.hash = '#t_' + doc._id;
    //   // debugger;
    //   infowindow.set(map.instance, marker);
    //   // google.maps.event.addListener(marker, 'click', function(e) {
    //   infowindow.setContent(
    //     [ '<header>' + this.location.name.toTitleCase() + '</header>',
    //       '<main>' + this.location.address.toTitleCase() + '</main>'
    //     ].join('')
    //   );
    //   infowindow.open(map.instance, this);
    //   // });
    //});

    google.maps.event.addListener(marker, 'click', function(){
      alert(666);
    });
    // map.event.addListener(marker, 'click', function() {
    //   infowindow.open(map,marker);
    //   console.log(777);
    // });
  	// 	infowindow = new google.maps.InfoWindow({
			//     content: [
			//     	'<header>' + doc.location.name.toTitleCase() + '</header>',
			//     	'<main>' + doc.location.address.toTitleCase() + '</main>'].join('')
			// });
			// marker = new google.maps.Marker({
	  //     position: new google.maps.LatLng(doc.location.lat, doc.location.lon),
	  //     map: map.instance
	  //   });
	  //   // marker.set('title', doc.location.name);

	  //   marker.addListener('click',function(){
   //      window.location.hash = '#t_' + doc._id;
   //      infowindow.open(map.instance, marker);
   //    });
		// });
    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.open(map,marker);
    // });
		// marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(Session.get('lat'), Session.get('lon')),
  //     icon: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png',
  //     map: map.instance,
  //   });
		
		$(window).on('resize', function(){
			map.instance.setCenter(new google.maps.LatLng(Session.get('lat'), Session.get('lon')));
		});

    // google.maps.event.addListener(marker, 'click', function(e) {
    //   console.log(e);
    //   infowindow.setContent('Hello World');
    //   infowindow.open(map.instance, this);
    // });

  });
};

Template.NearbyMap.rendered = function () {
};

Template.NearbyMap.destroyed = function () {
};
