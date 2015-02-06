# Grunt + Assemble + Zurb = &hearts;  

This is a fork of [@LeeMunroe's grunt email design](https://github.com/leemunroe/grunt-email-design) with a couple changes that I think other people might benefit from:

1. Two Zurb Ink templates (one-column, and two-column) with a few basic improvements&mdash;mostly concerning how pictures that are not downloaded yet (by the email client) display (ie: always full width of parent).

2. A constants.yml file to hold <em>campaign-constant variables</em>, as the page-specific Front Matter can get pretty conjested depending on what you are doing, and I'm a bit fan of keeping everything organized.  

## That's Pretty Much It 

Pretty basic stuff, but inserting Zurb's templates into Assemble isn't exactly something you'd want to do more than once. And the .yml file is just handy. 


What follows below is from Lee's original instructions.  

--- 

## Requirements

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)
* Ruby - [Install ruby with RVM](https://rvm.io/rvm/install)
* Premailer (`gem install premailer hpricot nokogiri`) - Inlines the CSS
* [Mailgun](http://www.mailgun.com) (optional) - Sends the email
* [Litmus](https://litmus.com) (optional) - Tests the email across all clients/browsers/devices
* [Rackspace Cloud](http://www.rackspace.com/cloud/files/) (optional) - Uses Cloud Files as a CDN

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

Clone this repo, cd to the directory, run `npm install` to install the necessary packages.

```
git clone https://github.com/oompt/grunt-emails-zurb.git
cd grunt-emails-zurb
npm install
grunt
``` 
