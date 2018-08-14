 /**
  * 侧边栏导航属性：
  * 1.id           唯一标识          必填
  * 2.title        标题              必填
  * 3.icon         icon              选填
  * 4.url          目标地址           选填
  * 5.children     子路由             选填
  * 6.badge        提示样式           选填
  * 7.auth         权限               选填，如不填代表所有用户可见
  */
 export const navigations = [
    {
        'id': 'materials',
        'title': 'material 控件',
        'icon': 'gamepad',
        'url': '/materials',
    },
    {
        'id': 'http',
        'title': '后台交互',
        'icon': 'cast',
        'children': [
          {
            'id': 'list',
            'title': '列表模拟',
            'url': '/list',
          }, {
            'id': 'form',
            'title': '表单模拟',
            'url': '/form',
          }, {
              'id': 'upload',
              'title': '列表模拟',
              'url': '/upload',
          }
        ]
    },
    {
        'id': 'login',
        'title': '扩展页面',
        'icon': 'filter',
        'children': [
          {
            'id': 'sigin',
            'title': '登录',
            'url': '/sigin'
          }, {
            'id': 'sigup',
            'title': '注册',
            'url': '/sigup'
          }
        ]
    },
    {
        'id': 'extend',
        'title': '拓展组件',
        'icon': 'view_comfy',
        'auth': ['0', '1'],
        'badge': {
          'title': '7',
          'bg': '#bece62',
          'fg': '#fff'
        },
        'children': [
          {
            'id': 'echarts',
            'title': '图表',
            'url': '/echarts',
            'auth': ['0'],
          },
          {
            'id': 'amap',
            'title': '高德地图',
            'url': '/amap'
          }, {
            'id': 'calendar',
            'title': '日历',
            'url': '/calendar'
          }, {
              'id': 'editor',
              'title': '文本编辑器',
              'url': '/editor'
          }, {
              'id': 'processon',
              'title': '流程图',
              'url': '/processon'
          }, {
            'id': 'speed-dial',
            'title': 'speed-dial',
            'url': '/chat-widget'
          }
        ]
    },
  ];
