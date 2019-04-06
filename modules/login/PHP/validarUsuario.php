<?php
    session_start();
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        $email = $_POST["email"];
        $contra = MD5($_POST["contra"]);
        $sql = "SELECT * FROM usuario WHERE email='$email'";
        $resultado = $conn->query($sql);
        if($resultado->num_rows){
            $usuario = $resultado->fetch_array(MYSQLI_ASSOC);
            if($usuario["contra"]==$contra){
                if(!$usuario["estado"]){
                    echo json(204,"warning",'Tu cuesta no esta activa');
                }else{
                    $data = array(
                        "id"=>$usuario["id"],
                        "email"=>$usuario["email"],
                        "nombre"=>$usuario["nombre"],
                        "estado"=>$usuario["estado"]
                    );
                    $_SESSION['myLinks'] = $data;
                    $nombre = explode(" ",$data["nombre"]);
                    echo json(201,"success",'Bienvenido '.$nombre[0].', te dirigiremos a tu perfil',$data,"../perfil");
                }
            }else{
                echo json(204,"warning",'Contraseña incorrecta');
            }
        }else{
            echo json(204,"warning","El correo ".$email.' No esta registrado aun <a  href="../registro">Registrar</a>');
        }
    }
?>