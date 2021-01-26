import modalImg from '../templates/modal.hbs';
// added basickLightbox--------------------------------------
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
//-----------------------------------------------------------

const modalShowHandler = event => {
  if (event.target.nodeName === 'IMG') {
    // console.dir(event.target);
    // console.log(event.target);
    // console.dir(event.target.dataset.set);
    // console.log(modalImg({ set: event.target.dataset.set }));
    const modal = basicLightbox.create(
      modalImg({ set: event.target.dataset.set }),
    );
    // console.dir(modal);
    modal.show();
  }
};

export default modalShowHandler;
