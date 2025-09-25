/**
 * "明楼"启航加油站 - 清洁版本
 * 修复所有JavaScript语法错误
 */

// 全局状态
let appState = {
    userName: '',
    hollandAnswers: new Array(60).fill(null),
    mbtiAnswers: new Array(100).fill(null),
    hollandIndex: 0,
    mbtiIndex: 0
};

// 页面元素
const elements = {
    pages: {
        start: document.getElementById('page-start'),
        holland: document.getElementById('page-holland'),
        mbti: document.getElementById('page-mbti'),
        report: document.getElementById('page-report')
    },
    userName: document.getElementById('userName'),
    startBtn: document.getElementById('startBtn'),
    hollandQuestion: document.getElementById('holland-question'),
    hollandProgress: document.getElementById('holland-progress'),
    hollandProgressText: document.getElementById('holland-progress-text'),
    hollandEncourage: document.getElementById('holland-encourage'),
    hollandPrev: document.getElementById('holland-prev'),
    hollandNext: document.getElementById('holland-next'),
    mbtiQuestion: document.getElementById('mbti-question'),
    mbtiOptionA: document.getElementById('mbti-option-a'),
    mbtiOptionB: document.getElementById('mbti-option-b'),
    mbtiProgress: document.getElementById('mbti-progress'),
    mbtiProgressText: document.getElementById('mbti-progress-text'),
    mbtiEncourage: document.getElementById('mbti-encourage'),
    mbtiPrev: document.getElementById('mbti-prev'),
    mbtiNext: document.getElementById('mbti-next'),
    hollandResult: document.getElementById('holland-result'),
    hollandDesc: document.getElementById('holland-desc'),
    mbtiResult: document.getElementById('mbti-result'),
    mbtiDesc: document.getElementById('mbti-desc'),
    combinedInsight: document.getElementById('combined-insight')
};

