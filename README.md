Important Notes for React Native
Realtime over WebSockets works in React Native ✅

Make sure you’re using @supabase/supabase-js v2+

<!-- select the order products from the another user -->

SELECT
o.id,
o.total,
o.quantity,
o.status,
o.payment_method,
o.created_at,
o.address,
o.product_id,
p.id AS products_id,
p.name AS products_name,
p.price AS products_price,
p.image AS products_image
FROM orders o
LEFT JOIN products p ON o.product_id = p.id
WHERE o.user_id = 'cd091083-ac40-4454-a809-2bcc046e65cc'
ORDER BY o.created_at DESC;
