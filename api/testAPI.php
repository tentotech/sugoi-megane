<?php

header('Content-Type: application/json; charset=UTF-8');


$a = $_POST['a'];
$b = $_POST['b'];



echo json_encode($a . " : " . $b);