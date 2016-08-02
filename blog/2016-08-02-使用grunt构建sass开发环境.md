---
layout: post
title: 使用grunt构建sass开发环境
categories: 前端开发
date: 2016-08-02 22:00
published: true
---


### 1. 为什么用grunt?

相信现在如果提起`grunt`的话很多人都会觉得，"你真的很out，现在前端领域，谁不用`webpack`"。

那我只能回答，我目前就喜欢用这`grunt`，我喜欢自己写些简单的构建任务。上`webpack`是时代所驱使，但是，并没有任何一条法律规定上`webpack`就不能用`grunt`啊。而且目前发现`bootstrap`最新版本也还在用着`grunt`。所以，我也是干脆跟着`bootstrap`的脚步走着先吧。

### 2. 为什么是sass?

前端领域很多人都知道，为了让css更加容易维护，我们可以用`less` 或者 `sass`两种语言，来编写一些更加`生动`，`简洁`，`可维护性高`的"css"(应该说类css)代码。我们可以定义变量，方法等等使得我们的样式文件得以模块化，最后再把相关的文件编译成一个单独的css文件发布到生产环境中。

为何我选`sass`, 因为

1. `sass`编译器是ruby写的。(有偏见)。
2. 最新版本的bootstrap, 当然我说的是bootstrap4，默认的源码发布的就是`sass`版本的源码，我最近也在看它的源代码。而且首页并没有发现`less`的踪影，所以毫无疑问地选择了`sass`。

### 3. 这篇文章要解决什么问题?
写这篇文章，主要目的是我个人学习的时候需要:

当我编写一个`sass`或者`scss`(其实两者是差不多的，都是用`sass`编译)的文件的时候，其实浏览器并不能直接解析这些代码。所以我们必须在使用我们修改的样式之前通过`sass`编译器来对相应的文件进行预编译。这听起来是一个比较繁琐的过程。平时改css文件，然后直接刷新页面就可以了。现在还要手动编译，听起来就是回到了当年写c的日子。`gcc`编译后，然后再`./a.out`运行编译好的代码。不过前端工程化，自动化的今天，我们还是秉持着`DRY`的原则，让代码来实现这些繁琐的步骤，我们只需要安心的修改`sass`相关的样式文件，让代码来自动生成最新的`css`文件。



### 4. 解决思路
先来看看我的目录结构:


``` unix
component
├── Gruntfile.js
├── dist
├── index.html
├── js
├── node_modules
├── package.json
└── scss
```

上面是我的目录下的结构，我的主要目的是让`grunt`可以自动监测 `scss`目录里面的文件修改，如果修改了，就自动编译目录里面的文件。把生成的css文件放到`dist/css`目录里面。然后我的页面`index.html`只要直接引用用`dist/css`里的指定文件就可以了，如下:

``` html
<link rel="stylesheet" href="dist/css/custom.css" />
```

再看看`scss`目录里面的东西。

``` unix
scss
├── _buttons.scss
├── _common.scss
├── _variables.scss
└── custom.scss
```

这里可以看到除了`custom.scss`其他都是以`_`开头的，表示其他都是充当模块，让其他文件来导入。编译后只会生成`custom.css`, `custom.css.map`这样的文件。我们只要使用第一个就行了。


脚本里我主要分3步:

1. 监测`scss/`目录里的`*.scss`文件是否修改。
2. 如果修改了则删除原来旧的`dist/`目录。
3. 重新编译，生成新的 `dist/`目录，以及目录下的文件。

因此，这里会用到以下三个`grunt`模块.

1. `grunt-contrib-clean` 用来删除目录。
2. `grunt-contrib-sass` 用来编译`sass`相关的文件。
3. `grunt-contrib-watch` 用来监测某目录下的文件是否发生改变。

我们可以通过`npm install XXXXX  --save-dev`来安装上面文件。

下面是我最后写的`Gruntfile.js`的源代码。


``` javascript
module.exports = function(grunt) {
    // 使用严格模式
    'use strict';
	
	// 这里定义我们需要的任务
	grunt.initConfig({

	// 设置任务，删除文件夹
	clean: {
	    dist: 'dist'
	},


	// 通过sass编译成css文件
	sass: {
	    dist: {
			files: [{
				expand: true,
				cwd: 'scss',
				src: ['*.scss'],
				dest: 'dist/css',
				ext: '.css'
			}]
	    }
	},

	// 检测改变，自动跑sass任务
	watch: {
	    scripts: {
			files: ['scss/*.scss'],
			tasks: ['sass'],
			options: {
				spawn: false
			}
	    }
	}
    });

	// 一定要引用着3个模块
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 把需要跑的任务注册到default这里每次运行grunt的时候先删除dist，然后重新编译，最后监测文件夹的情况。
    grunt.registerTask('default', ['clean:dist', 'sass:dist', 'watch:scripts']);
};

```

代码完成后，只需要开发的时候切换到`Gruntfile.js`文件所在的目录下运行:

```
grunt
```

这条命令会根据`Gruntfile.js`文件开启一个服务，除非我们手动去关闭，否则它会一直监测着`scss/`目录的状态。
我们便可以放心地修改`scss`目录里的`sass`相关的文件。然后直接在`index.html`页面上看到效果了。

相关代码已经托管到 [GitHub](https://github.com/lanzhiheng/Monkey/tree/master/component)上,欢迎吐槽。

今天就到这吧。

# Happy Coding !! ^_^
