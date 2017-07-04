Pico Socle
========================

Features
--------------
***
  * Pico CMS
  * Pico admin plugin
  * Front-End architecture with `Gulp` task runner and `npm` package manager


Specifications
--------------
***
  * Don't follow to :
    * Change password of mail client in `/web/index.php` file _(line 36)_
    * Make sure the debug mode is set to false before deploy in `/web/config/config.php` _(line 25)_
    * Change the url of domain in `/web/config/config.php` file _(line 15)_


Instances
--------------
***
**Production env**
  * [Site](http://www.melissa-aubert-sophrologie.fr/)
  * [PHPMyAdmin](https://phpmyadmin.ovh.net/)


Internal(s) Contact(s)
--------------
***
1. **Functional**
  * [Erwan CHEDALEUX](mailto:erwan.chedaleux@gmail.com)

2. **Technical**
  * [Erwan CHEDALEUX](mailto:erwan.chedaleux@gmail.com)


Install procedure
--------------
***
1. Pico
  * To install Pico CMS, go to : http://picocms.org/docs/#install
2. Front
  * Place to `/app/Ressources/front` on your terminal
  * After install and configure nodeJS and npm, run the following commands :
    * `npm install` will install the packages listed in `package.json` file
    * `gulp develop` to run project in debug mode
    * `gulp img-optimization` to rebuild images optimization
    * `gulp releasePatch` to run project in production mode and release project with patch modification version
    * `gulp releaseMinor` to run project in production mode and release project with minor modification version
    * `gulp releaseMajor` to run project in production mode and release project with major modification version


Deploy procedure
--------------
***
  * Just need to transfer the `web/` folder content to the root of your web server.
