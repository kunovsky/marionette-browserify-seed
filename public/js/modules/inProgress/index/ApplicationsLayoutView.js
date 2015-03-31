var _ = require('underscore'),
    LayoutView = require('common/layoutview'),
    Collection = require('common/collection'),
    CollectionView = require('./ApplicationsCollectionView'),
    template = require('./templates/applicationLayout.hbs');

module.exports = LayoutView.extend({
  template: template,
  className: 'forms inProgressIndex container',

  regions: {
    list: '.forms__list'
  },

  initialize: function(options) {
    this.state = { start: 0, limit: 5 };
    this.state.start = (options.page - 1) * this.state.limit;
  },

  onBeforeRender: function() {
    var filtered = _.chain(this.collection.models)
      .drop(this.state.start)
      .take(this.state.limit)
      .value();

    this.filteredCollection = new Collection(filtered);
  },

  onAttach: function() {
    this.collectionView = new CollectionView({
      collection: this.filteredCollection
    });

    this.list.show(this.collectionView);
  },

  templateHelpers: function() {
    var total   = Math.floor(this.collection.length / this.state.limit) + 1;
    var current = Math.floor(this.state.start / this.state.limit) + 1;

    var pages = _.times(total, function(index) {
      return {
        current : index + 1 === current,
        page    : index + 1
      };
    });

    var prev = current - 1 > 0     ? current - 1 : false;
    var next = current + 1 < total ? current + 1 : false;

    return {
      total   : total,
      current : current,
      pages   : pages,
      prev    : prev,
      next    : next
    };
  }
});