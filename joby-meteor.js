
var Joby = this.Joby = {};

Joby.Jobs = new Mongo.Collection('jobs');

Joby.Queue = function Queue(name, options) {
  options || (options = {});
  this.name = name || 'default';
  this.collection = Joby.Jobs;
};

Joby.Queue.prototype.enqueue = function(name, params, options, cb) {
  if (!cb && typeof options === 'function') {
    cb = options;
    options = {};
  }
  var job = {
    status: 'queued',
    name: name,
    queue: this.name,
    params: params,
    enqueuedAt: new Date()
  }
  return this.collection.insert(job);
};

