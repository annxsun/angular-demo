import { InMemoryDbService } from 'angular-in-memory-web-api';

export class UserMockService implements InMemoryDbService {

  createDb() {
    const users = [
      { id: 1,  name: '赵一', birth: '1995-08-15', email: '890543@qq.com', hobby: ['吃饭', '睡觉', '打豆豆'] ,  role: '普通用户' },
      { id: 2,  name: '钱二', birth: '1995-09-10', email: '545353@qq.com', hobby: ['吃饭', '睡觉', '打豆豆']  , role: '管理员'},
      { id: 3,  name: '孙三', birth: '1998-10-01', email: '564564@qq.com', hobby: ['吃饭'],                    role: '管理员' },
      { id: 4,  name: '李四', birth: '1992-11-11', email: '122133@qq.com', hobby: ['睡觉'],                    role: '普通用户' },
      { id: 5,  name: '周五', birth: '1997-12-12', email: '979797@qq.com', hobby: ['睡觉', '打豆豆'],          role: '普通用户' },
      { id: 6,  name: '吴六', birth: '1995-05-01', email: '212323@qq.com', hobby: ['吃饭', '打豆豆'],          role: '普通用户' },
      { id: 7,  name: '郑一', birth: '1995-08-15', email: '103540@qq.com', hobby: ['睡觉', '打豆豆'],          role: '普通用户' },
      { id: 8,  name: '王二', birth: '1995-09-10', email: '845414@qq.com', hobby: ['吃饭', '打豆豆'],          role: '管理员'},
      { id: 9,  name: '孙一', birth: '1998-10-01', email: '295921@qq.com', hobby: ['打豆豆'],                  role: '管理员'},
      { id: 10, name: '李二', birth: '1992-11-11', email: '333423@qq.com', hobby: ['睡觉'],                    role: '普通用户' },
      { id: 11, name: '周一', birth: '1997-12-12', email: '534323@qq.com', hobby: ['吃饭'],                    role: '普通用户' },
      { id: 12, name: '吴一', birth: '1995-05-01', email: '127886@qq.com', hobby: ['打豆豆'],                  role: '普通用户' },
    ];
    return {users};
  }
}
