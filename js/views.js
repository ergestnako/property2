app.views = {
  titleLink: function () {
    app.els.appTitle.contents().wrap(app.els.appLink);
  },
  breadcrumbs: function (section) {
    if (section) {
      app.els.appCrumbText.detach();
      app.els.appCrumbLink.appendTo(app.els.appCrumb);
      app.els.crumb.text(section).appendTo(app.els.appCrumb.parent());
    } else {
      app.els.appCrumbLink.detach();
      app.els.appCrumbText.appendTo(app.els.appCrumb);
      app.els.crumb.detach();
    }
  },
  search: function (q) {
    if (q) app.els.search.val(q);
    else {
      app.els.search.val('');
      app.els.search.attr('placeholder', '1234 Market, for example');
    }
  },
  count: function (total) {
    app.els.count.find('#total').text(total);
    app.els.count.appendTo(app.els.content);
  },
  result: function (address) {
    // Clone and append to #results
    var result = app.els.result.clone();
    //console.log(address);
    var key = address.standardizedAddress;
    result.find('a').attr('href', '?' + $.param({a: key})).text(key);
    result.appendTo(app.els.results);
  },
  results: function (data) {
    if (history.replaceState && !history.state) history.replaceState(data);
    if (data.error) return app.els.content.text(data.error);
    app.els.content.empty();
    app.views.count(data.addresses.length);
    app.els.results.empty();
    data.addresses.forEach(app.views.result);
    app.els.results.appendTo(app.els.content);
  },
  address: function (data) {
    if (history.replaceState && !history.state) history.replaceState(data);
    app.els.content.empty();
    app.els.content.append(app.els.address);
  }
}
