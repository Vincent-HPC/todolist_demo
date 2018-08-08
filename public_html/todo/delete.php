<?php 
header('Content-Type: application/json; charset=utf-8');
include('../../db.php');
  
  try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",
      $db['username'],$db['password']);
  } catch(PDOException $e) {
    echo "Database connection failed.";
    exit;
  }
  
  $sql = 'DELETE FROM todos WHERE id=:id';
  $statement = $pdo->prepare($sql);
  $statement->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
  $result = $statement->execute();

  if($result) {
    // if no this line, action.js delete ajax callback func. will not
    // run $(this).closest('li').remove();
    echo json_encode(['id' => $_POST['id']]);
  }
  else {
    echo 'error';
  }


?>
