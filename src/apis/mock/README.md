# Mock数据使用说明

## 概述

本项目已集成Mock数据系统，可以在不依赖后端的情况下预览前端功能。Mock系统会自动拦截所有API请求并返回预设的模拟数据。

## 启用/禁用Mock模式

### 自动模式（默认）

- **开发模式（development）**：默认启用Mock
- **生产模式（production）**：默认禁用Mock

### 手动控制

在 `src/apis/mock/mockInterceptor.ts` 文件中可以看到控制逻辑：

```typescript
const ENABLE_MOCK =
  import.meta.env.VITE_ENABLE_MOCK !== undefined
    ? import.meta.env.VITE_ENABLE_MOCK === 'true'
    : import.meta.env.MODE === 'development'
```

## Mock数据位置

所有Mock数据定义在 `src/apis/mock/mockData.ts` 文件中。

## 完整的API端点列表

### 账户相关

- `POST /api/login/password` - 密码登录
- `POST /api/login/code` - 邮箱验证码登录
- `POST /api/register` - 注册
- `POST /api/email` - 发送邮箱验证码
- `POST /api/reset/code` - 重置密码（找回密码）
- `POST /api/user/old_email` - 确认旧邮箱
- `POST /api/user/new_email` - 确认新邮箱

### 简历相关

- `GET /api/student/resume/list` - 获取简历列表
- `GET /api/student/resume` - 获取简历详情
- `POST /api/student/resume` - 添加简历
- `PUT /api/student/resume` - 编辑简历
- `DELETE /api/student/resume` - 删除简历
- `POST /api/student/resume/default` - 设置默认简历
- `POST /api/student/resume/open` - 设置简历公开状态
- `POST /api/student/resume/upload` - 上传简历文档
- `GET /api/student/post` - 获取简历投递记录
- `POST /api/student/post` - 设置投递状态
- `PUT /api/student/post` - 重置投递状态

### 岗位库相关

- `GET /api/student/job` - 获取岗位详情
- `GET /api/student/jobs` - 搜索岗位（岗位库检索）
- `GET /api/student/evaluate/ability` - 能力评估
- `GET /api/student/evaluate/intention` - 意向评估
- `GET /api/job` - 岗位匹配（基于技能和关键词）
- `GET /api/student/job/comments` - 获取岗位评论列表
- `POST /api/student/job/comment` - 添加岗位评论
- `POST /api/student/evaluate/ability/scoring` - 岗位评分
- `POST /api/student/job/upvote` - 岗位点赞

### 企业相关

- `GET /api/enterprise/info` - 获取企业信息
- `POST /api/enterprise/info` - 提交企业信息
- `GET /api/enterprise/students` - 获取学生列表
- `GET /api/enterprise/student/resume` - 企业查看学生简历
- `POST /api/enterprise/student/post` - 企业申请查看简历
- `GET /api/enterprise/student/post` - 获取企业申请列表
- `POST /api/enterprise/requirement` - 企业岗位需求匹配

### 热门数据相关

- `GET /api/student/trend/skill` - 热门技能
- `GET /api/student/trend/title` - 热门岗位
- `GET /api/student/trend/address` - 热门地址

### 用户相关

- `POST /api/user/avatar` - 设置头像
- `POST /api/user/reset/password` - 修改密码

### 机器人相关

- `POST /api/student/bot/clean` - 清空聊天消息

## 测试账号

Mock模式下可以使用以下测试账号：

**密码登录：**

- 用户名：`admin`
- 密码：`123456`

**邮箱验证码登录：**

- 邮箱：任意邮箱格式
- 验证码：`123456`

**默认头像：**

所有用户都会自动生成独特的卡通头像（使用 DiceBear Avataaars API）

- 格式：`https://api.dicebear.com/7.x/avataaars/svg?seed=用户名`
- 每个用户根据用户名生成独特的头像
- 头像会在登录、注册时自动设置，无需额外加载
- 格式：`https://api.dicebear.com/7.x/avataaars/svg?seed=用户名`
- 每个用户根据用户名生成独特的头像
- 头像会在登录、注册时自动设置

## Mock数据格式说明

所有API的Mock响应格式统一为：

```typescript
{
  code: number,    // 状态码：200-成功, 400/404-失败
  msg: string,     // 消息
  data?: any       // 数据（可选）
}
```

## 自定义Mock数据

