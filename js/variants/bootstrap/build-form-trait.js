if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = BootstrapBuildFormTrait;

    var strbind = require('../../lib/strbind');
    var attrString = require('../../lib/attr-string');
}

/**
 * Build form fields
 */
function BootstrapBuildFormTrait() {
    this.buildLabel = function(fieldType, data, mode) {
        if (fieldType === 'checkbox' || !data.label) return null;

        var label =
            (mode === 'build' ? '<label' : '<label for="' + data.id + '"') +
            (fieldType === 'money' ? ' class="label-addon">' : '>') +
            data.label +
            (data.required ? ' <span class="required">*</span>' : '') +
            '</label>';

        return label;
    }

    this.wrapField = function(html) {
        return '<div class="form-group" data-role="wrapper">\n' + html + '\n</div>';
    }

    this.buildTextFieldTmpl = function() {
        return '<input class="form-control" %s %s>';
    }

    this.buildAmountField = function(data, units, attrs, excl, mode) {
        var input_amount = strbind('<input class="form-control" name="%s" value="%s" %s %s>', data.name + '.amount', mode === 'build' ? (data.value || '') : '{{ ' + data.nameNoMustache + '.amount }}', attrString(attrs, excl), attrString(data, excl + 'type;id;name;value'));
        var input_unit;

        if (units.length === 1) {
            input_unit = strbind('<span class="input-group-addon">%s</span>', mode === 'build' ? units[0].singular : '{{ ' + data.nameNoMustache + '.unit }}');
        } else {
            input_unit = '\n' + strbind('<div class="input-group-btn"><button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">%s </button>', mode === 'build' ? units[0].singular : '{{ ' + data.nameNoMustache + '.unit }}') + '\n';
            if (mode === 'use') {
                input_unit += strbind('<ul class="dropdown-menu pull-right dropdown-select" data-name="%s" role="menu">', data.name + '.unit') + '\n'
                input_unit += '{{# %s.amount == 1 ? meta.%s.singular : meta.%s.plural }}<li><a>{{ . }}</a></li>{{/ meta }}'.replace(/%s/g, data.nameNoMustache) + '\n';
                input_unit += '</ul>' + '\n'
            }
            input_unit += '</div>' + '\n';
        }

        return strbind('<div class="input-group" %s>' + input_amount + input_unit + '</div>', mode === 'build' ? attrString({id: data.id}) : '');
    }

    this.buildDateFieldTmpl = function(data, attrs, mode) {
        if (data.yearly) attrs['data-mask'] = '99-99';

        var pickerAttr = mode === 'build' ? '' : 'data-picker="date"';

        return `<div class="input-group" ${pickerAttr} %s><input class="form-control" %s %s><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div>`;
    }

    this.buildMoneyFieldTmpl = function() {
        return '<div class="input-group"><span class="input-group-addon">%s</span><input class="form-control" %s %s></div>';
    }

    this.buildTextareaTmpl = function() {
        return '<textarea class="form-control" %s %s></textarea>';
    }

    this.buildSelectTmpl = function(options) {
        return '<select class="form-control" %s >\n' + options + '</select>'
    }
}
