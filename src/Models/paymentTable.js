import database from "../Database/db.js";
export async function createPaymentTable(){
    try{
        const query = `CREATE TABLE IF NOT EXISTS payments(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            order_id UUID NOT NULL UNIQUE,
            razorpay_order_id VARCHAR(255) UNIQUE,
            razorpay_payment_id VARCHAR(255) UNIQUE,
            status VARCHAR(255) NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'Paid', 'Failed')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE);
    `
        await database.query(query);
    }
    catch(error){
        console.error("❌Error creating payment table", error);
        process.exit(1);
    }
}