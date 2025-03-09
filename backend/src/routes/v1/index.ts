import e, { Router } from "express";
import { client } from "../../utils/client";
import { categories, ItemSchema, OrderSchema } from "../../utils";
import { ParseStatus } from "zod";

export const router = Router();

//getting the menu
router.get("/menu", async (req, res) => {
  console.log("e hit");
  const response = await client.items.findMany({
    where: {},
  });
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No items found",
    });
  }

  res.status(200).json({
    items: response,
  });
});

//placing an order
router.post("/orders/", async (req, res) => {
  const parsedResponse = OrderSchema.safeParse(req.body);
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const tableId = parsedResponse.data.tableId;
  if (!tableId) {
    res.status(400).json({
      message: "No table found",
    });
    return;
  }
  let placedOrder = await client.$transaction(async () => {
    //transaction for creating order

    //creating order
    const order = await client.orders.create({
      data: {
        tableId: tableId,
        totalCost: parsedResponse.data?.totalCost,
      },
    });

    const cartItems = await client.cart.createMany({
      data: parsedResponse.data.cartItems.map((item) => ({
        orderId: order.orderId,
        itemId: item.itemId,
        quantity: item.quantity,
      })),
    });

    console.log("order added");
    return order.orderId;
  });
  res.status(200).json({
    orderId: placedOrder,
  });
});

//item with itemId
router.get("/item", async (req, res) => {
  const itemId = Number(req.query.id);
  if (!itemId) {
    res.status(400).json({
      message: "No item id found",
    });
    return;
  }

  try {
    const response = await client.items.findFirst({
      where: {
        itemId: itemId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "No item found",
      });
    }
    res.status(200).json({
      item: response,
    });
  } catch (error) {
    console.log("Error getting item", error);
  }
});

//items with category
router.post("/category", async (req, res) => {
  const categoryName = req.body.category;
  console.log("on here", categoryName);

  if (!categoryName || Array.isArray(categoryName)) {
    res.status(400).json({
      message: "No such category found",
    });
    return;
  }

  if (categoryName == "All") {
    const response = await client.items.findMany({
      where: {
        availability: true,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "No item with that category found",
      });
    }
    res.status(200).json({
      items: response,
    });
  } else {
    const response = await client.items.findMany({
      where: {
        category: categoryName,
        availability: true,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "No item with that category found",
      });
    }
    res.status(200).json({
      items: response,
    });
  }
});

//routes for getting category
router.get("/getCategories", async (req, res) => {
  console.log("Cat hit");
  const response = await client.category.findMany({});
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No categories found",
    });
  }
  res.status(200).json({
    categories: response,
  });
});

router.post("/userAuth", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const response = await client.users.findFirst({
    where: {
      username: username,
    },
  });
  if (response != null) {
    if (password == response.password) {
      res.json({ message: "Succesfully Logged In" });
    } else {
      res.json({ message: "Incorrect Password" });
    }
  } else {
    res.json({ message: "User Not Found" });
  }
});

router.post("/addItem", async (req, res) => {
  console.log("item hit");
  const parsedResponse = ItemSchema.safeParse(req.body);
  console.log(parsedResponse, req.body);
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const item = await client.items.create({
    data: {
      name: parsedResponse.data.name,
      image: parsedResponse.data.image,
      bio: parsedResponse.data.bio,
      availability: true,
      category: parsedResponse.data.category,
      subcategory: parsedResponse.data.subcategory,
      cost: parsedResponse.data.cost,
      isvegan: true,
      tags: parsedResponse.data.tags,
      ingredients: parsedResponse.data.ingredients,
    },
  });
  res.status(200).json({
    message: "Item Has Been Added",
    itemID: item.itemId,
  });
});

router.get("/orders", async (req, res) => {
  console.log("orders hit");
  const ordersres = await client.orders.findMany({});
  if (!ordersres) {
    console.log("NO response");
    res.status(400).json({
      message: "No Orders found",
    });
  }
  const itemsordersres = await client.cart.findMany({});
  if (!itemsordersres) {
    console.log("NO response");
    res.status(400).json({
      message: "No items_orders found",
    });
  }
  res.status(200).json({
    orders: ordersres,
    items: itemsordersres,
  });
});
router.get("/allitems", async (req, res) => {
  console.log("aa hit");
  const response = await client.items.findMany({});
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No items found",
    });
  }
  const newres: { [key: number]: string } = {};
  for (let g in response) {
    newres[response[g].itemId] = response[g].name;
  }
  res.status(200).json({
    items: newres,
  });
});

router.get("/completeOrder/:id", async (req, res) => {
  console.log("delete hit");
  const resDelete = await client.cart.deleteMany({
    where: { orderId: Number(req.params.id) },
  });

  console.log(resDelete);
  res.status(200).json({
    message: "deleted",
  });
});

router.post("/userAuth", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const data = await client.users.findFirst({
    where: {
      username: username,
    },
  });
  if (data != null) {
    if (password == data.password) {
      res.status(200).json({ message: "Succesfully Logged In" });
    } else {
      res.status(400).json({ message: "Incorrect Password" });
    }
  }
});

router.post("/changeItem", async (req, res) => {
  console.log("update Hit");
  const item = req.body;
  const response = await client.items.update({
    where: {
      itemId: item.itemId,
    },
    data: {
      name: item.name,
      bio: item.bio,
      cost: item.cost,
      image: item.image,
      category: item.category,
      subcategory: item.subcategory,
      isvegan: item.isvegan,
      availability: item.availability,
    },
  });
  if (!response) {
    res.status(400).json({ message: "Could Not Update Item" });
  }
  res.status(200).json({ message: "Succesfully Updated" });
});

router.get("/adminmenu", async (req, res) => {
  console.log("e hit");
  const response = await client.items.findMany({});
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No items found",
    });
  }

  res.status(200).json({
    items: response,
  });
});

router.post("/addCat", async (req, res) => {
  console.log("item hit");
  const parsedResponse = categories.safeParse(req.body);
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  let Cat = await client.$transaction(async () => {
    const cat = await client.category.create({
      data: {
        images: parsedResponse.data.images,
        name: parsedResponse.data.name,
        slug: parsedResponse.data.slug,
      },
    });
  });
  res.status(200).json({
    message: "Category Has Been Added",
  });
});

router.post("/deleteItem", async (req, res) => {
  const itemId = req.body.id;
  const response = await client.items.delete({
    where: {
      itemId: itemId,
    },
  });
  if (!response) {
    res.json({ message: "Error Deleting Item" });
  }
  res.json({ message: "Item Has Been Deleted" });
});
