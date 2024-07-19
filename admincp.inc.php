<?php
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
  exit('Access Denied');
}

require_once __DIR__ . '/bootstrap.php'; 

Response::view('admin');