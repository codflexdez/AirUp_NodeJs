import AbstractView from "./AbstractView.js"



export default class extends AbstractView {
  constructor(params) {
    super(params); //pour acceder au class parent
    this.setTitle("Welcome");
  }



async getHtml() {
    return `
    <div class="jumbotron">
    <div class="container">
    <h1>Liste des aéroports internationaux au Canada</h1>
    <p> L'Aéroport international Pierre-Elliott-Trudeau de Montréal dessert un plus grand pourcentage de passagers internationaux que n'importe quel autre aéroport canadien</p>
    <p><a class="btn btn-primary btn-lg" href="/dashboard" data-link role="button">Voir la liste</a></p>
    
    </div></div>`;

  }

}