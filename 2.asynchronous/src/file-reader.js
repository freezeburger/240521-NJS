
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

function getDataSync(){
    return fs.readFileSync(FILE_PATH).toString();
}

// console.log(getDataSync())

function getDataCallback(callback){

    if(typeof callback !== 'function') throw 'Callback must be a function'

    const handler = (err,data) => {
        if(err) throw err;
        callback(data.toString());
    }

    fs.readFile(FILE_PATH, handler);
}

// getDataCallback(console.log)


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