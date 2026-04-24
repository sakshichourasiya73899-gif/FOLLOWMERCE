import database from "../Database/db.js";
export async function createOrderTable(){
    try{
        const query= `CREATE TABLE IF NOT EXISTS orders(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        buyer_id UUID NOT NULL,
        total_price DECIMAL(10,2) NOT NULL CHECK(total_price >= 0),
        tax_price DECIMAL(10,2) NOT NULL CHECK(tax_price >= 0),
        shipping_price DECIMAL(10,2) NOT NULL CHECK(shipping_price >= 0),
        order_status VARCHAR(255) NOT NULL CHECK(order_status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
        paid_at TIMESTAMP CHECK(paid_at IS NULL OR paid_at <= CURRENT_TIMESTAMP),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE);`;
        await database.query(query);
    
    }
    catch(error){
        console.error("❌Error creating order table", error);
        process.exit(1);
    }
}