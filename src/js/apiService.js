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
        // console.log(response);
        return response.json();
      })
      .then(response => {
        if (response.total !== 0) {
          if (this.page <= response.total / this.itemsPerPage + 1) {
            // console.log(`response.total:  ${response.total}`);
            // console.log(`this.page: ${this.page}`);
            // console.log(
            //   `response.total / this.itemsPerPage: ${
            //     response.total / this.itemsPerPage
            //   }`,
            // );
            this.incrementPage();
            return response;
          }
        }
        return null;
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
  get perPage() {
    return this.itemsPerPage;
  },
};
