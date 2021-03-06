var editor = '';

var spinnerOpts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: -1, // 1: clockwise, -1: counterclockwise
  color: '#333', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: true, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

var lm = listModal('#filename', '#file-viewer');

$(function () {

  var active = false;

  var getlist = function(f) {
    if (!active) {
      // console.log('getting list');
      active = true;
      $.post('/controller.php', {
        list: f
      }).done(function(data) {
        // console.log(data);
        // $('#file-viewer').html('<pre>'+data+'</pre>');
        lm.populate(JSON.parse(data));
        active = false;
      });
    }
  };

  var get = function(f) {
    $.post('/controller.php', {
      get: f
    }).done(function(data) {
      // console.log(data);
      localStorage.setItem('path', f);
      editor.getSession().setValue(data);
    });
  };

  var save = function() {
    var target = document.getElementById('spinner');
    var spinner = new Spinner(spinnerOpts).spin(target);
    $.post('/controller.php', {
    // $.post('/?entryPoint=editor_controller', {
      name: $('#filename').val() ,
      put: editor.getSession().getValue()
    }).done(function(data) {
      // console.log(data);
      spinner.stop();
    });
  };

  var unlink = function() {
    var target = document.getElementById('spinner');
    var spinner = new Spinner(spinnerOpts).spin(target);
    var f = $('#filename').val();
    $.post('/controller.php', {
    // $.post('/?entryPoint=editor_controller', {
      unlink: f,
    }).done(function(data) {
      // console.log(data);
      get(f);
      spinner.stop();
    });
  };

  $('#filename').val(startpath);
  get(startpath);

  $('body').keyup(function(e) {
    if (e.which == 27) {
      $('#file-viewer').addClass('hidden');
      editor.focus();
    }
  });

  $('#filename').keyup(function(e) {
    $('#file-viewer').removeClass('hidden');
    var $selected = $('#file-viewer li').filter('.selected');
    if (e.which == 13) {
      if ($selected.data('path')) {
        $selected.removeClass('selected');
        $(this).val($selected.data('path'));
        $(this).focus();
        getlist($(this).val());
      }
      else {
        $('#file-viewer').addClass('hidden');
        // console.log($(this).val());
        get($(this).val());
        editor.focus();
      }
    } else if (e.which != 40 && e.which != 38) {
      getlist($(this).val());
    }
  });

  $('.save').click(function() {
    save();
  });

  $('.delete').click(function() {
    if (confirm('Do you want to delete this file?')) {
      unlink();
    }
  });

  // Hook up ACE editor to all textareas with data-editor attribute
  $('textarea[data-editor]').each(function () {
    var textarea = $(this);

    var mode = textarea.data('editor');

    var editDiv = $('<div>', {
      position: 'absolute',
      width: '100%',
      height: '92%',
      'class': textarea.attr('class')
    }).insertBefore(textarea);

    textarea.css('display', 'none');

    editor = ace.edit(editDiv[0]);
    editor.renderer.setShowGutter(true);
    editor.getSession().setValue(textarea.val());
    editor.getSession().setMode("ace/mode/" + mode);
    editor.setHighlightActiveLine(true);
    editor.session.setUseWrapMode(true);
    editor.setTheme("ace/theme/crimson_editor");
    // tomorrow_night solarized_dark

    // copy back to textarea on form submit...
    textarea.closest('form').submit(function () {
      textarea.val(editor.getSession().getValue());
    });

    editor.commands.addCommand({
      name: "save",
      bindKey: {win: "Ctrl-R", mac: "Command-Option-S"},
      exec: function(editor) {
        save();
      }
    });

    editor.commands.addCommand({
      name: "go",
      bindKey: {win: "Ctrl-R", mac: "Command-Option-G"},
      exec: function(editor) {
        $('#filename').focus();
      }
    });

  });

});
