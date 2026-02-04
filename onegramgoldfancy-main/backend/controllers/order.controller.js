// const pool = require("../config/db");

// /* =====================================================
//    USER – CREATE ORDER
// ===================================================== */
// exports.addOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { grams, total_amount, address, customer_name, phone } = req.body;

//     if (!grams || !total_amount || !address || !customer_name || !phone) {
//       return res.status(400).json({ error: "Required fields missing" });
//     }

//     const result = await pool.query(
//       `INSERT INTO orders
//        (user_id, grams, total_amount, address, customer_name, phone, status)
//        VALUES ($1,$2,$3,$4,$5,$6,'pending')
//        RETURNING *`,
//       [userId, grams, total_amount, address, customer_name, phone]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("ORDER CREATE ERROR:", err);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// };

// /* =====================================================
//    USER – GET OWN ORDERS
// ===================================================== */
// exports.getOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const result = await pool.query(
//       `SELECT 
//          id,
//          grams,
//          total_amount,
//          status,
//          created_at,
//          customer_name,
//          phone,
//          address,
//          tracking_id,
//          courier_name
//        FROM orders
//        WHERE user_id=$1
//        ORDER BY created_at DESC`,
//       [userId]
//     );

//     res.json(result.rows);
//   } catch (err) {
//     console.error("FETCH USER ORDERS ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch orders" });
//   }
// };

// /* =====================================================
//    ADMIN – GET ALL ORDERS
// ===================================================== */
// exports.getAllOrders = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         grams,
//         total_amount,
//         status,
//         created_at,
//         customer_name,
//         phone,
//         address,
//         tracking_id,
//         courier_name
//       FROM orders
//       ORDER BY created_at DESC
//     `);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("ADMIN FETCH ORDERS ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch admin orders" });
//   }
// };

// /* =====================================================
//    ADMIN – UPDATE TRACKING INFO
// ===================================================== */
// exports.updateTracking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { tracking_id, courier_name, status } = req.body;

//     const result = await pool.query(
//       `UPDATE orders
//        SET tracking_id = $1,
//            courier_name = $2,
//            status = $3
//        WHERE id = $4
//        RETURNING *`,
//       [tracking_id, courier_name, status, id]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("UPDATE TRACKING ERROR:", err);
//     res.status(500).json({ error: "Failed to update tracking info" });
//   }
// };



exports.addOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const { items, total_amount, address, customer_name, phone } = req.body;

    await client.query("BEGIN");

    // 1️⃣ Create order
    const orderRes = await client.query(
      `INSERT INTO orders
       (user_id, total_amount, address, customer_name, phone, status)
       VALUES ($1,$2,$3,$4,$5,'pending')
       RETURNING id`,
      [userId, total_amount, address, customer_name, phone]
    );

    const orderId = orderRes.rows[0].id;

    // 2️⃣ Insert order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, product_name, product_image, quantity, price)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          orderId,
          item.id,
          item.name,
          item.image,
          item.quantity,
          item.price,
        ]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ success: true, orderId });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  } finally {
    client.release();
  }
};

