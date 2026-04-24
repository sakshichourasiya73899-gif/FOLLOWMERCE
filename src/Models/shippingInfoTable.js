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
            city VARCHAR(255) NOT NULL,
            pincode VARCHAR(20) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            address TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );
        `;
        await database.query(query);
    }
    catch(error){
        console.error("Error creating shipping info table", error);
        process.exit(1);
    }
}