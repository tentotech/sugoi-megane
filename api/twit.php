<?php

header('Content-Type: application/json; charset=UTF-8');

require 'lib/TwistOAuth.phar';
require 'lib/xauth.php';


try {

	$token = xauth("Angular2_js","firenagi");
	$to = new TwistOAuth($token->ck,$token->cs,$token->oauth_token,$token->oauth_token_secret);

    $TweetText = $_POST['text'];

    //$media_id = $to->postMultipart('media/upload', array('@media' => 'img/' . $imageName))->media_id_string;

    //$to->post('statuses/update', array('status' => $TweetText." #testHackathon",'media_ids' => $media_id));
    
    $to->postMultipart('statuses/update_with_media', array(
    	'status' => $TweetText,
    	'@media[]' => "114754639415.jpg",
	));

    echo json_encode("success");

} catch(TwistException $e){
    echo json_encode($e);
}