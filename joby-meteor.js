
if (Meteor.isClient) {
  return;
}

var Joby = this.Joby = {};

var STATUS = {
  QUEUED: 'queued',
  CANCELLED: 'cancelled'
};

Joby.Jobs = new Mongo.Collection('jobs');

Joby.Queue = function Queue(name, options) {
  options || (options = {});
  this.name = name || 'default';
  this.collection = Joby.Jobs;
};

Joby.Queue.prototype.enqueue = function(task, params, opts) {
  opts = opts || {};
  opts.interval = opts.interval || 500;
  var initialStatus = {
    at: new Date(),
    by: opts.by || 'unknow',
    label: STATUS.QUEUED
  };
  var job = {
    createdAt: new Date(),
    updatedAt: initialStatus.at,
    scheduledAt: opts.scheduledAt || new Date(+new Date() + opts.interval),
    rule: opts.rule,
    task: task,
    queue: this.name,
    params: params,
    status: initialStatus.label,
    statuses: [initialStatus]
  }
  return this.collection.insert(job);
};

Joby.Queue.prototype.cancel = function(job, opts) {
  opts = opts || {};
  var newStatus = { label: STATUS.CANCELLED, at: new Date(), by: opts.by }
  this.collection.update({ _id: job._id }, {
    $set: { status: newStatus.label, updatedAt: newStatus.at },
    $addToSet: { statuses: newStatus }
  });
  return this.collection.findOne(job._id);
};

