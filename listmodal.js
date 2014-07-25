(function(window, $) {
  'use strict';

  var listModal = window.listModal = function(input_id, viewer_id) {

    var exports = {},
      $input = $(input_id),
      $viewer = $(viewer_id),
      $ul = $('<ul>');

    exports.configure = function (opts) {
      console.log(opts);
    };

    exports.populate = function(data) {

      var items = [];

      // console.log(data);
      $.each(data.files, function(i, file) {
        if (file == '.' || file == '..') return;
        var f = data.dir + (data.dir.slice(-1) != '/' ? '/' : '') + file;
        $
        items.push("<li data-path='" + f + "'>" + file + "</li>");
      });

      $viewer.html($ul.html(items.join('')));

      $viewer.find('li').click(function() {
        if ($(this).hasClass('selected')) {
          $input.val($(this).data('path'))
        } else {
          $ul.find('li').removeClass('selected');
          $(this).addClass('selected');
        }
        $input.focus();
      });

      return;
    };

    $input.keydown(function(e) {

      var key = e.keyCode,
        $listItems = $ul.find('li'),
        $selected = $listItems.filter('.selected'),
        $current;

      if (key != 40 && key != 38) return;
      // console.log($selected);

      $listItems.removeClass('selected');

      // Down key
      if (key == 40) {
        // console.log('called down')
        if (! $selected.length || $selected.is(':last-child')) {
          $current = $listItems.eq(0);
        }
        else {
          $current = $selected.nextAll("li").not(".hidden").first();
        }
      }
      // Up key
      else if (key == 38) {
        // console.log('called up')
        if (! $selected.length || $selected.is(':first-child')) {
          $current = $listItems.last();
        }
        else {
          $current = $selected.prevAll("li").not(".hidden").first();
        }
      }

      $current.addClass('selected');
    });

    return exports;
  };

}(window, $));