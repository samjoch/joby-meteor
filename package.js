Package.describe({
  name: 'samjoch:joby-meteor',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Connect Joby queue with Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/samjoch/joby-meteor.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('joby-meteor.js');
  api.use('mongo', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('samjoch:joby-meteor');
  api.addFiles('joby-meteor-tests.js');
});

