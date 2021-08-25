<?php
header("content-type:application/json;charset-utf8");
$port = 3310;
$host = "YOU_URL_HOST:".$port;
$user = "YOU_DB_USER";
$pass = "YOU_DB_PASSWORD";
$bd = "mylinks";

$conn = @new mysqli($host, $user, $pass, $bd);
function json($error, $type = "", $message = "", $data = array(), $url = "")
{
    if (is_array($error)) {
        return json_encode($error);        
    }else{
        $json = json_encode(
            array(
                "error" => $error,
                "type" => $type,
                "message" => $message,
                "rows" => $data,
                "url" => $url
            )
        );
        return $json;
    }
}
?> 