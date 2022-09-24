const express = require("express");
const router = express.Router();
const contacts = require("../model/contact");
const user = require("../model/users");
router.use(express.json());
const { validateToken } = require("../Middlewares/AuthMiddleware");
const bodyparser = require("body-parser");
// router.use(bodyparser.json());

router.get("/username", validateToken, async (req, res) => {
  const data = await user.findOne({ _id: req.user });
  res.json(data);
});

router.get("/all", validateToken, async (req, res) => {
  try {
    const { page } = req.query;

    const data = await contacts
      .find({ userid: req.user })
      .skip((page - 1) * 10)
      .limit(10);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/alldata", validateToken, async (req, res) => {
  try {
    const data = await contacts.find({ userid: req.user })
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/add", validateToken, async (req, res) => {
  try {
    let input = Array.isArray(req.body);

    if (input) {
      let lists = req.body;
      lists.map(async (user) => {
        const data = await contacts.create({
          name: user.name,
          designation: user.designation,
          company: user.company,
          industry: user.industry,
          email: user.email,
          mobile: user.mobile,
          country: user.country,
          userid: req.user,
        });
      });
      res.json({ message: "success" });
    } else {
      const data = await contacts.create({
        name: req.body.name,
        designation: req.body.designation,
        company: req.body.company,
        industry: req.body.industry,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        userid: req.user,
      });
      res.json({ message: "success" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/delete", validateToken, async (req, res) => {
  try {
    const datas = req.body;
    if (datas.length > 0) {
      const data = await contacts.find({ userid: req.user });
      if (data) {
        datas.map(async (ids) => {
          await contacts.deleteOne({ _id: ids.id });
        });
        res.json({ message: "success", data });
      }
    } else {
      res.json("not deleted");
    }
  } catch (e) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/sdelete", validateToken, async (req, res) => {
  try {
    const datas = req.body;
    if (datas[0].id != "" && datas.length > 0) {
      const data = await contacts.find({ userid: req.user });
      if (data) {
        datas.map(async (ids) => {
          await contacts.deleteOne({ _id: ids.id });
        });
        res.json({ message: "success", data });
      }
    }
  } catch (e) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
