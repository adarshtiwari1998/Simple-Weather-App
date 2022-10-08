let weather = {
  apiKey: "YOUR API KEYS GOES HERE",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        //   if (response.ok) {
        //     alert("No weather found.");
        //     // console.log(response);
        //     return response.json();
        //   } else {
        //     throw new Error("No weather found.");
        //   }
        // })

        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name, timezone } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, pressure } = data.main;
    const { speed, deg } = data.wind;
    const { sunrise, sunset } = data.sys;
    // console.log(
    //   name,
    //   icon,
    //   description,
    //   temp,
    //   humidity,
    //   feels_like,
    //   speed,
    //   deg
    // );

    document.querySelector(".city").innerText = "Weather in " + name;
    // document.querySelector(".time").innerText =
    //   "Time " + moment(timezone * 6000).format("hh:mm A");
    document.querySelector(".icon_img").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".feels_like").innerText =
      "Feels Like: " + feels_like + " °C";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
    document.querySelector(".deg").innerText = "Deg: " + deg + "°";
    document.querySelector(".sunrise").innerText =
      "Sunrise: " + window.moment(sunrise * 1000).format("HH:mm ");
    document.querySelector(".sunset").innerText =
      "Sunset: " + window.moment(sunset * 1000).format("HH:mm a");
    document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + " mb";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Geocoding javascript function

let geocode = {
  reverseGeocode: function (latitude, longitude) {
    var api_key = "YOUR API KEYS GOES HERE";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      api_key +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      if (request.status === 200) {
        // Success!
        var data = JSON.parse(request.responseText);
        // weather.fetchWeather(data.results[0].components.city);
        // console.log(data.results[0], city); // print the location
        weather.fetchWeather(data.results[0].components.city);
      } else if (request.status <= 500) {
        // We reached our target server, but it returned an error

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };

    request.send(); // make the request
  },

  getLocation: function () {
    function success(data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    } else {
      weather.fetchWeather("Delhi");
    }
  },
};

///////////////////////////////////////////////////////////////

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

geocode.getLocation();

// weather.fetchWeather("Delhi");

// Show hide javascript function

$(document).ready(function () {
  $("#toggle").click(function () {
    var elem = $("#toggle").text();
    if (elem == "Read More") {
      //Stuff to do when btn is in the read more state
      $("#toggle").text("Read Less");
      $("#text").slideDown();
    } else {
      //Stuff to do when btn is in the read less state
      $("#toggle").text("Read More");
      $("#text").slideUp();
    }
  });
});

// const feels_like = document.querySelector(".feels_like");
// feels_like.style.letterSpacing = "1";
// feels_like.style.color = "red";
