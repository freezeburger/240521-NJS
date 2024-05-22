
const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

/**
 * Initialisation
 */
const FILE_PATH = path.resolve( __dirname, './data/info');

/**
 * Implementation
 */


/**
 * Lecture synchrone de fichier
 * @returns {string} The file content
 * 
 * @example
 * 
 * const data = getDataSync()
 */
function getDataSync(){
    return fs.readFileSync(FILE_PATH).toString();
}

// console.log(getDataSync())

/**
 * Callback API
 * @param {function} callback 
 * @returns {void}
 * 
 * @example
 * 
 * getDataCallback( data => console.log(data))
 */
function getDataCallback(callback){

    if(typeof callback !== 'function') throw 'Callback must be a function'

    const handler = (err,data) => {
        if(err) throw err;
        callback(data.toString());
    }

    fs.readFile(FILE_PATH, handler);
}

// getDataCallback(console.log)

/**
 * Promise API
 * @returns {Promise<string>} Promise of file content
 * 
* @example
 * 
 * getDataPromise().then( data => console.log(data))
 */
function getDataPromise(){
    return fsPromise.readFile(FILE_PATH).then( data => data.toString() )
}



/*
async function getDataPromise(){
    const data = await fsPromise.readFile(FILE_PATH)
    return data.toString();
} 
*/


// getDataPromise().then(console.log)

/**
 * Event API
 * @returns {EventEmitter<string>} "complete" event for file content
 * 
 * @example
 * 
 * getDataStreamEvent().on('complete', console.log)
 */
function getDataStreamEvent(){

    const stream = fs.createReadStream(FILE_PATH);

    let data = '';
    stream.on('data', chunk => data += chunk.toString() );
    stream.on('end', () => stream.emit('complete', data.toString()) )

    return stream;
}

// getDataStreamEvent().on('complete', console.log)

/**
 * const getDataSync = () => {}
 * 
 * const getDataCallback = () => {}
 * 
 * const getDataPromise = () => {}
 * 
 * const getDataStreamEvent = () => {}
 */

/* 
* Un module JavaScript est un fichier chargé en tant que module.
* Il possede un "scope" propre
* Il possed un mécanisme d'import/export
*/

// console.log(module)

module.exports = {
    getDataSync,
    getDataCallback,
    getDataPromise,
    getDataStreamEvent
}