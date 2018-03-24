module.exports = {
    'Demo test Google' : function (browser) {
        browser
            .url('http://localhost:8081/demos/globalDemo/sizes.html')
            .waitForElementVisible('body', 1000)
            // .assert.containsText('#adjustableColumn_r0c3', '1')
            //.expect.element('#adjustableColumn_r0c3').to.have.value.that.equals('1')
            .assert.value("#adjustableColumn_r0c3", "1")
            .setValue('#adjustableColumn_r0c3', '3')
            .assert.value("#adjustableColumn_r0c3", "3")
            .click('#adjustableColumn_add_row')
            .assert.value("#adjustableColumn_r1c3", "1")
            .pause(1000)
            //.assert.containsText('#adjustableColumn_r1c3', '1')
            .end();
        console.log(AwesomeTable);

    }
};