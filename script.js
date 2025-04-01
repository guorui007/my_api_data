// script.js - 从远程API加载数据
document.addEventListener('DOMContentLoaded', function() {
    loadApiData();
    loadGreeting();
});

// 加载API数据函数
async function loadApiData() {
    const apiCardsContainer = document.getElementById('api-cards');
    apiCardsContainer.innerHTML = '<div class="loading">加载API数据中...</div>';

    try {
        const response = await fetch('https://dataishop.cn/api/apis/');
        if (!response.ok) {
            throw new Error('无法获取API数据');
        }

        const data = await response.json();

        apiCardsContainer.innerHTML = '';
        renderApiCards(data.apis, apiCardsContainer);
    } catch (error) {
        console.error('加载API数据时出错:', error);
        apiCardsContainer.innerHTML = `
            <div class="error-message">
                <p>加载API数据时出错。请稍后再试。</p>
            </div>
        `;
    }
}

// 渲染API卡片函数
function renderApiCards(apis, container) {
    if (!apis || apis.length === 0) {
        container.innerHTML = '<p>没有找到API数据</p>';
        return;
    }

    apis.forEach(api => {
        const card = document.createElement('div');
        card.className = 'api-card';

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

        container.appendChild(card);
    });
}

// 加载问候语函数
async function loadGreeting() {
    try {
        const response = await fetch('https://dataishop.cn/api/greeting/');
        if (!response.ok) return;

        const data = await response.json();
        if (data && data.message) {
            const heroSection = document.querySelector('.hero');
            const greetingElement = document.createElement('div');
            greetingElement.className = 'greeting';
            greetingElement.textContent = data.message;
            heroSection.appendChild(greetingElement);
        }
    } catch (error) {
        console.log('无法加载问候语API');
    }
}