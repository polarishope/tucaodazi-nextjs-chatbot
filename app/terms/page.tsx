import React from 'react'

const TermsOfService = () => {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">服务条款</h1>

      <p className="text-gray-600 mb-2">最后更新日期：2024年5月30日</p>

      <p className="mb-4">欢迎使用吐槽搭子！</p>

      <p className="mb-4">
        这些服务条款规定了您使用北望网站和服务的规则和条款，网站地址为
        <a
          href="https://dazi.polarishope.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://dazi.polarishope.cn
        </a>
        。
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. 接受条款</h2>
      <p className="mb-4">
        访问本网站即表示您完全接受这些服务条款。如果您不接受本页面上所述的所有条款，请勿继续使用吐槽搭子。
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. 条款变更</h2>
      <p className="mb-4">
        我们保留随时修改这些条款的权利。您有责任定期查看这些条款。您在任何修改后继续使用服务，即表示您接受新的条款。
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. 隐私政策</h2>
      <p className="mb-4">
        您的隐私对我们非常重要。请查阅我们的隐私政策，它也会管辖您对我们网站和服务的使用，以了解我们的做法。
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. 用户账户</h2>
      <p className="mb-4">
        要访问服务的某些功能，您可能需要创建一个账户。您有责任对您的账户信息保密，并对在您的账户下发生的所有活动负责。
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. 禁止活动</h2>
      <p className="mb-4">
        您同意不进行以下任何被禁止的活动：<br/>
        （a）以任何方式复制、分发或披露服务的任何部分；<br/>
        （b）使用任何自动化系统访问服务，从而向服务器发送超过人类合理产生的请求消息；<br/>
        （c）试图干扰、破坏系统完整性或安全性，或解码服务器的任何传输； <br/>
        （d）采取任何在我们单独裁量下认为对我们基础设施造成不合理或不成比例的负荷的行动。
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. 知识产权</h2>
      <p className="mb-4">
        服务及其原始内容、特性和功能是且将始终是北望及其许可方的独有财产。服务受中国和外国的版权、商标和其他法律保护。
      </p>

      <h2 className="text-2xl font-semibold mb-2">7. 终止</h2>
      <p className="mb-4">
        如果您违反条款，我们可立即终止或暂停您的账户并禁止访问服务，恕不另行通知或承担任何责任。
      </p>

      <h2 className="text-2xl font-semibold mb-2">8. 责任限制</h2>
      <p className="mb-4">
        在任何情况下，北望及其董事、员工、合作伙伴、代理商、供应商或关联公司均不对任何间接、偶然、特殊、后果性或惩罚性损害负责，包括但不限于利润、数据、使用、商誉或其他无形损失，无论是因<br/>
        （a）您使用或无法使用服务；<br/>
        （b）任何未经授权访问或使用我们的服务器及/或存储在其中的任何个人信息；<br/>
        （c）服务的任何中断或停止；<br/>
        （d）任何通过我们的服务传输的任何错误、病毒、特洛伊木马或类似的情况；<br/>
        （e）任何内容的任何错误或遗漏或因使用通过服务发布、发送、传输或以其他方式提供的任何内容而产生的任何损失或损害。
      </p>

      <h2 className="text-2xl font-semibold mb-2">9. 适用法律</h2>
      <p className="mb-4">
        这些条款应受中国法律管辖并根据中国法律解释，不考虑其法律冲突条款。
      </p>

      <h2 className="text-2xl font-semibold mb-2">10. 联系我们</h2>
      <p className="mb-4">
        如果您对这些条款有任何疑问，请通过{' '}
        <a
          href="mailto:polarishopewx@163.com"
          className="text-blue-600 hover:underline"
        >
          polarishopewx@163.com
        </a>{' '}
        联系我们。
      </p>
    </div>
  )
}

export default TermsOfService
