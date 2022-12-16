const img = document.querySelector('img');
const temp = document.querySelector('#temp');
const weather = document.querySelector('#weather');
const btn = document.querySelector('#btn');
const inp = document.querySelector('input');
const unit = document.querySelector('.switch-field')
const cityError = document.querySelector('#cityError');


btn.addEventListener('click',fetchNewLocation)
unit.addEventListener('click',e => changeUnits(e))

function changeUnits(e){
    if(e.target.id=="radio-one" && temp.textContent.at(-1)=="C"){
        let Ftemp = Math.round(100*(parseFloat(temp.textContent)*9/5 + 32))/100
        temp.textContent = Ftemp.toString() + " F"
    }
    else if (e.target.id=="radio-two" && temp.textContent.at(-1)=="F" ){
        let Ctemp = Math.round(100*(parseFloat(temp.textContent)- 32 )*5/9)/100
        temp.textContent = Ctemp.toString() + " °C"
    }
}

async function fetchnewGif (weatherDescription){
    
    let urlimage = `https://api.giphy.com/v1/gifs/translate?api_key=KWFCyMNbtauIjlCi2ttyCvp1JTXA9QhB&s=weather +${weatherDescription}`
    
    let response = await fetch(urlimage, {mode: 'cors'})
    let response2 = await response.json()
    try {
        img.src = response2.data.images.original.url;
        }
        catch (error) {
            img.setAttribute("alt", "This word doesn't exist, try another one")
        }
}

async function fetchNewLocation (){
    temp.textContent=""
        weather.textContent= ""
    let urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${inp.value}&APPID=2b34af2d4d4a8af2c21a13797af0f870&units=metric`
    
    let response = await fetch(urlWeather, {mode: 'cors'})
    let response2 = await response.json()
    try {
        temp.textContent=response2.main.temp + " °C"
        weather.textContent= response2.weather[0].main
        fetchnewGif (response2.weather[0].main)
        }
        catch (error) {
            cityError.textContent= "This city doesn't exist, try another one"
        }
    
}