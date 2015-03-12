function render () {
  // Check route and display corresponding view
  var params = $.deparam(window.location.search.substr(1));

  if (params.q) {
    app.els.content.children().detach();
    app.views.search(params.q);
    app.views.results(params.q);
  }
}

// Initialize
$.ajax('templates.html').done(function (html) {
  app.templates = $(html);
  render();
});

// Handle traversing of history
window.onpopstate = render;