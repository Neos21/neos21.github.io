// Neo's World GitHub Pages 向けの処理
(function() {
  // 末尾にスラッシュを付けない
  var rootPath = 'https://neos21.github.io/neo.s21.xrea.com';
  
  var isNeosWorldGitHubPages = function() {
    if(location.href.indexOf(rootPath) >= 0) {
      console.log('Neo\'s World GitHub Pages である');
      return true;
    }
    else {
      console.log('Neo\'s World GitHub Pages ではない');
      return false;
    }
  };
  
  if(!isNeosWorldGitHubPages()) {
    console.log('予約処理しない');
    return;
  }
  
  var replaceAttribute = function(elementName, attributeName) {
    if(!isNeosWorldGitHubPages()) {
      console.log('置換処理しない');
      return;
    }
    
    console.log(elementName, attributeName, '置換処理開始');
    Array.prototype.forEach.call(document.querySelectorAll(elementName), function(element, index) {
      var attribute = element.getAttribute(attributeName);
      if(!attribute || attribute.substr(0, 2) === '//' || attribute.substr(0, 1) !== '/') {
        console.log(index, '無視', element, attribute);
        return;
      }
      
      if(elementName === 'script' && attribute === '/scripts.js') {
        // 本ファイル自体は読み込まれているため element は操作しない
        // Neo's World の scripts.js を読み込ませるため別要素を作って追加する
        var neosWorldScripts = document.createElement('script');
        neosWorldScripts.src = rootPath + attribute;
        element.parentNode.appendChild(neosWorldScripts);
        console.log(index, '挿入', element, attribute);
      }
      else {
        element.setAttribute(attributeName, rootPath + attribute);
        console.log(index, '書換', element, attribute);
        if(elementName === 'link' || elementName === 'script') {
          var clone = element.cloneNode(true);
          element.parentNode.replaceChild(clone, element);
          console.log(index, '置換', element, attribute);
        }
      }
    });
    console.log(elementName, attributeName, '置換処理終了');
  };
  
  var init = function() {
    if(!isNeosWorldGitHubPages()) {
      console.log('初期処理しない');
      return;
    }
    
    var xreaAdWrapper = document.getElementById('xrea');
    if(xreaAdWrapper) {
      xreaAdWrapper.innerHTML = '<a href="#"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Replaced XREA AD"></a>';
      console.log('XREA 広告コード置換');
    }
    
    replaceAttribute('link', 'href');
    replaceAttribute('script', 'src');
    replaceAttribute('a', 'href');
    replaceAttribute('img', 'src');
  };
  
  // 画面のチラつきが発生するため、link 要素のみ本ファイルが head 要素内で読み込まれたタイミングで即処理する
  console.log('link 要素のみ事前実行');
  replaceAttribute('link', 'href');
  
  // 読み込みタイミングに関わらず確実に実行されるよう制御する
  if(!document.readyState || document.readyState === 'interactive') {
    console.log('init : window.onload 予約');
    window.addEventListener('load', init);
  }
  else if(document.readyState === 'loading') {
    console.log('init : DOMContentLoaded 予約');
    document.addEventListener('DOMContentLoaded', init);
  }
  else {
    console.log('init : 即実行');
    init();
  }
})();
