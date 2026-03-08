require('dotenv').config();

const base = require('./app.json');
const githubPagesBase = process.env.GITHUB_PAGES_BASE || '';

module.exports = {
  expo: {
    ...base.expo,
    ...(githubPagesBase && {
      experiments: {
        basePath: githubPagesBase,
        assetPrefix: githubPagesBase.endsWith('/') ? githubPagesBase : `${githubPagesBase}/`,
      },
    }),
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3002',
    },
  },
};
