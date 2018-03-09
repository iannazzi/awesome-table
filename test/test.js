'use strict';

var expect = require('chai').expect;
import {AwesomeTable} from '../src/table/AwesomeTable';

describe('AwesomeTable....', function() {
    it('should return hello', function() {
       let table = new AwesomeTable({});
        expect(table.hello()).to.equal('hello');
    });
});