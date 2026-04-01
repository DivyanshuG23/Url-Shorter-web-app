import { Url } from "../Models/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;

  const shortCode = shortid.generate();

//   const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
const shortUrl = `${req.protocol}://${req.get("host")}/url/${shortCode}`;

  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log("short url saved =", newUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  const originalUrl = await Url.findOne({ shortCode });

  if (originalUrl) {
    return res.redirect(originalUrl.longUrl);
  } else {
    return res.send("Invalid short URL");
  }
};