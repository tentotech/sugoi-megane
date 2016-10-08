<?php

header('Content-Type: application/json; charset=UTF-8');

$pdo = new PDO('sqlite:settings.db');

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$pdo->exec("CREATE TABLE IF NOT EXISTS setting(
        sns VARCHAR,
        id VARCHAR,
        pw VARCHAR
    )");

$method = $_POST["method"];

if ($method === "POST") {

	$stmt = $pdo->prepare("SELECT * FROM setting");
    $stmt->execute();
    $reses = $stmt->fetchAll();

    foreach ($reses as $res) {
    	if($res["sns"] === $_POST["sns"]){
    		$stmt = $pdo->prepare("DELETE FROM setting WHERE sns = '".$_POST["sns"]."'");
    		$stmt->execute();
    	}
    }

	$sns = $_POST["sns"];
	$id = $_POST["id"];
	$pw = $_POST["pw"];

	$params = array($sns,$id,$pw);
	
	$stmt = $pdo->prepare("INSERT INTO setting(sns,id,pw) VALUES (?,?,?)");
    $stmt->execute($params);

    echo json_encode("posted");

}
if ($method === "GET") {

	$stmt = $pdo->prepare("SELECT * FROM setting WHERE sns = '" . $_POST["sns"] . "'");
    $stmt->execute();
    $res = $stmt->fetchAll();

	echo json_encode($res);
}