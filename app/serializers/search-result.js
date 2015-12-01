import DS from 'ember-data';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    product: { deserialize: 'records' },
  },

  normalizeArrayResponse(store, primaryModelClass, payload) {
    let hits = payload.hits.filter(hit => ('url' in hit));

    let searchResults = hits.map(attributes => {
      let id = window.btoa(attributes.url);
      let productId = window.btoa(attributes.url);
      let resourceId = attributes.rid;
      let { rank, score, query } = attributes;
      return { id, productId, rank, resourceId, score, query };
    });

    let products = hits.map(attributes => {
      let id = window.btoa(attributes.url);
      let imageUrl = attributes.image;
      let { description, price, title, url } = attributes;
      return { id, description, imageUrl, price, title, url };
    });

    return {
      data: searchResults.map(searchResult => {
        let relationships = { product: { data: { type: 'product', id: searchResult.productId } } };
        return ({ type: 'search-result', id: searchResult.id, attributes: searchResult, relationships });
      }),
      included: products.map(product =>
        ({ type: 'product', id: product.id, attributes: product })
      )
    };
  },
});
