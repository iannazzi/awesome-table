Awesome Table
=========

AwesomeTable is used to rapidly build HTML tables to display, edit, sort, and search collections of records. 

AwesomeTable is written in pure javascript with very one dependency. Thenby is used to help with multi level sorting.

AwesomeTable is written using an MVC pattern and an Event pattern. 
The M stands for Model. The Model holds the table definition and any table data. 
The V stands for the View. The View renders the table.
The C stands for Controller.  The Controller handles user interaction. 
Event handling is also separated into files.

The table is defined by a table definition object. The table columns are defined by a column definition object. Both a record table and a collection table can be defined using a single column definition. In other words, define the columns once, then build a searchable table, a collection table, and a record table with the single column definition. This optimizes display and editing of database records.

Three different types of tables can be created:

Record Table : Used to display individual records.
Collection Table: Used to display an array of records, or a collection.
Searchable Table: A collection table with a search table.
 
 Basic stying is also included

## Installation

  `npm install @iannazzi/awesome-table`

## Usage

check out the demos folder for usage examples.
    
   https://iannazzi.github.io/awesome-table/


## Tests
  Setting up the testing tooling was a bit of a nightmare... so what I did is built the tests into the demo pages, and output success if they all pass. You can manually verify these tests by going to the individual pages in the demos folder and checking the test status at the bottom.
  
  I use nightwatch to run automated testing, however all this is doing is verifying the tests pass in the demo pages. To make it work you need selenium and the browser drivers for the browser you want to test. Checkout the documentation at nightwatch.io. 
  
  `npm test`

## Contributing

Feel free to contribute!