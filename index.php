<!doctype html>
<html>
<head>
<title>Editor</title>
<link rel="stylesheet" href="style.css"/>
</head>

<body>

<div id="header">
  <input type="text" id="filename" value="">
  <button class="delete">Delete</button>
  <button class="save">Save</button>
</div>

<textarea name="code-editor" data-editor="php" class="editor"></textarea>
<div id="file-viewer" class="hidden"></div>
<div id="spinner"></div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js"></script>
<script src="spin.min.js"></script>
<script src="script.js"></script>

<script type="text/javascript">

var startpath = localStorage.getItem('path') || '<?php echo getcwd(); ?>';

</script>

</body>
</html>