Package.describe({
  name: 'meteor-scada',
  version: '0.0.1',
  summary: 'Meteor package for building SCADA systems',
  git: 'https://github.com/alexshn/meteor-scada',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.6.1");

  // Base packages
  api.use('meteor-base@1.3.0');
  api.imply('meteor-base@1.3.0');
  api.use('mongo@1.4.4');
  api.use('tracker@1.1.3');
  api.use('static-html@1.2.2');

  // JS
  api.use('ecmascript@0.10.5');
  api.imply('ecmascript@0.10.5');
  api.use('es5-shim@4.7.3');
  api.imply('es5-shim@4.7.3');
  api.use('standard-minifier-js@2.3.2');
  api.imply('standard-minifier-js@2.3.2');

  // Data management
  api.use('ddp-rate-limiter@1.0.7');

  // Accounts
  api.use('accounts-password@1.5.1');
  api.use('alanning:roles@1.2.16');

  // CSS
  api.use('fourseven:scss@4.5.4');
  api.imply('fourseven:scss@4.5.4');
  api.imply('seba:minifiers-autoprefixer@1.0.1');

  // Html
  api.addFiles('resources/main.html', 'client');

  // Images
  api.addAssets([
    'resources/images/favicon.ico',
  ], 'client');

  // JS code
  api.mainModule('meteor-scada-client.js', 'client');
  api.mainModule('meteor-scada-server.js', 'server');
  api.export('MeteorScada');
});

Package.onTest(function(api) {
});
