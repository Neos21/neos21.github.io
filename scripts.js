// Neo's World GitHub Pages 向けの処理
(function() {
  var forNeosWorldGitHubPages = function() {
    // 末尾にスラッシュを付けない
    var rootPath = 'https://neos21.github.io/neo.s21.xrea.com';
    
    if(!location.href.indexOf(rootPath) < 0) {
      console.log('Neo\'s World GitHub Pages ではないので処理しない');
      return;
    }
    
    console.log('Neo\'s World GitHub Pages なので処理する');
    
    var xreaAdWrapper = document.getElementById('xrea');
    if(xreaAdWrapper) {
      xreaAdWrapper.innerHTML = '<a href="#"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Replaced XREA AD"></a>';
      console.log('XREA 広告コード置換');
    }
    
    var replaceAttribute = function(elementName, attributeName) {
      console.log(elementName, attributeName, '置換処理開始');
      Array.prototype.forEach.call(document.querySelectorAll(elementName), function(element, index) {
        var attribute = element.getAttribute(attributeName);
        
        if(!attribute || attribute.substr(0, 2) === '//' || attribute.substr(0, 1) !== '/') {
          console.log(index, '無視', element, attribute);
          return;
        }
        
        element.setAttribute(attributeName, rootPath + attribute);
        console.log(index, '置換', element, attribute);
        
        if(elementName === 'link' || elementName === 'script') {
          var clone = element.cloneNode(true);
          element.parentNode.replaceChild(clone, element);
          console.log(index, '入換', element, attribute);
        }
      });
      console.log(elementName, attributeName, '置換処理終了');
    };
    replaceAttribute('script', 'src');
    replaceAttribute('link', 'href');
    replaceAttribute('a', 'href');
    replaceAttribute('img', 'src');
    
    console.log('処理完了');
  };
  
  console.log('事前実行');
  forNeosWorldGitHubPages();
  
  // 読み込みタイミングに関わらず確実に実行されるよう制御する
  if(!document.readyState || document.readyState === 'interactive') {
    console.log('window.onload 予約');
    window.addEventListener('load', forNeosWorldGitHubPages);
  }
  else if(document.readyState === 'loading') {
    console.log('DOMContentLoaded 予約');
    document.addEventListener('DOMContentLoaded', forNeosWorldGitHubPages);
  }
})();
