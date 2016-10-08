<?php

header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");

require 'lib/TwistOAuth.phar';
require 'lib/xauth.php';

$id = $_POST['id'];
$pw = $_POST['pw'];


$data = $_POST["img"];
$imageName = rand(rand(1,20),rand(100,500)).rand().".jpg";
$fp = fopen("img/" . $imageName, "w");
fwrite($fp, base64_decode($data));
fclose($fp);

try {

	$token = xauth($id,$pw);
	$to = new TwistOAuth($token->ck,$token->cs,$token->oauth_token,$token->oauth_token_secret);

    $TweetText = $_POST['text'];
    
    $to->postMultipart('statuses/update_with_media', array(
    	'status' => $TweetText,
    	'@media[]' => 'img/'.$imageName,
	));

    echo json_encode("success");

} catch(TwistException $e){
    echo json_encode($e);
}