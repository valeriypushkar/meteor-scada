import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '>=16.0.0',
  'react-dom': '>=16.0.0',
  'prop-types': '>=15.5.7', // previous version has known issue
  'react-router-dom': '>=4.0.0',
  'material-ui': '1.0.0-beta.35' // update when released
}, 'meteor-scada');
