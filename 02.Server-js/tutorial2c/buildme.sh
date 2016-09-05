#!/bin/bash
# Program: buildme.sh
# Purpose: to install NodeJS depencencies
# Author:  Masaki Kakoi
# Updated: Jun 28, 2016
#
echo "Building NodeJS dependencies for Quindar web server over SSL"
echo "...installing npm modules from package.json"
npm install
echo "...complete"

echo "...now please run '. ./setNewPort.sh' to change port to 4000"
