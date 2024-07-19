<?php

if(!defined('IN_DISCUZ')) {
  exit('Access Denied');
}

class Index {

  public function __construct() {
    global $_G;
    if(!$_G['adminid']) {
      Response::error('Access Denied');
    }
  }

  public function index() {
    Response::success('success');
  }
}