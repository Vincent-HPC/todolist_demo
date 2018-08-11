$(document).ready(function () {

  // todo list item structure,it's fix template
  var source = $('#todo-list-item-template').html();
  var todoTemplate = Handlebars.compile(source);

  // prepare all todo list items
  var todoListUI = '';
  $.each(todos, function (index, todo) {
    todoListUI = todoListUI + todoTemplate(todo); // --> output html strings
  });
  $('#todo-list').find('li.new').before(todoListUI);


  // enter editor mode
  $('#todo-list')
    .on('dblclick', '.content', function (e) {
      $(this).prop('contenteditable', true).focus();
    })
    .on('blur', '.content', function (e) {
      var isNew = $(this).closest('li').is('.new');

      // create
      if (isNew) {
        var todo = $(e.currentTarget).text();
        todo = todo.trim();

        if (todo.length > 0) {
          var order = $('#todo-list').find('li:not(.new)').length + 1;
          // AJAX: create API
          $.post("todo/create.php", { // send data to create.php
              content: todo,
              order: order
            },
            function (data, textStatus, xhr) { // after ajax code, reiceive data from create.php
              todo = {
                id: data.id,
                is_complete: false,
                content: todo,
              };
              var li = todoTemplate(todo);
              $(e.currentTarget).closest('li').before(li);
            },
            "json"
          );
        }
        $(e.currentTarget).empty();
      } // update
      else {
        // AJAX call
        var id = $(this).closest('li').data('id');
        var content = $(this).text();
        $.post("todo/update.php", { //send data to update.php
          id: id,
          content: content
        });

        $(this).prop('contenteditable', false);
      }
    })
    // delete
    .on('click', '.delete', function (e) {
      // confirm is JS inside building library
      var result = confirm('do you want to delete?');
      if (result) {
        // AJAX call
        var id = $(this).closest("li").data("id");
        $.post("todo/delete.php", {
            id: id
          },
          function (data, textStatus, jqXHR) {
            console.log("delete");
            $(e.currentTarget).closest('li').remove();
            // if use$(this).closest.... => here "this" point the func.
          }
        );
      }
    })
    // complete
    .on('click', '.checkbox', function (e) {
      // AJAX call
      var id = $(this).closest('li').data('id');
      $.post("todo/complete.php", {
          id: id
        },
        function (data, textStatus, jqXHR) {
          $(e.currentTarget).closest('li').toggleClass('complete'); // not use addClass()!
        }
      );
    });

  $('#todo-list').find('ul').sortable({
    items: 'li:not(.new)',
    stop: function () {
      var orderPair = [];
      $('#todo-list').find('li:not(.new)').each(function (index, li) {
        orderPair.push({
          id: $(li).data('id'),
          order: index + 1 // I define index from 1 to ~
        });
      });

      $.post("todo/sort.php", {
        orderPair: orderPair
      });
    },
  });
});
