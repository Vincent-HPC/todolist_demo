<?php  
  include('../db.php');
  
  
  try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[name];port=$db[port];charset=$db[charset]",
      $db['username'],$db['password']);
  } catch(PDOException $e) {
    echo "Database connection failed.";
    exit;
  }


?>
