<?php

$bbbroom = $_GET['room'];

$url = "https://fsinfo.uni-passau.de/" . $bbbroom;

try {
    if (in_array ('curl', get_loaded_extensions())) {
        $c = curl_init($url);
        $h[] = "Accept-Language: en,en-US";
        curl_setopt($c, CURLOPT_HTTPHEADER, $h);
        $content = curl_exec($c);
    } else {
        $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\nAccept-language: en,en-US\r\n')));
        $content = file_get_contents($url,false,$context);
    }
    if ($content === false) {
        // Handle the error
        echo "Error";
    } else {
       preg_match('#<button[^>]*class="[^>"]*join-form[^>]*>\s*([^\s]*)\s*<\/button>#i',$content,$matches);
       echo $matches[1];
    }
} catch (Exception $e) {
  // Handle the error
  echo "Error";
}
?>
