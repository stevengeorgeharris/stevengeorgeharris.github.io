var API_KEY = 'AIzaSyAhVwSyTqeJhyovtHAR8lr-MGD5MAd4UD8';
var $map = document.getElementById('app-map');

var markers = {
  "data" : [
    {
      "lat" : 51.535812,
      "lng" : -0.084371,
      "date" : "2016-04-12",
      "type" : "Hotels",
      "title" : "",
      "marker" : "marker-hotels.png",
      "image" : "assets/images/one.jpg",
      "description" : "Ligula, porttitor eu, consequat vitae, eleifend ac, enim. Donec vitae orci sed dolor rutrum auctor. Pellentesque commodo eros a enim. Fusce vel dui. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor."
    },
    {
      "lat" : 51.531478,
      "lng" : -0.092775,
      "date" : "2016-04-13",
      "type" : "Non Profits and Institutions",
      "title" : "",
      "marker" : "marker-profit.png",
      "image" : "assets/images/two.jpg",
      "description" : "Donec vitae orci sed dolor rutrum auctor. Pellentesque commodo eros a enim. Fusce vel dui. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor."
    },
    {
      "lat" : 51.528453,
      "lng" : -0.108640,
      "date" : "2016-04-14",
      "type" : "VIP Program",
      "title" : "",
      "marker" : "marker-vip.png",
      "image" : "assets/images/three.jpg",
      "description" : "Aenean leo, porttitor eu, consequat vitae, eleifend ac, enim. Pellentesque commodo eros a enim. Fusce vel dui. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor."
    },
    {
      "lat" : 51.524940,
      "lng" : -0.112460,
      "date" : "2016-04-15",
      "type" : "Restaurants",
      "title" : "",
      "marker" : "marker-restaurants.png",
      "image" : "assets/images/four.jpg",
      "description" : "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Donec vitae orci sed dolor rutrum auctor."
    },
    {
      "lat" : 51.512445,
      "lng" : -0.123166,
      "date" : "2016-04-19",
      "type" : "Chelsea Night",
      "title" : "",
      "marker" : "marker-chelsea.png",
      "image" : "assets/images/four.jpg",
      "description" : "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Donec vitae orci sed dolor rutrum auctor."
    },
    {
      "lat" : 51.514777,
      "lng" : -0.128944,
      "date" : "2016-04-19",
      "type" : "Upper East Side Morning",
      "title" : "",
      "marker" : "marker-east-side.png",
      "image" : "assets/images/four.jpg",
      "description" : "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Donec vitae orci sed dolor rutrum auctor."
    },
    {
      "lat" : 51.512762,
      "lng" : -0.135648,
      "date" : "2016-04-19",
      "type" : "LES and Soho Morning",
      "title" : "",
      "marker" : "marker-soho.png",
      "image" : "assets/images/four.jpg",
      "description" : "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Donec vitae orci sed dolor rutrum auctor."
    },
  ]
};

var frieze = frieze || {};

frieze.markers = [];
frieze.userLocation = '';

