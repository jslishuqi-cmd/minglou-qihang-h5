/**
 * Supabase 全局初始化
 * 使用：在 HTML 中先引入 supabase SDK，再引入本文件
 * 注意：请将 SUPABASE_URL 与 SUPABASE_ANON_KEY 替换为你的真实值
 */
(function () {
  // TODO: 替换为真实配置（用户提供后我将自动写入）
  const SUPABASE_URL = 'https://axziyvmsdtdcmevcpksd.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4eml5dm1zZHRkY21ldmNwa3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDYyMjAsImV4cCI6MjA3NDI4MjIyMH0.liuWP6Ouc05-K2GCOali-zMk9TKg6h9_abS1-1_LH8Q';

  if (typeof supabase === 'undefined') {
    console.warn('Supabase SDK 未加载：请确保已引入 https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    return;
  }
  if (!SUPABASE_URL || SUPABASE_URL.includes('YOUR-PROJECT') || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY')) {
    console.warn('Supabase 未配置有效 URL/Key，系统将回退使用本地存储。');
    return;
  }

  try {
    window.supabaseClient = window.supabaseClient || supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase 已初始化：', SUPABASE_URL);
  } catch (e) {
    console.error('Supabase 初始化失败：', e);
  }
})();