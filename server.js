require("dotenv").config();
console.log("ENV CHECK:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  });
  
const express= require("express")
const sequelize= require("./db.js")
const pasteRoutes= require("./routes/pasteRoutes.js")
const homeRoutes= require("./routes/homeRoutes.js")

const app = express();
app.use(express.json());

app.get("/", homeRoutes)
app.use("/api", pasteRoutes);

app.get("/p/:slug", (req, res) => {
  res.redirect(`/api/pastes/${req.params.slug}`);
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("DB connected");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
