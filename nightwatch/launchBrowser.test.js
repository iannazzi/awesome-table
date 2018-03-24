module.exports = {
    'Launch Browser Test' : function (browser) {
        browser
            .url(browser.launchUrl)
            // ...
            .end();
    }
};