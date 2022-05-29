const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const output = document.querySelector('#output')
const API='http://api.openweathermap.org/data/2.5/weather?q=';
const key ='&appid=b067377a72c98ae6963cdae2e35408d9'
const url = API+input.value+key 

const getWeather = async(e)=>{
    e.preventDefault()
    const value = input.value
    const url = API + value + key 
    const req=await fetch(url)
    const res = await req.json()
    // console.log(res);
    renderWeather(res)
}

const renderWeather = (info) => {
    console.log(info);
    let div_temp = document.createElement('div')
    let div_dav = document.createElement('div')
    let div_vid = document.createElement('div')
    let div_vlaj = document.createElement('div')
    let div_foot = document.createElement('div')
    div_dav.classList.add('box')
    div_vid.classList.add('box')
    div_vlaj.classList.add('box')
    div_temp.classList.add('box')
    div_temp.innerHTML = `Dew point <br>` + (Math.round(info.main.feels_like-273) + '°');
    div_vlaj.innerHTML = `Humidity <br>` + ((info.main.humidity) + '%');
    div_vid.innerHTML = `Visibility <br>` + ((info.visibility/1000) + 'km');
    div_dav.innerHTML = `Wind speed: <br> ${info.wind.speed} km/h`;

    div_foot.append(div_temp,div_vlaj,div_vid,div_dav)
    div_foot.style.cssText =
    `
    display:flex;
    flex-wrap: wrap;
    // background-color: black;
    justify-content: space-around;
    width: 50%;
    color: white;
    // background-color: #456277;
    
    // height: 300px;
    // background-color: yellow;
    `
    let h2 = document.createElement('h2')
    h2.innerHTML = info.name
    h2.style.fontSize = '55px'
    h2.style.paddingBottom = '0'
    h2.style.marginBottom = '0'
    h2.style.cssText=`
    margin-left: 3%;
    font-size: 45px;`
    let conteiner = document.createElement('div')
    conteiner.style.cssText =
    `
    color: white;
    display:flex;
    flex-direction: row;
    align-items: center;
    // background-color: yellow;
    width:90%;
    text-align; center;
    `
    let p_temp = document.createElement('p')
    let discription = document.createElement('h4')
    discription.style.cssText =
    `
    <br>
    background-color: yellow;
    color: white;
    // padding:0;
    // margin: 0;
    `
    discription.innerHTML = info.weather[0].description
    // let p_temp_max = document.createElement('p')
    let p_temp_min = document.createElement('p')
    let p_temp_vlaj = document.createElement('p')
    p_temp.innerHTML = (Math.round(info.main.temp-273) + '°C' + `<img src="https://openweathermap.org/img/wn/${info.weather[0].icon}.png" alt="">`)
    p_temp.style.cssText =
    `
    // background-color: white;
    padding:0;
    margin: 0;
    margin-left: 3%;
    font-size:50px;
    `
    let div_mx_mn = document.createElement('div')
    div_mx_mn.style.cssText = 
    `
    padding:0;
    margin: 0;
    margin-left:50px;
    font-size: 14px;
    // background-color:red;
    width:40%;
    // justify-content: space-around;
    display: flex;
    `
    let btn = document.createElement('button')
    // btn.innerHTML = `add`
    btn.classList.add('button1')
    btn.addEventListener('click',()=>{
        localStorage.setItem(city1,city1);
        output_2.innerHTML=''
        forEachKey()
    })
    // p_temp_max.innerHTML = 'max: ' + Math.round(info.main.temp_max-273) + '°'
    p_temp_min.innerHTML = 'The low will be : ' + Math.round(info.main.temp_min-273) + '°.'
    div_mx_mn.append(p_temp_min)
    p_temp_vlaj.innerHTML = 'Humidity: ' + info.main.humidity
    conteiner.append(h2,p_temp,discription,div_mx_mn)
    output.append(conteiner,div_foot,btn)
}

btn.addEventListener('click',(e)=> {
    output.innerHTML = ''
    getWeather(e)

    input.value = ''
})
