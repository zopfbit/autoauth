const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
let matrix = {};

if (browser.storage.local.get('matrix')) {
    console.log("Initial load:", browser.storage.local.get('matrix'));
    updateDict(browser.storage.local.get('matrix'));
}

function updateDict(rawMatrix) {
    for (let i = 0; i < rawMatrix.length; i++) {
        const row = letters[Math.floor(i / 9)];
        const col = (i % 9) + 1;
        const key = row + col;
        matrix[key] = rawMatrix[i];
    }
    console.log("Updated dict:", matrix);

    const values = Array.from(
        document.querySelectorAll('.otpInput .digit-label')).map(el => el.textContent.trim());

    const containers = document.querySelectorAll('.input-container');

    containers.forEach((container, index) => {
        const input = container.querySelector('input.digit-input');

        if (input && values[index] !== undefined && index < 5) {
            input.value = matrix[values[index]];
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}

// initial load
(async () => {
    const { matrix } = await browser.storage.local.get("matrix");
    if (matrix) {
        updateDict(matrix);
    }
})();

// dynamic updates
browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.matrix) {
        const newMatrix = changes.matrix.newValue;
        console.log("Matrix changed:", newMatrix);
        if (newMatrix) {
            updateDict(newMatrix);
        }
    }
});