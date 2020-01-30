# GreenSafety - User Platform (YUWEI)

User Platform on T-BOX monitoring.

# Environment

Install Apache

```sh
$ sudo yum install httpd mod_ssl
```

Setup Apache Config

```sh
# [DEV]
$ sudo cp /opt/greensafety/EnvConfig/httpd_dev.conf /etc/httpd/conf/httpd.conf

# [PRD]
$ sudo cp /opt/greensafety/EnvConfig/httpd.conf /etc/httpd/conf/httpd.conf
```

Install PHP

```sh
$ sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
$ sudo yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
$ sudo yum install yum-utils
$ sudo yum-config-manager --enable remi-php72
$ sudo yum install php php-mcrypt php-cli php-gd php-curl php-mysql php-ldap php-zip php-fileinfo
$ sudo yum -y install gcc php-pear php-devel
$ sudo yum install openssl openssl-devel
$ sudo pecl install mongodb
$ curl https://packages.microsoft.com/config/rhel/7/prod.repo > /etc/yum.repos.d/mssql-release.repo
$ yum remove unixODBC-utf16 unixODBC-utf16-devel
$ ACCEPT_EULA=Y yum install -y msodbcsql17
$ ACCEPT_EULA=Y yum install -y mssql-tools
$ echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
$ echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
$ source ~/.bashrc
$ yum install -y unixODBC-devel
$ yum install -y centos-release-scl
$ yum install -y devtoolset-7
$ scl enable devtoolset-7 bash
$ yum install -y php-sqlsrv
```

Setup PHP Config

```sh
$ cd /usr/lib64/php/modules/
$ sudo chmod u+rwx,g+x,o+x mongodb.so
$ sudo cp /opt/greensafety/EnvConfig/30-mongodb.ini /etc/php.d/30-mongodb.ini
$ sudo cp /opt/greensafety/EnvConfig/php.ini /etc/php.ini
```

Insatll NodeJS

```sh
$ sudo yum install -y gcc-c++ make
$ sudo curl -sL https://rpm.nodesource.com/setup_11.x | sudo -E bash -
$ sudo yum install nodejs
$ sudo npm install -g npm@latest
```

Setup SElinux

```sh
$ sudo setenforce 1
$ sudo chcon -R -t httpd_sys_rw_content_t /opt/greensafety/logs
$ sudo setsebool -P httpd_can_network_connect_db 1
$ sudo setsebool -P httpd_can_network_memcache 1
$ sudo setsebool -P httpd_can_sendmail 1
$ sudo setsebool -P httpd_can_network_connect 1

#enable write on dir
$ sudo chcon -R -t httpd_sys_rw_content_t dir
```

Setup Firewall (CentOS7)

```sh
$ sudo firewall-cmd --permanent --add-port=80/tcp
$ sudo firewall-cmd --permanent --add-port=443/tcp
$ sudo firewall-cmd --reload
```

# Development

Install Git
```sh
$ sudo yum install git-all
```

Setup Local Git Repository

```sh
$ mkdir /opt/web-repo.git
$ cd web-repo.git/
$ git init --bare
$ sudo cp /opt/greensafety/EnvConfig/post-receive /opt/web-repo.git/hooks/post-receive
```

Set Directory Permission
```sh
$ cd /opt/
$ sudo chown -R root:wheel greensafety
$ sudo chown -R root:wheel web-repo.git
$ sudo chown -R root:wheel greensafety
$ sudo chmod -R a+rwx web-repo.git
```

Setup Git SSH

```sh
$ mkdir .ssh
$ touch .ssh/authorized_keys
$ cat id_rsa.pub >> .ssh/authorized_keys
```

Development Directory

```
/opt/greensafety/
```

Install PHP Dependencies

```sh
$ php composer.phar install
```

Package Control

```sh
$ npm
```

Package Directory

```
/opt/greensafety/node_modules/
```

Install Node Modules

```sh
$ npm install
```

Install apiDoc
```sh
$ npm install apidoc -g
```

Install JSDoc
```sh
$ npm install jsdoc jsdoc-mermaid -g
```

Dependancy Rewrite

```sh
# /opt/greensafety/node_modules ==> /opt/greensafety/html/scirpts/
$ ln -s /opt/greensafety/node_modules /opt/greensafety/html/scirpts
```

JSDoc Custom Template

```sh
$ sudo cp /opt/greensafety/EnvConfig/layout.tmpl /opt/greensafety/node_modules/better-docs/tmpl/layout.tmpl
```

Web Content Directory

```
/opt/greensafety/html/
```

Reminder (HTML)

+ typeahead input must contains **id** start with **typeahead#** (bug fixed required)
```
<input id="typeahead#1">
```

Build Version

```sh
$ sudo npm run build-version [major | minor | patch]
```

Build Package

```sh
$ sudo npm run build-package
```

Update Change Log

```sh
$ sudo npm run changelog [add | update | bugfix | remove] [message]
```

Generate API Documentation

```sh
$ sudo npm run apidoc
```

Generate JS Documentation

```sh
$ sudo npm run doc
```

# Usage

Portal
=> https://:hostname/:companyCode/login

