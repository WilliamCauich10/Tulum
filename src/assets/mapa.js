var window;
var coords = {}; 
var marker;

function removeGoogleMapScript() {
    console.debug('removing google script...');
    let keywords = ['maps.googleapis'];

    //Remove google from BOM (window object)
    window.google = undefined;

    //Remove google map scripts from DOM
    let scripts = document.head.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
        let scriptSource = scripts[i].getAttribute('src');
        if (scriptSource != null) {
            if (keywords.filter(item => scriptSource.includes(item)).length) {
                scripts[i].remove();
                // scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
    }
}


function addGoogleMapScript() {
    removeGoogleMapScript();
    console.debug('adding google script...');
    let dynamicScripts = ['https://maps.googleapis.com/maps/api/js?key=AIzaSyAMiqW64DSrfJF5zCgpRjVUvB8_MItGoW8&libraries=places&callback=initAutocomplete'];
    for (let i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        node.onload = initAutocomplete; //probably to initialise your map or something
        document.head.appendChild(node);
    }
}
// 
// 

function inicio() {
    addGoogleMapScript();
}
// $(document).ready(function(){
    // var api='AIzaSyAMiqW64DSrfJF5zCgpRjVUvB8_MItGoW8';
    // // https://maps.googleapis.com/maps/api/js?key=AIzaSyAMiqW64DSrfJF5zCgpRjVUvB8_MItGoW8&libraries=places&callback=initAutocomplete
    // $.getScript('https://maps.googleapis.com/maps/api/js?key='+api+'&libraries=places&callback=initAutocomplete');
//  });
// function removeJS(){
//     // var ultimo = document.getElementById ("script1");
//     // document.body.removeChild(ultimo);
//     $("script[src='Usuarios/mapa.js']").remove()
// }

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 13,
//         center: {lat: 18.512162, lng: -88.302388}
//     });

//     marker = new google.maps.Marker({
//         map: map,
//         draggable: true,
//         animation: google.maps.Animation.DROP,
//         position: {lat: 18.512162, lng: -88.302388}
//     });
//     setMapa(coords);
//     marker.addListener('click', toggleBounce);
// }
function setMapa (coords){   
    marker.addListener( 'dragend', function (event)
    {
        document.getElementById("input_lat_Directorio").value = this.getPosition().lat();
        document.getElementById("input_lng_Directorio").value =this.getPosition().lng();
    });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 18.512162, lng: -88.302388},
        zoom: 13
    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 18.512162, lng: -88.302388}
    });
    // Create the search box and link it to the UI element.
    var input = document.getElementById('input_direccion');
    
    var searchBox = new google.maps.places.SearchBox(input)
    
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];        
    //          
    // more details for that place.
    searchBox.addListener('places_changed', function() {
    });
    // 
    document.getElementById("btnMapa").addEventListener("mouseover",  function() {       
        // document.getElementById('input_direccion').keydown(function(){});
        // var e = jQuery.Event("keydown");
        document.getElementById('input_lat_Directorio').focus();
    });
    
    document.getElementById("btnMapa").addEventListener("click",  function() {       
        displaySearchResults(map,searchBox,markers);
        document.getElementById('input_lat_Directorio').focus();
        document.getElementById('input_lng_Directorio').focus();
    });    
}
function displaySearchResults(map, searchBox, markers) {
    var places = searchBox.getPlaces();
        console.log(places);
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.      
        markers = [];
        marker.setMap(null);
        marker =[];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            marker =[];
        
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position:place.geometry.location
            });
            loc = place.geometry.viewport;
            console.log(loc);
            // ia na
            document.getElementById("input_lat_Directorio").value = loc.na.j;
            document.getElementById("input_lng_Directorio").value =loc.ia.j;
            if (place.geometry.viewport) {
            // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        setMapa(coords);
        marker.addListener('click', toggleBounce);
}
