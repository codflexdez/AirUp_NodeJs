import Dashboard from "./views/Dashboard.js";
import Welcome from "./views/Welcome.js";
import Airport from "./views/Airport.js";
import Search from "./views/Search.js";


//je voulais importer le var MAPKEY à partir le fichier config.js mais de pas de success
// const { MAPKEY } = require('../../../config.js')
const mapKey = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'

const pathTpRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const router = async () => {
  const routes = [
    {
      path: "/",
      view: Welcome,
    },
    {
      path: "/dashboard",
      view: Dashboard,
    },
    {
      path: "/airport/:id",
      view: Airport,
    },
    {
      path: "/search/:input",
      view: Search,
    },
  ];

  const potencialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathTpRegex(route.path)),
    };
  });

  let match = potencialMatches.find(
    (potencialMatches) => potencialMatches.result != null
  );
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  console.log(match);

  const section = document.querySelector("section");
  const divMap = document.querySelector("#map");
  const view = new match.route.view(getParams(match));
  document.querySelector("#app").innerHTML = await view.getHtml();
  divMap.classList.add("invisible");
  section.classList.remove("section");

  if (match.route.path === "/airport/:id") {
    divMap.classList.remove("invisible");
    section.classList.add("section");
  }
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  
  //ajout de api/js pour situer l'aéroport sur la carte
  let script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=weekly`;
  document.head.appendChild(script);

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
    if (e.target.matches("[data-search]")) {
      e.preventDefault();
      let input = document.querySelector('[type="search"]').value;
      input = input.toLowerCase();
      e.target.href = `/search/${input}`;
      navigateTo(e.target.href);
    }
  });
  router();
});
