<?php
    session_start();
    unset($_SESSION['myLinks']); 
    header('Location: ../');
?>