// 霍兰德职业兴趣测试题目 (60题)
const hollandQuestions = [
    // 现实型 (R) - 10题
    { text: "我喜欢使用工具或机器完成任务。", type: "R" },
    { text: "我对木工、电工、机械维修等手工工作感兴趣。", type: "R" },
    { text: "我擅长修理家具、电器或车辆。", type: "R" },
    { text: "我喜欢户外活动，如园艺、建筑或露营。", type: "R" },
    { text: "我愿意学习机械操作技术（如车床、铣床）。", type: "R" },
    { text: "我喜欢参与体育竞技或体力劳动。", type: "R" },
    { text: "我认为手工制作的物品比成品更有价值。", type: "R" },
    { text: "我擅长使用测量工具（如尺子、水准仪）。", type: "R" },
    { text: "我对自然科学中的实验部分感兴趣。", type: "R" },
    { text: "我喜欢组装模型或搭建结构。", type: "R" },
    
    // 研究型 (I) - 10题
    { text: "我喜欢阅读科学期刊或研究论文。", type: "I" },
    { text: "我擅长解复杂数学或逻辑谜题。", type: "I" },
    { text: "我对自然现象（如天文、地质）充满好奇。", type: "I" },
    { text: "我喜欢设计科学实验方案并观察结果。", type: "I" },
    { text: "我愿意独立研究某个专业问题。", type: "I" },
    { text: "我对数据分析或编程感兴趣。", type: "I" },
    { text: "我喜欢研究历史、哲学或心理学理论。", type: "I" },
    { text: "我享受在实验室或安静环境中工作。", type: "I" },
    { text: "我擅长用统计方法解决问题。", type: "I" },
    { text: "我对医学、生物学或化学领域有求知欲。", type: "I" },
    
    // 艺术型 (A) - 10题
    { text: "我喜欢绘画、写作、音乐或舞蹈。", type: "A" },
    { text: "我擅长设计服装、室内装饰或广告。", type: "A" },
    { text: "我喜欢通过艺术作品表达情感。", type: "A" },
    { text: "我对戏剧、电影或摄影感兴趣。", type: "A" },
    { text: "我愿意尝试新颖的艺术形式（如数字艺术）。", type: "A" },
    { text: "我喜欢参加艺术展览或文化活动。", type: "A" },
    { text: "我擅长用文字或图像讲述故事。", type: "A" },
    { text: "我对音乐节奏或色彩搭配敏感。", type: "A" },
    { text: "我喜欢自由创作，不喜欢被规则限制。", type: "A" },
    { text: "我认为艺术能改变人们的观念。", type: "A" },
    
    // 社会型 (S) - 10题
    { text: "我喜欢帮助他人解决心理或生活问题。", type: "S" },
    { text: "我愿意组织社区志愿者活动。", type: "S" },
    { text: "我擅长倾听并给予他人建议。", type: "S" },
    { text: "我对教育、培训或咨询工作感兴趣。", type: "S" },
    { text: "我喜欢团队合作完成项目。", type: "S" },
    { text: "我愿意担任教师、教练或辅导员。", type: "S" },
    { text: "我关心社会公益事业（如环保、扶贫）。", type: "S" },
    { text: "我擅长调解人际冲突。", type: "S" },
    { text: "我喜欢参与社交聚会或公益活动。", type: "S" },
    { text: "我认为服务他人能带来成就感。", type: "S" },
    
    // 企业型 (E) - 10题
    { text: "我喜欢组织大型活动或商务会议。", type: "E" },
    { text: "我擅长说服他人接受我的观点。", type: "E" },
    { text: "我愿意担任团队领导或管理岗位。", type: "E" },
    { text: "我对商业谈判或市场推广感兴趣。", type: "E" },
    { text: "我喜欢制定目标并推动他人执行。", type: "E" },
    { text: "我擅长在公众场合演讲。", type: "E" },
    { text: "我愿意创业或经营自己的事业。", type: "E" },
    { text: "我对政治、经济或法律话题感兴趣。", type: "E" },
    { text: "我喜欢竞争和挑战高难度任务。", type: "E" },
    { text: "我认为领导力是成功的关键。", type: "E" },
    
    // 常规型 (C) - 10题
    { text: "我喜欢整理文件、数据或财务报表。", type: "C" },
    { text: "我擅长编写清晰的工作计划或报告。", type: "C" },
    { text: "我愿意执行标准化流程或操作规范。", type: "C" },
    { text: "我对会计、审计或行政工作感兴趣。", type: "C" },
    { text: "我喜欢使用办公软件处理日常事务。", type: "C" },
    { text: "我擅长核对信息或检查质量错误。", type: "C" },
    { text: "我认为遵守规则比创新更重要。", type: "C" },
    { text: "我喜欢重复性、规律性的工作。", type: "C" },
    { text: "我愿意为细节付出大量时间。", type: "C" },
    { text: "我认为条理化的环境能提高效率。", type: "C" }
];

