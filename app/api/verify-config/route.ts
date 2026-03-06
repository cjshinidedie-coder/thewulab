import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // 验证环境变量是否存在（不显示实际值）
    const checks = {
      stripe_publishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      stripe_secret: !!process.env.STRIPE_SECRET_KEY,
      paypal_client_id: !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      paypal_secret: !!process.env.PAYPAL_SECRET_KEY,
      app_url: !!process.env.NEXT_PUBLIC_APP_URL,
    };

    // 验证密钥格式
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
    const paypalSecret = process.env.PAYPAL_SECRET_KEY || '';

    const validation = {
      stripe_publishable_valid: stripePublishableKey.startsWith('pk_test_'),
      stripe_secret_valid: stripeSecretKey.startsWith('sk_test_'),
      paypal_client_id_valid: paypalClientId.length > 0 && paypalClientId !== 'your_paypal_client_id',
      paypal_secret_valid: paypalSecret.length > 0 && paypalSecret !== 'your_paypal_secret',
    };

    const allConfigured = Object.values(checks).every(v => v);
    const allValid = Object.values(validation).every(v => v);

    return NextResponse.json({
      status: allConfigured && allValid ? 'success' : 'incomplete',
      checks,
      validation,
      message: allConfigured && allValid
        ? '✅ 所有环境变量已正确配置！'
        : '⚠️ 请检查环境变量配置',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Verification failed', details: String(error) },
      { status: 500 }
    );
  }
}
