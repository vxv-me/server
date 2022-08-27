
const promisifySSH = (ssh) => {
  return (command) => new Promise((resolve, reject)=>{
    ssh.exec(command, (execErr, stream) => {
      if (execErr) throw execErr;
      let stdout = '';
      let stderr = '';

      stream
      .on('close', (code, signal) => {
        if (code === 0) {
          resolve({stdout, stderr, code});
        } else {
          reject({stdout, stderr, code});
        }
      })
      .on('data', (data) => {
        stdout += data.toString();
      })
      .stderr.on('data', (data) => {
        stderr = data.toString();
      });
    });
  });
}

module.exports = {
  promisifySSH
}