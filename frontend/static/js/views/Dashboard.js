import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor(params) {
    super(params); 
    this.setTitle("Dashboard");

   }
  

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url)
     // console.log(response);
      return response.json();
    }
    
    
    const data = await getData('/static/data.json')
    
   

    let str =`<div class="container text-center">
              <div class="row">`;
    

      let i = 0;

      for (const item of data.response) {
        if(item.name.length > 15){
          item.name = item.name.slice(0, 15);
        }
        if(item.iata_code == null){
          item.iata_code = "";
        }
        item.id = i++;
         
        str += `<div class="col-xs-6 col-md-4">
                <div class="dash p-3"><a class="btn btn-primery" href='/airport/${item.id}' data-link class="thumbnail">${item.name} - ${item.iata_code}
                </a></div>
                </div>`
        };
        str += `</div></div>`;
        return str;
     
   }
  }






   
        
         
     
   
          
  






  

   






  
        

  



  

