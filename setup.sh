#!/bin/bash
# Simple setup.sh for configuring Ubuntu EC2 instance
# for headless setup

# install git and heroku
sudo apt-get install -y git
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

sudo apt-get install -y curl


# provides abstratcion of used apt repos. allows management of distribution
# and ISV software sources
sudo apt-get install -y python-software-properties python g++ make

#install node
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

# install express
sudo npm install -g express

# install mongodb

# import mongodb public key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

# create apt package list
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

sudo apt-get update

# install latest stable version of mongodb
sudo apt-get install mongodb-10gen

