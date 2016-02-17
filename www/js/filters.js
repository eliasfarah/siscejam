angular.module('starter.filters', []).
  filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<(?!br\s*\/?)[^>]+>/g, '') : '';
    };
  }
)