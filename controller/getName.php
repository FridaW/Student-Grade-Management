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
       $sql = "SELECT DISTINCT studentname FROM subject WHERE subject_name = '".$subject_name."'";
       $result = $cont->query($sql);
    if ($result->num_rows > 0) {
            # code...
            $arr = [];
            $inc = 0;
            $user_id = '';
            while ($row = $result->fetch_assoc()) {
                # code...
                 
                $arr[$inc] = $row["studentname"];
                $inc++;
                //$user_id = $row['userid'];
            }
            //$_SESSION['user_id'] = $user_id;
            $json_array = json_encode($arr);
            echo $json_array;
        }
        else{
            echo "null";
        }


      // echo json_encode($class);
    // echo json_encode(array($username,$password));()
}

 $cont->close();


?>