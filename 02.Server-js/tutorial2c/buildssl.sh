#!/bin/bash
# Program: buildssl.sh
# Purpose: to generate self-signed SSL cert to run a secure web server
# Author:  Ray Lai
# Updated: Aug 8, 2016
# Example: ./buildssl.sh, and then answer the questions interactively. it will write the *.pem files (SSL certs)
#          under /keys
#
echo "Building self-signed SSL certificate for NodeJS with HTTPS"
echo
echo "Step 1 - set up directory ./keys"
if [ -d "keys" ]; then
   cd keys
else 
   mkdir keys
   cd keys
fi
echo "Step 2 - create private key"
openssl genrsa -out quindar-key.pem 2048
echo "Step 3 - create CSR certificate signing request"
openssl req -new -key quindar-key.pem -out server.csr
echo "Step 4 - sign the CSR"
openssl rsa -in quindar-key.pem -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out quindar-cert.pem
