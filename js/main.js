var app = require('app');
var menubar = require('menubar');

/* setting menu */
//var Menu = require('electron').Menu;
//var template = [{
//    label: 'Application',
//    submenu: [
//        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
//        { type: 'separator' },
//        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() { app.quit(); }}
//    ]}, {
//    label: 'Edit',
//    submenu: [
//        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
//        { type: 'separator' },
//        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
//        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
//        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
//    ]}
//];
//Menu.setApplicationMenu(Menu.buildFromTemplate(template));


var opt = {
  width: 250,
  height: 300
};
var mb = menubar(opt);

mb.on('ready', function ready () {
  console.log('app is ready')
});


app.on('window-all-closed', function(){
    app.quit();
});