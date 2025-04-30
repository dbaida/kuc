const doToggle = (node) => {
    node.classList.toggle('active');
    console.log(node.classList.contains('active') ? 'ON' : 'OFF');
};

document.querySelector('.toggler')
    .addEventListener('click', (e) => {
        doToggle(e.target);
    });

document.querySelector('.toggler')
    .addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            doToggle(e.target);
        }
    });
