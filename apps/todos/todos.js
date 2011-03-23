// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create();

Todos.Todo = SC.Object.extend({
  title: null,
  isDone: false
});

$(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
});

Todos.todoListController = SC.ArrayController.create({
  content: [],
  
  // Creates a new todo with the passed title, then adds it
  // to the array.
  createTodo: function (title) {
    var todo = Todos.Todo.create({ title: title });
    this.pushObject(todo);
  }
});

