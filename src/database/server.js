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
  referralCode: String, // referralCode of current user
  referredBy: String, // referralCode of the user who invited current user
  directReferrals: [String], // all level 1 referrals
  package: String,
  referralEarning: { type: Number, default: 0 }, // this is will be dollers
  balance: { type: Number, default: 0 }, // this is the amount invested and it will be in doller
  balanceinCpt: { type: Number, default: 0 }, // this is the amount that is earned and that can be withdrawn/
  joinningDate: { type: Date, default: Date.now },
  referralBonusEvents: [
    // this is array of object, it will store all the invited users when they will join using current user refferalCode
    {
      time: { type: Date, default: Date.now },
      amount: Number,
      referralCode: String,
      package: String,
      level: Number,
      Earned: Number,
    },
  ],
  dailyStackingEvents: [
    // this will store daily staking
    {
      time: { type: Date, default: Date.now },
      amount: Number,
      Description: String,
    },
  ],
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

// ---------------------------CALL THIS FUNCTION FOR DAILY STAKING PROFIT------------------------------------//

const processDailyStakingRewards = async () => {
  try {
    const users = await User.find({ package: { $ne: null } }).exec();

    for (const user of users) {
      const balance = user.balance;
      const rewardAmount = balance * 0.005 * 20;

      user.balanceinCpt += rewardAmount;
      user.dailyStackingEvents.push({
        time: new Date(),
        amount: rewardAmount,
        Description: "Daily staking reward",
      });

      await user.save();
    }

    console.log("Daily staking rewards processed successfully.");
  } catch (err) {
    console.error("Error processing daily staking rewards:", err);
  }
};

// Call the function after 24 hours
setTimeout(processDailyStakingRewards, 24 * 60 * 60 * 1000);

// --------------------------------WHEN USER WILL INVEST THIS API WILL BE CALLED-------------------------------------------- //
const handleInvestment = async (userId, investmentAmount, userPackage) => {
  const user = await User.findOne({ email: userId });

  if (!user) {
    throw new Error("User not found");
  }
  user.balance += investmentAmount;
  user.package = userPackage;
  await user.save();

  // Start with the direct referrer
  let currentReferralCode = user.referredBy;
  let level = 1;

  // Define the percentage to be rewarded for each level
  const referralPercentages = {
    1: 0.1,
    2: 0.04,
    3: 0.03,
    4: 0.02,
    5: 0.01,
  };

  while (currentReferralCode && level <= 15) {
    const referrer = await User.findOne({ referralCode: currentReferralCode });
    if (!referrer) {
      break;
    }

    // Only reward the user if they have the necessary number of direct referrals
    if (referrer.directReferrals.length >= level) {
      const percentage = level > 5 ? 0.01 : referralPercentages[level];
      const reward = investmentAmount * percentage;

      referrer.referralBonusEvents.push({
        time: new Date(),
        amount: investmentAmount,
        referralCode: userId,
        package: userPackage,
        level: level,
        Earned: reward,
      });

      referrer.referralEarning += reward; // it is in $
      referrer.balanceinCpt += reward * 20; //  directly it will be in the user account
      await referrer.save();
    }

    // Move up to the next referrer in the chain
    currentReferralCode = referrer.referredBy;
    level += 1;
  }
};

// ---------------------------------------------------------------------------- //
app.post("/invest", async (req, res) => {
  console.log(req.body);
  const { userId, amount, package } = req.body;
  try {
    await handleInvestment(userId, amount, package);
    res.status(200).json({ message: "Investment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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
      package: "Null",
      joinningDate: new Date(),
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
      fullName: user.fullName,
      email: user.email,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      directReferrals: user.directReferrals,
      package: user.package,
    };

    // const directRef = await getDirectReferrals(user.email);
    // await getRefff(user.email);
    // console.log(directRef);

    res.status(200).json({ token, userId: user._id, user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- get Direct Affiliate ----------------------------- //
app.post("/direct-referrals", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user with the specified email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the directReferrals array
    const directReferrals = user.directReferrals;

    // Retrieve the details of each direct referral
    const referralDetails = await User.find(
      { referralCode: { $in: directReferrals } },
      "referralCode fullName package"
    );

    // Map the referral details to the required format
    const referralObjects = referralDetails.map((referral) => {
      return {
        referralCode: referral.referralCode,
        fullName: referral.fullName,
        package: referral.package,
      };
    });

    // Return the array of referral objects
    res.json(referralObjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ----------------------- get All Affiliate ----------------------------- //

app.post("/all-referrals", async (req, res) => {
  const { email } = req.body;
  let allReferralObjects = [];
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const directReferrals = user.directReferrals;

    // Retrieve referral objects for the direct referrals of the user
    let directReferralObjects = await User.find(
      {
        referralCode: { $in: directReferrals },
      },
      "referralCode fullName package directReferrals"
    ).exec();

    // Add level information to each referral object
    directReferralObjects = directReferralObjects.map((obj) => ({
      ...obj._doc,
      level: 1,
    }));

    allReferralObjects.push(...directReferralObjects);
    // Traverse multiple levels of downline
    let level = 1;
    let referralsToTraverse = directReferralObjects;
    while (level <= user.directReferrals.length - 1) {
      const nextReferrals = [];

      for (const referral of referralsToTraverse) {
        const referralCodes = referral.directReferrals;

        let referralObjects = await User.find(
          {
            referralCode: { $in: referralCodes },
          },
          "referralCode fullName package directReferrals"
        ).exec();

        referralObjects = referralObjects.map((obj) => ({
          ...obj._doc,
          level: level,
        }));

        allReferralObjects.push(...referralObjects);

        nextReferrals.push(...referralObjects);
      }

      referralsToTraverse = nextReferrals;
      level++;
    }

    const nullPackageCount = allReferralObjects.reduce(
      (count, obj) => (obj.package === "Null" ? count + 1 : count),
      0
    );
    const nonNullPackageCount = allReferralObjects.length - nullPackageCount;

    res.json({
      allReferralObjects,
      nullPackageCount,
      nonNullPackageCount,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
