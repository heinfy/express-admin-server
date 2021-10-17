/** 用户信息 */
const mysql = require('../mysql');
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    usertype: { type: String, required: true }, //用户类型
    userid: { type: String, required: true }, //用户id
    username: { type: String, required: true }, //用户账号
    phone: { type: String, required: true }, //用户账号
    password: { type: String, required: true }, //密码
    password2: { type: String }, // 明文密码
    is_active: { type: Boolean, default: false }, // 是否被激活，默认不激活
    is_deleted: { type: Boolean, default: false }, // 是否被删除，默认不删除
    like_by_stu: { type: Number, default: 0 }, // 学生对老师的点赞数，默认为0
    role_id: { type: String, default: '3' }, // 角色id默认3，表示无角色，登录后只有首页权限
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
