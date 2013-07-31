var self, slider;

self = {};

slider = function(slideBox, fade, fadeTime) {
  var i, initClass, lasti, thisLayer;
  i = 0;
  lasti = -1;
  slideBox = $(slideBox);
  initClass = slideBox.attr('class');
  thisLayer = this.children('li');
  return $(document).on('click keyup', function(e) {
    var a, matchArray, slide, slideHtml, tagHtml, _i, _len;
    self.isShowing = false;
    self.forward = true;
    if (e.keyCode !== void 0 && e.keyCode === 37) {
      i -= 2;
      self.forward = false;
      if (i < 0) {
        i = 0;
      }
    }
    slide = $(thisLayer[i]);
    self.removeLast = function(callback) {
      self.removed = true;
      return slideBox.hide(fade, fadeTime, function() {
        slideBox.html('');
        slideBox.attr('class', initClass);
        return callback();
      });
    };
    self.showSlide = function(callback) {
      var newSlide;
      self.isShowing = true;
      if (self.removed) {
        self.removed = false;
        slideBox.addClass(slide.attr('class'));
        newSlide = slide.html();
        slideBox.append(slide.html());
        return $(document).ready(function() {
          return slideBox.not('.runScript').show(fade, fadeTime, function() {
            console.log('in here');
            if (callback !== void 0) {
              return callback();
            }
          });
        });
      } else {
        newSlide = $(slide.html());
        slideBox.addClass(slide.attr('class'));
        newSlide.hide();
        slideBox.append(newSlide);
        return $(document).ready(function() {
          return newSlide.not('.runScript').show(fade, fadeTime, function() {
            if (callback !== void 0) {
              return callback();
            }
          });
        });
      }
    };
    if (lasti !== i) {
      slideHtml = slide.find('.runScript').html();
      matchArray = slideHtml.match(/\&[^;]+;/g);
      if (matchArray === null) {
        matchArray = [];
      }
      console.log(matchArray);
      for (_i = 0, _len = matchArray.length; _i < _len; _i++) {
        a = matchArray[_i];
        tagHtml = $('<div>').html(a).text();
        slideHtml = slideHtml.replace(a, tagHtml);
      }
      new Function(slideHtml).call(self);
    }
    lasti = i;
    i += 1;
    if (i >= thisLayer.length) {
      return i = thisLayer.length;
    }
  });
};

jQuery.fn.extend({
  slider: slider
});

$.fn.extend({
  slider: slider
});

$('.slideList').slider('.slides', 'bounce', 500);
