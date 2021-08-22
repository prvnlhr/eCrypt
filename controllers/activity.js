// import UserDatabase from "../models/userData.js";
const UserDatabase = require("../models/userData");

const activityController = {
  getActivities: async (req, res) => {
    try {
      // const activities = await UserDatabase.findOne(
      //   { _id: req.query.user_id },
      //   { activitiesArray }
      // );
      console.log("get activity");
      // const projection = { _id: req.query.user_id, activities: 1 };
      // const response = await UserDatabase.find().project(projection);
      const activities2 = await UserDatabase.findOne(
        { _id: req.query.user_id },
        { projection: { activities: 0 } }
        // { activities: { $slice: -20 } }
      );
      console.log("activities", activities2.activities.length);
      // res.status(200).send(activities.activitiesArray);
      res.status(200).send(activities2.activities);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  },
  addActivity: async (req, res) => {
    // console.log("Add activity controller", req.body);
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        { $push: { activitiesArray: { $each: [req.body.data], $slice: -20 } } },
        { returnOriginal: false }
      );
      // const response2 = await UserDatabase.findOneAndUpdate(
      //   { _id: req.body.user_id },
      //   {
      //     $push: {
      //       activities: req.body.dynamicActivity,
      //     },
      //   },
      //   { returnOriginal: false }
      // );
      const response2 = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            activities: { $each: [req.body.dynamicActivity], $slice: -20 },
          },
        },

        { returnOriginal: false }
      );
      // console.log("add activity response2", response2.activities);
      res.status(200).send(response2);
    } catch (error) {
      console.log("At add activity ", error);
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = activityController;
