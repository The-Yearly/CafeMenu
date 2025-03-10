import z from "zod";

export const cart = z.object({
  itemId: z.number(),
  name: z.string(),
  bio: z.string(),
  image: z.string(),
  category: z.string(),
  subcategory: z.string(),
  isvegan: z.boolean(),
  cost: z.number().positive(),
  quantity: z.number().positive(),
  tags: z.array(z.string()),
  ingredients: z.array(z.string()),
});
export const OrderSchema = z.object({
  tableId: z.number().positive(),
  totalCost: z.number().positive(),
  status: z.enum(["PENDING", "COMPLETE"]),
  cartItems: cart.array(),
});

export const ItemSchema = z.object({
  name: z.string(),
  bio: z.string(),
  image: z.string(),
  category: z.string(),
  subcategory: z.string(),
  tags: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  isvegan: z.boolean(),
  cost: z.number().positive(),
  avalability: z.boolean(),
});

export const users = z.object({
  username: z.string(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
});

export const categories = z.object({
  name: z.string(),
  images: z.string(),
  slug: z.string(),
});
