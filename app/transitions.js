export default function() {
  this.transition(
    this.fromRoute('categories'),
    this.toRoute('products'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('products'),
    this.toRoute('wishlist'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
