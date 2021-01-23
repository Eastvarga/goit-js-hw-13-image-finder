import refs from './referals';
import galleryItems from '../templates/gallery-item.hbs';

const updateMarkup = hits => {
  //   console.dir(data);
  const markup = galleryItems(hits);
  //   console.dir(referal.gallery);
  //   console.dir(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  return hits;
};

export default updateMarkup;
