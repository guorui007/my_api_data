// script.js - 从数据文件加载API信息

document.addEventListener('DOMContentLoaded', async function() {
    // 获取API卡片容器
    const apiCardsContainer = document.getElementById('api-cards');

    try {
        // 从数据文件加载API信息
        const response = await fetch('/data/apis.json');
        const data = await response.json();

        // 检查是否成功获取数据
        if (!data || !data.apis || !Array.isArray(data.apis)) {
            throw new Error('无法加载API数据');
        }

        // 遍历API数据并创建卡片
        data.apis.forEach(api => {
            // 创建卡片元素
            const card = document.createElement('div');
            card.className = 'api-card';

            // 设置卡片内容
            card.innerHTML = `
                <h3>${api.name}</h3>
                <span class="category">${api.category}</span>
                <p class="description">${api.description}</p>
                <div class="api-features">
                    <span class="feature ${api.auth_required ? 'required' : 'optional'}">
                        认证: ${api.auth_required ? '需要' : '可选'}
                    </span>
                    <span class="feature ${api.https ? 'yes' : 'no'}">
                        HTTPS: ${api.https ? '是' : '否'}
                    </span>
                    <span class="feature ${api.cors ? 'yes' : 'no'}">
                        CORS: ${api.cors ? '支持' : '不支持'}
                    </span>
                </div>
                <a href="${api.url}" class="url" target="_blank">${api.url}</a>
            `;

            // 将卡片添加到容器
            apiCardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('加载API数据时出错:', error);
        apiCardsContainer.innerHTML = `
            <div class="error-message">
                <p>加载API数据时出错。请稍后再试。</p>
            </div>
        `;
    }

    // 尝试从greeting API获取问候语
    try {
        const response = await fetch('/api/greeting');
        const data = await response.json();

        // 如果成功获取问候语，添加到页面
        if (data && data.message) {
            const heroSection = document.querySelector('.hero');
            const greetingElement = document.createElement('div');
            greetingElement.className = 'greeting';
            greetingElement.textContent = data.message;
            heroSection.appendChild(greetingElement);
        }
    } catch (error) {
        console.log('无法加载问候语API');
        // 这里我们不显示错误，因为问候语是锦上添花功能
    }
});