import express from "express";
const router = express.Router();
import Category from "../models/categoryModel.js"

// create category
router.post("/", async(req, res) => {
  console.log(req.body)
  const category = new Category({
    category:req.body.category
  })
  await category.save()
  .then((result) => {
return res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({err:err})
  })
 
});

// get category
router.get("/", async(req, res) => {
const category = req.body;
await Category.find()
.then((result) => {
  return res.status(200).json({
    result:result
  })
})
.catch(err => {
  return res.status(505).json({
    err:err
  })
})
})

// delete category
router.delete("/:id", async(req, res) => {
  console.log(req.params.id)
  await Category.findByIdAndRemove(req.params.id)
  .then((result) => {
    return res.status(200).json({
      result:result
    })
  })
  .catch(err => {
    return res.status(500).json({
      err:err
  })
  })
})

export default router;
