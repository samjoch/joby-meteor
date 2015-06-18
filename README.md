Joby Meteor
-----------

Joby Meteor simply add a new job in the jobs collection and let [Joby](http://github.com/samjoch/joby) do the rest.

**Install**

```bash
meteor add samjoch:joby-meteor
```

**Usage**

```javascript
var queue = new Joby.Queue('queue-name');
queue.enqueue('stuff', { foo: 'bar' })
```

for `worker` see [Joby](http://github.com/samjoch/joby).