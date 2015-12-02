export default function() {
  this.urlPrefix = '/';
  this.timing = 0;
  this.get('/api/categories');
  this.passthrough('http://localhost:8080/**');
}
