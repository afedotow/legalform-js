'use strict';

describe("check FormModel methods for legal-form model", function() {
    var jQuery;
    var FormModel = require('../js/model/form-model');

    beforeAll(function(done) {
        require("jsdom").env("", function(err, window) {
            if (err) {
                return;
            }

            jQuery = require("jquery")(window);
            done();
        });
    });

    it("should use legal-form model", function() {
        var definition = [
            {
                "fields" : [
                    {}
                ]
            }
        ];

        var model = (new FormModel(definition)).getModel();
        expect(model.type).toEqual('legal_form');
    });

    it("should use legal-form model by default", function() {
        var definition = [
            {

            }
        ];

        var model = (new FormModel(definition)).getModel();
        expect(model.type).toEqual('legal_form');
    });

    it("should correctly get step anchor", function() {
        var definition = [
            {
                "article" : "12"
            },
            {
                "article" : "34"
            },
            {

            }
        ];

        var model = (new FormModel(definition)).getModel();

        expect(model.getStepAnchor(definition[0])).toEqual('12');
        expect(model.getStepAnchor(definition[1])).toEqual('34');
        expect(model.getStepAnchor(definition[2])).toEqual(undefined);
    });

    it("should correctly get field type", function() {
        var definition = [
            {
                "fields" : [
                    {
                        "type" : "text"
                    }
                ]
            }
        ];

        var model = (new FormModel(definition)).getModel();
        var field = definition[0]['fields'][0];

        expect(model.getFieldType(field)).toEqual('text');
    });

    it("should correctly get amount units", function() {
        var definition = [
            {
                "fields" : [
                    {
                        "optionValue" : ["test_singular1", "test_singular2"],
                        "optionText" : ["test_plural1", "test_plural2"]
                    }
                ]
            }
        ];

        var model = (new FormModel(definition)).getModel();
        var field = definition[0]['fields'][0];

        expect(model.getAmountUnits(field)).toEqual([
            {"singular" : "test_singular1", "plural" : "test_plural1"},
            {"singular" : "test_singular2", "plural" : "test_plural2"}
        ]);
    });

    it("should correctly get list options", function() {
        var definition = [
            {
                "fields" : [
                    {
                        "optionValue" : ["test_value1", "test_value2"],
                        "optionText" : ["test_text1", "test_text2"]
                    }
                ]
            }
        ];

        var model = (new FormModel(definition)).getModel();
        var field = definition[0]['fields'][0];

        expect(model.getListOptions(field)).toEqual([
            {name: "test_text1", value: "test_value1"},
            {name: "test_text2", value: "test_value2"}
        ]);
    });

    it("should correctly get list selected values", function() {
        var definition = [
            {
                "fields" : [
                    {
                        "value" : "some value"
                    }
                ]
            }
        ];

        var model = (new FormModel(definition)).getModel();
        var field = definition[0]['fields'][0];

        expect(model.getListSelectedValues(field)).toEqual("some value");
    });

    it("should correctly get likert questions and answers", function() {
        var definition = [
            {
                "fields" : [
                    {
                        "keys" : `
                            first question
                            second question
                            third question
                        `,
                        "values" : `
                            first answer
                            second answer
                            third answer
                        `
                    }
                ]
            }
        ];

        var model = (new FormModel(definition)).getModel();
        var field = definition[0]['fields'][0];

        expect(model.getLikertData(field)).toEqual({
            "keys" : [
                "first question",
                "second question",
                "third question",
            ],
            "values" : [
                "first answer",
                "second answer",
                "third answer",
            ]
        });
    });
});
