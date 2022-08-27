const { Client } = require('ssh2');
const { promisifySSH } = require('../utils/promisifySSH');
const ssh = new Client();

const exec = promisifySSH(ssh);

// ------------------------------- //
ssh.on('ready', async () => {
  // restart service;
  await exec('service nodejs restart');
  ssh.end()
}).connect({
  host: process.env.SSH_HOST,
  port: 22,
  username: process.env.SSH_USER,
  privateKey: process.env.SSH_KEY
});