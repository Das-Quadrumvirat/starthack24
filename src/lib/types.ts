import { z } from "zod";

export const PriceData = z.object({
  dates: z.array(z.date()).describe("Dates"),
  data: z.object({
    name: z.string().describe("Name of the fund"),
    compliance: z.number().describe("Compliance score between 0 and 3"),
    sustainability: z.number().describe("Sustainability score between 0 and 1"),
    environment: z.number().describe("Environment score between 0 and 1"),
    social: z.number().describe("Social score between 0 and 1"),
    ISIN: z.string().describe("ISIN of the fund"),
    shortName: z.string().describe("RF-Global-Rent R V"),
    prices: z.array(z.number()).describe("Price history"),
  }),
});

export const UserDescription = z.object({
  name: z.string().describe("The users's name"),
  profession: z.string().describe("The users profession"),
  age: z.string().describe("The users age"),
  riskAversion: z.string().describe("The users risk aversion"),
  investmentHorizon: z.string().describe("The users investment horizon"),
  investmentAmount: z.number().describe(
    "The users investment amount in CHF over the next 12 months",
  ),
  compliance: z.number().describe(
    "How important compliance (money laundering, government coorperation, etc.) is to the user (low to high) 0-3",
  ),
  complianceDescription: z.string().describe(
    "A description of the users compliance preferences",
  ),
  sustainability: z.number().describe(
    "How important the sustainability of the investments is to the user (low to high) 0-1",
  ),
  sustainabilityDescription: z.string().describe(
    "A description of the users sustainability preferences",
  ),
  environment: z.number().describe(
    "How important environmental effects of the investments is to the user (low to high) 0-1",
  ),
  environmentDescription: z.string().describe(
    "A description of the users environment preferences",
  ),
  social: z.number().describe(
    "How important social effects of the investments is to the user (low to high) 0-1",
  ),
  socialDescription: z.string().describe(
    "A description of the users social preferences",
  ),
  interests: z.string().describe("Things the user is interested in."),
  importantSectors: z.string().describe("Sectors the user deems important."),
  likesProducts: z.array(z.string()).describe(
    "A list of products the users enjoys using and wants to invest in.",
  ),
  additionalNotes: z.string().describe(
    "Additional notes you may want to take.",
  ),
  previousInvestments: z.array(
    z.object({
      isin: z.string().describe("The ISIN of the fund"),
      amount: z.number().describe("The amount invested in CHF"),
      date: z.date().describe("The date of the investment"),
    }),
  ),
});
