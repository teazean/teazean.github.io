/**
 * Created by zhanglei55 on 15/8/25.
 */
(function($){
    /*get an instance of Function.protype which only have the prototype.methods*/
    Function.prototype.methodSingleton = function(){
        if(this._msingleton){
            return this._msingleton;
        }
        //use a tmp constructor , it results only method object
        //avoiding this.prototype.constructor needs param to init it;
        function tmpCtr(){}
        tmpCtr.prototype = this.prototype;
        this._msingleton = new tmpCtr();
        return this._msingleton;
    }

    function css(ele , styles){
        if(!(typeof styles === "object")){
            return;
        }
        var styleText = ele.style.cssText || "";
        for(style in styles){
            if(styles.hasOwnProperty(style)){
                var index = styleText.indexOf(style);
                if(index > -1) {
                    var index2 = styleText.indexOf(";", index);
                    var sub = styleText.substr(index, index2+1);
                    styleText.replace(sub,"");
                }
                styleText += style + ":"+styles[style]+";"
            }
        }
        ele.style.cssText = styleText;
    }

    /* return a new object*/
    function combine(obj1, obj2){
        var r = {};
        for(p in obj1){
            if(obj1.hasOwnProperty(p)){
                r[p] = obj1[p];
            }
        }
        for(p in obj2){
            if(obj2.hasOwnProperty(p)){
                r[p] = obj2[p];
            }
        }
        return r;
    }

    function preventDefault(e){
        e.preventDefault();
    }

    /*abstract class*/
    var IdentifyCode;
    (function(){
        IdentifyCode = function(opt) {
            this.rate = document.documentElement.clientWidth / 320;
            this.overtime = 30000;//overtime
            this.id = opt.id;//identifyCode id come from the server
            this.options = opt.options;//per identifyCode match one $.ajaxJsonp request options
            /*eleId will be inited in the makeHTML()*/
            this.eleId = undefined;
            /*element will be inited in the makeHTML()*/
            this.element = undefined;
            /*mainPanel will be inited in the makeHTML()*/
            this.mainPanel = undefined;
            /*error will be inited in the makeHTML()*/
            this.error = undefined;
            this.state = "init";//error、init、reset
        }

        /*caculate new width/height/... according to the rate with the uinit (px);*/
        IdentifyCode.prototype.rateProp = function(val) {
            if((typeof val) === "string"){
                val = parseInt(val);
            }
            return val * this.rate + "px";
        }

        IdentifyCode.prototype.makeHTML = function() {
            this.eleId = "identifyCode_"+(new Date()).getTime();

            /*indentifyCode element*/
            var element = document.createElement("div");
            element.id = this.eleId;
            css(element, {
                display: "none",
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.8)",
                'z-index': 10004
            });
            this.element = element;
            /*indentifyCode wrapper*/
            var contentWrapper = document.createElement("div");
            css(contentWrapper,{
                position: "absolute",
                bottom: "10%",
                width: "100%"
            });
            element.appendChild(contentWrapper);

            /*indentifyCode mainPanel*/
            var panel = document.createElement("div");
            css(panel,{
                width: this.rateProp(280),
                margin: "0 auto",
                position: "relative"
            });
            contentWrapper.appendChild(panel);
            this.mainPanel = panel;
        }

        IdentifyCode.prototype.errorReset = function(data){
            switch (this.state){
                case "overtime":
                    this.errorEle.innerHTML = "验证超时，请重试！";
                    break;
                case "reset":
                    this.errorEle.innerHTML = "";
                    break;
                default :
                    this.errorEle.innerHTML = "验证出错，请重试！";
            }
            this.state = "init";
            this.errorEle.style.display = "initial";
            this.reset(data);
        }

        IdentifyCode.prototype.reset = function(data){
            this.id = data.id;
        }

        IdentifyCode.prototype.show = function() {
            this.makeHTML();
            document.body.appendChild(this.element);
            this.element.addEventListener("touchmove",preventDefault);
            this.attachEvents && this.attachEvents();
            this.element.style.display = "block";
        }

        IdentifyCode.prototype.hide = function() {
            this.element.removeEventListener("touchmove",preventDefault);
            document.body.removeChild(this.element);
        }

        /**
         *
         * @param data : a string
         */
        IdentifyCode.prototype.sendReq = function(data){
            var paramStr = "id=" + this.id + "&data="+data;
            var url = this.options.url;
            url = url.indexOf("?") ? url + "&" + paramStr : url + "?" + paramStr;
            $.ajaxJSONP(combine(this.options, {
                url: url
            }));
        }
    })();

    /*ScrollIdentifyCode 滑动解锁*/
    var ScrollIdentifyCode;
    (function(_super) {
        ScrollIdentifyCode = function(opt){
            this.pic = opt.pic;
            this.height = opt.height;//the cut area margin the topline;
            /*chartletEle refers to the pic display ,this.chartletEle will be inited in makeHTML()*/
            this.chartletEle = undefined;
            /*cut refers to the moveable area ,this.cut will be inited in makeHTML()*/
            this.cutEle = undefined;
            /*knob refers to the touchable ares, this.knob will be inited in makeHTML()*/
            this.knobEle = undefined;
            _super.call(this, opt);
        }
        ScrollIdentifyCode.prototype = _super.methodSingleton();
        ScrollIdentifyCode.prototype.constructor = _super;

        ScrollIdentifyCode.prototype.makeHTML = function() {
            _super.prototype.makeHTML.call(this);

            /*scrollIdentifyCode show group*/
            var showPanel = document.createElement("div");
            css(showPanel, {
                height: this.rateProp(210)
            });
            this.mainPanel.appendChild(showPanel)
            /*scrollIdentifyCode show background*/
            var chartletEle = document.createElement("div");
            css(chartletEle, {
                height: "100%",
                width: "100%",
                'background-size': this.rateProp(320) + " " +this.rateProp(210),
                'background-position': this.rateProp(-40) + " " + 0,
                'background-image': "url(" + this.pic + ")"
            });
            showPanel.appendChild(chartletEle);
            this.chartletEle = chartletEle;
            /*scrollIdentifyCode show cut*/
            var cutEle = document.createElement("div");
            css(cutEle, {
                position: "absolute",
                left: 0,
                top: this.rateProp(this.height/2),
                width: this.rateProp(40),
                height: this.rateProp(40),
                'background-size': this.rateProp(320) + " " +this.rateProp(210),
                'background-position': 0 + " -" + this.rateProp(this.height/2),
                'background-image': "url(" + this.pic + ")"
            });
            chartletEle.appendChild(cutEle);
            this.cutEle = cutEle;

            /*scrollIdentifyCode scroll group*/
            var scrollPanel = document.createElement("div");
            css(scrollPanel, {
                height: this.rateProp(30),
                'margin-top': this.rateProp(10),
                background: '#ddd',
                position: "relative",
                'line-height': this.rateProp(30),
                'text-align': 'center',
                'font-size': '16px',
                color: 'red'
            });
            this.mainPanel.appendChild(scrollPanel);
            /*scrollIdentifyCode scroll knob*/
            var knobEle = document.createElement("div");
            css(knobEle, {
                position: "absolute",
                left: 0,
                bottom: this.rateProp(-5),
                width: this.rateProp(40),
                height: this.rateProp(40),
                background: "#fff",
                border: "1px slid #212121",
                'border-radius': this.rateProp(40)
            });
            scrollPanel.appendChild(knobEle);
            this.knobEle = knobEle;

            /*error*/
            var errorEle = document.createElement("span");
            css(errorEle,{
                display: "none"
            });
            scrollPanel.appendChild(errorEle);
            this.errorEle = errorEle;
        }

        ScrollIdentifyCode.prototype.attachEvents = function(){
            var maxLeft, initPageX , oldLeft, points=[], begin = new Date().getTime();
            var me = this;

            function makeRequestData(t, w, points){
                var pointsStr = (function(arr){
                    var str = '';
                    for(var i = 0;i<arr.length;i++){
                        str += ","+arr[i][0]+","+arr[i][1];
                    }
                    return str
                })(points);
                return t + "," + w + pointsStr;
            }

            me.knobEle.addEventListener("touchstart",function(e){
                e.preventDefault();
                var curTime = new Date().getTime();
                //30s overtime
                if((curTime - begin) >= me.overtime){
                    points = [[0,0],[0,0]];
                    me.sendReq(makeRequestData(0,0,points));
                    me.state = "overtime";
                    return false;
                }
                begin = curTime;
                points = [];
                oldLeft = parseInt(this.style.left || 0);
                maxLeft = parseInt(me.mainPanel.clientWidth || 0) - parseInt(me.cutEle.clientWidth || 0);
                var touch = e.touches[0];
                initPageX = touch.pageX;
                points.push([touch.pageX, touch.pageY]);
                me.errorEle.style.display = "none";
            });

            me.knobEle.addEventListener("touchmove",function(e){
                e.preventDefault();
                var touch = e.touches[0],
                    gap = touch.pageX - initPageX,
                    newLeft = oldLeft + gap;
                points.push([touch.pageX,touch.pageY]);
                if(newLeft>=0){
                    if(newLeft > maxLeft) {
                        newLeft = maxLeft;
                    }
                    this.style.left = newLeft + "px";
                    me.cutEle.style.left = newLeft + "px";
                }else{
                    this.style.left = "0";
                    me.cutEle.style.left = "0";
                }
            });

            me.knobEle.addEventListener("touchend",function(e) {
                e.preventDefault();
                var end = new Date().getTime();
                me.sendReq(makeRequestData(end - begin, me.mainPanel.clientWidth, points));
                begin = end;
            });
        }

        /*reset indentifyCode*/
        ScrollIdentifyCode.prototype.reset = function(data) {
            data = ScrollIdentifyCode.convertData2Opt(data);
            _super.prototype.reset.call(this, data);
            this.pic = data.pic;
            this.height = data.height;
            css(this.chartletEle, {
                'background-image': "url(" + this.pic + ")"
            });
            css(this.cutEle, {
                top: this.rateProp(this.height/2),
                'background-position': 0 + " -" + this.rateProp(this.height/2),
                'background-image': "url(" + this.pic + ")"
            });
            css(this.knobEle, {
                left:0
            });
            css(this.cutEle, {
                left:0
            });
        }

        ScrollIdentifyCode.convertData2Opt = function(options, data) {
            if(!data) {
                data = options;
            }
            return {
                options: options,
                id: data.id,
                pic: data.pic,
                height: data.ext.height
            }
        }
    })(IdentifyCode);

    /*
     * indentifyCode factory
     * @param{type} IndentifyCode type
     * @param{options} $.ajaxJsonp(options) ->options
     * @param{data} some opts used to init IndentifyCode
     */
    IdentifyCode.factory = function(type, options, data){
        type = "" + type;
        switch (type){
            case "2":
                return new ScrollIdentifyCode(ScrollIdentifyCode.convertData2Opt(options, data));
                break;
            default:
                break;
        }
    }


    /*
     *overwrite the Zepto.ajaxJSONP method
     *if the url request need some identify strategy
     *just set:
     *   options.identify = true
     */
    var context = undefined;
    if($ && $.ajaxJSONP){
        var oldJsonp = $.ajaxJSONP;
        $.ajaxJSONP = function(options, deferred){
            if (!options.identify)
                return oldJsonp(options);

            var success = function(data){
                var errno = data.errno + "";
                if(errno !== "10001"){
                    if(context){
                        context.hide();
                    }
                    options.success && options.success.apply(window, arguments);
                }else{
                    var data = data.data;
                    if(!context) {
                        context = IdentifyCode.factory(data.type, options , data);
                        context.show();
                    }else {
                        context.errorReset(data);
                    }
                }
            }
            oldJsonp(combine(options, {
                success: success
            }), deferred);
        }
    }
})(Zepto);
//        $.ajaxJSONP()