import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean().default(false),
});

export const transactionSchema = z
  .object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.string().min(1, "Amount is required"),
    description: z.string().optional(),
    date: z.date({ required_error: "Date is required" }),
    accountId: z.string().min(1, "Account is required"),
    category: z.string().min(1, "Category is required"),
    isRecurring: z.boolean().default(false),
    recurringInterval: z
      .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isRecurring && !data.recurringInterval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurring interval is required for recurring transactions",
        path: ["recurringInterval"],
      });
    }
  });

  // Lead Schema
export const leadSchema = z.object({
  journeyStage: z.enum(["LEAD", "QUOTE", "PROGRESS", "COMPLETION"]),
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(10, "Mobile number is required"),
  email: z.string().email("Invalid email address"),
  capacity: z.enum(["PERSONAL", "OFFICIAL"]),
  address: z.string().optional(),
  pinCode: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  clientType: z.string().min(1, "Client type is required"),
  companyName: z.string().optional(),
  companyContact: z.string().optional(),
  companyEmail: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyAddress: z.string().optional(),
  companyPinCode: z.string().optional(),
  companyState: z.string().optional(),
  companyCountry: z.string().optional(),
  companyType: z.string().optional(),
  everWorkedWith: z.boolean().optional(),
  companyProfession: z.string().optional(),
  leadType: z.enum(["HOT", "WARM", "COLD"]),
  enquiryType: z.enum(["DIRECT", "REFERENCE", "SUB_CONTRACT", "FREELANCING"]),
  projectType: z.string().optional(),
  leadDate: z.date(),
  quoteSubmissionDate: z.date().optional(),
  action: z.enum(["QUOTE", "NOT_QUOTE", "FOLLOWUP"]),
  jobCategory: z.string().optional(),
  jobSubCategory: z.string().optional(),
  leadMessage: z.string().optional(),
  status: z.string().optional(),
});
