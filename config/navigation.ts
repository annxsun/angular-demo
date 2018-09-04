 /**
  * 侧边栏导航可以嵌套 N 层， 但是建议最好不要嵌套超过三层
  *
  * 侧边栏导航属性：
  * 1.id          唯一标识           必填
  * 2.title       标题              必填
  * 3.icon        icon              选填
  * 4.url         目标地址           选填
  * 5.children    子路由             选填
  * 6.badge       提示样式           选填
  * 7.auth        权限               选填，如不填代表所有用户可见
  * 8.hide        是否隐藏          不填，
  * 9.isOpen      是否展开           不填，
  *                                 active-style      展开，显示样式（字体加粗）
  *                                 active-instyle    展开，不显示样式
  *                                 inactive-style    不展开，显示样式（字体加粗）
  *                                 inactive-instyle  不展开，不显示样式
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
            'url': '/http/list',
          },
          // {
          //   'id': 'create',
          //   'title': '表单模拟',
          //   'url': '/http/create',
          // },
          {
              'id': 'upload',
              'title': '文件上传模拟',
              'url': '/http/upload',
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
            'url': '/extend/echarts/overview',
          },
          {
            'id': 'amap',
            'title': '高德地图',
            'url': '/extend/amap/overview'
          }, {
            'id': 'calendar',
            'title': '日历',
            'url': '/extend/calendar'
          }, {
              'id': 'editor',
              'title': '文本编辑器',
              'url': '/extend/editor'
          }, {
              'id': 'processon',
              'title': '流程图',
              'url': '/extend/processon'
          }, {
            'id': 'speed-dial',
            'title': 'speed-dial',
            'url': '/extend/chat-widget'
          }
        ]
    },
    {
      'id': 'thirdMenu',
      'title': '三级目录',
      'icon': 'filter',
      'auth': ['0', '1'],
      'children': [
        {
          'id': 'second',
          'title': '第二级目录 1',
          'children': [
            {
              'id': 'third',
              'title': '第三级 1',
              'url': '/thirdMenu/second-third1',
            },
            {
              'id': 'third2',
              'title': '第三级 2',
              'url': '/thirdMenu/second-third2'
            },
          ]
        },
        {
          'id': 'second2',
          'title': '第二级目录 2',
          'children': [
            {
              'id': 'third',
              'title': '第三级',
              'url': '/thirdMenu/second2-third'
            },
          ]
        }
      ]
    }
  ];

  /**
   * 路由对应的模块索引表
   *
   * 一般情况：navigations 中的 url 一般是 url = id1/id2/id3/...
   * 如果：    url 的定义不是按照该规则制定，就将其添加到索引表
   *
   */
  export const navigationsIndexTable = [
    // {path: '/http/list', idArr: ['http', 'test']},
    {path: '/extend/chat-widget', idArr: ['extend', 'speed-dial']},
    {path: '/thirdMenu/second-third1', idArr: ['thirdMenu', 'second2', 'third']},
    {path: '/thirdMenu/second-third2', idArr: ['thirdMenu', 'second2', 'third']},
    {path:  '/thirdMenu/second2-third', idArr: ['thirdMenu', 'second2', 'third']},
  ];
