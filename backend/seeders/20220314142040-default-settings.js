'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('../src/utils/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const defaultEmail = 'contato@luiztools.com.br';
    const settingsId = await queryInterface.rawSelect('Settings', { where: {email: defaultEmail } }, ['id']);
    
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [{
        email: 'contato@luiztools.com.br',
        password: bcrypt.hashSync('123456'),
        apiUrl: 'https://testnet.binance.vision/api/',
        streamUrl: 'wss://testnet.binance.vision/ws/',
        accessKey: process.env.ACCESS_KEY,
        secretKey: crypto.encrypt(process.env.SECRET_KEY),
        createdAt: new Date(),
        updatedAt: new Date()

      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', nulls, {});
  }
};
