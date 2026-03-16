import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'; // 沙箱环境

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

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
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    // 捕获 PayPal 订单
    const captureResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      console.error('PayPal capture error:', captureData);
      return NextResponse.json(
        { error: 'Failed to capture PayPal order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: captureData.id,
      status: captureData.status,
      paymentSource: captureData.payment_source,
    });
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}
