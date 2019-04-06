<?php
    session_start();
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        if(isset($_SESSION['myLinks'])){
            $icono = $_POST["icono"];
            $titulo = $_POST["titulo"];
            $url = $_POST["url"];
            $descripcion = $_POST["descripcion"];
            $usuario_id = $_SESSION['myLinks']['id'];
            $id = $_POST["id"];
            $sql = "SELECT * FROM link WHERE titulo = '$titulo' AND usuario_id ='$usuario_id';";
            $resultado = $conn->query($sql);            
            if($resultado->num_rows){
                $link = $resultado->fetch_array(MYSQLI_ASSOC);
                if($id === $link["id"]){
                    $sql = "UPDATE link SET icono='$icono',titulo='$titulo',url='$url',descripcion='$descripcion' WHERE id='$id'";
                    if($conn->query($sql) === TRUE){
                        echo json(200,"success","Link Actualizado",[],"../perfil");
                    }else{
                        echo json(500,"error","No se pudo actualizar el link: ".$conn->error.$sql);
                    }
                }else{
                    echo json(500,"warning","Ya creaste un link con el nombre ".$titulo);
                }
            }else{
                $sql = "UPDATE link SET icono='$icono',titulo='$titulo',url='$url',descripcion='$descripcion' WHERE id='$id'";
                if($conn->query($sql) === TRUE){
                    echo json(200,"success","Link Actualizado",[],"../perfil");
                }else{
                    echo json(500,"error","No se pudo actualizar el link: ".$conn->error.$sql);
                }
            }            
        }else{
            echo json(201,"error",'No has iniciado sesión',[],"/modules/login");
        }        
    }
?>