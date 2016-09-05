// Program: Gruntfile.js
// Purpose: Grunt examples to concatenate JS/CSS
// Author:  Shalini Negi
// Updated: Aug 08, 2016
// License: MIT license
//

module.exports = function(grunt) {

    grunt.initConfig({
        urlconcat: {
            all: {
                src: [
                    'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js',
                    'https://www.google.com/jsapi',
                    'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js',
                    'http://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min.js',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/localFile/bootstrap.min.css',
                    'https://fonts.googleapis.com/localFile?family=Open+Sans'
                ],
                dest: 'js/scripts/platform.js'
            }
        }
    });

    var fs = require('fs');
    var path = require('path');
    var request = require('request');
    var async = require('async');

    grunt.registerMultiTask('urlconcat', function() {
        var done = this.async();
        var options = this.options({
            separator: '\n'
        });
        async.eachSeries(this.files, function(file, next) {
            var out = '';
            async.eachSeries(file.orig.src, function(url, nextUrl) {
                if (grunt.file.exists(url)) {
                    // If a file
                    grunt.log.writeln('Concatenating ' + url);
                    out += grunt.file.read(url) + options.separator;
                    nextUrl();
                } else {
                    // Otherwise assume a url
                    grunt.log.writeln('Downloading ' + url);
                    request(url).on('data', function(data) {
                        out += data.toString();
                    }).on('end', function() {
                        out += options.separator;
                        nextUrl();
                    });
                }
            }, function() {
                grunt.file.write(file.dest, out);
                grunt.log.ok('Wrote ' + file.dest + '.');
                next();
            });
        }, done);
    });

    grunt.registerTask('default', ['urlconcat']);

};