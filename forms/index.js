// // import in caolan forms
const forms = require("forms");
// // create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;
// const { fields, validators, widgets } = require("forms")

var bootstrapField = function (name, object) {
  if (!Array.isArray(object.widget.classes)) {
    object.widget.classes = [];
  }

  if (object.widget.classes.indexOf("form-control") === -1) {
    object.widget.classes.push("form-control");
  }

  var validationclass = object.value && !object.error ? "is-valid" : "";
  validationclass = object.error ? "is-invalid" : validationclass;
  if (validationclass) {
    object.widget.classes.push(validationclass);
  }

  var label = object.labelHTML(name);
  var error = object.error
    ? '<div class="invalid-feedback">' + object.error + "</div>"
    : "";

  var widget = object.widget.toHTML(name, object);
  return '<div class="form-group">' + label + widget + error + "</div>";
};

const createProductForm = (categories, tags) => {
  return forms.create({
    name: fields.string({
      required: true,
      errorAfterField: true,
      cssClasses: {
        label: ["form-label"],
      },
    }),
    base_price: fields.number({
      required: true,
      errorAfterField: true,
      cssClasses: {
        label: ["form-label"],
      },
      validators: [validators.integer()],
    }),
    description: fields.string({
      required: true,
      errorAfterField: true,
      widget: widgets.textarea(),
      cssClasses: {
        label: ["form-label"],
      },
    }),
    stock: fields.number({
      required: true,
      errorAfterField: true,
      cssClasses: {
        label: ["form-label"],
      },
    }),
    category_id: fields.string({
      label: "Category",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: categories,
      cssClasses: {
        label: ["form-label"],
      },
    }),
    tags: fields.string({
      required: true,
      errorAfterField: true,
      cssClasses: {
        label: ["form-label"],
      },
      widget: widgets.multipleSelect(),
      choices: tags,
      value: [],
    }),
  });
};

module.exports = { createProductForm, bootstrapField };
