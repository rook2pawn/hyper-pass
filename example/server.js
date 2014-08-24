var express = require('express')
var app = express()
var http = require('http')
var hyperstream = require('hyperstream')
var path = require('path')
var val = 0;
var gen_hs = function() {
    return hyperstream({
        '#foo' : {
            _html : val 
        }
    })
}
var ecstatic = require('ecstatic')(__dirname, { 
    passthrough : {
       'index.html' : gen_hs  
    }})

var server = http.createServer(app)
console.log("server listening on 5150")
server.listen(5150)

var passit = function (req,res,next) {
    val++
    ecstatic(req,res,next)
}
app.get('/',passit)

console.log("try it!\ncurl http://localhost:5150/")
