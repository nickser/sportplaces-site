***

Установка:

```sh
$ git clone
$ cd sportplaces-site
$ sudo npm install -g grunt-cli bower
$ npm install
$ bower install
$ grunt dev (для разработчиков с доступом к удаленному backend серверу)
$ grunt dev --env=staging (для разработчиков с доступом к локальному backend серверу)
$ grunt (for production)
```

## Структура каталогов

```
sportplaces-site/
  |- src/
  |  |- app/
  |  |  |- <app logic>
  |  |- assets/
  |  |  |- <static files>
  |  |- less/
  |  |  |- main.less
  |- vendor/
  |  |- angular-bootstrap/
  |  |- bootstrap/
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```
