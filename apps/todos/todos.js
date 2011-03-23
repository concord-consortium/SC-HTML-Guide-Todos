// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create();

jQuery(document).ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
});
