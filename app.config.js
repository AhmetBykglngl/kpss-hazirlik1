require('dotenv').config();

const base = require('./app.json');
module.exports = {
  expo: {
    ...base.expo,
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3002',
    },
  },
};
