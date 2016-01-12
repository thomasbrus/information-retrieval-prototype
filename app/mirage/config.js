export default function() {
  this.urlPrefix = '/';
  this.timing = 0;
  this.get('/api/categories');
  this.passthrough('http://glacial-crag-9384.herokuapp.com/**');
}
