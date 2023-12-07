const express=require("express");
const router=express.Router();
let {getAllpost,postaddpost,getonepost,deleteonepost,puteditpost}=require("../controller/post");

router.get("/",getAllpost)
router.post("/",postaddpost)
router.get("/:id",getonepost)
router.delete("/:id",deleteonepost)
 router.put("/:id",puteditpost)

module.exports=router;
