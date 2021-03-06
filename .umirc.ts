import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

const isDeploy = process.env.SITE_DEPLOY === 'TRUE';

const basePath = isProduction ? '/ui-kit/' : '/';

export default defineConfig({
  title: 'UI-KIT',
  description: '快速搭建风格统一化的中后台',
  favicon: basePath + '/favicon.ico',
  logo: basePath + '/logo.png',
  outputPath: 'docs-dist',
  base: basePath,
  publicPath: basePath,
  mode: 'site',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/kafudev/ui-kit',
    },
    {
      title: '更新日志',
      path: 'https://github.com/kafudev/ui-kit/releases',
    },
  ],
  proxy: {
    '/admin/api/': {
      // 要代理的地址
      target: 'http://xunjian.kafukeji.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
    '/admin/': {
      // 要代理的地址
      target: 'http://piaoju.kafukeji.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
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
