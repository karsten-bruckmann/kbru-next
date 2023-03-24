const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation({
  ...config,
  remotes: [
    [
      'battle-companion-pages-start',
      'https://battle-companion-pages-start.netlify.app',
    ],
  ],
});