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
  package: String,
});

const User = mongoose.model("User", UserSchema);

const TransactionSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  amount: Number,
});
const dailyStakingProfitSchema = new mongoose.Schema({
  referralCode: String,
  transactions: [TransactionSchema],
  totalEarnedFromStaking: Number,
  PackageAmount: Number,
});
const dailyStaking = mongoose.model(
  "StakingDailyProfit",
  dailyStakingProfitSchema
);

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

// ---------------------------CALL THIS FUNCTION FOR DAILY STAKING PROFIT------------------------------------//

// -> THIS FUNCTION WILL ADD OBJECT ELEMENT WITH TIME AND 0.5% OF PACKAGE AMOUNT.
const addStakingProfit = async (referralCode) => {
  try {
    // Find the document with the given referralCode
    const stakingProfit = await dailyStaking.findOne({
      referralCode: referralCode,
    });

    if (!stakingProfit) {
      console.log(`No document found with referralCode ${referralCode}`);
      return;
    }

    // Calculate daily profit
    const dailyProfit = 0.005 * stakingProfit.PackageAmount;

    // Create a new transaction
    const newTransaction = {
      time: new Date(),
      amount: dailyProfit,
    };

    // Add the new transaction to the transactions array
    stakingProfit.transactions.push(newTransaction);

    // Update totalEarnedFromStaking
    stakingProfit.totalEarnedFromStaking += dailyProfit;

    // Save the updated document
    await stakingProfit.save();

    console.log("Staking profit added successfully");
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------
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
      package: "Null",
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
