<?php 
header('Content-Type: application/json; charset=utf-8');
  
  try {
    $pdo = new PDO("mysql:host=localhost;dbname=todolist_demo;port=8889;charset=utf8",
      'vincent_demo','3345678');
  } catch(PDOException $e) {
    echo "Database connection failed.";
    exit;
  }
  
  // no ` will error for 「order」 keyword
  $sql = 'INSERT INTO todos (content, is_complete, `order`)
          VALUES (:content, :is_complete, :order)';

  $statement = $pdo->prepare($sql);
  $statement->bindValue(':content', $_POST['content'], PDO::PARAM_STR);
  $statement->bindValue(':is_complete', 0, PDO::PARAM_INT);
  $statement->bindValue(':order', $_POST['order'], PDO::PARAM_INT);
  $result = $statement->execute();

  if($result) {
    echo json_encode(['id' => $pdo->lastInsertId()]);
  }
  // else {
  //   var_dump($pdo->errorInfo());
  // }

?>
