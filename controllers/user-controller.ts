import UserModel, { IUser } from "../models/UserModel";
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import contactEmail from "../utils/mail";
import validationErrorHandler from "../utils/validation-error-handler";

const tokenSecret = process.env.JWT_SECRET || "local_secret";

const signup: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { email, password } = req.body;

  try {
    let existingUser = await UserModel.findOne({ email });

    if (existingUser !== null) {
      return res.status(422).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    let newUser = await UserModel.create({ email, password: hashedPassword });

    let token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      tokenSecret,
      { expiresIn: "1h" }
    );

    const mail = {
      from: `admin@test.com`,
      to: "luciano.anderson45@ethereal.email",
      subject: "New User Created",
      html: `
             <p>Email: ${email}</p>
             <p>password: ${password}</p>
             <p>date: ${new Date().toLocaleString()}</p>
             `
    };

    contactEmail.sendMail(mail);

    res.status(201).json({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username || "",
      token: token,
      loginAt: newUser.loginAt,
      deactivated: newUser.isDeactivated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user === null) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    user.loginAt = new Date(Date.now());
    await user.save();

    let token = jwt.sign({ userId: user.id, email: user.email }, tokenSecret, {
      expiresIn: "1h"
    });

    res.json({
      ...user,
      userId: user.id,
      email: user.email,
      username: user.username || "",
      name: user.name || "",
      token: token,
      loginAt: user.loginAt,
      isDeactivated: user.isDeactivated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  const { username, email, uid: id, name } = req.body;
  console.log(req.body);
  try {
    let user = await UserModel.findById(id);

    if (user === null) {
      return res.status(401).json({ message: "User not found" });
    }

    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (name !== undefined) user.name = name;

    let updatedUser = await user.save();

    res.status(201).json({
      username: updatedUser.username || "",
      name: updatedUser.name || "",
      email: updatedUser.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const { id, currentPassword, newPassword } = req.body;

  try {
    let user = await UserModel.findById(id);

    if (user === null) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "The current password is incorrect" });
    }

    let hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(201).json({ message: "Successfully changed password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActiveStatus: RequestHandler = async (req, res, next) => {
  const { id, password, deactivate } = req.body;

  try {
    let user = await UserModel.findById(id);

    if (user === null) {
      return res.status(401).json({ message: "User not found" });
    }

    if (deactivate) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "The password is incorrect" });
      }
    }

    user.isDeactivated = deactivate;
    await user.save();

    res.status(201).json({
      message: `Successfully ${deactivate ? "de" : "re"}activated account`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  let { userId } = req.params;

  let userFound: IUser | null;
  try {
    userFound = await UserModel.findById(userId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!userFound) {
    return res
      .status(404)
      .json({ message: "Could not find User for given  ID" });
  }

  res.json({ user: userFound });
};

const userController = {
  signup,
  login,
  updateUser,
  updatePassword,
  updateActiveStatus,
  getUser
};

export default userController;
