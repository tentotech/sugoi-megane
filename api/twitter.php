<?php

header('Content-Type: application/json; charset=UTF-8');

require 'TwistOAuth.phar';
require 'xauth.php';

$id = $_POST['id'];
$pw = $_POST['pw'];

try {

	$token = xauth($id,$pw);
	$to = new TwistOAuth($token->ck,$token->cs,$token->oauth_token,$token->oauth_token_secret);

    $TweetText = $_POST['text'];

    $to->post('statuses/update', array('status' => $TweetText." #testHackathon"));
    
    echo json_encode("success");


} catch(TwistException $e){
    echo json_encode("error");
}