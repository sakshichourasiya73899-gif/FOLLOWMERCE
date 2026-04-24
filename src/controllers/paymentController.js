import crypto from "crypto";
import database from "../Database/db.js";

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  try {
    await database.query("BEGIN");

    // ✅ Prevent duplicate processing
    const existing = await database.query(
      `SELECT * FROM payments WHERE razorpay_order_id = $1 AND status = 'Paid'`,
      [razorpay_order_id]
    );

    if (existing.rows.length > 0) {
      await database.query("ROLLBACK");
      return res.json({ success: true, message: "Already processed" });
    }

    // ✅ Update payment
    const payment = await database.query(
      `UPDATE payments 
       SET status = 'Paid', razorpay_payment_id = $1 
       WHERE razorpay_order_id = $2 
       RETURNING *`,
      [razorpay_payment_id, razorpay_order_id]
    );

    const orderId = payment.rows[0].order_id;

    // ✅ Mark order paid
    await database.query(
      `UPDATE orders SET paid_at = NOW(), order_status = 'paid' WHERE id = $1`,
      [orderId]
    );

    // ✅ Get items
    const { rows: items } = await database.query(
      `SELECT product_id, quantity FROM order_items WHERE order_id = $1`,
      [orderId]
    );

    // ✅ Reduce stock safely
    for (const item of items) {
      const result = await database.query(
        `UPDATE products 
         SET stock = stock - $1 
         WHERE id = $2 AND stock >= $1`,
        [item.quantity, item.product_id]
      );

      if (result.rowCount === 0) {
        throw new Error("Insufficient stock");
      }
    }

    await database.query("COMMIT");

    res.json({ success: true });

  } catch (err) {
    await database.query("ROLLBACK");
    res.status(500).json({ success: false, error: err.message });
  }
};