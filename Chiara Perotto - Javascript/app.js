

var button = document.querySelector('.button');
var button2 = document.querySelector('.button2');
var InputValue = document.querySelector('.inputValue');
var cityname = document.querySelector('.cityname');
var desc = document.querySelector('.desc');
var tempNow = document.querySelector('.tempNow');
var tempMin = document.querySelector('.tempMin');
var tempMax = document.querySelector('.tempMax');
var hum = document.querySelector('.hum');
var wind = document.querySelector('.wind');
var realFeel = document.querySelector('.realFeel');

/*Get local time and determine if it is day or night */
var dt = new Date();
Todaydt = dt.toLocaleDateString();
var hours = dt.getHours();
console.log(hours);
var Time;
if (hours<= 17)
  {
    Time= "day";
  }
else
  {
    Time= "night";
  }
console.log(Time);


/* cal weather API by city name*/
button.addEventListener('click',function()  
{
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+InputValue.value+'&units=metric&appid=b606ba42cff972722a540a5355b1aa6e')
  .then(response => response.json())
  .then(data => populateData(data))
  .catch(err => alert("wrong city name!"))
})

/* cal weather API by geolocation*/
button2.addEventListener('click',function getLocation() 
{
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else 
    {
      alert("Geolocation is not supported by this browser.");
    }
})

/*find latitude and longitude by position*/
  function showPosition(position) 
  {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&units=metric&appid=b606ba42cff972722a540a5355b1aa6e')
    .then(response => response.json())
    .then(data => populateData(data))
    .catch(err => alert("wrong city name!"))
  }

/*extract data by API call and show it on page*/
function populateData(data)
{
  document.getElementById("myinput").value="";
  var windValue= data ['wind']['speed'];
  var realFeelValue= data ['main']['feels_like'];
  var humValue= data ['main']['humidity'];
  var tempMinValue= data ['main']['temp_min'];
  var tempMaxValue= data ['main']['temp_max'];
  var tempNowValue= data ['main']['temp'];
  var celsius= Math.round (tempNowValue);
  var citynameValue= data ['name'];
  var descValue= data ['weather']['0']['description'];
  var imgValue= data ['weather']['0']['main'];
  var img=document.getElementById("weatherIcon");
  var realFeelRound= Math.round (realFeelValue);

  wind.innerHTML="Wind speed:</br>  ➤"+windValue+"Km/h";
  realFeel.innerHTML="Feels like:  "+realFeelRound+"°";
  tempNow.innerHTML="Temperature:  "+celsius+"°";
  cityname.innerHTML=citynameValue;
  tempMin.innerHTML="↓ Min:  "+tempMinValue+"°";
  tempMax.innerHTML="↑ Max:  "+tempMaxValue+"°";
  hum.innerHTML="Humidity:  "+humValue+"%";
  var descValueUp=descValue.charAt(0).toUpperCase() + descValue.substring(1).toLowerCase();
  desc.innerHTML=descValueUp;
  console.log(data);

  if(Time=="day")
  {  
    if(imgValue=="Clouds")
      {
        switch(descValue)
          {
            case "few clouds":
            case "scattered clouds":
            img.src= "icon/suncloud.png"; 
            break;
            default:
            img.src= "icon/clouds.png";  
          }
      }
    else if(imgValue=="Clear")
      {
        img.src= "icon/sun.png";
      }
    else if(imgValue=="Rain")
      {
        switch(descValue)
          {
            case "moderare rain":
            img.src= "icon/sunrain.png";  
            break;
            case "heavy intensity rain":
            case  "very heavy rain":
            case "heavy intensity shower rain":
            case "extreme rain":
            img.src= "icon/rainsun3.png";  
            break;
            case "freezing rain":
            img.src= "icon/freaz.png"; 
            break;
            default:
            img.src= "icon/sunrain2.png";  
          }
      }
    else if(imgValue=="Snow")
      {
        img.src= "icon/snow.png";
      }
    else if(imgValue=="Fog"||"Mist")
      {
        img.src= "icon/fog.png";
      }
    else if(imgValue=="Drizzle")
      {
        img.src= "icon/sunrain.png";
      }
  }
  else
  {
    if(imgValue=="Clouds")
      {
        switch(descValue)
          {
            case "few clouds":
            case "scattered clouds":
            img.src= "icon/fewclouds.png"; 
            break;
            default:
            img.src= "icon/moonclouds.png";  
          }
      }
    else if(imgValue=="Clear")
      {
        img.src= "icon/moon.png";
      }
    else if(imgValue=="Rain")
      {
        switch(descValue)
          {
            case "moderare rain":
            img.src= "icon/rainmoon.png";  
            break;
            case "heavy intensity rain":
            case  "very heavy rain":
            case "heavy intensity shower rain":
            case "extreme rain":
            img.src= "icon/rainmoon3.png";  
            break;
            case "freezing rain":
            img.src= "icon/freaz.png"; 
            break;
            default:
            img.src= "icon/rainmoon2.png";  
          }
      }
    else if(imgValue=="Snow")
      {
        img.src= "icon/snowmoon.png";
      }
    else if(imgValue=="Fog"||"Mist")
      {
        img.src= "icon/fog.png";
      }
    else if(imgValue=="Drizzle")
      {
        img.src= "icon/rainmoon.png";
      }
  }
}


/*play whit jquery functions  ;-) */
$(document).ready(function()
{
  $('.button').click(function() 
  {
    $('#hideText').html("Date:  "+Todaydt);
  });
});
$(document).ready(function()
{
  $('.button2').click(function() 
  {
    $('#hideText').html("Date:  "+Todaydt);
  });
});