Install:

```
npm install
bower install
```

To start up dev env:

```
npm install -g watchify
watchify -t [ babelify --presets [ react es2015 babel-preset-stage-2] ] main.js -o bundle.js
```