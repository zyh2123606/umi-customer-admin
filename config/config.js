import Routes from './router.config'
import Theme from '../src/theme'

export default {
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true
      },
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: { webpackChunkName: true },
      title: 'BackAdmin',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//
        ],
      },
    }],
  ],
  routes: Routes,
  theme: {
    'primary-color': Theme.primaryColor
  }
}

