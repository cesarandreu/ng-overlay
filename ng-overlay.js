angular.module('ng-overlay')
.directive('overlay', ['$document', '$compile', function($document, $compile){
  'use strict';
  // Runs during compile
  var overlay;

  return {
    scope: true,
    link: function($scope, iElm, iAttrs) {

      var options = ['overlayShow',
                    'overlayPosition',
                    'overlayText',
                    'overlayWidth',
                    'overlayColor',
                    'overlayLineHeight'];

      //Sets options in scope
      for (var i = 0; i < options.length; i++) {
        $scope[options[i]] = $scope.$parent.$eval(iAttrs[options[i]]);
      }

      //Sets default values
      var position = $scope.overlayPosition || 'top-left',
          width = $scope.overlayWidth || 100,
          color = $scope.overlayColor || '#dddddd',
          textLineHeight = $scope.overlayLineHeight || 12,
          overlayText = $scope.overlayText || '',
          show = typeof $scope.overlayShow === undefined ? true : $scope.overlayShow;

      var textWidth = Math.pow(Math.pow(width, 2) + Math.pow(width,2), 0.5),
          textTop, textBottom, textLeft, textRight, deg;
          textTop = textBottom = (width / 2) - textLineHeight;
          textLeft = textRight = (width / 2) - (textWidth / 2) - textLineHeight;


      //Prepares the CSS for triangles and text
      var overlayElement = $compile('<div><div id="triangle"><div/>{{overlayText}}</div>')($scope);
          overlayElement.css('position', 'absolute');
          overlayElement.css('opacity', '1');
          //  overlayElement.css('z-index', '1');

      var triangle = overlayElement.children();
          triangle.css('overflow', 'hidden');
          // triangle.css('-webkit-transform', 'rotate(360deg)');
          // triangle.css('-moz-transform', 'rotate(360deg)');
          // triangle.css('transform', 'rotate(360deg)');
          triangle.css('width', '0');
          triangle.css('height', '0');

      var text = triangle.children();
          text.css('position', 'absolute');
          text.css('width', textWidth+'px');
          text.css('text-align', 'center');


      if (position === 'top-left') {
        overlayElement.css('top', '0');
        overlayElement.css('left', '0');
        triangle.css('border-top', width+'px solid '+color);
        triangle.css('border-right', width+'px solid transparent');
        text.css('top', textTop+'px');
        text.css('left', textLeft+'px');
        deg = '-45';
      } else if (position === 'top-right') {
        overlayElement.css('top', '0');
        overlayElement.css('right', '0');
        triangle.css('border-top', width+'px solid '+color);
        triangle.css('border-left', width+'px solid transparent');
        text.css('top', textTop+'px');
        text.css('right', textRight+'px');
        deg = '45';
      } else if (position === 'bottom-left') {
        overlayElement.css('bottom', '0');
        overlayElement.css('left', '0');
        triangle.css('border-bottom', width+'px solid '+color);
        triangle.css('border-right', width+'px solid transparent');
        text.css('bottom', textBottom+'px');
        text.css('left', textLeft+'px');
        deg = '45';
      } else if (position === 'bottom-right') {
        overlayElement.css('bottom', '0');
        overlayElement.css('right', '0');
        triangle.css('border-bottom', width+'px solid '+color);
        triangle.css('border-left', width+'px solid transparent');
        text.css('bottom', textBottom+'px');
        text.css('right', textRight+'px');
        deg = '-45';
      }

      text.css('transform', 'rotate('+deg+'deg)');
      text.css('-ms-transform', 'rotate('+deg+'deg)');
      text.css('-moz-transform', 'rotate('+deg+'deg)');
      text.css('-o-transform', 'rotate('+deg+'deg)');
      text.css('-webkit-transform', 'rotate('+deg+'deg)');


      iElm.prepend(overlayElement);
      overlay = overlayElement;

      $scope.$parent.$watch(iAttrs.overlayShow, function(newVal) {
        if (newVal) {
          overlay.css('opacity', '1');
          overlay.css('z-index', '9999');
        } else {
          overlay.css('opacity', '0');
          overlay.css('z-index', '-1');
        }
      });

    }
  };
}]);
