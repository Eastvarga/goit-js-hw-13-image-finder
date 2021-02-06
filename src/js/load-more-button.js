const loadMoreBtn = {
  refs: {
    button: document.querySelector('.button[data-action="load-more"]'),
    spinner: document.querySelector(
      '.button[data-action="load-more"] #spinner',
    ),
    btnLabel: document.querySelector('.button[data-action="load-more"] .label'),
  },
  enable() {
    this.refs.button.disabled = false;
    this.refs.btnLabel.textContent = 'Load more';
    this.refs.spinner.classList.add('is-hidden');
  },
  disable() {
    this.refs.button.disabled = true;
    this.refs.btnLabel.textContent = '  ...loading';
    this.refs.spinner.classList.remove('is-hidden');
  },
  show() {
    this.refs.button.classList.remove('is-hidden');
  },
  hidden() {
    this.refs.button.classList.add('is-hidden');
  },
};
export default loadMoreBtn;
