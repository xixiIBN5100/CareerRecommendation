// Mock数据文件 - 包含所有API的mock响应数据
/* eslint-disable @typescript-eslint/no-unused-vars */

export interface MockResponse {
  code: number
  msg: string
  data?: any
}

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock数据存储 - 支持 "METHOD URL" 或 "URL" 两种格式的 key
const mockData: Record<string, (params?: any, config?: any) => Promise<MockResponse>> = {
  // ========== 账户相关 API ==========
  
  // 密码登录
  'POST /api/login/password': async (params: any) => {
    await delay(500)
    if (params?.user_name === 'admin' && params?.password === '123456') {
      return {
        code: 200,
        msg: '登录成功',
        data: {
          token: 'mock_token_' + Date.now(),
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          type: 1, // 1-学生, 2-企业
          email: 'user@example.com',
          user_name: params.user_name
        }
      }
    }
    return {
      code: 400,
      msg: '用户名或密码错误'
    }
  },

  // 邮箱验证码登录
  'POST /api/login/code': async (params: any) => {
    await delay(500)
    if (params?.code === '123456') {
      return {
        code: 200,
        msg: '登录成功',
        data: {
          token: 'mock_token_' + Date.now(),
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (params.email || 'user'),
          type: 1,
          email: params.email,
          user_name: 'mock_user'
        }
      }
    }
    return {
      code: 400,
      msg: '验证码错误'
    }
  },

  // 注册
  'POST /api/register': async (params: any) => {
    await delay(500)
    const userName = params?.user_name || 'mock_user'
    return {
      code: 200,
      msg: '注册成功',
      data: {
        token: 'mock_token_' + Date.now(),
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userName,
        type: params?.type || 1,
        email: params?.email || 'user@example.com',
        user_name: userName
      }
    }
  },

  // 发送邮箱验证码
  'POST /api/email': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: 'OK'
    }
  },

  // 重置密码（找回密码）
  'POST /api/reset/code': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '密码重置成功'
    }
  },

  // 确认旧邮箱
  'POST /api/user/old_email': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: 'OK'
    }
  },

  // 确认新邮箱
  'POST /api/user/new_email': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: 'OK'
    }
  },

  // ========== 简历相关 API ==========
  
  // 获取简历列表
  'GET /api/student/resume/list': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: [
        {
          id: 1,
          resume_id: 1,
          remark: '我的第一份简历',
          default: true,
          open_public: 1, // 1-公开, 2-不公开
          post_status: 1,
          update_time: '2024-01-15 10:30:00'
        },
        {
          id: 2,
          resume_id: 2,
          remark: '求职简历',
          default: false,
          open_public: 2,
          post_status: 0,
          update_time: '2024-01-14 15:20:00'
        },
        {
          id: 3,
          resume_id: 3,
          remark: '实习简历',
          default: false,
          open_public: 2,
          post_status: 0,
          update_time: '2024-01-13 09:15:00'
        }
      ]
    }
  },

  // 获取简历详情
  'GET /api/student/resume': async (params: any) => {
    await delay(500)
    const resumeId = params?.resume_id || 1
    
    // 如果 resume_id 为 -1，表示获取默认简历
    if (params?.resume_id === -1) {
      return {
        code: 200,
        msg: '获取成功',
        data: {
          resume_id: 1,
          name: '张三',
          job_intention: '前端开发工程师', // 字符串格式，用于显示在能力评估页面
          sex: 1, // 1-男, 2-女
          age: 22,
          phone: '13800138000',
          email: 'zhangsan@example.com',
          address: '北京市朝阳区'
        }
      }
    }
    
    return {
      code: 200,
      msg: '获取成功',
      data: {
        resume_id: resumeId,
        name: '张三',
        sex: 1, // 1-男, 2-女
        age: 22,
        id_no: '110101199901010101',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        address: '北京市朝阳区',
        job_intention: '前端开发工程师',
        education: '本科',
        city_intention: '北京',
        salary_intention: 20, // 单位：千元
        ability: '熟练掌握Vue3、React、TypeScript等前端技术栈\n熟悉Webpack、Vite等构建工具\n了解Node.js后端开发\n具备良好的代码规范和文档编写能力',
        work_experience: '2023.07 - 2023.09  腾讯科技  前端开发实习生\n负责PC端和移动端页面开发，使用Vue3框架\n参与组件库建设，优化页面性能\n与设计师、后端工程师协作完成项目需求\n\n2023.03 - 2023.06  阿里巴巴  前端开发实习生\n负责后台管理系统的开发与维护\n使用TypeScript重构部分模块，提升代码质量\n参与code review，学习团队最佳实践',
        honor: '2023年 国家奖学金\n2022年 ACM程序设计竞赛 省级二等奖\n2021年 优秀学生干部\n2021年 数学建模竞赛 校级一等奖',
        self_evaluation: '本人性格开朗，善于沟通，具有较强的团队协作能力。热爱前端开发，对新技术充满热情，喜欢钻研技术细节。学习能力强，能够快速适应新环境和新技术。工作认真负责，注重代码质量，追求技术卓越。',
        remark: '我的第一份简历'
      }
    }
  },

  // 添加简历
  'POST /api/student/resume': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '添加成功',
      data: {
        resume_id: Math.floor(Math.random() * 1000) + 10
      }
    }
  },

  // 编辑简历
  'PUT /api/student/resume': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '修改成功'
    }
  },

  // 删除简历
  'DELETE /api/student/resume': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '删除成功'
    }
  },

  // 设置默认简历
  'POST /api/student/resume/default': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '设置成功'
    }
  },

  // 设置简历公开状态
  'POST /api/student/resume/open': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '设置成功'
    }
  },

  // 上传简历文档
  'POST /api/student/resume/upload': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '上传成功',
      data: {
        doc_url: 'https://example.com/resume.pdf'
      }
    }
  },

  // 获取简历访问请求（投递记录）
  'GET /api/student/post': async (params: any) => {
    await delay(500)
    const checkStatus = params?.check || 0 // 0-全部, 1-未审核, 2-已审核
    
    const allPosts = [
      {
        post_id: 1,
        name: '阿里巴巴',
        industry: '互联网',
        location: '杭州',
        email: 'hr@alibaba.com',
        website: 'https://www.alibaba.com',
        introduction: '阿里巴巴集团是一家以技术驱动的多元化商业集团，致力于让天下没有难做的生意。',
        post_status: 1 // 1-待审核, 2-已通过, 3-已拒绝
      },
      {
        post_id: 2,
        name: '腾讯科技',
        industry: '互联网',
        location: '深圳',
        email: 'hr@tencent.com',
        website: 'https://www.tencent.com',
        introduction: '腾讯以技术丰富互联网用户的生活，通过互联网服务提升人类生活品质。',
        post_status: 2 // 已通过
      },
      {
        post_id: 3,
        name: '字节跳动',
        industry: '互联网',
        location: '北京',
        email: 'hr@bytedance.com',
        website: 'https://www.bytedance.com',
        introduction: '字节跳动是一家全球化的互联网科技公司，旗下拥有抖音、今日头条等产品。',
        post_status: 3 // 已拒绝
      },
      {
        post_id: 4,
        name: '美团',
        industry: '互联网',
        location: '北京',
        email: 'hr@meituan.com',
        website: 'https://www.meituan.com',
        introduction: '美团是中国领先的生活服务电子商务平台，为消费者提供吃喝玩乐一站式服务。',
        post_status: 1 // 待审核
      },
      {
        post_id: 5,
        name: '京东',
        industry: '电商',
        location: '北京',
        email: 'hr@jd.com',
        website: 'https://www.jd.com',
        introduction: '京东是中国领先的综合网络零售商，为用户提供高品质的商品和服务。',
        post_status: 2 // 已通过
      }
    ]
    
    // 根据checkStatus筛选
    let filteredPosts = allPosts
    if (checkStatus === 1) {
      // 未审核（待审核）
      filteredPosts = allPosts.filter(post => post.post_status === 1)
    } else if (checkStatus === 2) {
      // 已审核（已通过或已拒绝）
      filteredPosts = allPosts.filter(post => post.post_status === 2 || post.post_status === 3)
    }
    
    return {
      code: 200,
      msg: '获取成功',
      data: {
        post: filteredPosts,
        student_status: 1 // 1-简历已公开, 2-简历未公开
      }
    }
  },

  // 设置投递状态
  'POST /api/student/post': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '设置成功'
    }
  },

  // 重置投递状态
  'PUT /api/student/post': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '重置成功'
    }
  },

  // ========== 岗位库相关 API ==========
  
  // 获取岗位详情
  'GET /api/student/job': async (params: any) => {
    await delay(500)
    const jobId = params?.id || 1
    return {
      code: 200,
      msg: 'OK',
      data: {
        data: {
          id: jobId,
          title: '前端开发工程师',
          company: '阿里巴巴',
          salary: '15k-25k',
          education: '本科',
          hiring_manager: '张经理',
          address: '杭州市余杭区',
          description: '岗位要求：\n1. 熟练掌握Vue3、React等前端框架\n2. 熟悉TypeScript和ES6+语法\n3. 有良好的代码规范和文档习惯\n4. 具备团队协作能力和沟通能力\n5. 有性能优化经验者优先',
          link: 'https://www.zhipin.com/job_detail/' + jobId,
          upvote: 128,
          comment_num: 15
        }
      }
    }
  },

  // 搜索岗位（岗位库检索）
  'GET /api/student/jobs': async (params: any) => {
    await delay(500)
    const pageNum = params?.page_num || 1
    const pageSize = params?.page_size || 4
    
    // 模拟30个岗位数据
    const allJobs = [
      { id: 1, title: '前端开发工程师', company: '阿里巴巴', salary: '15k-25k', education: '本科', upvote: 128 },
      { id: 2, title: '全栈开发工程师', company: '腾讯科技', salary: '20k-30k', education: '本科', upvote: 95 },
      { id: 3, title: '前端开发工程师', company: '字节跳动', salary: '18k-28k', education: '本科', upvote: 156 },
      { id: 4, title: 'Vue开发工程师', company: '美团', salary: '16k-26k', education: '本科', upvote: 82 },
      { id: 5, title: 'React开发工程师', company: '京东', salary: '17k-27k', education: '本科', upvote: 73 },
      { id: 6, title: '后端开发工程师', company: '百度', salary: '18k-30k', education: '本科', upvote: 91 },
      { id: 7, title: '算法工程师', company: '华为', salary: '25k-40k', education: '硕士', upvote: 112 },
      { id: 8, title: '产品经理', company: '小米', salary: '20k-35k', education: '本科', upvote: 68 },
      { id: 9, title: 'UI设计师', company: 'OPPO', salary: '12k-22k', education: '本科', upvote: 54 },
      { id: 10, title: '测试工程师', company: 'vivo', salary: '10k-18k', education: '本科', upvote: 45 },
      { id: 11, title: '高级前端工程师', company: '滴滴', salary: '25k-40k', education: '本科', upvote: 134 },
      { id: 12, title: 'Node.js工程师', company: '携程', salary: '20k-32k', education: '本科', upvote: 87 },
      { id: 13, title: 'Java工程师', company: '网易', salary: '18k-30k', education: '本科', upvote: 102 },
      { id: 14, title: 'Python工程师', company: '搜狐', salary: '16k-28k', education: '本科', upvote: 79 },
      { id: 15, title: 'Go工程师', company: 'B站', salary: '22k-35k', education: '本科', upvote: 98 },
      { id: 16, title: '前端架构师', company: '快手', salary: '30k-50k', education: '本科', upvote: 165 },
      { id: 17, title: '移动端开发', company: '拼多多', salary: '18k-30k', education: '本科', upvote: 88 },
      { id: 18, title: 'Flutter工程师', company: '蚂蚁金服', salary: '20k-35k', education: '本科', upvote: 76 },
      { id: 19, title: 'TypeScript工程师', company: '顺丰科技', salary: '17k-28k', education: '本科', upvote: 81 },
      { id: 20, title: '全栈架构师', company: '得物', salary: '35k-55k', education: '本科', upvote: 142 },
      { id: 21, title: '前端开发实习生', company: '蔚来汽车', salary: '8k-12k', education: '本科', upvote: 34 },
      { id: 22, title: 'Web3工程师', company: '币安', salary: '25k-45k', education: '本科', upvote: 67 },
      { id: 23, title: '小程序开发', company: '微信', salary: '16k-26k', education: '本科', upvote: 93 },
      { id: 24, title: '技术经理', company: '携程', salary: '30k-50k', education: '本科', upvote: 108 },
      { id: 25, title: '前端leader', company: '爱奇艺', salary: '28k-45k', education: '本科', upvote: 121 },
      { id: 26, title: 'WebGL工程师', company: '腾讯游戏', salary: '22k-38k', education: '本科', upvote: 59 },
      { id: 27, title: 'H5游戏开发', company: '4399', salary: '14k-24k', education: '本科', upvote: 47 },
      { id: 28, title: '可视化工程师', company: '阿里云', salary: '20k-35k', education: '本科', upvote: 85 },
      { id: 29, title: '低代码工程师', company: '钉钉', salary: '18k-30k', education: '本科', upvote: 71 },
      { id: 30, title: '性能优化工程师', company: '字节跳动', salary: '25k-42k', education: '本科', upvote: 114 }
    ]
    
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const pageJobs = allJobs.slice(start, end)
    
    return {
      code: 200,
      msg: '获取成功',
      data: {
        data: pageJobs, // 注意：返回的字段名是 data，不是 jobs
        total_page_num: Math.ceil(allJobs.length / pageSize),
        job_num: allJobs.length
      }
    }
  },

  // 能力评估
  'GET /api/student/evaluate/ability': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: [
        {
          job_id: 101,
          job_title: '前端开发工程师',
          job_company: '阿里巴巴',
          job_salary: '15k-25k',
          job_address: '杭州',
          job_link: 'https://www.zhipin.com/job_detail/example1'
        },
        {
          job_id: 102,
          job_title: 'Vue3高级工程师',
          job_company: '腾讯科技',
          job_salary: '20k-35k',
          job_address: '深圳',
          job_link: 'https://www.zhipin.com/job_detail/example2'
        },
        {
          job_id: 103,
          job_title: '全栈开发工程师',
          job_company: '字节跳动',
          job_salary: '22k-38k',
          job_address: '北京',
          job_link: 'https://www.zhipin.com/job_detail/example3'
        },
        {
          job_id: 104,
          job_title: 'Web前端专家',
          job_company: '美团',
          job_salary: '25k-40k',
          job_address: '北京',
          job_link: 'https://www.zhipin.com/job_detail/example4'
        },
        {
          job_id: 105,
          job_title: '前端架构师',
          job_company: '京东',
          job_salary: '30k-50k',
          job_address: '北京',
          job_link: 'https://www.zhipin.com/job_detail/example5'
        }
      ]
    }
  },

  // 意向评估
  'GET /api/student/evaluate/intention': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: {
        keyword: '前端开发',
        skills: 'Vue3,TypeScript,JavaScript',
        position: '前端开发工程师',
        city: '北京',
        salary_range: '15k-25k',
        match: 0.85 // 匹配度（0-1之间的小数）
      }
    }
  },

  // 岗位匹配（基于技能和关键词）
  'GET /api/job': async (_params: any) => {
    await delay(800)
    return {
      code: 200,
      msg: '匹配成功',
      data: {
        match: 0.85, // 匹配度（0-1之间的小数），用于显示在能力评估页面
        jobs: [
          {
            job_id: 1,
            name: '前端开发工程师',
            company: '阿里巴巴',
            city: '北京',
            salary: '15k-25k',
            match_score: 92,
            match_reason: '技能匹配度高，工作经验符合要求'
          },
          {
            job_id: 2,
            name: '高级前端开发工程师',
            company: '腾讯科技',
            city: '深圳',
            salary: '25k-35k',
            match_score: 88,
            match_reason: '技术栈匹配，但需要更多经验'
          }
        ],
        advice:
          '## 职业建议\n\n根据您的技能和意向，建议您：\n\n1. **继续深入学习Vue3生态系统**\n   - 学习Vue3的高级特性\n   - 掌握Pinia状态管理\n\n2. **提升全栈能力**\n   - 学习Node.js后端开发\n   - 了解数据库设计\n\n3. **关注行业动态**\n   - 关注前端新技术趋势\n   - 参与开源项目'
      }
    }
  },

  // 获取岗位评论列表
  'GET /api/student/job/comments': async (params: any) => {
    await delay(500)
    const pageNum = params?.page_num || 1
    const pageSize = params?.page_size || 4
    
    // 生成15条评论
    const allComments = [
      { id: 1, user_name: '张同学', content: '公司氛围很好，技术栈先进，团队nice！', create_time: '2024-01-15 10:00:00' },
      { id: 2, user_name: '李工程师', content: '工作压力较大，但成长空间大，学到了很多', create_time: '2024-01-14 15:30:00' },
      { id: 3, user_name: '王开发', content: '福利待遇不错，加班有补贴', create_time: '2024-01-13 09:20:00' },
      { id: 4, user_name: '赵前端', content: '技术栈很新，可以学习最新的技术', create_time: '2024-01-12 14:15:00' },
      { id: 5, user_name: '钱全栈', content: '团队氛围轻松，leader很负责', create_time: '2024-01-11 16:45:00' },
      { id: 6, user_name: '孙程序员', content: '公司发展前景好，期权激励不错', create_time: '2024-01-10 11:30:00' },
      { id: 7, user_name: '周码农', content: '办公环境舒适，零食饮料管够', create_time: '2024-01-09 13:20:00' },
      { id: 8, user_name: '吴开发者', content: '工作节奏快，适合想快速成长的同学', create_time: '2024-01-08 10:10:00' },
      { id: 9, user_name: '郑工', content: '技术氛围浓厚，经常有技术分享', create_time: '2024-01-07 15:00:00' },
      { id: 10, user_name: '刘同学', content: '薪资水平在行业中上游，很满意', create_time: '2024-01-06 09:30:00' },
      { id: 11, user_name: '陈前端', content: '项目很有挑战性，能学到很多东西', create_time: '2024-01-05 14:40:00' },
      { id: 12, user_name: '杨工程师', content: '加班情况合理，work-life balance不错', create_time: '2024-01-04 16:20:00' },
      { id: 13, user_name: '黄开发', content: '晋升通道清晰，有明确的职业规划', create_time: '2024-01-03 11:15:00' },
      { id: 14, user_name: '林程序员', content: '食堂伙食不错，下午茶也很丰富', create_time: '2024-01-02 10:50:00' },
      { id: 15, user_name: '徐码农', content: '整体来说是个不错的公司，推荐！', create_time: '2024-01-01 15:30:00' }
    ]
    
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const pageComments = allComments.slice(start, end)
    
    return {
      code: 200,
      msg: '获取成功',
      data: {
        data: pageComments,
        total_page_num: Math.ceil(allComments.length / pageSize)
      }
    }
  },

  // 添加岗位评论
  'POST /api/student/job/comment': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: 'OK'
    }
  },

  // 岗位评分
  'POST /api/student/evaluate/ability/scoring': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '评分成功'
    }
  },

  // 岗位点赞
  'POST /api/student/job/upvote': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: 'OK'
    }
  },

  // ========== 企业相关 API ==========
  
  // 获取企业信息
  'GET /api/enterprise/info': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: {
        name: '阿里巴巴集团',
        industry: '互联网',
        scale: '1000-5000人',
        address: '杭州市余杭区',
        description: '阿里巴巴集团是一家以技术驱动的多元化商业集团',
        contact: 'hr@alibaba.com',
        phone: '400-800-1688'
      }
    }
  },

  // 提交企业信息
  'POST /api/enterprise/info': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '提交成功'
    }
  },

  // 获取学生列表
  'GET /api/enterprise/students': async (params: any) => {
    await delay(500)
    const pageNum = params?.page_num || 1
    const pageSize = params?.page_size || 10
    
    return {
      code: 200,
      msg: '获取成功',
      data: {
        students: [
          {
            student_id: 1,
            name: '张三',
            school: '北京大学',
            major: '计算机科学与技术',
            skills: ['Vue3', 'TypeScript'],
            match_score: 85
          },
          {
            student_id: 2,
            name: '李四',
            school: '清华大学',
            major: '软件工程',
            skills: ['React', 'Node.js'],
            match_score: 82
          }
        ],
        total: 50,
        page_num: pageNum,
        page_size: pageSize
      }
    }
  },

  // 企业查看学生简历
  'GET /api/enterprise/student/resume': async (params: any) => {
    await delay(500)
    const studentId = params?.student_id || 1
    return {
      code: 200,
      msg: '获取成功',
      data: {
        student_id: studentId,
        resume_id: 1,
        name: '张三',
        basic_info: {
          name: '张三',
          gender: '男',
          age: 22,
          phone: '13800138000',
          email: 'zhangsan@example.com'
        },
        education: [
          {
            school: '北京大学',
            major: '计算机科学与技术',
            degree: '本科'
          }
        ],
        skills: ['Vue3', 'TypeScript', 'JavaScript']
      }
    }
  },

  // 企业申请查看简历
  'POST /api/enterprise/student/post': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '申请成功'
    }
  },

  // 获取企业申请列表
  'GET /api/enterprise/student/post': async (params: any) => {
    await delay(500)
    const pageNum = params?.page_num || 1
    const pageSize = params?.page_size || 10
    
    return {
      code: 200,
      msg: '获取成功',
      data: {
        posts: [
          {
            post_id: 1,
            student_id: 1,
            student_name: '张三',
            resume_id: 1,
            apply_time: '2024-01-15 10:00:00',
            status: 0 // 0-待处理, 1-已通过, 2-已拒绝
          },
          {
            post_id: 2,
            student_id: 2,
            student_name: '李四',
            resume_id: 2,
            apply_time: '2024-01-14 15:30:00',
            status: 1
          }
        ],
        total: 20,
        page_num: pageNum,
        page_size: pageSize
      }
    }
  },

  // 企业岗位需求匹配
  'POST /api/enterprise/requirement': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '匹配成功',
      data: {
        students: [
          {
            student_id: 1,
            name: '张三',
            match_score: 88,
            skills: ['Vue3', 'TypeScript']
          },
          {
            student_id: 2,
            name: '李四',
            match_score: 82,
            skills: ['React', 'Node.js']
          }
        ]
      }
    }
  },

  // ========== 热门数据相关 API ==========
  
  // 热门技能
  'GET /api/student/trend/skill': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: [
        { id: 1, name: 'Vue3', count: 1250, trend: 'up' },
        { id: 2, name: 'React', count: 1180, trend: 'up' },
        { id: 3, name: 'TypeScript', count: 980, trend: 'up' },
        { id: 4, name: 'Node.js', count: 850, trend: 'stable' },
        { id: 5, name: 'Python', count: 720, trend: 'stable' },
        { id: 6, name: 'Java', count: 680, trend: 'down' },
        { id: 7, name: 'Go', count: 520, trend: 'up' }
      ]
    }
  },

  // 热门岗位
  'GET /api/student/trend/title': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: [
        { id: 1, name: '前端开发工程师', count: 3200, trend: 'up' },
        { id: 2, name: '后端开发工程师', count: 2800, trend: 'up' },
        { id: 3, name: '全栈开发工程师', count: 2100, trend: 'up' },
        { id: 4, name: '算法工程师', count: 1500, trend: 'stable' },
        { id: 5, name: '产品经理', count: 1200, trend: 'stable' },
        { id: 6, name: 'UI设计师', count: 980, trend: 'up' },
        { id: 7, name: '测试工程师', count: 850, trend: 'down' }
      ]
    }
  },

  // 热门地址
  'GET /api/student/trend/address': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '获取成功',
      data: [
        { id: 1, name: '北京', count: 4500, trend: 'up' },
        { id: 2, name: '上海', count: 3800, trend: 'up' },
        { id: 3, name: '深圳', count: 3200, trend: 'up' },
        { id: 4, name: '杭州', count: 2800, trend: 'up' },
        { id: 5, name: '广州', count: 2100, trend: 'stable' },
        { id: 6, name: '成都', count: 1850, trend: 'up' },
        { id: 7, name: '南京', count: 1520, trend: 'stable' }
      ]
    }
  },

  // ========== 用户相关 API ==========
  
  // 设置头像
  'POST /api/user/avatar': async (_params: any) => {
    await delay(500)
    const randomSeed = 'user_' + Date.now()
    return {
      code: 200,
      msg: '上传成功',
      data: {
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + randomSeed
      }
    }
  },

  // 修改密码
  'POST /api/user/reset/password': async (_params: any) => {
    await delay(500)
    return {
      code: 200,
      msg: '修改成功'
    }
  },

  // ========== 机器人相关 API ==========
  
  // 清空聊天消息
  'POST /api/student/bot/clean': async () => {
    await delay(500)
    return {
      code: 200,
      msg: '清空成功'
    }
  }
}

export default mockData
