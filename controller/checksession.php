<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 

session_start();
        if( isset($_SESSION['student_id']) )  {
            echo json_encode(array('status'=>'loggedin'));exit;
        } else {
            echo json_encode(array('status'=>'logout'));exit;
        }
?>