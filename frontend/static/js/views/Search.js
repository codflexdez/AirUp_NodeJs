import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Search");
    //console.log(params.input);
    this.search = params.input;
    //console.log(this.search);
}




 
 

  addProperties(data){
      let i = 0;
      for (const prop of data) {
        prop.id = i++
      }
  }
   
      


  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }
   const data = await getData("/static/data.json");
     this.addProperties(data.response)
     let resTab = [];
     data.response.forEach(prop => {
      if(prop.name.toLowerCase().includes(this.search)){
          resTab.push(prop);
      }
    });
    let str =`<div class="container text-center">
              <div class="row">`;
    resTab.forEach(air => {
      str += `<div class="col-xs-6 col-md-3">
                <div class="dush p-3"><a class="btn btn-primery" href='/airport/${air.id}' data-link class="thumbnail">${air.name} - ${air.iata_code}
                </a></div>
                </div>`
    }) 
    str += `</div></div>`;
    return str;
  }
}

      
     
      
        
        



        
        

        


   
   
  



