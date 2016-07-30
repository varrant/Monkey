module.exports = function(grunt) {
    // 使用严格模式
    'use strict';
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
    // Default task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['clean:dist', 'sass:dist', 'watch:scripts']);
};
