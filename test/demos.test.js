module.exports = {
    'PurchaseOrder.html test - tests are actually ran on the page, nightwatch just confirms values' : function (browser) {
        browser
            .url('http://localhost:8081/demos/PurchaseOrder.html')
            .waitForElementVisible('#tdv', 100)
            .assert.containsText("#test1", "All Tests Passed")
            .url('http://localhost:8081/demos/RecordTable.html')
            .waitForElementVisible('#tdv', 100)
            .assert.containsText("#test1", "All Tests Passed")
            .url('http://localhost:8081/demos/SearchableTable.html')
            .waitForElementVisible('#tdv', 100)
            .assert.containsText("#test1", "All Tests Passed")
            .url('http://localhost:8081/demos/Sort.html')
            .waitForElementVisible('#tdv', 100)
            .assert.containsText("#test1", "All Tests Passed")
            .url('http://localhost:8081/demos/OneColumnDefinitionMultipleTables.html')
            .waitForElementVisible('#tdv', 100)
            .assert.containsText("#test1", "All Tests Passed")
            .url('http://localhost:8081/demos/NewRecord.html')
            .waitForElementVisible('#tdv', 100)
            .assert.containsText("#test1", "All Tests Passed")
            .end();
    }
};