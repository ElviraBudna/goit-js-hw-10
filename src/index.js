import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.querySelector('#search-box'),
};
const onInputDebounced = debounce(onInput, DEBOUNCE_DELAY);

ref.input.addEventListener('input', onInputDebounced);

function onInput(e) {
  const nameCountry = e.target.value.trim();
  fetchCountries(nameCountry)
    .then(country => console.log(country))
    .catch(error => {
      console.log(error);
    });
}
