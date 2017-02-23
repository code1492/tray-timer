var menubar = require('menubar');
var opt = {
  width: 250,
  height: 300
};
var mb = menubar(opt);

mb.on('ready', function ready () {
  console.log('app is ready')
});
