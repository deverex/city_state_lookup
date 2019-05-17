const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search the state.json and filter

const searchStates = async searchText => {
  const res = await fetch("../data/istates.json");
  const cities = await res.json();

  // Get matches to current text input
  let matches = cities.filter(city => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return city.name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `<div className="card card-body mb-1">
    <h4>${match.name} <span class="text-primary"> ${match.state}</span></h4>
    </div>`
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
