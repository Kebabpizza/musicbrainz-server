// This file is part of MusicBrainz, the open internet music database.
// Copyright (C) 2015 MetaBrainz Foundation
// Licensed under the GPL version 2, or (at your option) any later version:
// http://www.gnu.org/licenses/gpl-2.0.txt

// FIXME
// var $ = require('jquery');
var clean = require('../common/utility/clean');

exports.errorFields = ko.observableArray([]);

exports.errorField = function (func) {
    var observable = ko.isObservable(func) ? func : ko.computed(func);
    exports.errorFields.push(observable);
    return observable;
};

exports.errorsExist = ko.computed(function () {
    var fields = exports.errorFields();

    for (var i = 0, len = fields.length; i < len; i++) {
        if (fields[i]()) {
            return true;
        }
    }

    return false;
});

exports.errorsExist.subscribe(function (value) {
    $('#page form button[type=submit]').prop('disabled', value);
});

$(document).on('submit', '#page form', function (event) {
    if (exports.errorsExist()) {
        event.preventDefault();
    }
});

$(function () {
    $('#page form :input[required]').each(function () {
        var error = exports.errorField(ko.observable(!clean(this.value)));

        $(this).on('input change', function () {
            error(!clean(this.value));
        });
    });
});

// XXX needed by inline scripts
window.MB.validation = exports;