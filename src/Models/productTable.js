import database from "../Database/db.js";
export async function createProductTable(){
    try{
         const query= `CREATE TABLE IF NOT EXISTS products(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
           price DECIMAL(10,2) NOT NULL CHECK(price >= 0),
            image JSONB DEFAULT NULL,
            stock INTEGER NOT NULL CHECK(stock >= 0),
            category VARCHAR(255) NOT NULL,
            rating DECIMAL(2,1) DEFAULT 0 CHECK(rating >= 0 AND rating <= 5),
            created_by UUID NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
        );`
        ;
        await database.query(query);
    }
    catch(error){
        console.error("❌Error creating product table", error);
        process.exit(1);
    }
}