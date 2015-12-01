export default function() {
  this.urlPrefix = '/';
  this.timing = 0;
  this.get('/api/categories');
  this.passthrough('http://circus.ewi.utwente.nl:16842/**');
}
