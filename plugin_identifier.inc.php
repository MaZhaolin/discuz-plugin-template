<?php

if(!defined('IN_DISCUZ')) {
  exit('Access Denied');
}

require_once __DIR__ . '/bootstrap.php'; 

Response::view('index');