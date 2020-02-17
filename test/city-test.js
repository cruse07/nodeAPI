var expect  = require('chai').expect;
var request = require('request');

it('city post request', function(done) {
    request('http://localhost:3000/city' , function(error, response, body) {
        expect(body.Name).to.equal('Noida');
        done();
    });
});