window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/9fb4ea22fbbc8c7fa3ef9feb9b2e9d94/${lat},${long}`;


            fetch(api).then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set DOM Elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                     ///Set icon

                     setIcons(icon, document.querySelector(".icon"));

                     // Change temperature to celsius
                     
                     temperatureSection.addEventListener("click", () => {
                         if(temperatureSpan.textContent === "F") {
                             temperature.textContent = "C";
                         } else {
                             temperatureSpan.textContent = "F";
                         }
                     })


                });

        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});