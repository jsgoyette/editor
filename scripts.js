// Hook up ACE editor to all textareas with data-editor attribute
  $('textarea[data-editor]').each(function () {
    var textarea = $(this);

    var mode = textarea.data('editor');

    var editDiv = $('<div>', {
      position: 'absolute',
      width: '100%',
      height: '95%',
      'class': textarea.attr('class')
    }).insertBefore(textarea);

    textarea.css('display', 'none');

    editor = ace.edit(editDiv[0]);
    editor.renderer.setShowGutter(true);
    editor.getSession().setValue(textarea.val());
    editor.getSession().setMode("ace/mode/" + mode);
    editor.session.setUseWrapMode(true);
    editor.setTheme("ace/theme/twilight");

    // copy back to textarea on form submit...
    textarea.closest('form').submit(function () {
      textarea.val(editor.getSession().getValue());
    })

  });