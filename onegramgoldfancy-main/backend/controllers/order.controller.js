// 

const pool = require("../config/db");

/* =====================================================
   USER – CREATE ORDER
   (Supports both grams-only & cart items)
===================================================== */
exports.addOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const {
      grams,
      items = [],       // optional (for cart-based orders)
      total_amount,
      address,
      customer_name,
      phone,
    } = req.body;

    if (!total_amount || !address || !customer_name || !phone) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    await client.query("BEGIN");

    // 1️⃣ Create order
    const orderResult = await client.query(
      `INSERT INTO orders
       (user_id, grams, total_amount, address, customer_name, phone, status)
       VALUES ($1,$2,$3,$4,$5,$6,'pending')
       RETURNING *`,
      [userId, grams || null, total_amount, address, customer_name, phone]
    );

    const order = orderResult.rows[0];

    // 2️⃣ Insert order items (ONLY if items exist)
    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items
           (order_id, product_id, product_name, product_image, quantity, price)
           VALUES ($1,$2,$3,$4,$5,$6)`,
          [
            order.id,
            item.id,
            item.name,
            item.image,
            item.quantity,
            item.price,
          ]
        );
      }
    }

    await client.query("COMMIT");

    res.status(201).json(order);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("ORDER CREATE ERROR:", err);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    client.release();
  }
};

/* =====================================================
   USER – GET OWN ORDERS
===================================================== */
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
         o.id,
         o.grams,
         o.total_amount,
         o.status,
         o.created_at,
         o.customer_name,
         o.phone,
         o.address,
         o.tracking_id,
         o.courier_name,
         json_agg(
           json_build_object(
             'name', oi.product_name,
             'image', oi.product_image,
             'quantity', oi.quantity,
             'price', oi.price
           )
         ) FILTER (WHERE oi.id IS NOT NULL) AS items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("FETCH USER ORDERS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

/* =====================================================
   ADMIN – GET ALL ORDERS (WITH PRODUCTS)
===================================================== */
exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.grams,
        o.total_amount,
        o.status,
        o.created_at,
        o.customer_name,
        o.phone,
        o.address,
        o.tracking_id,
        o.courier_name,
        json_agg(
          json_build_object(
            'name', oi.product_name,
            'image', oi.product_image,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) FILTER (WHERE oi.id IS NOT NULL) AS items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("ADMIN FETCH ORDERS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch admin orders" });
  }
};

/* =====================================================
   ADMIN – UPDATE TRACKING INFO
===================================================== */
exports.updateTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { tracking_id, courier_name, status } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET tracking_id = $1,
           courier_name = $2,
           status = $3
       WHERE id = $4
       RETURNING *`,
      [tracking_id, courier_name, status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE TRACKING ERROR:", err);
    res.status(500).json({ error: "Failed to update tracking info" });
  }
};
