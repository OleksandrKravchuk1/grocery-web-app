import { z } from "zod";
import { Gender } from "@/types/profile";
import { isValid, parseISO, isAfter } from "date-fns";

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: z
    .string()
    .trim()
    .max(50, "Last name must be at most 50 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be at most 20 characters")
    .optional()
    .or(z.literal("")),

  birthday: z
    .string()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = parseISO(date);
      return isValid(parsedDate) && !isAfter(parsedDate, new Date());
    }, "Birthday must be a valid date in the past")
    .optional()
    .or(z.literal("")),
});
