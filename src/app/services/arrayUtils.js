
/**
 * @fileoverview Service for array utility methods.
 * @link http://google.github.io/styleguide/javascriptguide.xml
 * @link http://google.github.io/styleguide/angularjs-google-style.html
 */

(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('ArrayUtils', ArrayUtils);

  /* @ngInject */
  function ArrayUtils() {
    /** @type {!Object} */ var service = {};

    /**
     * Creates map from list of objects by given key.
     * @param {!Array} data
     * @param {string} key
     * @return {!Object}
     */
    service.createListMap = function(data, key) {
      /** @type {!Object} */ var result = {};

      for (/** @type {number} */ var i = 0; i < data.length;) {
        /** @type {Object} */ var item = data[i++];
        result[item[key]] = item;
      }

      return result;
    };

    /**
     * Extracts a list of property values.
     * @param {!Array} array
     * @param {string} prop
     * @return {!Array}
     */
    service.pluck = function(array, prop) {
      /** @type {!Array} */ var result = [];

      for (/** @type {number} */ var i = 0; i < array.length; i++) {
        /** @type {*} */ var value = array[i][prop];
        if (value) {
          result.push(value);
        }
      }

      return result;
    };

    /**
     * Finds object in the list of objects by given key and value.
     * @param {Array.<!Object>} list
     * @param {string} key
     * @param {*} value The value of the key to check equality.
     * @return {Object}
     */
    service.findByKey = function(list, key, value) {
      for (/** @type {number} */ var i = 0; i < list.length; i++) {
        /** @type {Object} */ var item = list[i];
        if (value === item[key]) {
          return item;
        }
      }
    };

    /**
     * Splits a list into grouped sets.
     * @param {Array} items
     * @param {string} prop
     * @return {Object}
     */
    service.groupBy = function(items, prop) {
      /** @type {!Object} */ var result = {};

      for (/** @type {number} */ var i = 0; i < items.length;) {
        /** @type {Object} */ var item = items[i++];

        if (prop in item) {
          if (angular.isArray(result[item[prop]])) {
            result[item[prop]].push(item);
          } else {
            result[item[prop]] = [item];
          }
        }
      }

      return result;
    };

    service.uniqueBy = function(array) {
      var seen = {};
      return array.filter(function(item) {
        var k = JSON.stringify(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      });
    };

    return service;
  }
})();
