// Your code here
let sectionWeather = document.querySelector('#weather');
let form = document.querySelector('form')
let inputLocation = document.querySelector('input');


form.onsubmit = function(e) {
  e.preventDefault();
  const location = inputLocation.value.trim()
  if (!location) return
  searchWeather(location);
  inputLocation.value = "";    
}

async function searchWeather(location) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a76b32bf5b491e65fd99110fed59d0ba`;
  
        const response = await fetch(url)
        const data = await response.json()
        if(data !== null) {
            showWeather(data)
        }
    } catch(err) {
    }
}

showWeather = (data) => {  
    if(data.cod !== 200){
        sectionWeather.innerHTML = '<h2>Location Not Found</h2>';
    }
    else{
        if(data.cod === 200){
            
        const { coord: {lat, lon}, main: {feels_like, temp}, name, sys: {country}, weather: {[0]: {description, icon}}} = data;
        const dateTime = new Date(data.dt *1000);
        const currentTime = dateTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute:'2-digit'
        })
            
        sectionWeather.innerHTML = `
            <h2>${name},  ${country}</h2>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="__BLANK">click to view map</a>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <p style="text-transform: capitalize;">${ description}</p><br>
            <p>Current: ${temp} ° F</p>
            <p>Feels like: ${feels_like} F</p><br>
            <p>Last updated: ${currentTime}</p>`;
        }
    }    
}