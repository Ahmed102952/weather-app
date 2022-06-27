import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getWeather from "./util/getWeatherData";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./"));

app.get("/weather/:location", async (req: Request, res: Response) => {
  try {
    const location = req.params.location;
    if (location) {
      const weather = await getWeather(location);
      res.send(weather);
    } 
    res.status(404)
  } catch (err) {
    throw Error(err as string);
  }
});

app.listen(port, () => {
  console.log("server running on " + port);
});
