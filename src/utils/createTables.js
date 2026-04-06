import {createUserTable} from "../Models/userTable.js"
import { createOrderTable } from "../Models/orderTable.js"
import { createOrderItemTable } from "../Models/orderItemsTable.js"
import { createPaymentTable } from "../Models/paymentTable.js"
import { createProductTable } from "../Models/productTable.js"
import { createProductReviewsTable } from "../Models/productReviewsTable.js"
import { createShippingInfoTable } from "../Models/shippingInfoTable.js"


export const createTables = async()=>{
    try{
        await createUserTable();
        await createProductTable();
        await createOrderTable();
        await createOrderItemTable();
        await createPaymentTable();
        await createProductReviewsTable();
        await createShippingInfoTable();
        console.log("✅ All tables created successfully");
    }
    catch(error){
        console.error("❌Error creating tables", error);
        process.exit(1);
    }

}