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
    
    $sql = "select * from subject where subject_name='$subject_name' and studentname='$studentname'";
   
    $result = $cont->query($sql);
    if ($result->num_rows > 0) {
            # code...
            $arr = [];
            $inc = 0;
            $user_id = '';
            while ($row = $result->fetch_assoc()) {
                # code...
                $jsonArrayObject = (array('subject_name' => $row["subject_name"], 'studentname' => $row["studentname"],'score1' => $row["score1"],'score2' => $row["score2"],'score3' => $row["score3"],'average_score'=> $row["average_score"]));
                $arr[$inc] = $jsonArrayObject;
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
    
    // echo json_encode(array($username,$password));()
}

 $cont->close();


?>