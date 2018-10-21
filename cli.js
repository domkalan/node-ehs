const yargs = require('yargs');
require('./lib/fs-loader')({
    dir:yargs.argv.dir || process.env['ehs_dir'] || process.cwd(),
    
    fsScan: yargs.argv.fsScan || false,

    port:yargs.argv.port || process.env.port,
    host:yargs.argv.host || process.env.host
});