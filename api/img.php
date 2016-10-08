<?php
// POSTされた画像データの取得
  $data = $_POST["data"];
    //ここに画像ファイルを判定するように何か入れて名前を決めた方がいい
    //今回はjpegのみ
    $imageName = "new.jpg";
    $fp = fopen($imageName, "w");
    fwrite($fp, base64_decode($data));
    fclose($fp);

    echo $imageName;
