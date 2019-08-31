//version 1.1
var loginHref = 'http://localhost:4200/portable/signup';
var fundsHref = 'http://localhost:4200/portable/add';
var loginFrame = document.createElement('iframe');
loginFrame.src = loginHref;
loginFrame.style.position = 'absolute';
loginFrame.frameBorder = 0;
loginFrame.width = 600;
loginFrame.height = 800;
loginFrame.style.left = '0px';
loginFrame.style.top = '0px'
loginFrame.style.display = 'none';

var fundsFrame = document.createElement('iframe');
fundsFrame.src = fundsHref;
fundsFrame.style.position = 'absolute';
fundsFrame.frameBorder = 0;
fundsFrame.width = 600;
fundsFrame.height = 800;
fundsFrame.style.left = '0px';
fundsFrame.style.top = '0px'
fundsFrame.style.display = 'none';
var addedFundsFrame = false;
var buttons = {};
document.addEventListener('DOMContentLoaded', function () {
    document.body.append(loginFrame);
    document.querySelectorAll('[nanr-id]').forEach(el => {
        let tagId = el.getAttribute('nanr-id');
        var iFrame = document.createElement('iframe');
        iFrame.frameBorder = 'none';
        iFrame.width = 60;
        iFrame.height = 40;
        iFrame.src = `http://localhost:4200/assets/tags/button.html?tagId=${tagId}&page=${encodeURI(window.location.href)}`;
        el.innerHTML = iFrame.outerHTML;
        let loginContainer = document.createElement('div');
        loginContainer.style.display = 'none';
        buttons[tagId] = el;
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

window.addEventListener('message', handleMessage, false);
