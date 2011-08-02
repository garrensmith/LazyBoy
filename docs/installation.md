---
layout: default
title: Installation
---

Installation
============

Installation of LazyBoy is done via npm

    npm install LazyBoy


Connect to database
===================


Loading Models
==============

The models need to be loaded for LazyBoy to work. This can be done via two ways. The first is to manually require the files where the models are defined and then call `Model.load()` or 
keep all the models in a specific folder and point LazyBoy to that folder `Model.load('./models')`
