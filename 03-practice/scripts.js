const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        box.classList.add('hidden');
    });
});
