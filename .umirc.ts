import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      title: '首页',
      name: '首页',
      icon: 'home',
      // 隐藏自己和子菜单
      hideInMenu: false,
      // 在面包屑中隐藏
      hideInBreadcrumb: false,
      // 子项往上提，仍旧展示,
      flatMenu: false,
    },
    {
      path: '/timeline',
      component: '@/pages/timeline',
      title: '时间线',
      name: '时间线',
      icon: 'robot',
      // 隐藏自己和子菜单
      hideInMenu: false,
      // 在面包屑中隐藏
      hideInBreadcrumb: false,
      // 子项往上提，仍旧展示,
      flatMenu: false,
    },
  ],
  fastRefresh: {},
  request: {
    dataField: 'data',
  },
});
