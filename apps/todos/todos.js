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
  },
  
  remaining: function () {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),
  
  clearCompletedTodos: function () {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },
  
  allAreDone: function (key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);
      return value;
    }
    else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});

Todos.CreateTodoView = SC.TemplateView.extend(SC.TextFieldSupport, {
  // handle 'insertNewline' event from SC.TextFieldSupport
  insertNewline: function () {
    console.log('newline!');
    var value = this.get('value');
    
    if (value) {
      Todos.todoListController.createTodo(value);
      this.set('value', '');
    }
  }
});

Todos.todoListView = SC.TemplateCollectionView.create({
  contentBinding: 'Todos.todoListController'
});

Todos.CheckboxView = SC.TemplateView.extend(SC.CheckboxSupport, {
  valueBinding: '.parentView.content.isDone'
});

Todos.statsView = SC.TemplateView.create({
  remainingBinding: 'Todos.todoListController.remaining',
  
  displayRemaining: function () {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining').cacheable()
});

Todos.clearCompletedView = SC.TemplateView.create({
  mouseUp: function () {
    Todos.todoListController.clearCompletedTodos();
  }
});

Todos.markAllDoneView = SC.TemplateView.create(SC.CheckboxSupport, {
  valueBinding: 'Todos.todoListController.allAreDone'
});
