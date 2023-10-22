const codeInput = document.getElementById('code-input');
const copyButton = document.querySelector('.copy-button');
const saveButton = document.querySelector('.save-button');
const lockButton = document.querySelector('.lock-button');

let isLocked = false;

// Load saved code from local storage

const savedCode = localStorage.getItem('savedCode');
if (savedCode) {
    codeInput.value = savedCode;
}

copyButton.addEventListener('click', async () => {
    codeInput.select();

    try {
        await navigator.clipboard.writeText(codeInput.value);
        alert('Code copied to clipboard');
    } catch (err) {
        console.error('Unable to copy to clipboard:', err);
        alert('Copy to clipboard failed. You may need to grant clipboard permissions.');
    }
});

saveButton.addEventListener('click', () => {
    // Save code to local storage
    localStorage.setItem('savedCode', codeInput.value);
    alert('Code saved!');
});

lockButton.addEventListener('click', () => {
    isLocked = !isLocked;
    codeInput.readOnly = isLocked;
    lockButton.textContent = isLocked ? 'Unlock' : 'Lock';
});

// Basic indentation
codeInput.addEventListener('input', (e) => {
    const text = e.target.value;
    const lines = text.split('\n');
    const indentedText = lines.map((line) => '' + line).join('\n');
    e.target.value = indentedText;
});

