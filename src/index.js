import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfoCard: document.querySelector('.country-info'),
};
const onInputDebounced = debounce(onInput, DEBOUNCE_DELAY);

refs.input.addEventListener('input', onInputDebounced);

function onInput(e) {
  const nameCountry = e.target.value.trim();
  if (nameCountry === '') {
    return (
      (refs.countriesList.innerHTML = ''), (refs.countryInfoCard.innerHTML = '')
    );
  }
  fetchCountries(nameCountry)
    .then(country => {
      refs.countriesList.innerHTML = '';
      refs.countryInfoCard.innerHTML = '';
      if (country.length > 10) {
        tooManyCountries();
      } else if (country.length === 1) {
        refs.countriesList.insertAdjacentHTML(
          'beforeend',
          createMarkupCountryInfoCard(country)
        );
      } else {
        refs.countriesList.insertAdjacentHTML(
          'beforeend',
          createMarkupCountriesList(country)
        );
      }
      console.log(country);
    })
    .catch(onWrongName);
}

function createMarkupCountriesList(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class='country--element'><img src="${flags.svg}" alt="${flags.alt}" width=30px height=30px><h2>${name.official}</h2></li>`;
    })
    .join('');
}

function createMarkupCountryInfoCard(country) {
  return country.map(({ flags, name, capital, population, languages }) => {
    return `<li class='country--info'><div class="box"><img src="${
      flags.svg
    }" alt="${flags.alt}" width=30px height=30px><h2>${
      name.official
    }</h2></div><p class="text">Capital: <span class="text--non-decoration">${capital}</span></p><p class="text">Population: <span class="text--non-decoration">${population}</span></p><p class="text">Languages: <span class="text--non-decoration">${Object.values(
      languages
    ).join(', ')}</span></p></li>`;
  });
}

function tooManyCountries() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function onWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
