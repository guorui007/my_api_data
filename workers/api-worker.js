// api-worker.js - 一个简单的API代理示例

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * 处理请求并提供API代理功能
 * @param {Request} request
 */
async function handleRequest(request) {
  // 获取URL中的路径
  const url = new URL(request.url)
  const path = url.pathname

  // 处理API请求
  if (path.startsWith('/api')) {
    // 简单的API示例 - 返回一个随机问候语
    if (path === '/api/greeting') {
      const greetings = [
        '你好！', '您好！', '嗨！', '欢迎！', '很高兴见到你！'
      ]
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

      // 返回JSON响应
      return new Response(
        JSON.stringify({
          message: randomGreeting,
          timestamp: new Date().toISOString()
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    // 404 - API端点未找到
    return new Response(
      JSON.stringify({ error: '未找到请求的API端点' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }

  // 对于非API请求，直接返回原始请求
  return fetch(request)
}