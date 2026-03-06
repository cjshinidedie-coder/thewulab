import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // 获取所有环境变量
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
    const paypalSecret = process.env.PAYPAL_SECRET_KEY || '';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';

    // 详细的诊断信息
    const diagnostics = {
      stripe_publishable: {
        exists: !!stripePublishableKey,
        length: stripePublishableKey.length,
        starts_with_pk_test: stripePublishableKey.startsWith('pk_test_'),
        is_placeholder: stripePublishableKey === 'pk_test_your_stripe_publishable_key',
        preview: stripePublishableKey.length > 0
          ? `${stripePublishableKey.substring(0, 20)}...${stripePublishableKey.substring(stripePublishableKey.length - 10)}`
          : 'NOT SET',
      },
      stripe_secret: {
        exists: !!stripeSecretKey,
        length: stripeSecretKey.length,
        starts_with_sk_test: stripeSecretKey.startsWith('sk_test_'),
        is_placeholder: stripeSecretKey === 'sk_test_your_stripe_secret_key',
        preview: stripeSecretKey.length > 0
          ? `${stripeSecretKey.substring(0, 20)}...${stripeSecretKey.substring(stripeSecretKey.length - 10)}`
          : 'NOT SET',
      },
      paypal_client_id: {
        exists: !!paypalClientId,
        length: paypalClientId.length,
        is_placeholder: paypalClientId === 'your_paypal_client_id',
        preview: paypalClientId.length > 0
          ? `${paypalClientId.substring(0, 20)}...${paypalClientId.substring(paypalClientId.length - 10)}`
          : 'NOT SET',
      },
      paypal_secret: {
        exists: !!paypalSecret,
        length: paypalSecret.length,
        is_placeholder: paypalSecret === 'your_paypal_secret',
        preview: paypalSecret.length > 0
          ? `${paypalSecret.substring(0, 20)}...${paypalSecret.substring(paypalSecret.length - 10)}`
          : 'NOT SET',
      },
      app_url: {
        exists: !!appUrl,
        value: appUrl,
      },
    };

    // 检查哪些是占位符
    const placeholders = Object.entries(diagnostics)
      .filter(([_, value]: any) => value.is_placeholder)
      .map(([key]) => key);

    const allValid = placeholders.length === 0 &&
      diagnostics.stripe_publishable.starts_with_pk_test &&
      diagnostics.stripe_secret.starts_with_sk_test;

    return NextResponse.json({
      status: allValid ? 'success' : 'incomplete',
      diagnostics,
      placeholders,
      message: allValid
        ? '✅ 所有环境变量已正确配置！'
        : `⚠️ 以下密钥需要检查: ${placeholders.join(', ')}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Verification failed', details: String(error) },
      { status: 500 }
    );
  }
}
