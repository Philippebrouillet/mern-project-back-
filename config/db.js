const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.tpfrgro.mongodb.net/mernproject",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("failed to connect to mongodb", err));
