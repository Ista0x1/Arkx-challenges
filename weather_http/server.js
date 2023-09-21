const http = require('http');
const url = require('url')
const port =3000;
const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
  ];
  async function fetchdata(lat,lng){
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
    const data = await response.json();
    return data;
    }
const server = http.createServer(async (req,res)=>{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
        
// Inside the request handler
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;
const query = parsedUrl.query;
if (path=== '/weather') {
    if ('city' in query) {
        console.log(query.city);
        let cityFound = false;
    
        for (let i = 0; i < cities.length; i++) {
            let current = cities[i];
            if (current.name.toLowerCase() === query.city.toLowerCase()) {
                console.log(current.name);
                const d = await fetchdata(current.lat, current.lng);
                const weather = d.current_weather.temperature;
                res.end("Name is : " + current.name + " Weather : " + weather);
                cityFound = true;
               
                break;  
            }
        }
    
        if (!cityFound) {
            console.log("Enter correct city");
        }
    }
    else{
        res.end('there is no query')
    }
}
else{
    res.end('Please enter /weather before city parameter')
}
});
server.listen(port, ()=>{
    console.log('server running in '+port)
})