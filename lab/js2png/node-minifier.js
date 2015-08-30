var minifier = require("node-minifier");
minifier.optimage('output.png', 'output2.png', function(err, data){
    console.log(data.saved);
});