import { Router } from "express";
import axios from "axios";
import { Request, Response } from "express";

export const router = Router();

router.get("/all/fixtures", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/fixtures/`
    );

    // const { results: allFixtures } = response.data;
    const allFixtures = response.data;

    const sortedFixtures = allFixtures.sort(
      (a: any, b: any) => a.date - b.date
    );

    res
      .status(200)
      .json({ success: true, message: "Fixtures", results: sortedFixtures });
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
