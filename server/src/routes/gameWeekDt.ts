import { Router } from "express";
import axios from "axios";
import { Request, Response } from "express";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/leagues-classic/${process.env.LEAGUE_ID}/standings`
    );
    res
      .status(200)
      .json({ success: true, message: "League Data", results: response.data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        message: error.message,
        details: error.response?.data,
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
});

export const getTableDt = Router();
