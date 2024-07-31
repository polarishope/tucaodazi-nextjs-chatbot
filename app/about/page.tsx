export default async function AboutPage() {
  return (
    <main className="flex flex-col p-4">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">隐私政策</h1>
        <p className="mb-4">
          我们重视您的隐私，并致力于保护您的个人信息。以下是我们收集和使用信息的方式：
        </p>

        <h2 className="text-xl font-semibold mb-2">信息收集</h2>
        <p className="mb-2">我们可能会收集您的以下信息：</p>
        <ul className="list-disc list-inside mb-4">
          <li>姓名</li>
          <li>电子邮件地址</li>
          <li>使用情况数据</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">信息使用</h2>
        <p className="mb-4">我们收集的信息将用于以下目的：</p>
        <ul className="list-disc list-inside mb-4">
          <li>提供和改进我们的服务</li>
          <li>与您沟通</li>
          <li>分析和改进我们的应用程序</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">信息共享</h2>
        <p className="mb-4">
          我们不会与第三方分享您的个人信息，除非法律要求或获得您的同意。
        </p>

        <h2 className="text-xl font-semibold mb-2">数据安全</h2>
        <p className="mb-4">
          我们采用合理的措施保护您的个人信息安全，防止未经授权的访问、披露或破坏。
        </p>

        <h2 className="text-xl font-semibold mb-2">
          我们如何使用您的Google数据
        </h2>
        <p className="mb-2">
          如果您使用Google账户登录，我们会收集您的以下信息：
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>用户名</li>
          <li>电子邮件地址</li>
          <li>用户头像</li>
        </ul>
        <p className="mb-2">
          这些信息仅用于在吐槽搭子中展示您的用户名、电子邮件和头像。
        </p>

        <h2 className="text-xl font-semibold mb-2">隐私政策变更</h2>
        <p className="mb-4">
          我们可能会不时更新此隐私政策。我们将通过电子邮件或在我们的网站上发布通知来告知您任何变更。
        </p>

        <h2 className="text-xl font-semibold mb-2">联系我们</h2>
        <p className="mb-4">
          如果您对我们的隐私政策有任何疑问，请联系我们： polarishopewx@163.com
        </p>
      </div>
    </main>
  )
}
