
if (Meteor.isClient) {
  Tinytest.add('Joby does not exists in client side', function (test) {
    test.equal(typeof Joby, 'undefined');
  });
  return;
}

var queue = new Joby.Queue('queue');

Tinytest.add('queue has a name', function (test) {
  test.equal(queue.name, 'queue');
});

Tinytest.add('queue has a collection', function(test) {
  test.equal(queue.collection, Joby.Jobs);
});

Tinytest.add('queue can enqueue a task', function(test) {
  jobId = queue.enqueue('stuff', { foo: 'bar' });
  job = Joby.Jobs.findOne(jobId);
  test.equal(job.task, 'stuff');
  test.equal(job.status, 'queued');
});

Tinytest.add('queue can cancel a job', function(test) {
  jobId = queue.enqueue('stuff', { foo: 'bar' });
  job = Joby.Jobs.findOne(jobId);
  job = queue.cancel(job);
  test.equal(job.status, 'cancelled');
});

