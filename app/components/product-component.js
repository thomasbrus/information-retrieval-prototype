import Ember from 'ember';

let ProductComponent = Ember.Component.extend({
  classNames: ['product'],

  productImageStyle: Ember.computed('product.imageUrl', function() {
    if (this.get('product.imageUrl')) {
      return `background-image: url('${this.get('product.imageUrl')}')`.htmlSafe();
    } else {
      return null;
    }
  })
});

ProductComponent.reopenClass({
  positionalParams: ['product'],
});

export default ProductComponent;
