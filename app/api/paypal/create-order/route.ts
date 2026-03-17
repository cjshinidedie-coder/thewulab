import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'; // 沙箱环境，生产环境改为 https://api-m.paypal.com

async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET_KEY;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { amount, cartItems, customerEmail } = await request.json();

    // 验证金额
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // 验证购物车数据
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    // 创建 PayPal 订单
    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: amount.toFixed(2),
                },
              },
            },
            items: cartItems.map((item: any) => ({
              name: item.name,
              quantity: item.quantity.toString(),
              unit_amount: {
                currency_code: 'USD',
                value: item.price.toFixed(2),
              },
            })),
            description: `Order with ${cartItems.length} item(s)`,
          },
        ],
        payer: {
          email_address: customerEmail || 'guest@example.com',
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('PayPal error:', orderData);
      return NextResponse.json(
        { error: 'Failed to create PayPal order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: orderData.id,
      status: orderData.status,
    });
  } catch (error) {
    console.error('PayPal API error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
