landing = document.querySelector(".landing");
form = document.querySelector(".form");
image = document.querySelector(".desc");
form.addEventListener("submit", search);

async function search(e) {
  searchval = document.querySelector(".search").value;
  e.preventDefault();

  const response = await fetch(
    "https://corona.lmao.ninja/v3/covid-19/countries/" +
      searchval +
      "?strict=true"
  );
  response.json().then((data) => {
    console.log(data);
    if (response.ok) {
      display(data);
    } else {
      displayerror(data);
    }
  });
  if (searchval === "") {
    image.style.display = "none";
    landing.innerHTML = `<h3> Oh no! Please input fields &#128551;</h3>`;
  }
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function display(data) {
  image.style.display = "none";
  landing.innerHTML = ` 
    <h1 class="country">${data.country}, ${
    data.continent
  } <i class="fas fa-map-marker-alt"></i></h1>
    <img src= ${data.countryInfo.flag} alt='flag' > </img>
    <div class="card">
        <div class="cards">
        <p>Today Cases</p>
        <p class='data' >${formatNumber(data.todayCases)}</p></div>
        <div class="cards"><p>Today Deaths</p>
        <p class='data'>${formatNumber(data.todayDeaths)}</p>
         </div>
        <div class="cards"><p>Today Recoveries</p>
        <p class='data'>${formatNumber(data.todayRecovered)}</p></div>
        <div class="cards"><p>Total Active Cases</p>
        <p class='data'>${formatNumber(data.active)}</p></div>
        <div class="cards"><p>Total Cases</p>
        <p class='data'>${formatNumber(data.cases)}</p></div>
        <div class="cards"><p>Total Deaths</p>
        <p class='data'>${formatNumber(data.deaths)}</p></div>
        <div class="cards"><p>Total Recovered</p>
        <p class='data'>${formatNumber(data.recovered)}</p></div>
    </div>`;
}

function displayerror(data) {
  image.style.display = "none";
  landing.innerHTML = `<h3 class='error'>${data.message}  &#10060;</h3>`;
}