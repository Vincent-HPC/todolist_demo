<?php include('header.php') ?>
<?php include('data.php') ?>



<div id="panel">
  <h1>Todo List</h1>

  <div id="todo-list">
    <ul>
      <?php  foreach ($todos as $key => $todo): ?>
        <li data-id="<?= $todo['id'] ?>">
          <div class="checkbox"></div>
          <div class="content"><?= $todo['content'] ?></div>
          <div class="actions">
            <div class="delete">x</div>
          </div>
        </li>
      <?php endforeach ?>
      
      <li class="new">
        <div class="checkbox"></div>
        <div class="content" contenteditable="true"></div>
      </li>
    </ul>
  </div>
</div>

<!-- <div class="template hide">
  <li class="complete">
    <div class="checkbox"></div>
    <div class="content"></div>
    <div class="actions">
      <div class="delete">x</div>
    </div>
  </li>
</div>  -->

<script id= "todo-list-item-template" type="text/x-handlebars-template">
  <li data-id="{{id}}" class="{{#if is_complete}}complete{{/if}}">
    <div class="checkbox"></div>
    <div class="content">{{content}}</div>
    <div class="actions">
      <div class="delete">x</div>
    </div>
  </li>
</script>

  
<?php include('footer.php') ?>
