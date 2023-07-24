// server.js
const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const secret = "./config";
const multer = require("multer");
const dotenv = require("dotenv");

const upload = multer();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
  totalBusiness: Number,
  package: String,
  referralEarning: { type: Number, default: 0 }, // this is will be dollers
  balance: { type: Number, default: 0 }, // this is the amount invested and it will be in doller
  balanceinCpt: { type: Number, default: 0 }, // this is the amount that is earned and that can be withdrawn/
  joinningDate: { type: Date, default: Date.now },
  totalEarning: Number,
  rank: String,
  rankAchieved: { type: [String] },
  walletAdress: String,
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
  rewards: {
    choice1: String,
    choice2: String,
  },
  rewardsClaimed: [
    {
      time: { type: Date, default: Date.now },
      choice1: String,
      choice2: String,
      choosen: String,
      rank: String,
    },
  ],
  dailyStackingEvents: [
    {
      time: { type: Date, default: Date.now },
      amount: Number,
      Description: String,
    },
  ],
});

const User = mongoose.model("User", UserSchema);

const RequestsSchema = new mongoose.Schema({
  email: String,
  referralCode: String, // referralCode of current user
  package: String,
  Image: String,
});
const Requests = mongoose.model("Requests", RequestsSchema);

const RankAndRewardsSchema = new mongoose.Schema({
  email: String,
  referralCode: String, // referralCode of current user
  choice: String,
  rank: String,
  HomeAddress: String,
  PhoneNumber: String,
  EthAddress: String,
});

const RankAndReward = mongoose.model("RankAndReward", RankAndRewardsSchema);

