import type { APIRoute } from 'astro';
import { createOrder } from '../../lib/cms';
import type { OrderCustomerInfo, OrderItem } from '../../types/catalog';

type CreateOrderBody = {
  productId?: string;
  productName?: string;
  color?: string;
  size?: string;
  price?: number;
  currency?: OrderItem['currency'];
  customer?: Partial<OrderCustomerInfo>;
};

const toSafeText = (value: unknown) => String(value || '').trim();

export const POST: APIRoute = async ({ request }) => {
  let body: CreateOrderBody;

  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400 });
  }

  const productId = toSafeText(body.productId);
  const productName = toSafeText(body.productName);
  const color = toSafeText(body.color);
  const size = toSafeText(body.size);
  const price = Number(body.price || 0);
  const currency = body.currency === 'MXN' ? 'MXN' : null;

  const customer: OrderCustomerInfo = {
    name: toSafeText(body.customer?.name),
    document: toSafeText(body.customer?.document),
    address: toSafeText(body.customer?.address),
    city: toSafeText(body.customer?.city),
    phone: toSafeText(body.customer?.phone)
  };

  if (!productId || !productName || !color || !size || !currency || !Number.isFinite(price) || price <= 0) {
    return new Response(JSON.stringify({ error: 'invalid_order_data' }), { status: 400 });
  }

  if (!customer.name || !customer.document || !customer.address || !customer.city || !customer.phone) {
    return new Response(JSON.stringify({ error: 'invalid_customer_data' }), { status: 400 });
  }

  const order = await createOrder({
    productId,
    productName,
    color,
    size,
    price,
    currency,
    customer
  });

  return new Response(JSON.stringify({ ok: true, order }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
};
