//version 1.1
var loginHref = 'http://localhost:4200/portable/signup';
var fundsHref = 'http://localhost:4200/portable/add';
var loginFrame = document.createElement('iframe');
loginFrame.src = loginHref;
loginFrame.style.position = 'absolute';
loginFrame.frameBorder = 0;
loginFrame.style.left = '0px';
loginFrame.style.top = '0px'
loginFrame.style.display = 'none';


var fundsFrame = document.createElement('iframe');
fundsFrame.src = fundsHref;
fundsFrame.style.position = 'absolute';
fundsFrame.frameBorder = 0;
fundsFrame.style.left = '0px';
fundsFrame.style.top = '0px'
fundsFrame.style.display = 'none';
var addedFundsFrame = false;
document.addEventListener('DOMContentLoaded', function () {
    let isStand = getUrlParameter('stand');
    if (isStand) {
      width = '100%';
      heigh = '100%';
    } else {
      width = '600px';
      height = '800px';
    }
    let frames = [loginFrame, fundsFrame];
    frames.forEach(x => {
      x.style.width = width;
      x.style.height = height;
    });
    document.body.append(loginFrame);
    document.querySelectorAll('[nanr-id]').forEach(el => {
        let tagId = el.getAttribute('nanr-id');
        let buttonSize = parseInt(el.getAttribute('nanr-size'));
        if (!buttonSize) {
          buttonSize = 54;
        }
        if(buttonSize < 40) {
          buttonSize = 40;
        }
        var iFrame = document.createElement('iframe');
        let page;
        if(window.location.hostname.toLowerCase().endsWith('nanr.io')) {
          page = `stand://${document.referrer}|${window.location.href}`;
        } else {
          page = window.location.href;
        }
        iFrame.frameBorder = 'none';
        iFrame.width = buttonSize;
        iFrame.height = buttonSize;
        iFrame.scrolling = 'no';
        iFrame.src = `http://localhost:4200/assets/tags/button.html?tagId=${tagId}&page=${encodeURI(page)}`;
        el.innerHTML = iFrame.outerHTML;
        let loginContainer = document.createElement('div');
        loginContainer.style.display = 'none';
    });
}, false);

function handleMessage(message) {
    var msgObj = JSON.parse(message.data);
    if (msgObj) {
        if (msgObj && msgObj.type === 'showLogin') {
            loginFrame.style.display = 'block';
        } else if (msgObj.type === 'close') {
            loginFrame.style.display = 'none';
            fundsFrame.style.display = 'none';
        } else if (msgObj.type === 'navigate') {
            window.location.href = msgObj.url;
        } else if(msgObj.type == 'addFunds') {
          if (!addedFundsFrame) {
            document.body.append(fundsFrame);
          }
          fundsFrame.style.display = 'block';
        }
    }
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.addEventListener('message', handleMessage, false);
