let toastContainer;

function generateToast({
  message,
  background = '#00214d',
  color = '#fffffe',
  length = '3000ms',
}) {
  toastContainer.insertAdjacentHTML(
    'beforeend',
    `<p class="toast" 
    style="background-color: ${background};
    color: ${color};
    animation-duration: ${length}">
    ${message}
  </p>`
  );
  const toast = toastContainer.lastElementChild;
  toast.addEventListener('animationend', () => toast.remove());
}

(function initToast() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div class="toast-container"></div>`
  );
  toastContainer = document.querySelector('.toast-container');
})();

export function generateErrorToast(message) {
  generateToast({
    message: message,
    background: 'hsl(19deg 98% 42%)',
    color: 'hsl(171deg 100% 3%)',
    length: '8000ms',
  });
}

export function generateSuccessToast(message) {
  generateToast({
    message: message,
    background: 'hsl(127deg 94% 40%)',
    color: 'hsl(171deg 100% 3%)',
    length: '5000ms',
  });
}
