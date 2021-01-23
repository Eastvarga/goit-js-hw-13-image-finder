import searchForm from '../templates/form.hbs';
// import gallery from '../templates/gallery.hbs';
// import galleryItems from '../templates/gallery-items.hbs';

const refs = {
  body: document.body,
};

// const markupGallery = gallery(galleryItems());
// console.log(searchForm());
refs.body.insertAdjacentHTML('afterbegin', searchForm());