// MBTI性格测试题目 (100题) - 简化版本避免特殊字符
const mbtiQuestions = [
    // EI维度 - 25题
    { text: "处理完重要事项后，你更想立刻约朋友聚会还是回家独自放松？", optionA: "约朋友聚会", optionB: "回家独自放松", dimension: "EI" },
    { text: "在微信群里，你通常是活跃发言者还是安静潜水者？", optionA: "活跃发言者", optionB: "安静潜水者", dimension: "EI" },
    { text: "使用社交媒体时，你更倾向于积极发帖互动还是主要浏览内容？", optionA: "积极发帖互动", optionB: "主要浏览内容", dimension: "EI" },
    { text: "遇到有趣的地方，你第一反应是找人一起去还是自己探索？", optionA: "找人一起去", optionB: "自己探索", dimension: "EI" },
    { text: "团队项目中，你更习惯主动协调还是专注自己部分？", optionA: "主动协调", optionB: "专注自己部分", dimension: "EI" },
    { text: "长假没有社交活动时，你会感到憋闷还是惬意？", optionA: "憋闷", optionB: "惬意", dimension: "EI" },
    { text: "重大选择时，你更倾向于找人讨论还是自己思考？", optionA: "找人讨论", optionB: "自己思考", dimension: "EI" },
    { text: "课堂遇到问题，你会直接提问还是课后私下询问？", optionA: "直接提问", optionB: "课后私下询问", dimension: "EI" },
    { text: "对于搭子文化，你认为非常必要还是可能是消耗？", optionA: "非常必要", optionB: "可能是消耗", dimension: "EI" },
    { text: "理想的周末夜晚是和朋友聚餐还是独自看电影？", optionA: "和朋友聚餐", optionB: "独自看电影", dimension: "EI" },
    { text: "玩游戏时，你更喜欢开麦交流还是关闭语音？", optionA: "开麦交流", optionB: "关闭语音", dimension: "EI" },
    { text: "大型活动后，你感到能量爆棚还是身心俱疲？", optionA: "能量爆棚", optionB: "身心俱疲", dimension: "EI" },
    { text: "你更享受有人气的环境还是完全独立的空间？", optionA: "有人气的环境", optionB: "完全独立的空间", dimension: "EI" },
    { text: "取得成就时，你会立刻分享还是默默品味？", optionA: "立刻分享", optionB: "默默品味", dimension: "EI" },
    { text: "认识新朋友对你来说轻松愉快还是需要消耗心力？", optionA: "轻松愉快", optionB: "需要消耗心力", dimension: "EI" },
    { text: "社交媒体上，你更关注互动反馈还是内容质量？", optionA: "互动反馈", optionB: "内容质量", dimension: "EI" },
    { text: "独自旅行几天，你觉得难以忍受还是非常自由？", optionA: "难以忍受", optionB: "非常自由", dimension: "EI" },
    { text: "心情低落时，你更可能找朋友倾诉还是自我排解？", optionA: "找朋友倾诉", optionB: "自我排解", dimension: "EI" },
    { text: "生日安排，你会组织派对还是简单聚餐？", optionA: "组织派对", optionB: "简单聚餐", dimension: "EI" },
    { text: "团建中，你通常是积极参与者还是旁观者？", optionA: "积极参与者", optionB: "旁观者", dimension: "EI" },
    { text: "突然的聚会邀请，你很开心还是会犹豫？", optionA: "很开心", optionB: "会犹豫", dimension: "EI" },
    { text: "沟通方式上，你更喜欢打电话还是发文字？", optionA: "打电话", optionB: "发文字", dimension: "EI" },
    { text: "思路表达，你倾向于先说出口还是先想清楚？", optionA: "先说出口", optionB: "先想清楚", dimension: "EI" },
    { text: "社交环境后，你需要更多活动还是独处时间？", optionA: "更多活动", optionB: "独处时间", dimension: "EI" },
    { text: "能量来源，你更像外部世界还是内心世界？", optionA: "外部世界", optionB: "内心世界", dimension: "EI" },
    
    // SN维度 - 25题
    { text: "阅读科技文章时，你更关注具体应用还是发展趋势？", optionA: "具体应用", optionB: "发展趋势", dimension: "SN" },
    { text: "学习新知识时，你更喜欢从基础学起还是先了解框架？", optionA: "从基础学起", optionB: "先了解框架", dimension: "SN" },
    { text: "听人描述旅游地，你更想听具体细节还是整体感受？", optionA: "具体细节", optionB: "整体感受", dimension: "SN" },
    { text: "规划旅行时，你更注重详细安排还是自由探索？", optionA: "详细安排", optionB: "自由探索", dimension: "SN" },
    { text: "使用AI工具时，你更倾向于整理数据还是头脑风暴？", optionA: "整理数据", optionB: "头脑风暴", dimension: "SN" },
    { text: "你更擅长细节把控任务还是宏观规划任务？", optionA: "细节把控", optionB: "宏观规划", dimension: "SN" },
    { text: "参观博物馆，你会仔细观看每件展品还是快速浏览重点？", optionA: "仔细观看", optionB: "快速浏览重点", dimension: "SN" },
    { text: "你更相信具体经验数据还是直觉洞察？", optionA: "具体经验数据", optionB: "直觉洞察", dimension: "SN" },
    { text: "活在当下的理解，你更偏向专注眼前还是憧憬未来？", optionA: "专注眼前", optionB: "憧憬未来", dimension: "SN" },
    { text: "选择电影时，你更喜欢现实题材还是想象题材？", optionA: "现实题材", optionB: "想象题材", dimension: "SN" },
    { text: "看新产品宣传，你更关注具体配置还是设计理念？", optionA: "具体配置", optionB: "设计理念", dimension: "SN" },
    { text: "你更欣赏条理清晰的老师还是富有启发性的老师？", optionA: "条理清晰", optionB: "富有启发性", dimension: "SN" },
    { text: "解决问题时，你习惯按部就班还是寻找新方法？", optionA: "按部就班", optionB: "寻找新方法", dimension: "SN" },
    { text: "你更喜欢实用指南还是理论分析？", optionA: "实用指南", optionB: "理论分析", dimension: "SN" },
    { text: "听到理论上可行，你关注具体问题还是新可能性？", optionA: "具体问题", optionB: "新可能性", dimension: "SN" },
    { text: "记忆事物时，你更依赖感官细节还是象征意义？", optionA: "感官细节", optionB: "象征意义", dimension: "SN" },
    { text: "对国潮兴起，你更关注产品体验还是文化趋势？", optionA: "产品体验", optionB: "文化趋势", dimension: "SN" },
    { text: "学习烹饪时，你更注重按菜谱还是理解原理？", optionA: "按菜谱", optionB: "理解原理", dimension: "SN" },
    { text: "你更容易注意到具体变化还是氛围变化？", optionA: "具体变化", optionB: "氛围变化", dimension: "SN" },
    { text: "展望五年后，你想到具体目标还是理想状态？", optionA: "具体目标", optionB: "理想状态", dimension: "SN" },
    { text: "讨论社会现象，你倾向于列举事实还是探讨原因？", optionA: "列举事实", optionB: "探讨原因", dimension: "SN" },
    { text: "你认为细节决定成败还是战略方向更重要？", optionA: "细节决定成败", optionB: "战略方向更重要", dimension: "SN" },
    { text: "组装产品时，你会严格按说明书还是先看整体结构？", optionA: "严格按说明书", optionB: "先看整体结构", dimension: "SN" },
    { text: "对性格分析，你觉得娱乐性质居多还是有趣工具？", optionA: "娱乐性质居多", optionB: "有趣工具", dimension: "SN" },
    { text: "接收信息时，你更偏向关注当前事实还是未来可能？", optionA: "当前事实", optionB: "未来可能", dimension: "SN" },
    
    // TF维度 - 25题
    { text: "重要决定时，你更依赖理性分析还是内心感受？", optionA: "理性分析", optionB: "内心感受", dimension: "TF" },
    { text: "朋友倾诉烦恼时，你更可能分析问题还是给予安慰？", optionA: "分析问题", optionB: "给予安慰", dimension: "TF" },
    { text: "团队讨论中，你更看重正确方案还是团队和谐？", optionA: "正确方案", optionB: "团队和谐", dimension: "TF" },
    { text: "更能说服你的是严谨逻辑还是价值观念？", optionA: "严谨逻辑", optionB: "价值观念", dimension: "TF" },
    { text: "合理但让人不适的规定，你认为应该执行还是调整？", optionA: "应该执行", optionB: "应该调整", dimension: "TF" },
    { text: "给别人意见时，你倾向于直接指出还是委婉表达？", optionA: "直接指出", optionB: "委婉表达", dimension: "TF" },
    { text: "你更希望被评价为有头脑还是有同情心？", optionA: "有头脑", optionB: "有同情心", dimension: "TF" },
    { text: "辩论时，你的目标是战胜对方还是寻求共鸣？", optionA: "战胜对方", optionB: "寻求共鸣", dimension: "TF" },
    { text: "人际矛盾的关键在于厘清责任还是修复感情？", optionA: "厘清责任", optionB: "修复感情", dimension: "TF" },
    { text: "选择礼物时，你更注重实用价值还是心意象征？", optionA: "实用价值", optionB: "心意象征", dimension: "TF" },
    { text: "对法理不外乎人情，你不以为然还是深表认同？", optionA: "不以为然", optionB: "深表认同", dimension: "TF" },
    { text: "评价作品时，你更重视逻辑结构还是情感冲击？", optionA: "逻辑结构", optionB: "情感冲击", dimension: "TF" },
    { text: "小组成员摸鱼时，你会直接指出还是私下沟通？", optionA: "直接指出", optionB: "私下沟通", dimension: "TF" },
    { text: "道德判断时，你更依据普世准则还是具体情境？", optionA: "普世准则", optionB: "具体情境", dimension: "TF" },
    { text: "职场中，你认为能力绩效还是人际关系更重要？", optionA: "能力绩效", optionB: "人际关系", dimension: "TF" },
    { text: "拒绝请求时，你更担心理由不充分还是伤害感情？", optionA: "理由不充分", optionB: "伤害感情", dimension: "TF" },
    { text: "网络争论中，你会参与反驳还是避开调和？", optionA: "参与反驳", optionB: "避开调和", dimension: "TF" },
    { text: "你更容易被精妙设计感动还是无私奉献感动？", optionA: "精妙设计", optionB: "无私奉献", dimension: "TF" },
    { text: "领导团队时，你更倾向于制度激励还是情感关怀？", optionA: "制度激励", optionB: "情感关怀", dimension: "TF" },
    { text: "亲人做错误决定时，你会明确劝阻还是提供支持？", optionA: "明确劝阻", optionB: "提供支持", dimension: "TF" },
    { text: "情商的理解，你更偏向管理技能还是理解能力？", optionA: "管理技能", optionB: "理解能力", dimension: "TF" },
    { text: "批评别人时，你更注意内容准确还是场合语气？", optionA: "内容准确", optionB: "场合语气", dimension: "TF" },
    { text: "你更欣赏铁面无私的领导还是平易近人的领导？", optionA: "铁面无私", optionB: "平易近人", dimension: "TF" },
    { text: "个人与集体利益冲突时，你首先分析利弊还是感到纠结？", optionA: "分析利弊", optionB: "感到纠结", dimension: "TF" },
    { text: "做决定时，你更依赖逻辑准则还是价值考量？", optionA: "逻辑准则", optionB: "价值考量", dimension: "TF" },
    
    // JP维度 - 25题
    { text: "即将到来的假期，你会提前规划还是随性决定？", optionA: "提前规划", optionB: "随性决定", dimension: "JP" },
    { text: "你的个人物品通常分门别类还是有序的乱？", optionA: "分门别类", optionB: "有序的乱", dimension: "JP" },
    { text: "处理多项任务时，你更喜欢制定时间表还是灵活应对？", optionA: "制定时间表", optionB: "灵活应对", dimension: "JP" },
    { text: "对说走就走的旅行，你觉得缺乏计划会焦虑还是很向往？", optionA: "会焦虑", optionB: "很向往", dimension: "JP" },
    { text: "时间管理上，你习惯使用工具还是跟随感觉？", optionA: "使用工具", optionB: "跟随感觉", dimension: "JP" },
    { text: "远期任务，你会尽早开始还是临近再做？", optionA: "尽早开始", optionB: "临近再做", dimension: "JP" },
    { text: "做最终决定前，你倾向于尽快决定还是保持开放？", optionA: "尽快决定", optionB: "保持开放", dimension: "JP" },
    { text: "计划在生活中是行动指南还是大概框架？", optionA: "行动指南", optionB: "大概框架", dimension: "JP" },
    { text: "购物时，你有明确清单还是享受发现过程？", optionA: "明确清单", optionB: "享受发现", dimension: "JP" },
    { text: "工作娱乐界限，你喜欢分明还是融合？", optionA: "界限分明", optionB: "融合", dimension: "JP" },
    { text: "计划被打乱时，你感到烦躁还是新鲜？", optionA: "烦躁", optionB: "新鲜", dimension: "JP" },
    { text: "你更欣赏一切尽在掌握还是灵活适应？", optionA: "尽在掌握", optionB: "灵活适应", dimension: "JP" },
    { text: "重要汇报前，你会提前准备还是最后冲刺？", optionA: "提前准备", optionB: "最后冲刺", dimension: "JP" },
    { text: "对断舍离整理术，你非常认同还是难以执行？", optionA: "非常认同", optionB: "难以执行", dimension: "JP" },
    { text: "你更倾向于认为自己有决断还是好奇心强？", optionA: "有决断", optionB: "好奇心强", dimension: "JP" },
    { text: "购物节前，你会提前列清单还是当天随意浏览？", optionA: "提前列清单", optionB: "当天随意", dimension: "JP" },
    { text: "周末安排，你通常有明确回答还是到时再看？", optionA: "明确回答", optionB: "到时再看", dimension: "JP" },
    { text: "应对不确定性，你制定备选方案还是坦然接受？", optionA: "备选方案", optionB: "坦然接受", dimension: "JP" },
    { text: "学习新课程，你更喜欢循序渐进还是深入感兴趣的？", optionA: "循序渐进", optionB: "深入感兴趣", dimension: "JP" },
    { text: "你认为遵守时间非常重要还是事情本身更重要？", optionA: "时间重要", optionB: "事情重要", dimension: "JP" },
    { text: "大型项目开始时，你更注重详尽规划还是先动手？", optionA: "详尽规划", optionB: "先动手", dimension: "JP" },
    { text: "你更享受完成目标的成就感还是过程本身？", optionA: "成就感", optionB: "过程本身", dimension: "JP" },
    { text: "对开放式对谈，你觉得缺乏结论还是充满启发？", optionA: "缺乏结论", optionB: "充满启发", dimension: "JP" },
    { text: "你更愿意做最终决策者还是提供选择的顾问？", optionA: "决策者", optionB: "顾问", dimension: "JP" },
    { text: "生活方式更偏向有计划还是灵活随性？", optionA: "有计划", optionB: "灵活随性", dimension: "JP" }
];

// 页面切换函数
function showPage(pageName) {
    Object.values(elements.pages).forEach(page => {
        if (page) page.style.display = 'none';
    });
    
    if (elements.pages[pageName]) {
        elements.pages[pageName].style.display = 'block';
    }
}

// 更新霍兰德题目显示
function updateHollandQuestion() {
    const question = hollandQuestions[appState.hollandIndex];
    elements.hollandQuestion.textContent = question.text;
    
    // 更新进度
    const progress = ((appState.hollandIndex + 1) / 60) * 100;
    elements.hollandProgress.style.width = progress + '%';
    elements.hollandProgressText.textContent = `${appState.hollandIndex + 1}/60`;
    
    // 更新激励文案
    const encourageTexts = [
        "很好！继续保持！",
        "太棒了，你已完成一半！",
        "马上就要完成霍兰德测试了！"
    ];
    
    if (appState.hollandIndex < 20) {
        elements.hollandEncourage.textContent = encourageTexts[0];
    } else if (appState.hollandIndex < 40) {
        elements.hollandEncourage.textContent = encourageTexts[1];
    } else {
        elements.hollandEncourage.textContent = encourageTexts[2];
    }
    
    // 更新按钮状态
    elements.hollandPrev.disabled = appState.hollandIndex === 0;
    elements.hollandNext.disabled = appState.hollandAnswers[appState.hollandIndex] === null;
    
    // 更新选中状态
    const hollandOptions = elements.pages.holland.querySelectorAll('.option-btn');
    hollandOptions.forEach(btn => btn.classList.remove('selected'));
    
    const currentAnswer = appState.hollandAnswers[appState.hollandIndex];
    if (currentAnswer !== null) {
        const selectedBtn = elements.pages.holland.querySelector(`[data-value="${currentAnswer}"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');
        elements.hollandNext.disabled = false;
    }
}

// 更新MBTI题目显示
function updateMBTIQuestion() {
    const question = mbtiQuestions[appState.mbtiIndex];
    elements.mbtiQuestion.textContent = question.text;
    elements.mbtiOptionA.textContent = question.optionA;
    elements.mbtiOptionB.textContent = question.optionB;
    
    // 更新进度
    const progress = ((appState.mbtiIndex + 1) / 100) * 100;
    elements.mbtiProgress.style.width = progress + '%';
    elements.mbtiProgressText.textContent = `${appState.mbtiIndex + 1}/100`;
    
    // 更新激励文案
    const encourageTexts = [
        "很好！继续保持！",
        "太棒了，你已完成一半！",
        "马上就要完成MBTI测试了！"
    ];
    
    if (appState.mbtiIndex < 33) {
        elements.mbtiEncourage.textContent = encourageTexts[0];
    } else if (appState.mbtiIndex < 66) {
        elements.mbtiEncourage.textContent = encourageTexts[1];
    } else {
        elements.mbtiEncourage.textContent = encourageTexts[2];
    }
    
    // 更新按钮状态
    elements.mbtiPrev.disabled = appState.mbtiIndex === 0;
    elements.mbtiNext.disabled = appState.mbtiAnswers[appState.mbtiIndex] === null;
    
    // 更新选中状态
    const mbtiOptions = elements.pages.mbti.querySelectorAll('.option-btn');
    mbtiOptions.forEach(btn => btn.classList.remove('selected'));
    
    const currentAnswer = appState.mbtiAnswers[appState.mbtiIndex];
    if (currentAnswer !== null) {
        const selectedBtn = elements.pages.mbti.querySelector(`[data-value="${currentAnswer}"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');
        elements.mbtiNext.disabled = false;
    }
}

// 计算霍兰德结果
function calculateHollandResult() {
    const scores = {R: 0, I: 0, A: 0, S: 0, E: 0, C: 0};
    
    appState.hollandAnswers.forEach((answer, index) => {
        if (answer === 1) {
            const type = hollandQuestions[index].type;
            scores[type]++;
        }
    });
    
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3).map(item => item[0]).join('');
}

// 计算MBTI结果
function calculateMBTIResult() {
    const scores = {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0};
    
    appState.mbtiAnswers.forEach((answer, index) => {
        const question = mbtiQuestions[index];
        const dimension = question.dimension;
        
        if (answer === 'A') {
            if (dimension === 'EI') scores.E++;
            else if (dimension === 'SN') scores.S++;
            else if (dimension === 'TF') scores.T++;
            else if (dimension === 'JP') scores.J++;
        } else if (answer === 'B') {
            if (dimension === 'EI') scores.I++;
            else if (dimension === 'SN') scores.N++;
            else if (dimension === 'TF') scores.F++;
            else if (dimension === 'JP') scores.P++;
        }
    });
    
    const result = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');
    
    return result;
}

// 生成报告
function generateReport() {
    const hollandCode = calculateHollandResult();
    const mbtiType = calculateMBTIResult();
    
    elements.hollandResult.textContent = hollandCode;
    elements.mbtiResult.textContent = mbtiType;
    
    elements.hollandDesc.textContent = getHollandDescription(hollandCode);
    elements.mbtiDesc.textContent = getMBTIDescription(mbtiType);
    elements.combinedInsight.textContent = getCombinedInsight(hollandCode, mbtiType);
    
    saveResult(hollandCode, mbtiType);
}

// 获取霍兰德描述
function getHollandDescription(code) {
    const descriptions = {
        R: '现实型：喜欢使用工具、机器，动手操作，解决具体问题',
        I: '研究型：喜欢观察、学习、研究、分析、评估和解决问题',
        A: '艺术型：具有艺术性、直觉性、创造性，喜欢在自由环境中工作',
        S: '社会型：喜欢与人交往、帮助他人，关心社会问题',
        E: '企业型：喜欢影响、说服、领导或管理他人以达成组织目标',
        C: '常规型：喜欢有系统有条理的工作任务，习惯接受他人指挥'
    };
    
    return code.split('').map(c => descriptions[c]).join('；');
}

// 获取MBTI描述
function getMBTIDescription(type) {
    const descriptions = {
        'INTJ': '建筑师：独立思考，追求完美，具有强烈的内在动机',
        'INTP': '思想家：理性分析，追求真理，喜欢探索复杂理论',
        'ENTJ': '指挥官：天生领导者，善于规划，追求效率和成果',
        'ENTP': '辩论家：创新思维，善于发现可能性，喜欢挑战',
        'INFJ': '提倡者：理想主义，富有同情心，追求意义和价值',
        'INFP': '调停者：价值驱动，富有创造力，追求个人成长',
        'ENFJ': '主人公：天生的领导者，善于激励他人，关注人际和谐',
        'ENFP': '竞选者：热情洋溢，富有创造力，善于激发他人潜能',
        'ISTJ': '物流师：可靠务实，注重细节，喜欢有序的环境',
        'ISFJ': '守护者：温暖体贴，乐于助人，注重他人需求',
        'ESTJ': '总经理：实用主义，善于组织，追求效率和结果',
        'ESFJ': '执政官：热心助人，善于合作，重视和谐关系',
        'ISTP': '鉴赏家：实用主义，善于解决问题，喜欢动手操作',
        'ISFP': '探险家：温和友善，富有艺术气质，追求个人价值',
        'ESTP': '企业家：活力四射，善于适应，喜欢实际行动',
        'ESFP': '娱乐家：热情友好，善于激励他人，享受当下生活'
    };
    
    return descriptions[type] || '独特的性格组合，具有多元化的特质和潜能';
}

// 获取综合解读
function getCombinedInsight(holland, mbti) {
    return `您的 ${holland} × ${mbti} 组合显示出独特的职业潜能。${holland} 的兴趣倾向与 ${mbti} 的性格特质相互作用，形成了您独特的工作风格和价值追求。这种组合在某些领域可能展现出卓越的天赋，但也可能在其他方面存在挑战。机器分析仅是开始，真正的宝藏需要共同挖掘。想获得一份专属于你的深度解读报告？请联系我们的专业顾问。`;
}

// 保存结果到 Supabase 云端存储（防重复提交）
let isSubmitting = false;
async function saveResult(holland, mbti) {
    if (isSubmitting) {
        console.log('正在提交中，跳过重复请求');
        return;
    }
    isSubmitting = true;
    
    const result = {
        name: appState.userName,
        holland: holland,
        mbti: mbti,
        timestamp: new Date().toISOString(),
        holland_answers: appState.hollandAnswers,
        mbti_answers: appState.mbtiAnswers
    };

    try {
        if (window.supabaseClient) {
            const { data, error } = await window.supabaseClient
                .from('test_results')
                .insert(result);
            if (error) {
                console.error('Supabase 写入失败:', error);
                alert('提交失败：' + (error.message || '未知错误'));
            } else {
                console.log('Supabase 提交成功:', data);
                alert('测试结果已成功保存到云端！');
            }
        } else {
            console.error('Supabase 未初始化');
            alert('云端服务未连接，请刷新页面重试或联系管理员');
        }
    } catch (e) {
        console.error('网络异常，Supabase 写入失败:', e);
        alert('提交失败：网络异常，请检查网络连接后重试');
    } finally {
        isSubmitting = false;
    }
}

// 事件绑定
function initializeEvents() {
    // 姓名输入框实时验证
    elements.userName.addEventListener('input', function() {
        const name = this.value.trim();
        elements.startBtn.disabled = !name;
    });

    // 开始按钮事件
    elements.startBtn.addEventListener('click', function() {
        const name = elements.userName.value.trim();
        if (!name) {
            alert('请输入您的姓名');
            return;
        }
        appState.userName = name;
        showPage('holland');
        updateHollandQuestion();
    });

    // 霍兰德测试按钮事件
    elements.hollandPrev.addEventListener('click', function() {
        if (appState.hollandIndex > 0) {
            appState.hollandIndex--;
            updateHollandQuestion();
        }
    });

    elements.hollandNext.addEventListener('click', function() {
        if (appState.hollandIndex < 59) {
            appState.hollandIndex++;
            updateHollandQuestion();
        } else {
            showPage('mbti');
            updateMBTIQuestion();
        }
    });

    // 霍兰德选择按钮事件
    elements.pages.holland.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn')) {
            const value = parseInt(e.target.dataset.value);
            appState.hollandAnswers[appState.hollandIndex] = value;
            
            const buttons = elements.pages.holland.querySelectorAll('.option-btn');
            buttons.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            
            elements.hollandNext.disabled = false;

            // 自动跳转到下一题（短暂停留以反馈选中）
            setTimeout(() => {
                if (appState.hollandIndex < 59) {
                    appState.hollandIndex++;
                    updateHollandQuestion();
                } else {
                    showPage('mbti');
                    updateMBTIQuestion();
                }
            }, 250);
        }
    });

    // MBTI测试按钮事件
    elements.mbtiPrev.addEventListener('click', function() {
        if (appState.mbtiIndex > 0) {
            appState.mbtiIndex--;
            updateMBTIQuestion();
        }
    });

    elements.mbtiNext.addEventListener('click', function() {
        if (appState.mbtiIndex < 99) {
            appState.mbtiIndex++;
            updateMBTIQuestion();
        } else {
            generateReport();
            showPage('report');
        }
    });

    // MBTI选择按钮事件
    elements.pages.mbti.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn')) {
            const value = e.target.dataset.value;
            appState.mbtiAnswers[appState.mbtiIndex] = value;
            
            const buttons = elements.pages.mbti.querySelectorAll('.option-btn');
            buttons.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            
            elements.mbtiNext.disabled = false;

            // 自动跳转到下一题（短暂停留以反馈选中）
            setTimeout(() => {
                if (appState.mbtiIndex < 99) {
                    appState.mbtiIndex++;
                    updateMBTIQuestion();
                } else {
                    generateReport();
                    showPage('report');
                }
            }, 250);
        }
    });
}

// 初始化应用
function initializeApp() {
    console.log('初始化应用...');
    initializeEvents();
    console.log('应用初始化完成，题库已加载：霍兰德60题，MBTI100题');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}