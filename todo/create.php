<?php 

  try {
    $pdo = new PDO("mysql:host=localhost;dbname=todolist_demo;port=8889;charset=utf8",
      'vincent_demo','3345678');
  } catch(PDOException $e) {
    echo "Database connection failed.";
    exit;
  }
  

  // $_POST['todo'];


?>
