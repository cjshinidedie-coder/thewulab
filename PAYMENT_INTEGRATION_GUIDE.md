# 🚀 Stripe & PayPal 支付网关集成指南

## 📋 快速开始

### 1️⃣ 环境配置

你的 `.env.local` 已经配置好了。确保包含以下变量：

```env
# Stripe (测试密钥 - 从 https://dashboard.stripe.com/apikeys 获取)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# PayPal (沙箱密钥 - 从 https://developer.paypal.com/dashboard 获取)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2️⃣ 测试支付

#### **Stripe 测试卡号**
- 成功支付: `4242 4242 4242 4242`
- 失败支付: `4000 0000 0000 0002`
- 有效期: 任意未来日期 (如 12/25)
- CVC: 任意 3 位数字

#### **PayPal 沙箱账户**
- 访问 https://developer.paypal.com/dashboard
- 创建测试买家账户
- 使用测试账户登录进行支付

### 3️⃣ 核心功能说明

#### **动态购物车集成**
```typescript
// 从 AppContext 读取购物车数据
const { cartCount, cartItems, clearCart } = useApp();

// cartItems 结构:
// [
//   { id: '1', name: 'Product', price: 100, image: 'url', quantity: 2 },
//   { id: '2', name: 'Product', price: 50, image: 'url', quantity: 1 }
// ]

// 动态计算总价
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shippingCost = subtotal >= 100 ? 0 : 10;
const total = subtotal + shippingCost;
```

#### **Stripe 支付流程**
1. 用户填写收货地址
2. 输入信用卡信息
3. 点击"Pay with Stripe"
4. 前端调用 `/api/stripe/create-payment-intent`
5. 后端返回 `clientSecret`
6. 前端使用 `stripe.confirmCardPayment()` 确认支付
7. 支付成功后清空购物车并跳转回首页

#### **PayPal 支付流程**
1. 用户填写收货地址
2. 点击 PayPal 按钮
3. 前端调用 `/api/paypal/create-order`
4. 后端创建 PayPal 订单并返回 `orderId`
5. PayPal 弹窗打开，用户登录并确认
6. 前端调用 `/api/paypal/capture-order` 捕获订单
7. 支付成功后清空购物车并跳转回首页

### 4️⃣ 生产环境迁移

#### **Stripe 生产密钥**
1. 访问 https://dashboard.stripe.com/apikeys
2. 切换到 Live 模式
3. 复制 Live Publishable Key 和 Secret Key
4. 更新 `.env.production`

#### **PayPal 生产密钥**
1. 访问 https://developer.paypal.com/dashboard
2. 切换到 Live 模式
3. 复制 Live Client ID 和Secret
4. 在 API 路由中改为生产 URL: `https://api-m.paypal.com`

#### **更新 API 路由**
```typescript
// app/api/paypal/create-order/route.ts
const PAYPAL_API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';
```

### 5️⃣ 安全最佳实践

✅ **已实现的安全措施：**
- 后端验证金额和购物车数据
- 使用 Secret Key 在后端处理敏感操作
- 不在前端暴露 Secret Key
- 支付意图和订单在后端创建

⚠️ **生产环境建议：**
- 启用 Stripe Webhook 验证支付状态
- 实现订单数据库存储
- 添加支付失败重试机制
- 实现订单确认邮件
- 添加支付超时处理

### 6️⃣ 故障排查

**问题：Stripe 支付失败**
- 检查 Publishable Key 是否正确
- 确保 Secret Key 在后端环境变量中
- 验证卡号是否为测试卡号

**问题：PayPal 订单创建失败**
- 检查 Client ID 和 Secret 是否正确
- 确保使用了正确的沙箱/生产 URL
- 验证金额格式（必须是数字，保留 2 位小数）

**问题：支付成功但购物车未清空**
- 检查 `clearCart()` 是否被调用
- 验证 AppContext 中的 `clearCart` 方法是否正确

### 7️⃣ 文件结构

```
app/
├── api/
│   ├── stripe/
│   │   └── create-payment-intent/
│   │       └── route.ts
│   └── paypal/
│       ├── create-order/
│       │   └── route.ts
│       └── capture-order/
│           └── route.ts
├── checkout/
│   ├── page.tsx (主页面)
│   └── layout.tsx (PayPal 提供者)
└── context/
    └── AppContext.tsx (购物车状态)
```

### 8️⃣ 下一步

1. ✅ 在本地测试支付流程
2. ✅ 验证购物车数据正确传递
3. ✅ 测试支付成功和失败场景
4. ✅ 获取生产环境密钥
5. ✅ 部署到 Vercel
6. ✅ 在生产环境测试

---

## 🎉 完成！

你的电商网站现在拥有了**完整的真实支付网关集成**！

✅ Stripe 信用卡支付
✅ PayPal 账户支付
✅ 动态购物车数据
✅ 实时价格计算
✅ 多语言支持
✅ 支付成功流程
✅ 安全的后端处理

现在可以开始测试支付流程了！🚀
