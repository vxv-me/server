const { Client } = require('ssh2');
const { promisifySSH } = require('../utils/promisifySSH');
const ssh = new Client();

const exec = promisifySSH(ssh);

// ------------------------------- //
ssh.on('ready', async () => {
  // clear server dir
  await exec('rm -rf /github/server/');

  // clone repository;
  await exec('git clone --progress https://github.com/vxv-me/server.git /github/server/');

  // check file exist;
  await exec('ls -a /github/server/');

  ssh.end()
}).connect({
  host: process.env.SSH_HOST,
  port: 22,
  username: process.env.SSH_USER,
  privateKey: process.env.SSH_KEY
});