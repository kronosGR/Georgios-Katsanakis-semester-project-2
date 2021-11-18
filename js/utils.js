export function showError(msg) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  const html = `
    <img src="/assets/error.jpg" alt="error"/>
    <p class="error-text">${msg}</p>
  `;
  errorDiv.innerHTML = html;

  document.body.appendChild(errorDiv);

  window.setTimeout(() => {
    document.body.removeChild(errorDiv)
  },3000 );
}
