import AbstractView from "./AbstractView.js"
export default class extends AbstractView {
    constructor(params) {
      super(params); //pour acceder au class parent
      this.setTitle("Airport detail");
     
     
    }
     


     
 


//google - Initialize and add the map
initMap(params) {
  
  const uluru = { lat: params.lat, lng: params.lng };

  if(!params){
    uluru.lat = 56.130367;
    uluru.lng = -106.34677;
  }

  // The map, centered at Uluru
    const map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 12,
    center: uluru,
  });

  console.log(map);
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
    


    

       
async getHtml() {
 
  
  const nu = Number(this.params.id)
   
    async function getData(url) {
        const response = await fetch(url);
        return response.json();
    }
    const data = await getData('/static/data.json')

   
    let i = 0;
    data.response.forEach(item => {
         item.id = i++;
         if(item.iata_code == null){
          item.iata_code = "";
        }
    });

    const airport = data.response.find(item => item.id === nu)
    
      let params = {
        lat: airport.lat,
        lng: airport.lng
      }
     
      this.initMap(params)
      return `
            <div class="map-content">
            <h1>${airport.name}</h1>
            <h3 class="text-primary">${airport.iata_code}</h3>
          
            <div class="text-primary">
            <h4>Latitude: ${airport.lat}</h4>
            <h4>Longitude: ${airport.lng}</h4>
            </div>`;
          }
        }
              
              
              




