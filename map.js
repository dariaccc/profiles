const link = "https://randomuser.me/api/?results=50";

//declare global variables
const lat_coord = [];
const lng_coord = [];
let img = [];

//function to get the map api key (hidden in config.js)
function loadMap(){
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=getMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

getCoord();

//function to get the coordinates of the users through the randomuser API (nonsense values)
function getCoord(){
    fetch(link)

    .then(res => {
        if(res.ok){
            console.log("Success");
            return res.json();
        }
        else{
            console.log("Could not fetch data");
        }
        
    })

    .then(data => {
        for(let i = 0; i < 50; i++){
            //add latitude and longitude coordinates from the API to an array
            lat_coord.push(Number(data.results[i].location.coordinates.latitude));
            lng_coord.push(Number(data.results[i].location.coordinates.longitude));

            //add the image src to an array
            img.push(data.results[i].picture.thumbnail);
        }
        //send values to the getmap function
        getMap(lat_coord, lng_coord, img);
    })
    
    .catch(error => console.log(error));
}

//function to create the map
function getMap(){
    let map;
    //options for where the map starts
    let options = {
        zoom: 2,
        center: {lat: -2.633333, lng: 37.233334}
    };

    //the new map
    map = new google.maps.Map(document.getElementById("map"), options);

    //add a marker with an image of the random user
    for(let i = 0; i < 50; i++){
        //for some reason the coordinates given by the API seem to be mostly in the ocean - they don't respond to the locations given
        var markers = new google.maps.Marker({
            position: {lat: lat_coord[i], lng: lng_coord[i]},
            map:map,
            icon: img[i]
        })
    }
}