const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  ProductTag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((productTags) => {
      return res.json(productTags);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
});

router.get("/:id", (req, res) => {
  ProductTag.findOne({
    // find a single tag by its `id`
    where: { id: req.params.id },
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  });
  .then((productTag) => {
    return res.json(productTag);
  })
  .catch((error) => {
    return res.status(500).json(error.message);
  });
});

  // create a new tag
router.post("/", (req, res) => {
ProductTag.create({ tag_name: req.body.tag_name })
.then ((productTag) => {
  return res.json(productTag);
})
.catch((error) => {
  return res.status(500).json(error.message);
});
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  ProductTag.update(
    { tag_name: req.body.tag_name },
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
  // delete on tag by its `id` value
  ProductTag.destroy({
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