Admin Panel
=> https://:hostname/tools/adminpanel/login
=> Username: admin
=> Password: 4V8JB02qy7niHg7p

Autologin Tool
=> https://:hostname/tools/autologin/:companyCode/:Credential

Autologin Tool Credential Generate

```js
btoa(encodeURI(usr=username&pwd=password))
```

# Documentation

API Documentation
=> documentation/api/index.html
=> http://:hostname/tools/documentation/api  [DEV]

JS Documentation
=> documentation/web/index.html
=> http://:hostname/tools/documentation/web  [DEV]

# Techology

* [Apache] - An effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows
* [PHP] - A popular general-purpose scripting language that is especially suited to web development
* [NodeJS] - A JavaScript runtime built on Chrome's V8 JavaScript engine
* [PHP Slim Framework] - a PHP micro framework that helps you quickly write simple yet powerful web applications and APIs
* [AngularJS] - HTML enhanced for web apps
* [AngularUI Router] - The de-facto solution to flexible routing in angular
* [Angular Chart] - Reactive, responsive, beautiful charts for AngularJS based on Chart.js
* [Angular Dynamic Locale] - Module to be able to change the locale at an angularjs application
* [Angular-filter] - Bunch of useful filters for AngularJS (with no external dependencies!)
* [AngularJS Material] - A set of reusable, well-tested, and accessible UI components based on Material Design
* [Smart-Table] - A table module for angular js
* [Angular-Translate] - i18n for your Angular apps, made easy
* [UI Bootstrap] - Bootstrap components written in pure AngularJS by the AngularUI Team
* [AngularJS Dropdown Multiselect] - A Bootstrap Dropdown with the power of AngularJS directives
* [Angular Gauge] - A highly customizable gauge directive for Angular JS apps and dashboards
* [Bootstrap] - An open source toolkit for developing with HTML, CSS, and JS
* [ES6 Promise] - A polyfill of the ES6 Promise
* [Font Awesome] - The iconic font and CSS toolkit
* [jQuery] - A fast, small, and feature-rich JavaScript library
* [lrStickyHeader] - Make table headers sticky
* [mw-datepicker-range] - An AngularJS module that extend the ui-bootstrap's datepicker directive to allow a selection of a range
* [ngCsv] - An AngularJS simple directive that turns arrays and objects into downloadable CSV files
* [ng-error] - Angular ngError directive
* [Ng-Idle] - An AngularJS module for detecting and responding to idle users
* [Google Maps AngularJS Directive] - The Simplest AngularJS Google Maps V3 Directive
* [OrgChart] - Organization Chart Plugin
* [stStickyHeader] - Sticky table directive for smart-table
* [SweetAlert2] - A beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
* [Baidu-map For AngularJS] - A baidu-map directive for AngularJS
* [angular-block-ui] - AngularJS Block UI Module

License
----

**GreenSafety Technology Limited**

[//]: #

   [Apache]: <https://httpd.apache.org/>
   [PHP]: <http://www.php.net/>
   [NodeJS]: <https://nodejs.org/en/>
   [PHP Slim Framework]: <http://www.slimframework.com/>
   [AngularJS]: <http://angularjs.org>
   [AngularUI Router]: <https://ui-router.github.io/>
   [Angular Chart]: <http://jtblin.github.io/angular-chart.js/>
   [Angular Dynamic Locale]: <http://lgalfaso.github.io/angular-dynamic-locale/>
   [Angular-filter]: <https://github.com/a8m/angular-filter>
   [AngularJS Material]: <https://material.angularjs.org/latest/>
   [Smart-Table]: <http://lorenzofox3.github.io/smart-table-website/>
   [Angular-Translate]: <https://angular-translate.github.io/>
   [UI Bootstrap]: <https://angular-ui.github.io/bootstrap/>
   [AngularJS Dropdown Multiselect]: <http://dotansimha.github.io/angularjs-dropdown-multiselect/docs/#/main>
   [Angular Gauge]: <https://ashish-chopra.github.io/angular-gauge/>
   [Bootstrap]: <http://getbootstrap.com/?>
   [ES6 Promise]: <https://github.com/stefanpenner/es6-promise#readme>
   [Font Awesome]: <https://fontawesome.com/v4.7.0/>
   [jQuery]: <https://jquery.com/>
   [lrStickyHeader]: <https://github.com/lorenzofox3/lrStickyHeader>
   [mw-datepicker-range]: <https://github.com/MrWook/mw-datepicker-range>
   [ngCsv]: <https://github.com/asafdav/ng-csv>
   [ng-error]: <https://github.com/andrefarzat/ng-error>
   [Ng-Idle]: <http://hackedbychinese.github.io/ng-idle/>
   [Google Maps AngularJS Directive]: <https://ngmap.github.io/>
   [OrgChart]: <https://github.com/dabeng/OrgChart>
   [stStickyHeader]: <https://github.com/lorenzofox3/stStickyHeader>
   [SweetAlert2]: <https://sweetalert2.github.io/>
   [Baidu-map For AngularJS]: <https://github.com/leftstick/BaiduMapForAngularJS>
   [angular-block-ui]: <https://github.com/McNull/angular-block-ui>