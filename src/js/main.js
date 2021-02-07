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
  title: 'Ups, no response',
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
  // threshold: 1,
  rootMargin: '0px',
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      if (apiService.query !== '' /* && document.body.offsetHeight > 600*/) {
        fetchImages();
      }
    }
  });
}, options);
//----------------------------------------

// For Scroll-------////////////
// scroll---------------------------------
// const scrolOption = {
//   top: 0,
// };
// const buttonForScroll = document.querySelector(
//   '.button[data-action="load-more"]',
// );
// const scrollCoordinates = () => {
//   return (
//     refs.gallery.scrollHeight -
//     (apiService.perPage / 3) * refs.gallery.lastElementChild.clientHeight -
//     buttonForScroll.clientHeight
//   );
// };
//scroll function-------------------------
// const scrollImage = () => {
//   setTimeout(() => {
// console.log(scrolOption.top);
// console.log(`refs.gallery.scrollTop: ${refs.gallery.scrollTop}`);
// console.log(`refs.gallery.scrollHeight: ${refs.gallery.scrollHeight}`);
// console.log(
//   `refs.gallery.lastChild.scrollTop: ${refs.gallery.lastElementChild}`,
// );
// console.log(
//   `refs.gallery.lastChild.scrollTop: ${refs.gallery.lastElementChild.scrollTop}`,
// );
// console.log(
//   `refs.gallery.lastChild.clientHeight: ${refs.gallery.lastElementChild.clientHeight}`,
// );
// console.log(
//   `buttonForScroll.clientHeight: ${buttonForScroll.clientHeight}`,
// );
//   scrolOption.top = scrollCoordinates();
//   window.scrollTo(scrolOption);
// }, 1700);
// };
// END For Scroll-------////////////
// updateMarkUp----------------------------------
const updateMarkup = response => {
  //   console.dir(data);
  if (response === null) {
    notice({
      ...noticeOptions,
      title: 'Ops! No more Images',
      text: 'Try to find something else!',
    });
    loadMoreBtn.enable();
    loadMoreBtn.hidden();
    return response;
  }
  const markup = galleryItems(response.hits);
  //   console.dir(referal.gallery);
  //   console.dir(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  loadMoreBtn.enable();
  loadMoreBtn.show();

  return response;
};
//-------------------------------------------------

//-fetchImages--- main fetch()---------------------------npm--------
function fetchImages() {
  loadMoreBtn.disable();

  if (refs.gallery.lastElementChild !== null) {
    observer.unobserve(refs.gallery.lastElementChild);
  }
  //notice call------------------------
  // notice(noticeOptions);
  //-----------------------------------
  apiService
    .imageSearch()
    .then(updateMarkup)
    .then(response => {
      if (refs.gallery.lastElementChild !== null && response !== null) {
        observer.observe(refs.gallery.lastElementChild);
      }
      return response;
    })
    .catch(er => {
      console.dir(er);
      error({ ...errorOptions, text: er.message });
    });
  // .finally(scrollImage); //For scroll-----////////
}

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
//FOR "load More" button ------//////////
// load more btn handler----------------
// const btnLoadMoreHandler = event => {
//   fetchImages();
// };
//------------------------------------------
// btn load more------------------------------------------
// loadMoreBtn.refs.button.addEventListener('click', btnLoadMoreHandler);
// gallery click modal ------------------------------------------------
//END "load More" button ------//////////
refs.gallery.addEventListener('click', modalShowHandler);

//---------------------------------------------------------------------
// observer.observe(refs.gallery.lastElementChild);
//  observer.unobserve(refs.gallery.lastElementChild);
