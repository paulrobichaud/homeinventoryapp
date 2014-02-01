#!/bin/bash
# Simple setup.sh for configuring Ubuntu EC2 instance
# for headless setup

# install git and heroku
sudo apt-get install -y git
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

sudo apt-get install -y curl
