import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai, createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
} from '@/components/stocks'

import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
//import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
//import { Stocks } from '@/components/stocks/stocks'
//import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'
import axios from 'axios'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode
  const qwen = createOpenAI({baseURL:'https://dashscope.aliyuncs.com/compatible-mode/v1'});

  async function postData(url: string, data: {}) {
    const douban_response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        // 确认响应的状态
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json() // 将响应转化为 JSON
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error)
      })
    return douban_response
  }
  // Replace URL with your douban vector database
  let douban_replies = await postData('http://douban_vector_database/search', {
    text: content.toString()
  })
  douban_replies = douban_replies.join('\n')
  let chat_messages = [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ];
  chat_messages[chat_messages.length - 1].content = `Context: ${douban_replies}\n\nQuestion: ${chat_messages[chat_messages.length - 1].content}`
  console.log(chat_messages)

  const result = await streamUI({
    model: qwen('qwen-plus'),
    initial: <SpinnerMessage />,
    system: `根据 Context 中的信息来回答 Question 中的问题，遵循以下规则：
1. 控制在三句话以内，在回答的每一句话后添加合适的emoji。
2. 模仿 Context 的语气进行回答，带有吐槽、抱怨的语气。
3. 不要根据你的知识回答，而是将 Context 中的信息作为你的个人经历来回答。
比如：
Context:
没有年终奖也没有开门红包，多少离谱了，还这样打压下属，感觉这个公司不妙，迟早要黄

Question:
好傻逼的公司，宁愿花一个亿装修，也不给大家发奖金，把钱都自己贪污了

Answer:
哎，说起来真是气人😤这公司舍得砸钱装修得金碧辉煌，却在员工福利上抠抠搜搜，简直吝啬到家了。这种只顾面子不顾里子的做法，让人看得一清二楚，真是太让人心寒了💔`,
//下面是提供给你的信息：\n` + douban_replies.join('\n'),
    messages: chat_messages,
    /*[
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],*/
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    temperature: 0.7,
    topP: 0.9,
    //frequencyPenalty: 0.3,
    //presencePenalty: 0.2
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      const { chatId, messages } = state
      const createdAt = new Date()
      const userId = "Guest" 
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }
      await saveChat(chat)
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'function' ? (
          message.name === 'getEvents' ? (
            <BotCard>
              <Events props={JSON.parse(message.content)} />
            </BotCard>
          ) : null
        ) : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
