-- CreateTable
CREATE TABLE "Items" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_bio" TEXT NOT NULL,
    "item_image" TEXT NOT NULL,
    "item_category" TEXT NOT NULL,
    "item_isVegan" BOOLEAN NOT NULL,
    "item_cost" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" SERIAL NOT NULL,
    "table_id" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Orders_Items" (
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "Orders_Items_pkey" PRIMARY KEY ("order_id","item_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_pass" TEXT NOT NULL,
    "is_Admin" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Orders_Items" ADD CONSTRAINT "Orders_Items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders_Items" ADD CONSTRAINT "Orders_Items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
