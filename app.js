require('dotenv').config();

// const query = require('./query');
const { url } = require('inspector');
const puppeteer = require('puppeteer');
const Data = require('./config');
const prompt = require('prompt-sync')({sigint: true});

//Command Line Highlighting
const color = require('colors');

const validator = require('./validate.js');
// IIFE For scrapping.
(async ()=>{

    const movieURL = prompt('Enter URL : '.bold.green);
    // Input validation.
    validator(movieURL);
 
    console.log(`Processing request on URI ${movieURL}.....`.bold.cyan);
    
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    // ======= Discarded Change ======= 
    // const readline = require('readline').createInterface({
    // input: process.stdin,
    // output: process.stdout
    // });
 
    // readline.question('Enter URL : ', input => {
    //     console.log(`Processing the input URL "${input}" ......`);
    //     movieURL = input;
    //     readline.close();
    // });
    await page.waitForTimeout(500);
    const start = Date.now();
    console.log("Processing...".bold.cyan);
    console.table(Data);
try{
    await page.goto(movieURL, {waitUntil : 'networkidle2'});
    let scrappedData = await page.evaluate(()=>{
       
        // =====================================================================
        let Title = document.querySelector('div[class="title_wrapper"]>h1').innerText;
        let Rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
        let ReviewCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
        let SubInfo = document.querySelector('div[class="subtext"]').innerText;
        let Duration = document.querySelector('time').innerText || 'NOT AVAILABLE';
        let DirectedBy = document.querySelector('div[class="credit_summary_item"]').innerText;
        let Description = document.querySelector('div[class="ipc-html-content ipc-html-content--base"]').innerText;
        let CreditSummary = document.querySelectorAll('div[class="credit_summary_item"]');
        

        return {
            Title,
            Duration,
            SubInfo,
            Rating,
            ReviewCount,
            DirectedBy,
            CreditSummary,
            Description
        }
    });

    let latency = Date.now() - start;
    const Exit = {
        EntryPoint : movieURL,
        NetworkLatency_ms : Math.floor(latency),
        LOG : 'SUCCESS',
        ExitStatus : 0
    }
    console.table(Exit);
    console.log("\n###################################### OUTPUT ##############################################".bold.rainbow);
    console.table(scrappedData);
    

  
    
    await browser.close();
}catch(error){
    console.warn(`######### Something Went Wrong while processing the request:/#########`.bold.red +`\nPress CRTL + C to quit.`.bold.cyan);
    let check = prompt('Enter Check to Log the Error : '.bold.cyan);
    if(check === 'Check' || check === 'check'){
        console.error(error);
    }
    // Extra : 
    let lat = Date.now() - start;
    const Exit = {
        EntryPoint : movieURL,
        TotalExecutionTime_ms : lat,
        LOG : 'PROCESS FAILED',
        ExitStatus : 1
    }
    console.table(Exit);
    process.exit(0);
}
})();