如果需要修改Mock数据，请编辑 `src/apis/mock/mockData.ts` 文件。

### Mock数据格式

Mock数据的key格式为 `"METHOD URL"`，例如：

```typescript
'POST /api/login/password': async (params: any) => {
  await delay(500); // 模拟网络延迟（毫秒）
  return {
    code: 200,
    msg: '操作成功',
    data: {
      // 你的mock数据
    }
  };
}
```

**重要说明：**

- Key格式：`"METHOD URL"`，例如 `"GET /api/student/resume"`
- METHOD必须大写：GET、POST、PUT、DELETE等
- Mock拦截器会自动匹配 "METHOD URL" 或 "URL"（向后兼容）

### 区分相同URL不同METHOD

某些API使用相同的URL但不同的HTTP方法，例如：

```typescript
// 获取简历（GET）
'GET /api/student/resume': async (params: any) => { ... }

// 添加简历（POST）
'POST /api/student/resume': async (params: any) => { ... }

// 编辑简历（PUT）
'PUT /api/student/resume': async (params: any) => { ... }

// 删除简历（DELETE）
'DELETE /api/student/resume': async (params: any) => { ... }
```

## 示例数据

### 简历列表数据

包含3条示例简历，字段包括：

- `id`、`resume_id`、`remark`（简历名称）
- `default`（是否默认）、`open_public`（1-公开/2-不公开）
- `post_status`、`update_time`

### 简历详情数据

包含完整的简历信息，所有字段：

- **基本信息**：`resume_id`、`name`、`sex`（1-男/2-女）、`age`、`id_no`、`phone`、`email`、`address`
- **求职意向**：`job_intention`、`education`、`city_intention`、`salary_intention`（单位：千元）
- **详细内容**：`ability`、`work_experience`、`honor`、`self_evaluation`（均为多行文本）
- **简历信息**：`remark`（简历简介）

**特殊情况**：当 `resume_id === -1` 时，返回默认简历的基本信息（用于能力评估页面）

### 岗位搜索数据

返回30个示例岗位，支持分页（默认每页4条），包含：

- 岗位ID、标题、公司、薪资、学历要求、点赞数
- 支持筛选：公司名称、岗位名称、学历、地址

### 能力评估数据

返回5个推荐岗位，每个包含：

- 岗位标题、公司、薪资、地址、详情链接
- 支持评分功能

### 意向评估数据

返回用户意向评估结果，包含：

- 关键词、技能、岗位、城市、薪资范围
- **匹配度（0-1之间的小数）**

### 岗位匹配数据

返回岗位匹配结果（用于能力评估页面），包含：

- **`match`**：总体匹配度（0-1之间的小数，用于显示圆形进度条）
- `jobs`：推荐岗位列表
- `advice`：职业建议（Markdown格式）

### 企业学生列表

返回2个示例学生，支持分页参数。

### 热门数据

- **技能**：7个热门技能及其趋势（每个包含 id 和 name 字段）
- **岗位**：7个热门岗位及其趋势（每个包含 id 和 name 字段）
- **地址**：7个热门城市及其趋势（每个包含 id 和 name 字段）

## 注意事项

1. Mock数据仅用于开发测试，不会发送真实请求到后端
2. 所有Mock响应都包含500ms的模拟延迟（除了岗位匹配接口为800ms），以模拟真实网络环境
3. 如果某个API没有对应的Mock数据，会返回404错误并在控制台显示具体的端点信息
4. 生产环境建议禁用Mock模式
5. Mock拦截器会在控制台打印是否启用的状态

## 调试

启用Mock模式后，浏览器控制台会显示：

```
✅ Mock模式已启用 - 所有API请求将被拦截并返回mock数据
```

如果Mock数据未找到，控制台会显示：

```json
{
  "code": 404,
  "msg": "Mock数据未找到: GET /api/xxx",
  "data": null
}
```

这样可以帮助你快速定位哪些API需要添加Mock数据。

## 技术实现

Mock系统通过axios拦截器实现：

1. 请求拦截器捕获所有请求
2. 根据URL和METHOD匹配对应的Mock数据
3. 返回Mock响应，阻止真实请求发送

代码位置：

- Mock数据：`src/apis/mock/mockData.ts`
- 拦截器：`src/apis/mock/mockInterceptor.ts`
- axios配置：`src/apis/axios.ts`
