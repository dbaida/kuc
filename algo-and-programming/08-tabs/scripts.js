const tabs = document.querySelectorAll('.tabs');

tabs.forEach((tab) => {
    const navTabs = tab.querySelectorAll('.tab-nav > li');

    navTabs.forEach((navTab, index) => {
        const isActive = navTab.classList.contains('active');

        if (isActive) {
            const contentTabs = tab.querySelectorAll('.tab-content');

            const activeContent = contentTabs[index];
            if (activeContent) {
                activeContent.classList.add('active');
            }
        }

        navTab.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                return;
            }

            tab.querySelectorAll('.tab-content').forEach((contentTab, tabIndex) => {
                if (index === tabIndex) {
                    navTab.classList.add('active');
                    contentTab.classList.add('active');
                } else {
                    contentTab.classList.remove('active');
                    navTabs[tabIndex].classList.remove('active');
                }
            });
        });
    });
});
