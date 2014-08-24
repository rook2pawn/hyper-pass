hyper-pass = pass-through ecstatic + hyperstream
------------------------------------------------

pass-through ecstatic is a feature branch of ecstatic that allows ecstatic to accept a map from a file path to a function that returns a stream. The end result is that the file will pass-through the stream you specify.

e.g. 

    {
        'index.html' : function () { 
            return hyperstream({}) 
        },
        'foo/index.html' : function() { 
            return through(function write(data) {
                this.emit('data', data)
            },
            function end () { //optional
                this.emit('end')
            }) 
        }
    }

Note that the file names you list in the map are assumed to be relative to the directory that is specificed in ecstatic.

i.e. 

    var ecstatic = require('ecstatic')('/some/dir',opts)
