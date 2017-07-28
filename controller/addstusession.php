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

    $subject_name = $_POST['subject_name'];
    $studentname = $_POST['studentname'];
    $score1 = $_POST['score1'];
    $score2 = $_POST['score2'];
    $score3 = $_POST['score3'];   
    $sql  = "INSERT INTO `subject` (`subject_id`, `subject_name`, `studentname`, `score1`, `score2`, `score3`) VALUES (NULL, '".$subject_name."','".$studentname."', '".$score1."', '".$score2."', '".$score3."');";
    $result = $cont->query($sql);
    if(mysqli_insert_id($cont)) {
        echo json_encode(array('status'=>'success'));exit;
    } else{
        echo 'failure';exit;
    }
    // echo json_encode(array($username,$password));()
    
}
 $cont->close();


?>

