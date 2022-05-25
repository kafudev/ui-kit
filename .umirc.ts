import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

const isDeploy = process.env.SITE_DEPLOY === 'TRUE';

export default defineConfig({
  title: 'UI-KIT',
  description: '快速搭建风格统一化的中后台',
  favicon: '/favicon.ico',
  logo: '/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  sitemap: { hostname: '/' },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/ant-design/pro-components',
    },
    {
      title: '更新日志',
      path: 'https://github.com/umijs/dumi/releases',
    },
  ],
  analytics: isProduction
    ? {
        // Google Analytics 代码，配置后会启用
        ga: 'google analytics code',
        // 百度统计代码，配置后会启用
        baidu: 'baidu code',
      }
    : false,
  // more config: https://d.umijs.org/config
  // ssr: isDeploy ? {} : undefined,
  // webpack5: {},
  // exportStatic: {},
  // mfsu: !isDeploy ? {} : undefined,
});
