import Ember from 'ember';

let ProductComponent = Ember.Component.extend({
  classNames: ['product'],
  classNameBindings: ['priceCategoryClass'],

  imageStyle: Ember.computed('product.imageUrl', function() {
    if (this.get('product.imageUrl')) {
      return `background-image: url('${this.get('product.imageUrl')}')`.htmlSafe();
    } else {
      return null;
    }
  }),

  priceCategoryClass: Ember.computed('product.price', function() {
    if (this.get('product.price') < 7.5) { return 'is-cheap'; }
    if (this.get('product.price') < 22.5) { return 'is-moderate'; }
    return 'is-expensive';
  }),
});

ProductComponent.reopenClass({
  positionalParams: ['product'],
});

export default ProductComponent;
