const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    .then((categories) => {
      return res.json(categories);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

//find individual category
router.get("/:id", (req, res) => {
  //be sure to include its associated Products
  Category.findOne({
    // find one category by its `id` value
    where: { id: req.params.id },
    //imported Product at top, will show products associated with this category
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => {
      return res.json(category);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
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
  Category.update(
    { category_name: req.body.category_name },
    {
      where: { id: req.params.id },
    }
  )
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

module.exports = router;
