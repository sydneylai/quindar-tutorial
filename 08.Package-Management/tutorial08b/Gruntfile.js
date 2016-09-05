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
                    'app/styles/styles.css',
                    'app/styles/colors.css',
                    'app/styles/core.css',
                    'app/styles/components.css',
                    'app/styles/angular-gridster.min.css',
                    'app/styles/gridsterDashboard.css',
                    'app/styles/quindarWidgets.css',
                    'app/styles/widgets.css',
                    'app/styles/icons/fontawesome/styles.min.css',
                    'app/styles/icons/icomoon/styles.css'
                ],
                dest: 'localFile/scripts/local.css'
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