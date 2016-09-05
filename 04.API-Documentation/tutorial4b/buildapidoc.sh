#!/bin/bash
# Program: buildapidoc.sh
# Purpose: generate API doc based on API annotation
# Author:  Ray Lai
# Updated: Aug 8, 2016
# License: MIT
# Dependency: need to install 'apidoc' using sudo root privilege first, e.g. npm install apidoc -g
#

echo "...please use installapi.sh install apidoc with sudo access rights first"

echo "Building REST API documentation for Quindar platform"
if [ -d "api" ]; then
   echo "...cleaning up /api subfolder"
   rm -fr api
else
   echo "...creating /api subfolder"
   mkdir api
fi
echo "...generating API documentation for *.js"
apidoc -o api -f ".*\\.js$" -i app/scripts
echo "...complete"

