// import UserDatabase from "../models/userData.js";
const UserDatabase = require("../models/userData");

const activityController = {
  getActivities: async (req, res) => {
    try {
      const activities = await UserDatabase.findOne(
        { _id: req.query.user_id },
        { activitiesArray: { $slice: -10 } }
      );
      const activities2 = await UserDatabase.findOne(
        { _id: req.query.user_id },
        { activities: { $slice: -10 } }
      );
      // console.log("activities", activities2.activities);
      // res.status(200).send(activities.activitiesArray);
      res.status(200).send(activities2.activities);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addActivity: async (req, res) => {
    // console.log("Add activity controller", req.body);
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        { $push: { activitiesArray: { $each: [req.body.data], $slice: -10 } } },
        { returnOriginal: false }
      );
      const response2 = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            activities: req.body.dynamicActivity,
          },
        },
        { returnOriginal: false }
      );
      // console.log("add activity response2", response2.activities);
      res.status(200).send(response);
    } catch (error) {
      console.log("At add activity ", error);
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = activityController;
