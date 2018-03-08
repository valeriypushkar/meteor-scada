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
  api.use('tmeasday:check-npm-versions@0.3.2');

  // JS
  api.use('ecmascript@0.10.5');
  api.imply('ecmascript@0.10.5');
  api.use('es5-shim@4.7.3');
  api.imply('es5-shim@4.7.3');
  api.imply('standard-minifier-js@2.3.2');

  // Data management
  api.use('ddp-rate-limiter@1.0.7');

  // Accounts
  api.use('accounts-password@1.5.1');
  api.use('alanning:roles@1.2.16');

  // CSS
  api.imply('seba:minifiers-autoprefixer@1.0.1');

  // Html and CSS files
  api.addFiles('resources/main.html', 'client');
  api.addFiles('resources/main.css', 'client');

  // Images
  api.addAssets([
    'resources/images/favicon.ico',
    'resources/images/logo.png'
  ], 'client');

  // JS code
  api.mainModule('meteor-scada-client.js', 'client');
  api.mainModule('meteor-scada-server.js', 'server');
  api.export('MeteorScada');
});

Package.onTest(function(api) {
  // Do not use meteor-scada itself.
  // It's more an application than a package so needs to be tested similary.
  api.use('ecmascript@0.10.5');
  api.use('meteortesting:mocha');
  api.mainModule('meteor-scada-client.test.js', 'client');
  api.mainModule('meteor-scada-server.test.js', 'server');
});
