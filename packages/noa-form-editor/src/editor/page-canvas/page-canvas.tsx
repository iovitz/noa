import { Space } from 'antd'
import { NoaFormInput, NoaFormTitle } from 'noa-form-ui'
import React from 'react'
import style from './style.module.scss'

export default function PageCanvas() {
  return (
    <div className={style['page-canvas-wrapper']}>
      <div className={style['page-canvas']}>
        <Space direction="vertical" size={40}>
          <NoaFormTitle title="表单标题" subTitle="表单副标题" />
          <NoaFormInput
            question="在现代社会中，时间管理变得越来越重要。许多人会感到忙碌，却常常感到没有完成多少重要的事情。有效的时间管理方法有哪些？如何确定优先级，避免拖延，并合理分配时间来完成工作、学习以及个人生活中的任务？你认为哪些时间管理技巧在日常生活中最为实用，能够帮助我们提高效率，减少压力？"
          />
          <NoaFormInput
            question="随着人工智能的迅猛发展，越来越多的行业开始依赖自动化与智能决策。然而，人工智能在决策中是否存在伦理和道德问题？例如，在自动驾驶、医疗诊断、甚至军事领域中，人工智能的决策可能会影响人的生命和权利。应该如何确保人工智能技术的使用符合社会伦理标准？是否应当制定相应的法律与规范来管理这些技术？"
          />
          <NoaFormInput
            question="全球气候变化是当前世界面临的重大挑战之一，许多专家和科学家认为气候变暖会对地球生态系统、经济和社会产生深远影响。各国政府和组织应如何采取有效的措施减缓气候变化，保护环境？有哪些技术创新或政策可以帮助减少温室气体排放，推动可持续发展？个人和企业在日常生活中能做哪些事情来应对气候变化？"
          />
          <NoaFormInput
            question="虚拟现实（VR）技术在教育领域的应用前景越来越广阔，特别是在提高学习兴趣和沉浸式体验方面有着显著优势。虚拟现实是否能够有效替代传统的教学方法？它在提供交互式、实践性学习体验上是否能够增强学生的学习效果？在普及VR教育技术的同时，我们是否需要考虑其成本、技术要求以及可能带来的隐私和安全问题？"
          />
        </Space>
      </div>
    </div>
  )
}
