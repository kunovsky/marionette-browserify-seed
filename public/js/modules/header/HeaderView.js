var _ = require('underscore'),
    Backbone = require('backbone'),
    View = require('common/view'),
    template = require('./templates/header.hbs');

module.exports = View.extend({
  template: template,
  tagName: 'nav',
  className: 'header navbar navbar-default navbar-fixed-top',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    'all': 'render'
  },

  templateHelpers: function() {
    return {
      stepName: 'Welcome',
      primaryItems: this.serializeWhere({
        type: 'primary'
      }),
      secondaryItems: this.serializeWhere({
        type: 'secondary'
      })
    };
  },

  serializeWhere: function(props) {
    return _.invoke(this.collection.where(props), 'toJSON');
  },

  ui: {
    collapse: '#navbar-collapse'
  },

  events: {
    'show.bs.collapse #navbar-collapse': 'onCollapseShow'
  },

  onCollapseShow: function() {
    this.listenToOnce(Backbone.history, 'route', function() {
      this.ui.collapse.collapse('hide');
    });
  }
});
