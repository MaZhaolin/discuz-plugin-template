<?php

if(!defined('IN_DISCUZ')) {
  exit('Access Denied');
}

error_reporting(E_ALL);

define('PLUGIN_IDENTIFIER', 'plugin_identifier');

require_once __DIR__ . '/vendor/autoload.php'; 
require_once __DIR__. '/functions/utils.php';
require_once __DIR__. '/class/Response.php';