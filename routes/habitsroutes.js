const express=require("express")
const router=express.Router();
const protect=require("../middleware/authmidware");

const {
    createHabit,getHabits,iscompleted,deleteroutes,editroutes
}=require("../controllers/habbit")

router.post("/",protect,createHabit)
router.get("/",protect,getHabits)
router.put("/:id/complete",protect,iscompleted)
router.delete("/:id",protect,deleteroutes)
router.put("/:id",protect,editroutes)




module.exports=router;