document.addEventListener('DOMContentLoaded', function() {
    // Основные табы приложения
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabHighlight = document.querySelector('.tab-highlight');
    const tabBar = document.querySelector('.tab-bar');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function updateHighlightPosition(activeButton) {
        if (!activeButton || !tabHighlight) return;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const barRect = tabBar.getBoundingClientRect();
        
        const left = buttonRect.left - barRect.left;
        const width = buttonRect.width;
        
        tabHighlight.style.left = `${left}px`;
        tabHighlight.style.width = `${width}px`;
    }
    
    function switchTab(tabName) {
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });
        
        tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.tabContent === tabName);
        });
        
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        updateHighlightPosition(activeButton);
    }
    
    // Инициализация основных табов
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        updateHighlightPosition(activeTab);
        switchTab(activeTab.dataset.tab);
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    window.addEventListener('resize', function() {
        const activeButton = document.querySelector('.tab-button.active');
        updateHighlightPosition(activeButton);
    });

    // Модальное окно пополнения баланса
    const refreshIcon = document.querySelector('.Balance .refresh-icon');
    const modal = document.getElementById('balanceModal');
    if (modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const paymentSelector = modal.querySelector('.payment-selector');
        const selectorHeader = modal.querySelector('.selector-header');
        const methodOptions = modal.querySelectorAll('.method-option');
        const selectedMethodDisplay = modal.querySelector('#selectedMethodDisplay');
        const methodIconSelected = modal.querySelector('.method-icon-selected');
        const methodNameSelected = modal.querySelector('.method-name-selected');
        
        let selectedMethod = null;

        if (refreshIcon) {
            refreshIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'flex';
                methodOptions.forEach(opt => opt.classList.remove('active'));
                if (paymentSelector) paymentSelector.classList.remove('expanded');
                if (selectedMethodDisplay) selectedMethodDisplay.style.display = 'none';
                selectedMethod = null;
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        if (selectorHeader && paymentSelector) {
            selectorHeader.addEventListener('click', function() {
                paymentSelector.classList.toggle('expanded');
            });
        }

        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                const method = this.dataset.method;
                const iconElement = this.querySelector('.method-icon');
                const textElement = this.querySelector('span');
                
                if (methodIconSelected && iconElement) {
                    methodIconSelected.src = iconElement.src;
                }
                if (methodNameSelected && textElement) {
                    methodNameSelected.textContent = textElement.textContent;
                }
                if (selectedMethodDisplay) {
                    selectedMethodDisplay.style.display = 'flex';
                }
                
                if (paymentSelector) paymentSelector.classList.remove('expanded');
                selectedMethod = method;
            });
        });

        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                const amountInput = document.getElementById('amount');
                const promoInput = document.getElementById('promo');
                const amount = amountInput ? amountInput.value : null;
                const promo = promoInput ? promoInput.value : null;
                
                if (!amount) {
                    alert('Пожалуйста, введите сумму');
                    return;
                }
                
                if (!selectedMethod) {
                    alert('Пожалуйста, выберите способ оплаты');
                    return;
                }
                
                console.log(`Пополнение на ${amount} через ${selectedMethod} с промокодом ${promo}`);
                alert(`Инициировано пополнение на ${amount} через ${getMethodName(selectedMethod)}!`);
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Функция для управления табами в играх
    function setupGamesTabs() {
        const container = document.querySelector('.games-tabs');
        if (!container) return;

        const tabButtons = container.querySelectorAll('.games-tab-button');
        const tabContents = document.querySelectorAll('.games-content');
        const tabHighlight = container.querySelector('.games-tab-highlight');

        function updateHighlightPosition(activeButton) {
            if (!activeButton || !tabHighlight) return;
            
            const buttonRect = activeButton.getBoundingClientRect();
            const tabsRect = activeButton.parentElement.getBoundingClientRect();
            
            const left = buttonRect.left - tabsRect.left;
            const width = buttonRect.width;
            
            tabHighlight.style.left = `${left}px`;
            tabHighlight.style.width = `${width}px`;
        }

        function switchTab(tabName) {
            tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.gameTab === tabName);
            });
            
            tabContents.forEach(content => {
                content.classList.toggle('active', content.dataset.gameContent === tabName);
            });
            
            const activeButton = container.querySelector(`.games-tab-button.active`);
            updateHighlightPosition(activeButton);
        }

        // Инициализация
        const activeTab = container.querySelector(`.games-tab-button.active`);
        if (activeTab) {
            updateHighlightPosition(activeTab);
            switchTab(activeTab.dataset.gameTab);
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.dataset.gameTab;
                switchTab(tabName);
            });
        });
    }

    // Функция для управления табами в розыгрышах
    function setupRafflesTabs() {
        const container = document.querySelector('.raffles-tabs');
        if (!container) return;

        const tabButtons = container.querySelectorAll('.raffles-tab-button');
        const tabContents = document.querySelectorAll('.raffles-content');
        const tabHighlight = container.querySelector('.raffles-tab-highlight');

        function updateHighlightPosition(activeButton) {
            if (!activeButton || !tabHighlight) return;
            
            const buttonRect = activeButton.getBoundingClientRect();
            const tabsRect = activeButton.parentElement.getBoundingClientRect();
            
            const left = buttonRect.left - tabsRect.left;
            const width = buttonRect.width;
            
            tabHighlight.style.left = `${left}px`;
            tabHighlight.style.width = `${width}px`;
        }

        function switchTab(tabName) {
            tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.raffleTab === tabName);
            });
            
            tabContents.forEach(content => {
                content.classList.toggle('active', content.dataset.raffleContent === tabName);
            });
            
            const activeButton = container.querySelector(`.raffles-tab-button.active`);
            updateHighlightPosition(activeButton);
        }

        // Инициализация
        const activeTab = container.querySelector(`.raffles-tab-button.active`);
        if (activeTab) {
            updateHighlightPosition(activeTab);
            switchTab(activeTab.dataset.raffleTab);
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.dataset.raffleTab;
                switchTab(tabName);
            });
        });
    }

    // Инициализация табов
    setupGamesTabs();
    setupRafflesTabs();
});

function getMethodName(method) {
    const methods = {
        'card': 'банковскую карту',
        'crypto': 'криптовалюту',
        'sbp': 'СБП'
    };
    return methods[method] || method;
}