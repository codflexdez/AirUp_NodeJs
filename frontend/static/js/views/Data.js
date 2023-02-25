export default class Data {
    dataAir = '/static/data.json';
    
    data;
    constructor() {
    
    }
    getResources(cb) {
      fetch(this.dataAir)
        .then((data) => data.json())
        .then((data) => {
          if(cb){
           cb(data)
          }
         });
     }
   }