frieze.map = {
  init: function() {
    this.buildMap();
    this.attach();
  },
  buildMap: function() {
    console.log('Building map...');
    document.querySelector('.c-date-picker').valueAsDate = new Date();
    map = new google.maps.Map($map, {
      center: {lat: 51.526829, lng: -0.112099},
      zoom: 14,
      disableDefaultUI: true
    });

    frieze.map.retrieveUserLocation();

    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.data.length; i++) {
      var lat = markers.data[i].lat;
      var lng = markers.data[i].lng;
      var title = markers.data[i].title;
      var type = markers.data[i].type;
      var image = markers.data[i].image;
      var description = markers.data[i].description;
      var markerImage = markers.data[i].marker;
      var markerDate = markers.data[i].date;

      if (lat !== 0 ) {
        frieze.map.addMarkers(lat, lng, title, type, image, description, bounds, markerImage, markerDate);
      }
    }
    map.fitBounds(bounds);

    var styles = [
      {
        "stylers": [
          { "saturation": -100 }
        ]
      }
    ];
    map.setOptions({styles: styles});
  },
  retrieveUserLocation: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      frieze.userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(frieze.userLocation);
    });
  },
  addMarkers: function(lat, lng, title, type, image, description, bounds, markerImage, markerDate) {
    var marker_icon = {
      url: "assets/icons/" + markerImage,
      scaledSize: new google.maps.Size(36, 64),
      anchor: new google.maps.Point(0, 32),
      origin: new google.maps.Point(0, 0)
    };
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      animation: google.maps.Animation.DROP,
      title: title,
      icon: marker_icon
    });

    marker.addListener('click', function() {
      var infoBox = document.getElementsByClassName('c-map-info')[0];
      var infoBoxInner = document.getElementsByClassName('c-map-info__content')[0];
      infoBoxInner.innerHTML = '<img src="' + image + '"/>' + '<p>' + description + '</p>';
      infoBox.className = infoBox.className.replace(/\bc-map-info--closed\b/,'c-map-info--open');
    });

    marker.type = type;
    marker.date = markerDate;
    frieze.markers.push(marker);
    bounds.extend(marker.getPosition());
  },
  showMarkersOnDate: function(type, date) {
    for (var i = 0; i < frieze.markers.length; i++) {
      var visible = frieze.markers[i].getVisible();
      var markerDate = frieze.markers[i].date;

      if (frieze.markers[i].type == type && !visible && markerDate == date) {
        frieze.markers[i].setVisible(true);
      } else if (frieze.markers[i].type == type && visible && markerDate != date) {
        frieze.markers[i].setVisible(false);
      }
    }
  },
  showMarkers: function(type) {
    for (var i = 0; i < frieze.markers.length; i++) {
      var visible = frieze.markers[i].getVisible();

      if (frieze.markers[i].type == type && !visible) {
        frieze.markers[i].setVisible(true);
      }
    }
  },
  hideMarkers: function(type) {
    for (var i = 0; i < frieze.markers.length; i++) {
      var visible = frieze.markers[i].getVisible();
      if (frieze.markers[i].type == type && visible) {
        frieze.markers[i].setVisible(false);
      }
    }
  },
  updateMap: function() {
    var filters = document.getElementsByClassName('c-map-filters__filter-input');
    var userLocation = document.querySelector('.c-map-user-location__check').checked;
    var date;
    var useDate = document.querySelector('.c-map-panel-date__check').checked;
    var dateFlag;

    if (useDate) {
      date = document.querySelector('.c-date-picker').value;
    }

    if (userLocation) {
      frieze.map.retrieveUserLocation();
    }

    for (var i = 0; i < filters.length; i++) {
      if (filters[i].checked && useDate) {
        frieze.map.showMarkersOnDate(filters[i].name, date);
      } else if (filters[i].checked) {
        frieze.map.showMarkers(filters[i].name);
      } else {
        frieze.map.hideMarkers(filters[i].name);
      }
    }
  },
  attach: function() {
    var searchButton = document.querySelector('.c-map-search-button');
    searchButton.addEventListener('click', function() {
      frieze.map.updateMap();
      var menu = document.querySelector('.c-map-panel');
      menu.className = menu.className.replace(/\bc-map-panel--open\b/,'c-map-panel--closed');
    });

    var menuButton = document.querySelector('.c-map-panel_button');
    var menu = document.querySelector('.c-map-panel');
    menuButton.addEventListener('click', function() {
      var open = menu.className === 'c-map-panel c-map-panel--open';
      if (open) {
        menu.className = menu.className.replace(/\bc-map-panel--open\b/,'c-map-panel--closed');
      } else {
        menu.className = menu.className.replace(/\bc-map-panel--closed\b/,'c-map-panel--open');
      }
    });

    var mapInfoButton = document.querySelector('.c-map-info_button');
    var mapInfo = document.querySelector('.c-map-info');
    mapInfoButton.addEventListener('click', function() {
        mapInfo.className = mapInfo.className.replace(/\bc-map-info--open\b/,'c-map-info--closed');
    });
  }
};
