const link = "https://randomuser.me/api/?results=50";

getData()

function getData(){
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
        let name = "";
        let img = "";
        let location = "";
        console.log(data);

        for(let i = 0; i < 50; i++){
            name = data.results[i].name.first + " " + data.results[i].name.last;
            location = data.results[i].location.city + ", " + data.results[i].location.country;

            document.querySelectorAll(".name")[i].innerHTML = name;
            document.querySelectorAll(".email")[i].innerHTML = data.results[i].email;
            document.querySelectorAll(".age")[i].innerHTML = "Age: " + data.results[i].dob.age;
            document.querySelectorAll(".phone")[i].innerHTML = "Phone: " + data.results[i].phone;
            document.querySelectorAll(".location")[i].innerHTML = location;

            img = document.querySelectorAll(".image")[i];
            img.src = data.results[i].picture.large;
            img.style.display = "block";

            console.log(name);
            console.log(location);
        }
        const lat_coord = data.results[0].location.coordinates.latitude;
        const lng_coord = data.results[0].location.coordinates.longitude;

        console.log(lat_coord);
        console.log(lng_coord);
    })
    
    .catch(error => console.log(error));
}