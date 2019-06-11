(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"post\">\n  <div class=\"image-content\">\n    <img class=\"post-image\" src=\""
    + alias4(((helper = (helper = helpers.URL || (depth0 != null ? depth0.URL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"URL","hash":{},"data":data}) : helper)))
    + "\" />\n  </div>\n  <div class=\"post-content\">\n	<p class=\"post-reply\">\n	  <a href=\"/posts/"
    + alias4(((helper = (helper = helpers.reply || (depth0 != null ? depth0.reply : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reply","hash":{},"data":data}) : helper)))
    + "\"> >>"
    + alias4(((helper = (helper = helpers.reply || (depth0 != null ? depth0.reply : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reply","hash":{},"data":data}) : helper)))
    + " </a>\n	</p>\n    <p class=\"post-text\">\n      "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n    </p>\n    <p class=\"post-author\">\n      "
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "\n    </p>\n	<p class=\"post-ID\">\n	  "
    + alias4(((helper = (helper = helpers.ID || (depth0 != null ? depth0.ID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ID","hash":{},"data":data}) : helper)))
    + "\n	</p>\n  </div>\n</article>";
},"useData":true});
})();