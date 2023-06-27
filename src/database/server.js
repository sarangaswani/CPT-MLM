// server.js
const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const secret = "./config";

const app = express();
app.use(cors());
app.use(express.json());

// connectDb();
mongoose
  .connect(
    "mongodb+srv://focus123:Memon4231@cluster0.66jjnzy.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  referralCode: String,
  referredBy: String,
  directReferrals: [String],
});

const User = mongoose.model("User", UserSchema);

async function generateUniqueRandomNumber(min, max) {
  let unique = false;
  let randomNumber;

  while (!unique) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const existingUser = await User.findOne({
      referralCode: randomNumber,
    });
    if (!existingUser) {
      unique = true;
    }
  }

  return randomNumber.toString();
}

// ------------------------------------------------------------------------ //
//                  FUNCTIONS TO IMPLEMENT
async function getReferralsByLevel(referralCode) {
  const referrer = await User.findOne({ referralCode });
  if (!referrer) {
    throw new Error("Referrer not found");
  }

  let referrals = [];
  await fetchReferrals(referrer, 1, referrals);

  const groupedReferrals = referrals.reduce((acc, referral) => {
    if (!acc[referral.level]) {
      acc[referral.level] = [];
    }
    acc[referral.level].push(referral.email);
    return acc;
  }, {});

  return groupedReferrals;
}

async function fetchReferrals(user, level, referrals) {
  await user.populate("directReferrals").execPopulate();
  for (const referral of user.directReferrals) {
    referrals.push({ email: referral.email, level });
    await fetchReferrals(referral, level + 1, referrals);
  }
}

// ---------------------------------------------------------------------------- //

const findUser = async (refCode) => {
  const user = await User.findOne({ referralCode: refCode });
  console.log(user);
  return user;
};

app.post("/signup", async (req, res) => {
  const { fullName, email, password, referralCode } = req.body;
  console.log(req.body);
  try {
    // findUser(refCode);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const referrer = await User.findOne({ referralCode: referralCode });
    if (!referrer) {
      return res.status(400).json({ message: "Referral code does not exist" });
    }
    const identificationNumber = await generateUniqueRandomNumber(
      1000000,
      9999999
    );
    const newUser = new User({
      fullName,
      email,
      password,
      referralCode: identificationNumber,
      referredBy: referralCode, // referredBy will be referrer's _id
    });
    await newUser.save();
    referrer.directReferrals.push(identificationNumber);
    await referrer.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }
    console.log(user);

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    console.log("login passed", token);

    // Creating a sanitized user object to send in the response
    const sanitizedUser = {
      email: user.email,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      directReferrals: user.directReferrals,
    };

    res.status(200).json({ token, userId: user._id, user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/getMyDirectAffiliate", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
