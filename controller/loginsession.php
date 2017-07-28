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
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $sql = "select * from student_info where username='$username' and password='$password'";
    $result = $cont->query($sql);
    if ($result->num_rows > 0) {
            # code...
            $arr = [];
            $inc = 0;
            $student_id = '';
            while ($row = $result->fetch_assoc()) {
                # code...
                $jsonArrayObject = (array('username' => $row["username"], 'password' => $row["password"],'student_id'=>$row["student_id"]));
                $arr[$inc] = $jsonArrayObject;
                $inc++;
                $student_id = $row['student_id'];
            }
            $_SESSION['student_id'] = $student_id;
            $json_array = json_encode($arr);
            echo $json_array;
        }
        else{
            echo "null";
        }   
}

 $cont->close();


?>
