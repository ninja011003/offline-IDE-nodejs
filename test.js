var request = require('request');

var program = {
    script : "",
    language: "",
    versionIndex: "0",
    clientId: "e8ae95bec763073745a6fabcd2a9cbfe",
    clientSecret:"fbf03dfcabb770dddcc52694b49665abfb78ed0d590d3b61976b1021758a7d4b"
};
request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
})