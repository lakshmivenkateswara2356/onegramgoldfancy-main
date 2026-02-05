import axios from "axios";

export const sendWhatsAppMessage = async (order) => {
  const message = `
🛍️ New Order Received

Name: ${order.customer_name}
Phone: ${order.phone}

Products:
${order.items
  .map(
    (item, i) =>
      `${i + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
  )
  .join("\n")}

Total: ₹${order.total_amount}
Payment: Cash on Delivery

Address:
${order.address}
`;

  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: order.phone,
      type: "text",
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );
};
