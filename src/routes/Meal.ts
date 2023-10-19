import express from 'express';
import { env } from '../index'

const MealRouter = express.Router();

MealRouter.get('/create-meal-plan', (req, res) => {

  console.log("hi")

  // const user = await UserModel.findOne({ username: req.body.username });
  // if (user != null) {
  //     res.status(400).json({ message: "Error username already exists" });
  // }
  // else {
  //     const saltrounds = 10;

  //     var password = req.body.password;
  //     bcrypt.hash(password, saltrounds, (error, hash) => {
  //         if (error) {
  //             console.error('Error hashing password:', error);
  //         }
  //         else {
  //             const data = new UserModel({
  //                 username: req.body.username,
  //                 password: hash,
  //                 email: req.body.email,
  //                 phone: req.body.phone
  //             });
  //             data.save();
  //             res.status(200).json({ message: "Signup Success" });
  //         }
  //     });
  // }
});

export default MealRouter;