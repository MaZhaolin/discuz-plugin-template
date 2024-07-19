<?php

require_once __DIR__ . '/bootstrap.php'; 

$path = isset($_GET['s']) ? $_GET['s'] : '';

// 删除前导和尾随斜杠，确保路径格式化
$path = trim($path, '/');

// 如果路径为空，默认为访问首页
if (empty($path)) {
    $path = 'home';
}

// 解析路径，获取控制器和方法

$parts = explode('.', $path);
// 获取文件路径部分并大写首字母
$filePath = $parts[0];
$fileParts = explode('/', $filePath);
$controllerClass = ucfirst($fileParts[sizeof($fileParts) - 1]);
$className = implode('/', array_map('ucfirst', $fileParts));

// 获取方法名部分
$methodName = isset($parts[1])? $parts[1] : 'index';

// 生成完整类名
$fullClassName = $className. 'Controller';
if(!file_exists(__DIR__. '/Controllers/'. $fullClassName.'.php')){
    Response::error('Controller not found');
}

require_once __DIR__. '/Controllers/'. $fullClassName.'.php';

// 检查控制器类是否存在
if (!class_exists($controllerClass)) {
    Response::error('Controller not found');
}

// 创建控制器实例
$controller = new $controllerClass();

// 检查方法是否存在
if (!method_exists($controller, $actionName)) {
    Response::error('Method not found');
}

// 调用方法
$controller->$actionName();