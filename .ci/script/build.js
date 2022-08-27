const { Client } = require('ssh2');
const { promisifySSH } = require('../utils/promisifySSH');
const ssh = new Client();

const exec = promisifySSH(ssh);

// ------------------------------- //
ssh.on('ready', async () => {
  console.log('------- build --------');

  // install node dependency
  await exec('cd /github/server && yarn install --frozen-lockfile --force --silent --non-interactive');

  // build
  await exec('cd /github/server && npm run build');

  ssh.end()
}).connect({
  port: 22,
  host: process.env.SSH_HOST,
  username: process.env.SSH_USER,
  privateKey: process.env.SSH_KEY
});