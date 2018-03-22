const puppeteer = require('puppeteer');
const { expect } = require('chai');
global.$ = require('jquery');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

global.host = 'http://localhost:8081/';

global.delay = function (time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

// puppeteer options
const opts = {
    headless: true,
    slowMo: 100,
    timeout: 10000
};

// expose variables
before (async function () {
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after (function () {
    browser.close();
    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});