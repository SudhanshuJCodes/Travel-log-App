const express = require("express");
const router = express.Router();
const { createTour, getTours, getTour, getToursByUser, deleteTour, updateTour, getToursBySearch, getToursByTag, getRelatedTours, likeTour } = require('../controllers/tours.js');
const auth = require("../middleware/auth.js");


router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);
router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/like/:id", auth, likeTour);

module.exports = router;