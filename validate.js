// To be changed to include Regex for validation.

module.exports = function (URL){
    if(URL === null){
        console.log(`Invalid URL`);
        process.exit(0);
    }
    if(!URL.includes('https://')){
        console.log('Invalid URL/Not a secure URL');
        process.exit(0);
    }
    if(URL.length > 90){
        console.log('URL Not Supported');
        process.exit(0);
    }
    console.log('URL validation Complete.');
}
