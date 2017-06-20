/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsBanner:'TmBox v<%=pkg.version%>\n *(C) <%=pkg.author%> <%= grunt.template.today("yyyy") %>\n *<%=pkg.homepage%>',
        dst: 'dist',
        bin: 'bin',
        jsfilename: 'TmBox.js',
        siteroot: 'docs',
        clean: {
            dist: {
                src: ['<%= dst %>/*']
            },
            docs: {
                src: ['<%=siteroot%>/*']
            }
        },concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n'
            },
            jsmain: {
                src: [
                    'src/js/tmb-config.js',  //default TmBox configuration
                    'src/js/tmb-base.js',    //TmBox base class
                    'src/js/tmb-alert.js',   //Alert class
                    'src/js/tmb-confirm.js', //Confirm class 
                    'src/js/tmb-prompt.js',  //Prompt class
                ],
                dest: '<%= dst %>/js/<%= jsfilename %>',
                options: {
                    banner: '/*! <%=jsBanner%> */\n;(function (window,document) {\n\t"use strict;"\n',
                    footer: '\n})(window,document);'
                }
            },
            jsexamples: {
                src: [
                    'src/js/examples.js'
                ],
                dest: '<%= dst %>/examples/TmBox-examples.js'
            },
            html: {
                src: [
                    'src/html/header.html',
                    'src/html/examples.html',
                    'src/html/footer.html'
                ],
                dest: '<%=dst%>/examples/index.html'
            }
        },
        copy: {
            js: {
                expand: true,
                cwd: '<%= dst %>',
                src: 'js/<%= jsfilename %>',
                dest: '<%= siteroot %>/'
            },
            css: {
                expand: true,
                cwd: '<%= dst %>',
                src: 'css/**',
                dest: '<%= siteroot %>/',
            },
            examples: {
                files: [
                    {expand: true, cwd: '<%= dst %>/examples', src: 'index.html', dest: '<%= siteroot %>'},
                    {expand: true, cwd: '<%= dst %>/examples', src: 'TmBox-examples.js', dest: '<%= siteroot %>/js'}
                ]
            }
        },
        sass: {
            main: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= dst %>/css/TmBox.css': 'src/scss/TmBox.scss'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.registerTask('build', ['concat', 'sass', 'copy']);
};
