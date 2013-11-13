Cortex Admin
============
Cortex Admin is the default UI for [Cortex], written using AngularJS.

Getting Started
---------------

Install [NodeJS](http://nodejs.org/) ([nvm] and [Homebrew] are both good options)

Install node dependencies for the development environment

```sh
$ npm install -g bower grunt-cli karma
```

Clone the repository, download project dependencies and build Cortex Admin
```sh
$ git clone git@gitsum.careerbuilder.com:talent-solutions/cortex-admin.git cortex-admin
$ cd cortex-admin
$ npm install
$ bower install
$ grunt build
```

Tada! Tests should be run, templates compiled and you should now be able to run the admin by accessing `build/index.html` from your web brower.

Resources
---------

* [AngularJS Website](AngularJS)
* [ng-boilerplate] - The boilerplate project Cortex Admin uses


[Cortex]: https://gitsum.careerbuilder.com/talent-solutions/cortex-framework
[nvm]: https://github.com/creationix/nvm
[Homebrew]: http://brew.sh/
[ng-boilerplate]: https://github.com/ngbp/ng-boilerplate
[AngularJS]: http://angularjs.org/
