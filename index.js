const sectionWeather = document.getElementById('weather');
const inputLocation = document.getElementById('weather-search');
const buttonSubmit = document.querySelector('button[type="submit"]');

inputLocation.setAttribute( "autocomplete", "off" ); 
buttonSubmit.addEventListener('click', onSearch);


function onSearch(e) {
  e.preventDefault();
  inputLocation.setAttribute( "autocomplete", "off" ); 
  const location = inputLocation.value; 
  searchWeather(location);
  inputLocation.value = '';    
}

function searchWeather(location) { 
  const apiKey = `a76b32bf5b491e65fd99110fed59d0ba`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then (response => response.json())
    .then (data => {
      if(data !== null){
      showWeather(data);
      }
    })      
}

function showWeather(data) {  
  if(data.cod !== 200){
    sectionWeather.innerHTML = '<p>Location Not Found</p>';  
  } else {
  if(data.cod === 200){
    const { coord: {lat, lon}, main: {temp, feels_like}, name, sys: {country}, weather: {[0]: {description, icon}}} = data;
    const date = new Date();
    const timeString = date.toLocaleTimeString('en-US' , {
      hour: 'numeric',
      minute:'2-digit'
  });
            
      sectionWeather.innerHTML = `
      <h2>${ name },  ${ country }</h2>
      <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="__BLANK">Click to view map</a>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <p style="text-transform: capitalize;">${description}</p><br>
      <p>Current: ${temp} °F</p>
      <p>Feels like: ${feels_like} °F</p><br>
      <p>Last updated: ${timeString}</p>
      `;
    }
  }    
}