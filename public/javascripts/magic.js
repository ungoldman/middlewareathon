// http://archive.org/download/SG101-2005_Mp3_Comp/32-Watery_Grave-Los_Cobras.mp3

// preload images
var img = ['/images/puter.gif','/images/surfin_hotdog.gif'];
for(var i=0;i<img.length;i++){
  var j = new Image();
  j.src = img[i];
}

// surfin montage and cookie magic
window.onload = function(){
  var a, b, c, d, expires, surfrock;
  surfrock = document.getElementById('surf_rock');
  a = document.getElementsByClassName('relish')[0];
  a.onmouseover = function(e){
    document.getElementsByTagName('html')[0].className = "hotdog";
    surfrock.play();
  }
  a.onmouseout = function(e){
    document.getElementsByTagName('html')[0].className = "";
    surfrock.pause();
  }
  expires = 10;
  b = document.getElementById('expires');
  c = b.childNodes[1];
  c.innerHTML = expires;
  d = setInterval(function(){
    expires--;
    c.innerHTML = expires;
    if (expires < 1) {
      clearInterval(d);
      b.innerHTML = 'Cookie expired.';
    }
  },1000);
};
