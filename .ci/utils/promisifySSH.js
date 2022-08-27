
const promisifySSH = (ssh, log = true) => {
  return (command) => new Promise((resolve, reject)=>{
    ssh.exec(command, (execError, stream) => {
      if (execError) throw execError;

      let stdout = '';
      let stderr = '';

      stream
        .on('close', (code, signal) => {
          if (code === 0) {
            resolve({stdout, stderr, code});
          } else {
            console.error('Exit with code', code);
            reject({stdout, stderr, code});
          }
        })
        .on('data', (data) => {
          stdout += data.toString();

          if (log) {
            console.log('stdout:', data.toString());
          }
        })
        .stderr.on('data', (data) => {
          stderr = data.toString();

          if (log) {
            console.error('stderr:', data.toString());
          }
        });
    });
  });
}

module.exports = {
  promisifySSH
}