console.log('Main')

/* 
console.log(process.env.NODE_ENV)
console.log(process.env.NODE_PORT) 
*/

/* const args = process.argv.slice(2).reduce( (config, entry ) => {
    const [key,value] = entry.split('=');
    // if(value) return {...config, [key]:value} // Créer un objet intermédiaire n'est pas optimal
    if(value) config[key]=value;
    return config;
}, {}); */

/* 
// Plus rapid que le reduce
let args = {}
const entries = process.argv.slice(2);
for (const item of  entries ) {
    const [key,value] = item.split('=');
    if(value) args[key]= value;
}
 */
//console.log(args)


// Tous les objets javascript sont extensibles
/* class Config extends Array{
    constructor( processArgs = [] ){
        if(!Array.isArray(processArgs)) throw 'Array Required'
        super(...processArgs) // spread 
    }
    toObject(){
        return this.reduce( (config, entry ) => {
            const [key,value] = entry.split('=');
            // if(value) return {...config, [key]:value} // Créer un objet intermédiaire n'est pas optimal
            if(value) config[key]=value;
            return config;
        },{})
    }
}

const args = (new Config(process.argv)).toObject();
console.log(args) */

require('colors');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const config = yargs(hideBin(process.argv))


if (!config.argv.port){

config
  .usage('Usage: $0 <command> [options]'.cyan.bold)
  .command('⚙️  serve [port]'.bold, 'start the server'.magenta, (yargs) => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5050
      })
  }, (argv) => {
    if (argv.port) console.info(`start server on :${argv.port}`)
        console.log('PORT NUMBER'.green, argv.port)
  })
  .demandCommand(1, 'You need a port number use: serve or --port'.blue.bold )
  .parse()

}