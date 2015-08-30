var fs = require("fs"),
    im = require("imagemagick"),
    PNG = require("node-png").PNG;
var bufferArr = [], len = 0, data;

try{
    fs.createReadStream("IdentifyCode.js")
        .on("data", function(chunk){
            var ab = new ArrayBuffer(chunk.length);
            for (var i = 0; i < chunk.length; ++i) {
                bufferArr.push(chunk[i]);
            }
        })
        .on("end", function(){
            // data = Buffer.concat(bufferArr, len).toString();
            len = bufferArr.length;
            console.log(len);
            console.log(bufferArr);
            // console.log(data.length);length = bufferArr.length;
            var width = Math.floor(Math.sqrt(len))+1,
                height = width;
            im.convert(["-size", width+"x"+height, "xc:#000000", "out.png"],function(err,stdout){
                if (err) 
                    throw err;
                console.log('width:', width);
                
                fs.createReadStream('out.png')
                    .pipe(new PNG({
                        filterType: 4
                    }))
                    .on('parsed', function() {
                        for(var y = 0;y < this.height ; y++){
                            for(var x = 0;x < this.width ; x++){
                                var idx = (this.width * y + x) << 2;
                                // var bai = (this.width * y + x) * 3;
                                // invert color
                                this.data[idx] = bufferArr[idx];
                                this.data[idx+1] = bufferArr[idx+1];
                                this.data[idx+2] = bufferArr[idx+2];
                                // and reduce opacity
                                this.data[idx+3] = bufferArr[idx+3];
                            }
                        }
                        this.pack().pipe(fs.createWriteStream("output.png"));
                    });
            });
        });
}catch(e){
    console.log(e);
}
