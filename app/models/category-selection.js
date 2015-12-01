export default class {
  constructor(categories) {
    this.categories = categories;
  }

  buildSearchQuery() {
    return this.categories.reduce((query, category) => (
      `${query} ${category.get('keywords').join(' ')}`
    ), "");
  }
}
