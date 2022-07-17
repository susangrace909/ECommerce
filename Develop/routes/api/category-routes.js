const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({})
    .then((categories) => {
      return res.json(categories);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
  //!! be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { id: req.params.id },
    //imported Product at top
    include: [Product],
  })
    .then((categories) => {
      return res.json(category);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
  //!! be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({ category_name: req.body.category_name })
    .then((category) => {
      return res.json(category);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((category) => {
      return res.json(category);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy(req.body, {
    where: { id: req.params.id },
  })
    .then((category) => {
      return res.json(category);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

module.exports = router;
