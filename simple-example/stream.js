var hyperstream = require('hyperstream')
var hyperglue = require('hyperglue')
var through = require('through')
var fs = require('fs');
var html = fs.readFileSync('foobar.html')

var x = through(function write(data) {
this.queue(data) //data *must* not be null
},
function end () { //optional
this.queue(null)
})
var hs = hyperstream({
    'span#foo' : x
})
var rs = fs.createReadStream('foobar.html');
rs.pipe(hs).pipe(process.stdout);
var quote = "Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree.".split(' ')
var count = 0;
var _id = setInterval(function() {
    x.write(quote[count] + " ")
    count++;
    if (count > quote.length-1) {
        clearInterval(_id)
        x.end()
    }
},350)
