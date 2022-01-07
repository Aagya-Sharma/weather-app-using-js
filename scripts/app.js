
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const mylocation = document.querySelector('.mylocation');


//to update the information
const updateInterface = (data)=>{
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    details.innerHTML= 
    `<div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  </div>
</div>`

if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
}
};

//to get the city details and weather
const updateCity= async (city)=>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return{
        cityDetails:cityDetails,
        weather:weather
    }
}

//add a event listener to the form
cityForm.addEventListener('submit',e=>{
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateInterface(data))
        .catch(err=> console.log(err));
});

//to get the location
mylocation.addEventListener('click',e=>{
    navigator.geolocation.getCurrentPosition(position=>{
                let lattitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                var locAPI ="https://us1.locationiq.com/v1/reverse.php?key=pk.129a99c438cf87f6ec6ce08688136a3b&lat=" +
                        lattitude + "&lon=" + longitude + "&format=json";
                        fetch(locAPI).then(function(response) {
                                        return response.json();
                                      }).then((data) =>{
                                          let city = data.address.city;
                                          updateCity(city)
                                            .then(data => updateInterface(data))
                                            .catch(err=> console.log(err));
                                      })
                                    .catch(err=>console.log(err))
                                    
                            })
                        })