app.post("/addRequest", async (req, res) => {
  console.log("incoming datas", req.body);
  const { email, referralCode, package, Image } = req.body;
  console.log(email, referralCode, package, Image);
  try {
    // const newRequest = new Requests({
    //   email,
    //   referralCode,
    //   package,
    //   Image,
    // });
    // newRequest.save();
    res.status(200).json({ message: "Request Added successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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
// --------------------------------UPDATING TOTAL BUSINESS-------------------------------------------------------//

const calculateTotalBusiness = async (referredBy) => {
  if (!referredBy) {
    throw new Error("referredBy is required");
  }

  const user = await User.findOne({ referralCode: referredBy });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.directReferrals.length < 3) {
    throw new Error("Less than 3 direct referrals");
  }

  let referralsBusiness = [];
  for (let referralCode of user.directReferrals) {
    const referralUser = await User.findOne({ referralCode });
    if (referralUser && referralUser.totalBusiness > 0) {
      referralsBusiness.push(referralUser.totalBusiness);
    }
  }

  if (referralsBusiness.length < 3)
    throw new Error("Less than 3 referrals with non-zero totalBusiness");

  referralsBusiness.sort((a, b) => b - a);

  const totalBusiness =
    referralsBusiness[0] * 0.5 +
    referralsBusiness[1] * 0.3 +
    referralsBusiness.slice(2).reduce((a, b) => a + b, 0) * 0.2;

  console.log(totalBusiness);

  user.totalBusiness = totalBusiness;
  if (totalBusiness >= 10000000) {
    user.rank = "Royal Crown Diamond";
    user.rewards.push({
      choice1: 250000,
      choice2: "Farm House",
    });
  } else if (totalBusiness >= 5000000) {
    user.rank = "Crown Diamond";
    user.rewards.push({
      time: new Date(),
      choice1: 125000,
      choice2: "Villa",
    });
  } else if (totalBusiness >= 2500000) {
    user.rank = "Diamond";
    user.rewards.push({
      time: new Date(),
      choice1: 50000,
      choice2: "Flat in Delhi(Metro City)",
    });
  } else if (totalBusiness >= 1000000) {
    user.rewards.push({
      time: new Date(),
      choice1: 20000,
      choice2: "SUV Car",
    });
    user.rank = "Platinum";
  } else if (totalBusiness >= 500000) {
    user.rewards.push({
      time: new Date(),
      choice1: 10000,
      choice2: "Sedan Car",
    });
    user.rank = "Gold";
  } else if (totalBusiness >= 250000) {
    user.rewards.push({
      time: new Date(),
      choice1: 5000,
      choice2: "Small Car",
    });
    user.rank = "Silver";
  } else if (totalBusiness >= 100000) {
    user.rewards.push({
      time: new Date(),
      choice1: 2500,
      choice2: "Bullet Bike",
    });
    user.rank = "Executive";
  } else if (totalBusiness >= 50000) {
    user.rewards.push({
      time: new Date(),
      choice1: 1000,
      choice2: "Bike",
    });
    user.rank = "Senior";
  } else if (totalBusiness >= 25000) {
    user.rewards.push({
      time: new Date(),
      choice1: 500,
      choice2: "Laptop",
    });
    user.rank = "Star";
  } else if (totalBusiness >= 1000) {
    user.rewards.push({
      time: new Date(),
      choice1: 200,
      choice2: "Mobile Phone",
    });
    user.rank = "Distributer";
  }

  await user.save();

  // If the user was referred by someone else, recursively calculate their total business
  if (user.referredBy) {
    const referredByUser = await User.findOne({
      referralCode: user.referredBy,
    });
    if (referredByUser && referredByUser.directReferrals.length > 2) {
      await calculateTotalBusiness(user.referredBy);
    }
  }
  return totalBusiness;
};

const getDirectReferralsTotalBusiness = async (referralCode) => {
  const user = await User.findOne({ referralCode: referralCode });
  if (!user) throw new Error("User not found");

  let referralsTotalBusiness = [];

  for (let referralCode of user.directReferrals) {
    const totalBusiness = await calculateReferralTreeBalance(referralCode);
    referralsTotalBusiness.push(totalBusiness);
  }

  // Sort in descending order
  referralsTotalBusiness.sort((a, b) => b - a);

  // Calculate the percentages
  const highest = referralsTotalBusiness[0] * 0.5;
  const secondHighest =
    referralsTotalBusiness.length > 1 ? referralsTotalBusiness[1] * 0.3 : 0;
  const rest = referralsTotalBusiness.slice(2).reduce((a, b) => a + b, 0) * 0.2;

  // Return the total
  const totalBusiness = highest + secondHighest + rest;

  const rankAchieved = user.rankAchieved;

  if (
    totalBusiness >= 10000000 &&
    user.rank !== "Royal Crown Diamond" &&
    !rankAchieved.includes("Royal Crown Diamond")
  ) {
    user.rank = "Royal Crown Diamond";
    user.rankAchieved.push("Royal Crown Diamond");
    user.rewards.choice1 = 250000;
    user.rewards.choice2 = "Farm House";
  } else if (
    totalBusiness >= 5000000 &&
    user.rank !== "Crown Diamond" &&
    !rankAchieved.includes("Crown Diamond")
  ) {
    user.rank = "Crown Diamond";
    user.rankAchieved.push("Crown Diamond");
    user.rewards.choice1 = 125000;
    user.rewards.choice2 = "Villa";
  } else if (
    totalBusiness >= 2500000 &&
    user.rank !== "Diamond" &&
    !rankAchieved.includes("Diamond")
  ) {
    user.rank = "Diamond";
    user.rankAchieved.push("Diamond");
    user.rewards.choice1 = 50000;
    user.rewards.choice2 = "Flat in Delhi(Metro City)";
  } else if (
    totalBusiness >= 1000000 &&
    user.rank !== "Platinum" &&
    !rankAchieved.includes("Platinum")
  ) {
    user.rewards.choice1 = 20000;
    user.rewards.choice2 = "SUV Car";
    user.rank = "Platinum";
    user.rankAchieved.push("Platinum");
  } else if (
    totalBusiness >= 500000 &&
    user.rank !== "Gold" &&
    !rankAchieved.includes("Gold")
  ) {
    user.rewards.choice1 = 10000;
    user.rewards.choice2 = "Sedan Car";
    user.rank = "Gold";
    user.rankAchieved.push("Gold");
  } else if (
    totalBusiness >= 250000 &&
    user.rank !== "Silver" &&
    !rankAchieved.includes("Silver")
  ) {
    user.rewards.choice1 = 5000;
    user.rewards.choice2 = "Small Car";
    user.rank = "Silver";
    user.rankAchieved.push("Silver");
  } else if (
    totalBusiness >= 100000 &&
    user.rank !== "Executive" &&
    !rankAchieved.includes("Executive")
  ) {
    user.rewards.choice1 = 2500;
    user.rewards.choice2 = "Bullet Bike";
    user.rank = "Executive";
    user.rankAchieved.push("Executive");
  } else if (
    totalBusiness >= 50000 &&
    user.rank !== "Senior" &&
    !rankAchieved.includes("Senior")
  ) {
    user.rewards.choice1 = 1000;
    user.rewards.choice2 = "Bike";
    user.rank = "Senior";
    user.rankAchieved.push("Senior");
  } else if (
    totalBusiness >= 25000 &&
    user.rank !== "Star" &&
    !rankAchieved.includes("Star")
  ) {
    user.rewards.choice1 = 500;
    user.rewards.choice2 = "Laptop";
    user.rank = "Star";
    user.rankAchieved.push("Star");
  } else if (
    totalBusiness >= 1000 &&
    user.rank !== "Distributer" &&
    !rankAchieved.includes("Distributer")
  ) {
    user.rewards.choice1 = 200;
    user.rewards.choice2 = "Mobile Phone";
    user.rank = "Distributer";
    user.rankAchieved.push("Distributer");
  }
  await user.save();
  console.log(user.rank, totalBusiness);
  return totalBusiness;
};

const calculateReferralTreeBalance = async (referralCode) => {
  const user = await User.findOne({ referralCode: referralCode });
  if (!user) return 0;

  let totalBalance = user.balance;

  for (let referralCode of user.directReferrals) {
    const referralBalance = await calculateReferralTreeBalance(referralCode);
    totalBalance += referralBalance;
  }

  return totalBalance;
};

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

    // await calculateTotalBusiness(user.referredBy); // update total business of above
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
    console.log(identificationNumber);
    const newUser = new User({
      fullName,
      email,
      password,
      referralCode: identificationNumber,
      referredBy: referralCode, // referredBy will be referrer's _id
      package: "Null",
      joinningDate: new Date(),
      totalBusiness: 0,
      totalEarning: 0,
      rank: "Null",
      rewards: { choice1: "Null", choice2: "Null" }, // Initialize the rewards field as an empty object
    });

    await newUser.save();
    console.log("new User");
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
    const total = await getDirectReferralsTotalBusiness(user.referralCode);
    const sanitizedUser = {
      fullName: user.fullName,
      email: user.email,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      directReferrals: user.directReferrals,
      package: user.package,
      balanceinCpt: user.balanceinCpt,
      balanceinDoll: user.balance,
      totalEarning: user.totalEarning,
      rank: user.rank,
      balance: user.balance,
      totalBusiness: total,
      Events: user.referralBonusEvents,
      rewards: user.rewards,
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
    const allRefLength = allReferralObjects.length;
    res.json({
      allReferralObjects,
      nullPackageCount,
      nonNullPackageCount,
      allRefLength,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/claimRankandReward", async (req, res) => {
  const { email, choice, HomeAddress, WalletAddress, PhoneNumber } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (choice === "choice1") {
    // call cron jobs here off releasing CPT after week
  } else if (choice === "choice2") {
    const newRankAndReward = new RankAndReward({
      email,
      referralCode: user.referralCode,
      choice,
      rank: user.rank,
      HomeAddress,
      PhoneNumber,
      WalletAddress,
    });
    user.rewardsClaimed.push({
      time: new Date(),
      choice1: user.rewards.choice1,
      choice2: user.rewards.choice2,
      choosen: choice,
      rank: user.rank,
    });
    user.rewards = {
      choice1: "Null",
      choice2: "Null",
    };
    await user.save();
    await newRankAndReward.save();
  }
});

app.post("/send-cpt", async (req, res) => {
  const { email, address, amount } = req.body;
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
