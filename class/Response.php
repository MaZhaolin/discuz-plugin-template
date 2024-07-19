<?php

class Response
{
  public static function json($data)
  {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
  }

  public static function error($msg)
  {
    header('HTTP/1.1 400 Bad Request');
    return self::json(array('success' => false, 'message' => $msg));
  }

  public static function success($msg, $data = null)
  {
    return self::json(array('success' =>  true, 'message' => $msg, 'data' => $data));
  }

  public static function view($template)
  {
    if(PLUGIN_DEVELOPER == 1) {
      try {
        echo file_get_contents("http://localhost:5173/$template.html");
      } catch (Exception $e) {
          include template(PLUGIN_IDENTIFIER.':'.$template);
      }
      exit;
    }
    include template(PLUGIN_IDENTIFIER.':'.$template);
    exit;
  }
}