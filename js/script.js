var getCurrentWindow = getCurrentWindow || function () { 'use strict'; };
var require = require || function () { 'use strict'; return { remote: getCurrentWindow }; };

const remote = require('electron').remote; 


function minimize () {
  var window = remote.getCurrentWindow();
  window.minimize();  
}

function close () {
  var window = remote.getCurrentWindow();
  window.close();  
}

var itemComponent = Vue.component('item-compo', {
  template: '#item-compo-tmpl',
  props: ['item', 'index'],
  methods: {
    dateFormat: function (timeStemp, format) { 
      format = format || 'YYYY-MM-DD HH:mm:ss ';
      var date = new Date(timeStemp);
      format = format.replace('YYYY', date.getFullYear());
      format = format.replace('MM', date.getMonth());
      format = format.replace('DD', date.getDate());
      format = format.replace('HH', date.getHours());
      format = format.replace('mm', date.getMinutes());
      format = format.replace('ss', date.getSeconds());
      return format;
    }
  },
  created: function () { 
  },
  mounted: function () { 
  }
})

/* vuejs code */
var app = new Vue ({
  el: '#app',
  data: {
    msg: '',
    items: []
  },
  methods: {
    copy: function () {
      var copysuccess // var to check whether execCommand successfully executed
      try{
          copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
      } catch(e){
          copysuccess = false
      }
      return copysuccess
    },
    copyClick: function () {
      e = window.event;
      el = e.target;
      e.preventDefault();
      
      setSelectionRange(el, 0, el.length);
      this.copy(); 
	  alert('copied on clipboard!');
    },
    close: function () {
       close();
    },
    resumeItem: function (itemIndex) {
      this.items[itemIndex].start();
    },

    pauseItem: function (itemIndex) {
      this.items[itemIndex].stop();
    },

    secondsToTimeString: function(seconds){
      var d = Math.floor(seconds / 86400);
      seconds -= 86400 * d;
      var h = Math.floor(seconds / 3600);
      seconds -= 3600 * h;
      var m = Math.floor(seconds / 60);
      seconds -= 60 * m;
      str = '';
      if(d > 0) { 
        d = (10 > d)? '0' + d : d;
        str += `${d}d `; 
      }
      if(h > 0) { 
        d = (10 > h)? '0' + h : h;
        str += `${h}h `; 
      }
      if(m > 0) { 
        m = (10 > m)? '0' + m : m;
        str += `${m}m `; 
      }
      seconds = (10 > seconds)? '0' + seconds : seconds;
      str += `${seconds}s `;

      return str;
    },

    addItem: function() {
      if(!this.msg) {
        return false;
      }
      var that = this;
      var Item = function (){
        this.startTime = new Date();
        this.durationTime = 0;
        this.msg= that.msg;
        this.timer = null;
        this.show = true;
      };
      Item.prototype.start = function(){
        var that = this;
        that.timer = setInterval(function(){
          that.durationTime ++;
        }, 1000); 
      };
      Item.prototype.stop = function(){
        clearInterval(this.timer);
        this.timer = null;
      };
      var newItem = new Item();
      this.items.push(newItem);
      newItem.start();
      that.msg = '';
    },
    removeItem: function(itemIndex) {
      this.items[itemIndex].stop();
      this.items.splice(itemIndex, 1);
    }
  },

  mounted: function() {
  }
});