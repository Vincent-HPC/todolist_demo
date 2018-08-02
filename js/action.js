$(document).ready(function () {

  // todo list item structure,it's fix template
  var source = $('#todo-list-item-template').html();
  var todoTemplate = Handlebars.compile(source);

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
          todo = {
            is_complete: false,
            content: todo,
          };
          var li = todoTemplate(todo);
          $(e.currentTarget).closest('li').before(li);
        }
        // var context = {title: "My New Post", body: "This is my first post!"};
        // var html    = template(context);

        // clear new todo item
        $(e.currentTarget).empty();
      } // update
      else {
        $(this).prop('contenteditable', false);
      }
    })
    // delete
    .on('click', '.delete', function (e) {
      var result = confirm('do you want to delete?');
      if (result) {
        $(this).closest('li').remove();
      }
    })

});
