---
layout: post
title: angularjs使用笔记
category: web
tags: angularjs mvvc
---

## angularjs使用笔记

### 后端MVC到前段MVVC的转变

1. 后端MVC，一般由服务器去渲染view（包括注入数据、处理页面模块引入等），返回给客户端。转换到前段MVVC后，注入数据也在前端注入，页面引入其他模块由前端处理。

> 最进看一个大型项目，采用angularjs+requirejs来构建项目，把项目按功能切分成许多模块，并且模块部署在不同的服务器上。

<img src="/images/angular/icode.png">

<!-- more -->

notes:

1. ng-view:与ngRoute对应
2. angular在第一次onload事件的时候回执行ng-app命令，如果页面使用requirejs来管理，页面里就不要存在ng-app，要在js代码中使用angular.bootstrap来手动启动。
    ><http://beletsky.net/2013/11/using-angular-dot-js-with-require-dot-js.html>
    >
    ><http://segmentfault.com/q/1010000003488733>
3. 动态创建controller
	><http://stackoverflow.com/questions/15250644/loading-an-angularjs-controller-dynamically>

	关键是:动态声明controller之后，还要注册才能用,从_invokeQueue中获取。

    	var $controller;
        var phoneViewModule = angular.module("app.phoneView", [], function($controllerProvider, $sceProvider){
            $controller = $controllerProvider;
            $sceProvider.enabled(false);
        });

        _util.registerController = function(module, $controllerProvider, controllerName, controller){
            var oldQueueLen = module._invokeQueue.length;
            module.controller(controllerName, controller);
            var queue = module._invokeQueue;
            for( var i = oldQueueLen; i<queue.length; i++){
                var call = queue[i];
                if(call[0] == '$controllerProvider') {
                    $controllerProvider[call[1]].apply($controllerProvider, call[2]);
                }
            }
        }
4. ng-bind-html，如果绑定的是angular模板，新建一个directive
    ><https://github.com/incuna/angular-bind-html-compile>
    >
    ><http://stackoverflow.com/questions/19726179/how-to-make-ng-bind-html-compile-angularjs-code>

5. ng-bind-html与contenteditable冲突。新建一个contenteditable指令.

       propsViewModule.directive("contenteditable", function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {

                    element.bind('blur change paste keyup', function() {
                        _util.safeApply(scope, function() {
                            ngModel.$setViewValue(element.html());
                        });
                    });

                    ngModel.$render = function(){
                        element.html(ngModel.$modelValue);
                    }
                }
            }
        });

        <div contenteditable="{{editable}}" ng-model="text"
        </div>

6. safeApply：经常遇到在调用$apply的时候报错，此时使用:

        _util.safeApply = function($scope, func) {
            var phase = $scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                func && (func());
            } else {
                $scope.$apply(func);
            }
        }
