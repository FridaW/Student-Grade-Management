<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 

session_start();
$_SESSION = array();;
session_destroy();
session_commit();


?>