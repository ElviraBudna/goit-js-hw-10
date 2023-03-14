import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

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
  //   if (nameCountry === '') {
  //     return;
  //   }
  fetchCountries(nameCountry)
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length <= 10) {
        refs.countriesList.insertAdjacentHTML(
          'beforeend',
          createCountriesList(country)
        );
        console.log('7');
      } else if (country.length === 1) {
        console.log('1');
      }
      console.log(country);
    })
    .catch(error => {
      console.log(error);
      //   Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createCountriesList(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class='country-element'><img src="${flags.svg}" alt="${flags.alt}" width=30px height=30px><h2>${name.common}<h2></li>`;
    })
    .join('');
}
