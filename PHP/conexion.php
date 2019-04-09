<?php
header("content-type:application/json;charset-utf8");
$host = "apps.iscorporacion.net";
$user = "semestre7";
$pass = "Semestre7*2019";
$bd = "myLinks";

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