<?php

function dd($var)
{
  dump($var);
  exit;
}

function input($key = null, $default = '')
{
  $get_params = $_GET;
  $post_params = $_POST;
  $params = array_merge($get_params, $post_params);
  if(!$key) return $params;
  return isset($params[$key]) ? $params[$key] : $default;
}

function get_plugin_setting($key = null, $default = '')
{
  global $_G;
  $setting = $_G['setting']['plugin'][PLUGIN_IDENTIFIER];
  if(!$key) return $setting;
  return isset($setting[$key])? $setting[$key] : $default;
}