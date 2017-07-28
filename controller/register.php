<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
$servername='localhost';
$username='root';
$password='';
$dbname='student';

$cont = mysqli_connect($servername, $username,$password,$dbname);
session_start();


if($cont->connect_error){
    die('Connection failed: '.$cont->connect_error);
}else{
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql  = "INSERT INTO `student_info` (`student_id`, `username`, `password`, `name`) VALUES (NULL, '".$username."', '".$password."', '".$name."');";
    $result = $cont->query($sql);
    // echo json_encode(array($username,$password));()
}
 $cont->close();


?>