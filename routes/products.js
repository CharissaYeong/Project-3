const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

// #1 import in the Product model
const { Product, Category, Tag } = require("../models");
const { bootstrapField, createProductForm } = require("../forms");
const { TIMESTAMP } = require("mysql/lib/protocol/constants/types");
const moment = require('moment-timezone');

router.get("/", async (req, res) => {
  // #2 - fetch all the products (ie, SELECT * from products)
  let products = await Product.collection().fetch({
    withRelated: ["category", "tags"],
  });
  res.render("products/index", {
    products: products.toJSON(),
  });
});

router.get("/create", async (req, res) => {
  const allCategories = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("name")];
  });
  const allTags = await Tag.fetchAll().map((tag) => [
    tag.get("id"),
    tag.get("name"),
  ]);
  const productForm = createProductForm(allCategories, allTags);
  res.render("products/create", {
    form: productForm.toHTML(bootstrapField),
  });
});

router.post("/create", async (req, res) => {
  // const allCategories = await Category.fetchAll().map((category) => {
  //   return [category.get("id"), category.get("name")];
  // });
  // const productForm = createProductForm(allCategories);

  const productForm = createProductForm();

  productForm.handle(req, {
    success: async (form) => {
      let { tags, ...productData } = form.data;
      productData.modified = moment().tz('Asia/Singapore').toDate()
      const product = new Product(productData);
      // product.set("name", form.data.name);
      // product.set("base_price", form.data.base_price);
      // product.set("description", form.data.description);
      // product.set("stock", form.data.stock);
      await product.save();
      if (tags) {
        await product.tags().attach(tags.split(","));
      }
      res.redirect("/products");
    },
    empty: async (form) => {
      res.render("products/create", {
        form: form.toHTML(bootstrapField),
      });
    },
    error: async (form) => {
      res.render("products/create", {
        form: form.toHTML(bootstrapField),
      });
    },
  });
});

router.get("/:product_id/update", async (req, res) => {
  // retrieve the product
  const productId = req.params.product_id;
  const product = await Product.where({
    id: productId,
  }).fetch({
    require: true,
    withRelated: ["tags"],
  });

  // fetch all the categories
  const allCategories = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("name")];
  });

  // fetch all the tags
  const allTags = await Tag.fetchAll().map((tag) => [
    tag.get("id"),
    tag.get("name"),
  ]);

  const productForm = createProductForm(allCategories, allTags);

  // fill in the existing values
  Object.keys(productForm.fields).forEach((field) => {
    productForm.fields[field].value = product.get(field);
  });

  // fill in the multi-select for the tags
  let selectedTags = await product.related("tags").pluck("id");
  productForm.fields.tags.value = selectedTags;

  res.render("products/update", {
    form: productForm.toHTML(bootstrapField),
    product: product.toJSON(),
  });
});

router.post("/:product_id/update", async (req, res) => {
  const allCategories = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("name")];
  });

  // fetch the product that we want to update
  const product = await Product.where({
    id: req.params.product_id,
  }).fetch({
    require: true,
    withRelated: ["tags"],
  });

  // process the form
  const productForm = createProductForm(allCategories);
  productForm.handle(req, {
    success: async (form) => {
      let { tags, ...productData } = form.data;
      productData.modified = moment().tz('Asia/Singapore').toDate()
      product.set(productData);
      // product.set('modified', new Date().toISOString());

      product.save();

      // update the tags

      let tagIds = tags.split(",");
      let existingTagIds = await product.related("tags").pluck("id");

      // remove all the tags that aren't selected anymore
      let toRemove = existingTagIds.filter(
        (id) => tagIds.includes(id) === false
      );
      await product.tags().detach(toRemove);

      // add in all the tags selected in the form
      await product.tags().attach(tagIds);

      res.redirect("/products");
    },
    empty: async (form) => {
      res.render("products/update", {
        form: form.toHTML(bootstrapField),
        product: product.toJSON(),
      });
    },
    error: async (form) => {
      res.render("products/update", {
        form: form.toHTML(bootstrapField),
        product: product.toJSON(),
      });
    },
  });
});

router.get("/:product_id/delete", async (req, res) => {
  // fetch the product that we want to delete
  const product = await Product.where({
    id: req.params.product_id,
  }).fetch({
    require: true,
  });

  res.render("products/delete", {
    product: product.toJSON(),
  });
});

router.post("/:product_id/delete", async (req, res) => {
  // fetch the product that we want to delete
  const product = await Product.where({
    id: req.params.product_id,
  }).fetch({
    require: true,
  });
  await product.destroy();
  res.redirect("/products");
});

module.exports = router; // #3 export out the router
