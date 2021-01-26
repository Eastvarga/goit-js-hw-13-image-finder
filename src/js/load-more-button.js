const loadMoreBtn = {
  refs: {
    button: document.querySelector('.button[data-action="load-more"]'),
    spinner: document.querySelector('#spinner'),
    btnLabel: document.querySelector('.label'),
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
};
export default loadMoreBtn;
