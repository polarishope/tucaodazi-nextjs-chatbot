import Link from 'next/link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">向你的吐槽搭子倾诉吧！</h1>
        <p className="leading-normal text-muted-foreground">
          在这个快节奏的社会中，找到一个可以随时倾诉的对象变得越来越困难。吐槽搭子旨在成为你可靠的“倾听伙伴”，让你不再独自面对烦恼，找到内心的平静。
        </p>
        <p className="leading-normal text-muted-foreground">
          🌐 全天候在线：随时随地打开网页，开始你的吐槽之旅。
        </p>
        <p className="leading-normal text-muted-foreground">
          🤖 智能倾听：吐槽搭子善于倾听，并能根据你的情绪提供贴心的回复。
        </p>
        <p className="leading-normal text-muted-foreground">
          📝 隐私保障：所有对话严格保密，你可以安心地分享任何烦恼。
        </p>
        <p className="leading-normal text-muted-foreground">
          🎯 精准匹配：根据你的吐槽内容，提供个性化的情感支持和建议。
        </p>
        <p className="leading-normal text-muted-foreground">
          让吐槽搭子成为你的心灵港湾！
        </p>
        <Link
          className="leading-normal text-muted-foreground text-black"
          href="/about"
        >
          隐私政策 Privacy Policy
        </Link>
        <Link
          className="leading-normal text-muted-foreground text-black"
          href="/terms"
        >
          使用条款 Terms of Service
        </Link>
        {/*<p className="leading-normal text-muted-foreground">
          It uses{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </ExternalLink>{' '}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
  </p>*/}
      </div>
    </div>
  )
}
