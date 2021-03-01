// import UserDatabase from "../models/userData.js";
const UserDatabase = require("../models/userData");

const activityController = {
  getActivities: async (req, res) => {
    try {
      const activities = await UserDatabase.findOne(
        { _id: req.query.user_id },
        { activitiesArray: { $slice: -10 } }
      );
      res.status(200).send(activities.activitiesArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addActivity: async (req, res) => {
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            activitiesArray: req.body.data,
          },
        },
        { returnOriginal: false }
      );
      res.status(200).send(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

// export const getActivities = async (req, res) => {
//   try {
//     const activities = await UserDatabase.findOne(
//       { _id: req.query.user_id },
//       { activitiesArray: { $slice: -10 } }
//     );
//     res.status(200).send(activities.activitiesArray);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const addActivity = async (req, res) => {
//   try {
//     const response = await UserDatabase.findOneAndUpdate(
//       { _id: req.body.user_id },
//       {
//         $push: {
//           activitiesArray: req.body.data,
//         },
//       },
//       { returnOriginal: false }
//     );
//     res.status(200).send(response);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

module.exports = activityController;
