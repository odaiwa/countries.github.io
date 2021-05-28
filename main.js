/// <reference path="jquery-3.6.0.js" />

//Mission 2 Full-Stack
document.getElementById("specific-country").value ="";

console.log("every thing will be printed here is for debugging matter")
function showCountries() {
    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        success: countries => displayCountries(countries),
        error: err => alert(err.status)
    });
}

function showSpecificCountry() {
    const countryName = document.getElementById("specific-country").value;
    if(countryName === ""){
        alert("Input cannot be empty");
        return;
    }
    if (!isNaN(countryName)){
        alert("Country Name cannot be number");
        return;
    }
    const urls = `https://restcountries.eu/rest/v2/name/${countryName}`
    $.ajax({
        url: urls,
        success: countries => displayCountries(countries),
        error: err => alert("No such country")
    });
}



function displayCountries(countries) {
    $("tbody").empty();
    for (const country of countries) {
        let tr = `
            <tr>
                <td>${country.name}</td>
                <td>${country.topLevelDomain[0]}</td>
                <td>${country.capital == undefined ? "":country.capital}</td>
        `;
        const currencies = country.currencies.map(currency => currency.code);
        tr+=`<td>${currencies}</td>`;
        tr += `
        <td>${country.borders}</td>
        <td><img src="${country.flag}"></td>
        `
        $("tbody").append(tr);
    }
}
