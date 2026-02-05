const pool = require("../config/db");
const axios = require("axios");

/* =====================================================
   SEND WHATSAPP MESSAGE TO OWNER
===================================================== */
const sendWhatsAppToOwner = async (order, items) => {
  try {
    const ownerNumber = process.env.OWNER_WHATSAPP; // 91XXXXXXXXXX

    const products =
      items.length > 0
        ? items
            .map(
              (item, i) =>
                `${i + 1}. ${item.name}
Qty: ${item.quantity}
Amount: ₹${item.price * item.quantity}`
            )
            .join("\n\n")
        : "Gold Order";

    const message = `🛍️ *NEW ORDER RECEIVED*

👤 Customer: ${order.customer_name}
📞 Phone: ${order.phone}

📦 Products:
${products}

💰 Total Amount: ₹${order.total_amount}
💵 Payment: Cash on Delivery

📍 Address:
${order.address}
`;

    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: ownerNumber,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp message sent to OWNER");
  } catch (err) {
    console.error(
      "❌ WhatsApp Error:",
      err.response?.data || err.message
    );
  }
};

/* =====================================================
   USER – CREATE ORDER
===================================================== */
exports.addOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const {
      grams,
      items = [],
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

    // 2️⃣ Insert order items
    if (items.length > 0) {
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

    // 3️⃣ Send WhatsApp to OWNER (AFTER COMMIT)
    await sendWhatsAppToOwner(order, items);

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
   ADMIN – GET ALL ORDERS
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
   ADMIN – UPDATE TRACKING
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
