const exec = require('child_process').exec;
var yourscript = exec('sh eslint.sh backend/services/dist',
        (error, stdout, stderr) => {
            console.log(stdout); //json output
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });