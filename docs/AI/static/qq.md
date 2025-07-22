<!--
 * @Author: 工作 hq435680@taobao.com
 * @Date: 2025-07-18 10:45:02
 * @LastEditors: 工作 hq435680@taobao.com
 * @LastEditTime: 2025-07-18 15:13:37
 * @FilePath: /mui-data-loader/dev/dd.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# MUI

## 背景 -- 讲清楚为什么要做 （5分钟）

### 总体概括背景 
- 要点1 AI 是趋势。可以用一个例子，比如常规搜索“xxx”搜不出想要的东西，有了AI对语言的理解就可以搜到
- 要点2 AI问答流式数据，前端没办法直接渲染，需要中间层来封装（具体来说就涉及到“##技术细节”这个小节要讲的东西了，底层模型回答的都是文本，且是流式的，每一帧数据不重复非完整，ai团队会把文本转换为json，到了我们团队的后端，会进一步处理成结构化的json，前端sdk把数据再进行处理，最后给业务层前端消费的数据就和写一个react组件没区别。）

### 简单的架构图 
自闭环的研发使用流程
- 天梭后台：做一些配置，生成场景配置（本质就是个JSON，下面称为CONFIG JSON）
- 前台：消费CONFIG JSON，结合各种前端 sdk 和后端接口把ai回答的内容以更友好的方式展示给用户（具体来说就涉及到“##技术细节”这个小节要讲的东西了，底层模型回答的都是文本，且是流式的，每一帧数据不重复非完整，【ai团队】会把文本转换为json，到了【中间层后端】，会进一步处理成结构化的json，【中间层前端】的sdk把数据再进行处理，最后给【业务层前端】消费的数据就和写一个react组件没区别。）

## demo演示 -- 通过演示业务方（上层开发）怎么用来讲清楚是什么 （2分钟）
1. 先演示后台配置
2. 演示前台用户看到的效果
3. 后台更改一个配置，前台生效，能表现出前后台是真实联动的
#### 补充说明后台的功能(代码量太大了，以下是另一个ai读取项目代码后输出的内容)
🎯 平台概述
MUI Platform 是一个基于 React + TypeScript + Ice.js 构建的 AI场景可视化搭建平台，专门用于快速构建和配置AI驱动的业务场景。该平台采用组件化、可视化的方式，让用户能够通过拖拽和配置的方式快速搭建复杂的AI应用场景。
1. 📦 研发资产管理 (Assets)
1.1 组件市场 (/assets/components)
功能: 管理可复用的UI组件
特性:
组件版本管理
组件预览和配置
组件依赖关系管理
支持静态配置和动态配置
1.2 AI服务市场 (/assets/service-ai)
功能: 管理AI服务资源
特性:
AI服务注册和配置
AI Chunk管理 (AI能力单元)
服务状态监控
参数映射配置
1.3 SPI服务市场 (/assets/service-spi)
功能: 管理SPI扩展服务
特性:
SPI服务注册
自定义Schema配置
服务调用方式配置 (Bean/HSF/HTTP)
执行因子配置
2. 🤖 AI场景方案 (Scenes)
2.1 场景列表 (/scenes/list)
功能: 管理所有AI场景
特性:
场景创建、编辑、删除
场景状态管理 (草稿/上线/下线/废弃)
场景灰度发布
场景版本管理
2.2 场景搭建器 (/scenes/build)
功能: 可视化场景搭建
界面布局:
Apply to index.tsx
  ┌─────────────────┬─────────────────┬─────────────────┐
  │   组件资源库     │    楼层列表      │   组件配置面板   │
  │   (左侧)        │    (中间)       │    (右侧)       │
  │                 │                 │                 │
  │ • 组件模板列表   │ • 已选组件实例   │ • 静态配置      │
  │ • 版本选择      │ • 拖拽排序      │ • 动态配置      │
  │ • 添加/删除     │ • 选择编辑      │ • AI Chunk映射  │
  └─────────────────┴─────────────────┴─────────────────┘
2.3 场景配置 (/scenes/edit)
功能: 场景详细配置
配置项:
通用配置 (场景基本信息)
接入方式配置 (iframe/gateway)
限流配置 (频率限制、并行数)
高级扩展 (SPI服务配置)
灰度配置 (发布策略)
🚀 平台输出
最终产物
场景配置JSON: 包含完整的UI配置、组件配置、AI映射关系
组件依赖关系: 场景使用的组件版本列表
API配置: 场景的接入方式、限流规则、扩展配置
发布配置: 灰度策略、上线配置
部署方式
iframe嵌入: 通过iframe方式嵌入到其他系统
API接入: 通过API方式调用场景能力
网关路由: 通过网关统一路由到场景
💡 平台价值
降低开发门槛: 非技术人员也能快速搭建AI场景
提高开发效率: 组件化开发，复用现有资源
统一技术标准: 标准化的场景配置和部署方式
灵活扩展: 支持SPI扩展，满足个性化需求
可视化运维: 场景状态监控和灰度发布

#### 补充前台业务前端使用时的代码
```tsx
import { definePageConfig } from "ice";
import { useState, useEffect, useRef, useCallback } from "react";
import { Stream, getMsgDetail } from "@ai/mui-data-loader";
import { MessageOfServer } from "@ai/mui-data-loader/esm/typing";
import MarkdownModule from "@/components/common/MarkdownModule";
import { handlePrice } from "@/utils/common";
import "./index.less";

// 简化的商品卡片组件
const SimpleProductCard = ({ offer }: { offer: any }) => {
  // 处理价格显示
  const renderPrice = () => {
    if (!offer.price) return null;
    const { integer, decimal } = handlePrice(offer.price);

    return (
      <div className="productPrice">
        <div className="productPriceUnit">￥</div>
        <div className="productPriceInteger">{integer}</div>
        {decimal && <div className="productPriceDecimal">{decimal}</div>}
      </div>
    );
  };

  // 处理服务信息列表
  const serviceList = [offer.goodRate, offer.shopRepurchaseRate, offer.publishMonth].filter(Boolean);

  return (
    <div className="productCard">
      <div className="productImageWrapper">
        <img src={offer.offerPicUrl} alt={offer.title} className="productImage" />
      </div>
      <div className="productInfoWrapper">
        <div className="productTitleWrapper">
          <div className="productTitleText">{offer.title}</div>
        </div>
        <div className="productCpvWrapper">
          {serviceList.map((text, index) => (
            <div className="productCpvItem" key={index}>
              {index > 0 && <div className="productCpvDivider" />}
              <div className="productCpvText">{text}</div>
            </div>
          ))}
        </div>
        <div className="productPriceWrapper">
          {renderPrice()}
          <div className="productSale">{offer.salesVolume}</div>
        </div>
      </div>
    </div>
  );
};

// 简化的商品列表组件
const SimpleProductList = ({ offers }: { offers: any[] }) => (
  <div className="productList">
    {offers.map((offer, index) => (
      <SimpleProductCard key={index} offer={offer} />
    ))}
  </div>
);

// 简化的步骤组件
const SimpleSteps = ({ steps }: { steps: any[] }) => (
  <div className="stepsContainer">
    {steps.map((step, index) => (
      <div key={index} className="stepItem">
        <div className="stepNumber">{index + 1}</div>
        <div className="stepContent">
          <div className="stepTitle">
            <div className="stepTitleText">{step.title}</div>
          </div>
          <div className="stepDescription">
            <div className="stepDescriptionItem">
              <MarkdownModule>{step.content || ""}</MarkdownModule>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// 简化的分类标签组件
const SimpleCategoryTabs = ({ categories }: { categories: any[] }) => (
  <div className="categoryTabs">
    {categories.map((category, index) => (
      <div key={category.itemId} className={`categoryTab ${index === 0 ? "active" : ""}`}>
        {category.itemName || `类目 ${index + 1}`}
      </div>
    ))}
  </div>
);

// 引导语组件
const GuideContent = ({ staticConfig }: { staticConfig: any[] }) => {
  if (!staticConfig || staticConfig.length === 0) return null;

  return (
    <div className="guideSection">
      {staticConfig.map((item, index) => (
        <div key={index} className="guideItem">
          {item.icon && (
            <div className="guideIcon">
              <img src={item.icon} alt="引导图标" />
            </div>
          )}
          <div className="guideContent">
            {item.text && <div className="guideText">{item.text}</div>}
            {item.button?.text && <button className="guideButton">{item.button.text}</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function IndexPage() {
  const [status, setStatus] = useState<"wait" | "process" | "finish" | "error">("wait");
  const [itemList, setItemList] = useState<any[]>([]);
  const [stepItems, setStepItems] = useState<any[]>([]);
  const [staticConfig, setStaticConfig] = useState<any>(null);

  const { current: stream } = useRef(
    new Stream({
      sceneCode: "SC_1f1445b21",
      bizType: "plugin_search_ai_find",
    })
  );

  const init = async () => {
    const { data, error, traceId } = await stream.requestAccessToken({
      bizParam: {
        query: "唐风头饰",
      },
    });
    if (!data?.accessToken) return;
    stream
      .createStream(
        {
          bizParams: {
            query: "唐风头饰",
          },
        },
        {
          accessToken: data.accessToken,
        }
      )
      .onLayout((layout) => {
        setStatus("process");
        setStaticConfig(layout?.[0]?.staticConfig);
      })
      .onUpdate((compsInfo) => {
        setItemList(compsInfo?.[0]?.streamData?.multi_offer_list?.data || []);
        setStepItems(compsInfo?.[0]?.streamData?.common_cot?.cotStepList || []);
      })
      .onFinish((e) => {
        setStatus("finish");
      })
      .onFail((e) => {
        setStatus("error");
      });
  };

  // 初始化
  useEffect(() => {
    init();
  }, []);

  // 获取第一个分类的商品列表
  const firstCategoryOffers = itemList[0]?.subItemList || [];
  return (
    <div className="test-page">
      {/* 固定高度的内容容器 */}
      <div className="contentContainer">
        {/* 引导语标题 */}
        {status !== "wait" && (
          <>
            <div className="guideTitle">
              <div className="guideTitleContent">
                <div className="guideTitleIcon">
                  <img src={staticConfig?.icon} alt="引导图标" />
                </div>
                <div className="guideTitleText">
                  {status === "process" ? staticConfig?.text : staticConfig?.button?.text}（{status}）
                </div>
              </div>
            </div>

            <div className="results">
              {/* 步骤展示 - 在 process 和 finish 状态都显示 */}
              {stepItems.length > 0 && (
                <div className="stepsSection">
                  <h3>分析步骤</h3>
                  <SimpleSteps steps={stepItems} />
                </div>
              )}

              {/* 完成状态下的分类和商品展示 */}
              {status === "finish" && itemList.length > 0 && (
                <>
                  {/* 分类标签 - 只显示一行 */}
                  <div className="categoriesSection">
                    <h3>AI找商机结果</h3>
                    <SimpleCategoryTabs categories={itemList} />
                  </div>

                  {/* 商品列表 - 只显示第一个分类的商品 */}
                  {firstCategoryOffers.length > 0 && (
                    <div className="offersSection">
                      <h4>商品列表 ({firstCategoryOffers.length} 个)</h4>
                      <SimpleProductList offers={firstCategoryOffers} />
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {status === "finish" && itemList.length === 0 && (
          <div className="noResults">
            <div>未找到相关商品</div>
          </div>
        )}

        {status === "error" && (
          <div className="errorState">
            <div>处理失败，请重试</div>
            <button onClick={init} className="retryButton">
              重试
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const pageConfig = definePageConfig(() => ({
  spm: {
    spmB: "ai-find-simplified",
  },
}));

```


## 技术细节 -- 通过讲解底层设计思想 把怎么做说明白，聚焦于我自己负责的部分讲一两个亮点 （10分钟）
（这一part最重要，里面会涉及一些设计思想中的概念，我只能零散的列出要点，不知道如何组织语言）
- 要点1：通过接口返回的数据结构来讲解设计思想：第一帧是布局、中间帧是流式数据、最后一帧是正常流完的标识
#### 补充接口返回的数据结构
第一帧
```json
{
         
          "contents": [
            {
              "content": {
                "uiSchema": {
                  "componentList": [
                    {
                      "componentInstanceId": "aiFindHeader",
                      "staticConfig": "{//省略}"
                    },
                    {
                      "componentInstanceId": "aiFindMain",
                      "staticConfig": "{//省略}"
                    }
                  ]
                }
              },
              "contentType": "ui_framework",
              "id": "d1a95b1ad64847cf9babc78c30b66a7f0",
              "role": "assistant",
              "status": "finished"
            }
          ],
          "incremental": "false",
          "msgId": "d1a95b1ad64847cf9babc78c30b66a7f",
          "msgStatus": "generating",
          "parentMsgId": "93e584cb90704c25b364acbdea46a562",
          "sessionId": "2ef9b9fe5735419fad3f370ba7f60ed2",
          "traceId": "2150408917442741840224041e7ea6"
}
```
中间帧
```json
{
       
          "contents": [
            {
              "content": {
                "propCode": "result",
                "componentInstanceId": "aiFind",
                "summary": "summary is here",
                "data": [
                  {
                    "itemId": "001001",
                    "itemTitle": "天然水晶多宝手串",
                    "content": "淘宝用户搜索热度 162万+。",
                    "subItemList": [
                      {
                        "offerId": "001001001",
                        "title": "手串",
                        "price": "10.0",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01qlkvGc2NXh0PePZad_!!2212887759973-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001001002",
                        "title": "菩提手串",
                        "price": "16.32",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01ABKCnV294T7fZL4hB_!!2200777578014-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001001003",
                        "title": "星月菩提",
                        "price": "11.32",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01J1TRXC1mZOaP7UeGp_!!2216432774968-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001001004",
                        "title": "五彩绳",
                        "price": "20.22",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01Fu9zTy1DS3neTyMZa_!!2217262730214-0-cib.jpg_460x460q100.jpg"
                      }
                    ],
                    "extend": {}
                  },
                  {
                    "itemId": "001002",
                    "itemTitle": "轻奢招财貔貅水晶手链",
                    "content": "抖音用户搜索热度 162万+",
                    "subItemList": [
                      {
                        "offerId": "001002001",
                        "title": "五彩绳",
                        "price": "10.22",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01Fu9zTy1DS3neTyMZa_!!2217262730214-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001002002",
                        "title": "红绳手链",
                        "price": "16.32",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01J1TRXC1mZOaP7UeGp_!!2216432774968-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001002003",
                        "title": "招财貔貅手链",
                        "price": "11.32",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01ABKCnV294T7fZL4hB_!!2200777578014-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001002004",
                        "title": "招财手链",
                        "price": "20.22",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01qlkvGc2NXh0PePZad_!!2212887759973-0-cib.jpg_460x460q100.jpg"
                      }
                    ],
                    "extend": {}
                  },
                  {
                    "itemId": "001003",
                    "itemTitle": "红绳五彩绳手链",
                    "content": "淘宝用户搜索热度 162万+。",
                    "subItemList": [
                      {
                        "offerId": "001003001",
                        "title": "五彩绳",
                        "price": "110.22",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/10712621187_1644056798.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001003002",
                        "title": "红绳手链",
                        "price": "146.32",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN01wNTOtc1acLaQvIW8N_!!3314453350-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001003003",
                        "title": "招财貔貅手链",
                        "price": "121.32",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN017MBg0s1Z3iIb0xtlM_!!2218448913139-0-cib.jpg_460x460q100.jpg"
                      },
                      {
                        "offerId": "001003004",
                        "title": "招财手链",
                        "price": "120.22",
                        "offerPicUrl": "https://cbu01.alicdn.com/img/ibank/O1CN015RfUJD2N0FpjYoUcD_!!4067869900-0-cib.jpg_460x460q100.jpg"
                      }
                    ],
                    "extend": {}
                  }
                ]
              },
              "contentType": "component_chunk",
              "id": "77fb16a8732e4fad847d58b379c7d74e_1",
              "role": "assistant",
              "status": "finished",
              "errorCode": "",
              "errorInfo": ""
            }
          ],
          "incremental": false,
          "msgId": "77fb16a8732e4fad847d58b379c7d74e",
          "msgStatus": "generating",
          "parentMsgId": null,
          "sessionId": "c291a9deeee84d60882d8fd6701fcf17",
          "stopReason": "",
          "traceId": "0bc3b2dc17431716545742934ec09a"
        }
```
结束帧
```json
{
          "contentType": "component",
          "contents": [],
          "incremental": false,
          "msgId": "77fb16a8732e4fad847d58b379c7d74e",
          "msgStatus": "finished",
          "parentMsgId": null,
          "sessionId": "c291a9deeee84d60882d8fd6701fcf17",
          "stopReason": "",
          "traceId": "0bc3b2dc17431716545742934ec09a"
        }
```

- 要点2：从AI到UI的映射。其中有个chunk的概念。朴实来讲，AI chunk是AI返回的数据中某个字段对应的值。UI chunk是业务前端用于渲染时的最小单元（暂且理解成ui组件中的小组件，【前端sdk】会组装出一个用于组件级别渲染的数据）
- 要点3：增量和全量的概念。这个概念是对于ui chunk来说的，现在都是全量的。也就是说后端给的某一帧的数据都是固定一个chunk的完整的数据，比如
【中间后端】输出的数据
```json
//中间的n帧
{
    "propCode":"common_cot",
    "data":[{
        "title":"123"
    }]
}
```
```json
//中间的n+1
{
    "propCode":"common_cot",
    "data":[{
        "title":"123"
    },{
        "title":"456"
    }]
}
```
【中间前端】给【业务组件】的数据。直接用后端的数据覆盖，而不需要拼接
```js
const streamData = {
    "common_cot":[{
        "title":"123"
    },{
        "title":"456"
    }]

}
```
- 要点4： 【前端sdk】的先进性，会有断点续流的能力，主要是体现在对外的replayStream，当页面刷新时再次回来可以继续生成，像暂停歌曲继续播放一样。replayStream还有显示完整历史的功能，并且是继续流还是完整历史都不需要业务层感知，无脑调这个api就行。假设是一个历史列表，就可以无脑调用这个方法。
- 要点5：【前端sdk】的完备性，对错误处理分层很清晰，方便排查

## 展望 （2分钟）
说一下愿景，更凸显这套东西的价值，所以要做 
- 要点1 模型驱动不同的UI原子组件组合
- 要点2 通过简单的 AI 对话即可搭建功能原型
- 要点3 确保 AI 驱动的 UI 内容准确，且符合生产环境的严苛要求。

以上是一个技术分享的大纲，请帮我补充内容把要点丝滑的串联起来（我主要是不知道怎么组织语言），大纲结构不调整（二级标题、三级标题）
出现“（）”的地方是为了让你理解而做的解释说明，可能会比较细节，当填充内容或者画图的时候不需要体现细节，但让你了解细节应该对你画图有帮助
这个技术体系涉及很多方用"【】"标识了。其中我们团队前后端是【中间层后端】【中间层前端】或者【前端sdk】，我就是中间层前端sdk的主要开发者
【前端sdk】的逻辑在上面讨论过了，就是StreamBase和Stream类。如果不清楚，我重新上传这两个文件
技术细节部分我只罗列了要点，但请你帮我把要点重新编排，能让我流畅的降下来，并且分小节（三级标题）
如果以上这些你还没有完全get到我在做一件怎样的事情，请向我提问