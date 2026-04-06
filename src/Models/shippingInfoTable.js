import database from "../Database/db.js";
export async function createShippingInfoTable(){
    try{
        const query= `
        CREATE TABLE IF NOT EXISTS shipping_info(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            order_id UUID NOT NULL UNIQUE,
            full_name VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            pincde VARCHAR(20) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            address TEXT NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await database.query(query);
    }
    catch(error){
        console.error("Error creating shipping info table", error);
        process.exit(1);
    }
}