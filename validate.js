// To be changed to include Regex for validation.
const color = require('colors');

module.exports = function (URL){
    if(URL === null){
        console.log(`Invalid URL`.bold.red);
        process.exit(0);
    }
    if(!URL.includes('https://')){
        console.log('Invalid URL/Not a secure URL'.bold.red);
        process.exit(0);
    }
    if(URL.length > 90){
        console.log('URL Not Supported'.bold.red);
        process.exit(0);
    }
    console.log('URL validation Complete.'.bold.green);
}
