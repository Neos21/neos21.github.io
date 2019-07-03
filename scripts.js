/** Neo's World GitHub Pages 用の処理 */
(function() {
  /** 定数 : Neo's GitHub Pages のルートパス・末尾にスラッシュを付けない */
  var rootPath = 'https://neos21.github.io/neo.s21.xrea.com';
  
  // Neo's World GitHub Pages で実行されているか確認する
  if(location.href.indexOf(rootPath) < 0) {
    // console.log('Neo\'s World GitHub Pages ではないので予約処理しない');
    return;
  }
  
  // console.log('Neo\'s World GitHub Pages 用の処理を実行');
  
  /**
   * 指定の要素の属性値をチェックし、ルート相対パス (スラッシュ `/` から始まる値) だった場合、
   * 定数 rootPath を先頭に付与した絶対パスに変換する
   * 
   * @param {string} elementName 要素名
   * @param {string} attributeName 属性名
   */
  var replaceAttribute = function(elementName, attributeName) {
    // console.log(elementName, attributeName, '置換処理開始');
    Array.prototype.forEach.call(document.querySelectorAll(elementName), function(element, index) {
      var attribute = element.getAttribute(attributeName);
      // 属性値がない場合、スラッシュ2つで始まるプロトコル省略の絶対パスの場合、ルート相対パスでない場合は処理しない
      if(!attribute || attribute.substr(0, 2) === '//' || attribute.substr(0, 1) !== '/') {
        // console.log(index, '無視', element, attribute);
        return;
      }
      
      if(elementName === 'script' && attribute === '/scripts.js') {
        // 本ファイル自体は読み込まれているため element は操作しないでおく
        // 代わりに Neo's World の scripts.js を読み込ませるため別要素を作って追加する
        var neosWorldScripts = document.createElement('script');
        neosWorldScripts.src = rootPath + attribute;
        element.parentNode.appendChild(neosWorldScripts);
        // console.log(index, '挿入', element, attribute);
      }
      else {
        // a 要素・img 要素は属性値変更のみで正しく読み込まれる
        element.setAttribute(attributeName, rootPath + attribute);
        // console.log(index, '書換', element, attribute);
        
        // link 要素・script 要素は Node の再挿入を行わないと読込が開始されない
        if(elementName === 'link' || elementName === 'script') {
          var clone = element.cloneNode(true);
          element.parentNode.replaceChild(clone, element);
          // console.log(index, '置換', element, attribute);
        }
      }
    });
    // console.log(elementName, attributeName, '置換処理終了');
  };
  
  /** 初期処理まとめ */
  var init = function() {
    // XREA 広告を透明な GIF 画像に差し替える
    var xreaAdWrapper = document.getElementById('xrea');
    if(xreaAdWrapper) {
      xreaAdWrapper.innerHTML = '<a href="#"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Replaced XREA AD"></a>';
      // console.log('XREA 広告コード置換');
    }
    
    // ルート相対パスを置換する
    replaceAttribute('link', 'href');
    replaceAttribute('script', 'src');
    replaceAttribute('a', 'href');
    replaceAttribute('img', 'src');
  };
  
  // 画面のチラつきが発生するため link 要素のみ本ファイルが head 要素内で読み込まれたタイミングで即処理する
  // console.log('link 要素のみ事前実行');
  replaceAttribute('link', 'href');
  
  // 読み込みタイミングに関わらず確実に実行されるよう制御する
  if(!document.readyState || document.readyState === 'interactive') {
    // console.log('init : window.onload 予約');
    window.addEventListener('load', init);
  }
  else if(document.readyState === 'loading') {
    // console.log('init : DOMContentLoaded 予約');
    document.addEventListener('DOMContentLoaded', init);
  }
  else {
    // console.log('init : 即実行');
    init();
  }
})();
