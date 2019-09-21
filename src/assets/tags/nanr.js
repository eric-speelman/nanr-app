//version 1.3
var nanr = (() => {
  var loginHref = 'http://localhost:4200/portable/signup';
  var fundsHref = 'http://localhost:4200/portable/add';
  var overlayHref = 'http://localhost:4200/assets/tags/overlay.html?';
  var loginFrame = document.createElement('iframe');
  loginFrame.src = loginHref;
  loginFrame.style.position = 'absolute';
  loginFrame.frameBorder = 0;
  loginFrame.style.left = '0px';
  loginFrame.style.top = '0px'
  loginFrame.style.display = 'none';
  loginFrame.style.zIndex = 101;

  var fundsFrame = document.createElement('iframe');
  fundsFrame.src = fundsHref;
  fundsFrame.style.position = 'absolute';
  fundsFrame.frameBorder = 0;
  fundsFrame.style.left = '0px';
  fundsFrame.style.top = '0px'
  fundsFrame.style.display = 'none';
  fundsFrame.style.zIndex = 101;
  var wallFrame = document.createElement('iframe');
  wallFrame.style.width = '100%';
  wallFrame.style.height = '100%';
  wallFrame.style.position = 'absolute';
  wallFrame.style.left = 0;
  wallFrame.style.top = 0;
  wallFrame.style.zIndex = 100;
  wallFrame.src = overlayHref;
  wallFrame.style.display = 'none';

  var addedFundsFrame = false;
  let nanrCallback = null;
  let nanrCnt = null;
  let requireParams = null;
  let wallReady = false;
  let nanrButtons = [];
  let bodyOverflow = null;
  document.addEventListener('DOMContentLoaded', function () {
      let isStand = getUrlParameter('stand');
      if (isStand) {
        width = '100%';
        heigh = '100%';
      } else {
        if (window.innerWidth < 840) {
          width = '100%';
          height = '100%'
        } else {
          width = '600px';
          height = '800px';
        }
      }
      let frames = [loginFrame, fundsFrame];
      frames.forEach(x => {
        x.style.width = width;
        x.style.height = height;
      });
      document.body.append(loginFrame);
      document.body.append(wallFrame);
      document.querySelectorAll('[nanr-id]').forEach(el => {
          let tagId = el.getAttribute('nanr-id');
          let pageId = el.getAttribute('nanr-pageId') || el.getAttribute('nanr-pageId') || null;
          let buttonSize = parseInt(el.getAttribute('nanr-size'));
          nanrButtons[tagId] = {
            pageId: pageId
          };
          if (!buttonSize) {
            buttonSize = 54;
          }
          if(buttonSize < 40) {
            buttonSize = 40;
          }
          var iFrame = document.createElement('iframe');
          iFrame.frameBorder = 'none';
          iFrame.width = buttonSize;
          iFrame.height = buttonSize;
          iFrame.scrolling = 'no';
          iFrame.src = `http://localhost:4200/assets/tags/button.html?tagId=${tagId}`;
          el.innerHTML = iFrame.outerHTML;
          let loginContainer = document.createElement('div');
          loginContainer.style.display = 'none';
      });
  }, false);
  let buttonSources = [];
  function handleMessage(message) {
      var msgObj = JSON.parse(message.data);
      if (msgObj) {
          if (msgObj.type === 'showLogin') {
              loginFrame.style.display = 'block';
          } else if (msgObj.type === 'close') {
              loginFrame.style.display = 'none';
              fundsFrame.style.display = 'none';
              buttonSources.forEach(source => source.postMessage(JSON.stringify({
                type: 'checkSession'
              }), '*'));
          } else if (msgObj.type === 'navigate') {
              window.location.href = msgObj.url;
          } else if(msgObj.type === 'addFunds') {
            if (!addedFundsFrame) {
              document.body.append(fundsFrame);
            }
            fundsFrame.style.display = 'block';
          } else if(msgObj.type === 'ready') {
            var response = {
              type: 'init',
              page: window.location.href,
              referrer: window.referrer,
              pageId: nanrButtons[msgObj.tagId].pageId
            };
            buttonSources.push(message.source);
            message.source.postMessage(JSON.stringify(response), '*');
          } else if(msgObj.type === 'nanr') {
            nanrCnt = {
              loggedIn: msgObj.hasUser,
              pageNanrs: msgObj.pageNanrCount,
              totalNanrs: msgObj.totalNanrCount,
              pageId: msgObj.pageId
            }
            if (nanrCallback) {
              nanrCallback(nanrCnt);
            }
          } else if(msgObj.type == 'wallReady') {
            wallReady = true;
            if (requireParams) {
              message.source.postMessage(JSON.stringify(requireParams), '*');
            }
          } else if(msgObj.type === 'closeWall') {
            wallFrame.style.display = 'none';
            console.log(bodyOverflow);
            document.body.style.overflow = bodyOverflow;
          } else if(msgObj.type === 'showWall') {
            bodyOverflow = document.body.style.overflow || 'scroll';
            document.body.style.overflow = 'hidden'
            wallFrame.style.display = 'block';
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
  let nanrInterface = {
    onNanr: (callback, virtualButtons) => {
      nanrCallback = callback;
      if (nanrCnt) {
        nanrCallback(nanrCnt);
      }
    },
    require: (params) => {
      requireParams = params;
      requireParams.type = 'wall';
      requireParams.page = window.location.href,
      requireParams.referrer = window.referrer,
      nanrButtons[params.username] = {
        pageId: params.pageId
      };
      if (wallReady) {
        wallFrame.contentWindow.postMessage(JSON.stringify(requireParams), '*');
      }
    }
  };
  return nanrInterface;
})();
