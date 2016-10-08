<?php
date_default_timezone_set('Asia/Tokyo');
 
$username = $_POST["id"];
$password = $_POST["pw"];
$caption = $_POST["text"];


$data = $_POST["img"];
$imageName = rand(rand(1,20),rand(100,500)).rand().".jpg";
$fp = fopen("img/" . $imageName, "w");
fwrite($fp, base64_decode($data));
fclose($fp);

$post_img = $imageName;
 
/*-------------------
      sign-in
---------------------*/
 
$login_url = "https://instagram.com/api/v1/accounts/login/";
 
$guid = make_Guid();
 
$device_id = 'android-'.$guid;
 
$header = make_header("{'username':'{$username}','password':'{$password}','guid':'{$guid}','device_id':'{$device_id}','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}");
 
 
$res = json_decode(request($login_url,$header,false,true));
 
/*-------------------
     post img
---------------------*/
$upload_url = "https://instagram.com/api/v1/media/upload/";
$path = "img/".$post_img;
echo $path;
$parm = array('photo' => "@".$path ,"device_timestamp" => time());
 
$res = json_decode(request($upload_url,$parm,true,true));
$media_id = $res->media_id;
 
$configure_url = "https://instagram.com/api/v1/media/configure/";
$device_timestamp = time();
 
$header = make_header("{'guid':'{$guid}','device_id':'{$device_id}','device_timestamp':'{$device_timestamp}','media_id':'{$media_id}','caption':'{$caption}','source_type':'5','filter_type':'0','extra':'{}','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}");
 
 
$res = json_decode(request($configure_url,$header,true,true));
 
echo json_encode("success");
 
function request($url,$post_data,$cookies,$post){
 
    $agent = "Instagram 4.0.0 Android (10/3.3.3; 240; 480x320; samsung; GT-I9220; GT-I9220; smdkc210; en_US)";
 
 
    $ch = curl_init();
 
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    if($post){
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    }
 
    if($cookies) {
        curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
    } else {
        curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
    }
 
    return curl_exec($ch);
}   
 
function make_Guid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', 
            mt_rand(0, 30000), 
            mt_rand(0, 30000), 
            mt_rand(0, 30000), 
            mt_rand(17388, 78787), 
            mt_rand(34534, 69899), 
            mt_rand(0, 30000), 
            mt_rand(0, 30000), 
            mt_rand(0, 30000)
          );
 
}
function make_header($req){
    $req = str_replace("'",'"',$req);
    $sig = hash_hmac('sha256', $req, 'b4a23f5e39b5929e0666ac5de94c89d1618a2916', false);
    return 'ig_sig_key_version=4&signed_body='.$sig.'.'.str_replace("+","%20",str_replace("-","%2D",urlencode($req)));
}