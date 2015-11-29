export default function() {
  this.transition(
    this.fromRoute('categories'),
    this.toRoute('products'),
    this.use('toUp'),
    this.reverse('toDown')
  );

  this.transition(
    this.fromRoute('products'),
    this.toRoute('wishlist'),
    this.use('toUp'),
    this.reverse('toDown')
  );
}
