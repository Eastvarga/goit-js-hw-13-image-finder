const key = '19923655-1a3b53a89179877892e074405';

export default {
  searchQuery: '',
  apiKey: key,
  filter: 'image_type=photo&orientation=horizontal',
  itemsPerPage: 12,
  page: 1,

  imageSearch() {
    const url = `https://pixabay.com/api/?q=${this.searchQuery}&${this.filter}&per_page=${this.itemsPerPage}&page=${this.page}&key=${this.apiKey}`;
    return fetch(url)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch();
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(newQuery) {
    this.searchQuery = newQuery;
  },
  get urlForScroll() {
    return this.url;
  },
};
