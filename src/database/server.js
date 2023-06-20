// server.js
const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = "./config";

const app = express();
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

const User = new mongoose.Schema({
  email: String,
  password: String,
  referralCode: String,
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  directReferrals: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

async function generateUniqueRandomNumber(min, max) {
  let unique = false;
  let randomNumber;

  while (!unique) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const existingUser = await User.findOne({
      identificationNumber: randomNumber,
    });
    if (!existingUser) {
      unique = true;
    }
  }

  return randomNumber;
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

app.post("/signup", async (req, res) => {
  const { email, password, referralCode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const identificationNumber = await generateUniqueRandomNumber(
      1000000,
      9999999
    );
    const newUser = new User({
      email,
      password,
      referralCode: identificationNumber,
    });
    let referrer = null;

    if (referralCode) {
      referrer = await User.findOne({ referralCode });
      if (referrer) {
        newUser.referredBy = referrer._id;
      }
    }

    await newUser.save();

    if (referrer) {
      referrer.directReferrals.push(newUser._id);
      await referrer.save();
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
