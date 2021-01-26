// added PNotify ------------------------------------------------------------
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import {
  notice,
  error,
  defaultModules,
  // defaults,
  Stack,
} from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 30,
  context: document.body,
});
const noticeOptions = {
  title: 'Serching for images',
  text: 'Awaiting while downloading images from server',
  stack: myStack,
  delay: 2000,
};
const errorOptions = {
  itle: 'Ups, no response',
  text: '',
  stack: myStack,
  delay: 2000,
};
//-----------------------------------------------------------

import refs from './referals';
// import options from './serchOptions';
import apiService from './apiService';
import loadMoreBtn from './load-more-button';
// import updateMarkup from './updateMarkup';
import galleryItems from '../templates/gallery-item.hbs';
import modalShowHandler from './modalShowHandler';

//intersectionObserver---------------------
const options = {
  root: null,
  threshold: 1,
  rootMargin: '200px',
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      if (apiService.query !== '' && document.body.offsetHeight > 1000) {
        fetchImages();
      }
    }
  });
}, options);
//----------------------------------------
// scroll---------------------------------
// const scrolOption = {
//   top: 100,
// };
//scroll function-------------------------
// const scrollImage = () => {
//   setTimeout(() => {
//     // console.log(scrolOption.top);
//     // console.dir(document.body.offsetHeight);
//     scrolOption.top = document.body.offsetHeight;
//     window.scrollTo(scrolOption);
//   }, 1700);
// };
// updateMarkUp----------------------------------
const updateMarkup = hits => {
  //   console.dir(data);
  const markup = galleryItems(hits);
  //   console.dir(referal.gallery);
  //   console.dir(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  loadMoreBtn.enable();
  loadMoreBtn.show();

  return hits;
};
//-------------------------------------------------
//-fetchImages--- main fetch()-----------------------------------
function fetchImages() {
  loadMoreBtn.disable();

  //notice call------------------------
  notice(noticeOptions);
  //-----------------------------------
  apiService.imageSearch().then(updateMarkup);
  // .catch(eror => {
  //   console.dir(eror);
  //   error({ ...errorOptions, text: eror.message });
  // });
  // .finally(scrollImage);
}
// load more btn handler----------------
// const btnLoadMoreHandler = event => {
//   fetchImages();
// };
//------------------------------------------
//submit handler-------------------------------
const submitHandler = event => {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  refs.gallery.innerHTML = '';
  form.reset();
  apiService.resetPage();
  fetchImages();
};
//----------------------------------------------

refs.form.addEventListener('submit', submitHandler);
// btn load more------------------------------------------
// loadMoreBtn.refs.button.addEventListener('click', btnLoadMoreHandler);
// gallery click modal ------------------------------------------------
refs.gallery.addEventListener('click', modalShowHandler);

//---------------------------------------------------------------------
observer.observe(refs.intersectionObserverTriger);
//  observer.unobserve(refs.intersectionObserverTriger);
