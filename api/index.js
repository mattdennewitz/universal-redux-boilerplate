var express = require('express');
var app = express();

var posts = [
    {
        id: 1,
        title: "First post",
        content: "..."
    },
    {
        id: 2,
        title: "Second post",
        content: "..."
    },
    {
        id: 3,
        title: "Third post",
        content: "..."
    }
];

app.get('/api', function(r, w) {
    /* pretend we've fetched these from a remote resource */
    var resp = JSON.stringify({
        posts: posts
    });

    w.set('Access-Control-Allow-Origin', '*');
    w.end(resp);
})

app.listen(3100, function() {
    console.log('API app listening on :3100')
})
