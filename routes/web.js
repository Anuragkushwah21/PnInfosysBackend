const express = require("express");
const TechnologyController = require("../Controller/TechnologyController");
const EventController = require("../Controller/EventController");
const PortfolioController = require("../Controller/PortfolioController");
const OurTeamController = require("../Controller/OurTeamController");
const PlacementController = require("../Controller/PlacementGallaryController");
const ContactController = require("../Controller/ContactController");
const UserController = require("../Controller/UserController");
const verifyToken = require("../middleware/auth");
const NoticeController = require("../Controller/NoticeController");
const StudentController = require("../Controller/StudentController");
const router = express.Router();
// User Routes

router.post("/signUp", UserController.signUp);
router.post("/signIn", UserController.signIn);
router.get("/getUser",verifyToken, UserController.getUser);
router.get("/logout",verifyToken, UserController.logOut);
// Technology ROUTES
router.post("/insertTechnology",verifyToken, TechnologyController.InsertTechnology);
router.get("/getAllTechnology", TechnologyController.GetAllTechnology);
router.delete("/deleteTechnology/:id",verifyToken, TechnologyController.DeleteTechnology);
router.post("/updateTechnology/:id",verifyToken, TechnologyController.UpdateTechnology);

// Event ROUTES
router.post("/insertEvent",verifyToken, EventController.InsertEvent);
router.get("/getAllEvent", EventController.GetAllEvent);
router.delete("/deleteEvent/:id",verifyToken, EventController.DeleteEvent);
router.post("/updateEvent/:id",verifyToken, EventController.UpdateEvent);

// Portfolio ROUTES
router.post("/insertPortfolio",verifyToken, PortfolioController.InsertPortfolio);
router.get("/getAllPortfolio", PortfolioController.GetAllPortfolio);
router.delete("/deletePortfolio/:id",verifyToken, PortfolioController.DeletePortfolio);
router.post("/updatePortfolio/:id",verifyToken, PortfolioController.UpdatePortfolio);

//Our Team ROUTES
router.post("/insertOurTeam",verifyToken, OurTeamController.InsertOurTeam);
router.get("/getAllOurTeam", OurTeamController.GetAllOurTeam);
router.delete("/deleteOurTeam/:id",verifyToken, OurTeamController.DeleteOurTeam);
router.post("/updateOurTeam/:id",verifyToken, OurTeamController.UpdateOurTeam);

//Placement Gallary ROUTES
router.post("/insertPlacement",verifyToken, PlacementController.InsertPlacement);
router.get("/getAllPlacement", PlacementController.GetAllPlacement);
router.delete("/deletePlacement/:id",verifyToken, PlacementController.DeletePlacement);
router.post("/updatePlacement/:id",verifyToken, PlacementController.UpdatePlacement);
//Notice ROUTES
router.post("/insertNotice",verifyToken,NoticeController .InsertNotice);
router.get("/getAllNotice", NoticeController.GetAllNotice);
router.delete("/deleteNotice/:id",verifyToken, NoticeController.DeleteNotice);
router.post("/updateNotice/:id",verifyToken, NoticeController.UpdateNotice);

//student  ROUTES
router.post("/insertStudent", StudentController.InsertStudent);
router.get("/getAllStudent",verifyToken, StudentController.GetAllStudent);
//Message  ROUTES
router.post("/insertMessage", ContactController.InsertMessage);
router.get("/getAllMessage",verifyToken, ContactController.GetAllMessage);

module.exports = router;
