import databse from "../Database/db.js";
export async function createPaymentTable(){
    try{
        const query = `CREATE TABLE IF NOT EXISTS payments(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            order_id UUID NOT NULL UNIQUE,
            payment_type VARCHAR(255) NOT NULL CHECK(payment_type IN ('credit_card', 'paypal', 'bank_transfer','Cash on Delivery')),
            payment_status VARCHAR(255) NOT NULL CHECK(payment_status IN ('pending', 'completed', 'failed')),
            payment_intent_id VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES users(id) ON DELETE CASCADE);

    `
        await databse.query(query);
    }
    catch(error){
        console.error("❌Error creating payment table", error);
        process.exit(1);
    }
}