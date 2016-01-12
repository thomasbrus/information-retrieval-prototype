export default class {
  constructor(categories) {
    this.categories = categories;
  }

  buildSearchQuery() {
    return this.categories.mapBy('searchTerm').join(' ');    
  },
}
