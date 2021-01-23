import './notify';
import refs from './referals';
// import options from './serchOptions';
import apiService from './apiService';

import updateMarkup from './updateMarkup';

const scrolOption = {
  top: 1300,
  left: 0,
  behavior: 'smooth',
};

// console.log(refs.form);
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  //   console.log(form);
  // console.dir(event.currentTarget.elements);
  //   console.dir(event.currentTarget.elements.query.value);
  apiService.query = form.elements.query.value;
  refs.gallery.innerHTML = '';
  form.reset();

  //

  //
  apiService.resetPage();

  apiService
    .imageSearch()
    .then(updateMarkup)
    .then(() => {
      setTimeout(() => {
        window.scrollTo(scrolOption);
        scrolOption.top += 1300;
      }, 1700);
    })
    .catch();
});

refs.button.addEventListener('click', event => {
  event.preventDefault();
  if (apiService.query != '') {
    apiService
      .imageSearch()
      .then(updateMarkup)
      .then(() => {
        setTimeout(() => {
          window.scrollTo(scrolOption);
          scrolOption.top += 1300;
        }, 1700);
      })
      .catch();
  }
});
