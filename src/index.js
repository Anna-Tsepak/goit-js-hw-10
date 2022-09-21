import './css/styles.css';

import { fetchCountries } from './api/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('[class="country-info"]');
const countryList = document.querySelector('[class="country-list"]');



searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

function getCountryData(event) {
    const countryName = event.target.value.trim();
     cleanUpMarkup(countryList);
     cleanUpMarkup(countryInfo);
    if (!countryName) {
        return
    }

fetchCountries(countryName).then(data => {
      if (data.length === 1) {
        markUpCountry(data[0]);
      }
      if (data.length >= 2 && data.length <= 10) {
        markUpCountries(data);
      }
      else if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    };
    })
    .catch(error => {
      alert(error);
    });
}

// fetchCountries('peru')
//     .then(data => console.log(data))
//     .catch(err => {
//     alert(err);
//     });

function markUpCountry(countryData) {
    console.log(countryData)
    const { flags, capital, population, name, languages } = countryData;
    
  const languagesEl = Object.values(languages).join(', ');

  const {} = languages;
  return countryInfo.insertAdjacentHTML(
    'beforeend',
    `<div><img src="${flags.svg}" width = "75" alt ="flag"/>
    <span>${name.official}</span></div>
    <div> <span class=boldText>Capital: </span>${capital}</div>
    <div> <span class=boldText>Population: </span>${population}</div>
    <div> <span class=boldText>Languages: </span>${languagesEl}</div> `
  );
}

function markUpCountries(countryData) {
    countryData.map(country => {
    const { flags, name } = country;
    return countryList.insertAdjacentHTML(
      'beforeend',
      `<div><img src=${flags.svg} width = "30"/>
      <span>${name.official}</span></div>`
    );
  });
   
}

function cleanUpMarkup(element) {
  element.innerHTML = '';
}

// function renderCoutry(data) {
//     const markup = data.map(({ flags, name }) => {
//         return `<li class="item">
//         <img src ="${flags.svg}" alt = "${name} width ="30" height = "30" ">
//                 <p>${name}</p>
//         </li>`
//     }).join('');
    
// }