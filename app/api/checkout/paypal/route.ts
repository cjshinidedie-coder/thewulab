import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { calculateTotalPrice } from '@/lib/products';

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'; // 测试环境

// 获取 PayPal Access Token
async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  ).toString('base64');

  const response = await axios.post(
    `${PAYPAL_API_BASE}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, email } = body;

    // ⚠️ 关键：后端重新计算真实价格，不信任前端
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    const totalPrice = calculateTotalPrice(items);

    // 获取 PayPal Access Token
    const accessToken = await getPayPalAccessToken();

    // 构建 PayPal order items
    const paypalItems = items.map((item: any) => ({
      name: item.name,
      unit_amount: {
        currency_code: 'USD',
        value: item.price.toFixed(2),
      },
      quantity: item.quantity.toString(),
    }));

    // 创建 PayPal Order
    const orderResponse = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalPrice.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: totalPrice.toFixed(2),
                },
              },
            },
            items: paypalItems,
          },
        ],
        payer: {
          email_address: email,
        },
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
          brand_name: 'the wu lab',
          locale: 'en-US',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const orderId = orderResponse.data.id;
    const approvalLink = orderResponse.data.links.find(
      (link: any) => link.rel === 'approve'
    )?.href;

    return NextResponse.json({
      orderId,
      approvalLink,
    });
  } catch (error) {
    console.error('PayPal error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
