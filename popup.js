function formatMatrixWithNewlines(array, groupSize = 9) {
    const result = [];
    for (let i = 0; i < array.length; i += groupSize) {
        const group = array.slice(i, i + groupSize);
        result.push(group.join(','));
    }
    return result.join(',\n');
}

document.addEventListener("DOMContentLoaded", function () {
    const homeSection = document.getElementById("home");
    const editSection = document.getElementById("edit");
    const uploadSection = document.getElementById("upload");
    const matrixDisplay = document.getElementById("matrix");
    const matrixInput = document.getElementById("matrixInput");
    const saveStatus = document.getElementById("saveStatus");

    (async () => {
        try {
            const result = await browser.storage.local.get('matrix');
            if (result.matrix && Array.isArray(result.matrix)) {
                matrixDisplay.textContent = formatMatrixWithNewlines(result.matrix);
            } else {
                matrixDisplay.textContent = "No matrix found.";
            }
        } catch (err) {
            console.error("Error retrieving matrix:", err);
        }
    })();

    document.getElementById("btn-edit").addEventListener("click", () => {
        homeSection.style.display = "none";
        editSection.style.display = "block";
        uploadSection.style.display = "none";
    });

    document.getElementById("btn-upload").addEventListener("click", () => {
        homeSection.style.display = "none";
        uploadSection.style.display = "block";
        editSection.style.display = "none";
    });

    document.getElementById("btn-back-home-edit").addEventListener("click", () => {
        homeSection.style.display = "block";
        uploadSection.style.display = "none";
        editSection.style.display = "none";
    });

    document.getElementById("btn-back-home-upload").addEventListener("click", () => {
        homeSection.style.display = "block";
        uploadSection.style.display = "none";
        editSection.style.display = "none";
    });

    document.getElementById("btn-save").addEventListener("click", async () => {
        console.log("Save button clicked");

        const inputValue = matrixInput.value.trim();
        if (inputValue) {
            try {
                let matrix = JSON.parse(inputValue);
                matrix = matrix.map(row =>
                    row.map(el => String(el)
                        .replace(/[\s"\n]/g, ''))
                );

                matrixDisplay.textContent = formatMatrixWithNewlines(matrix);
                saveStatus.textContent = "Matrix saved successfully!";
                saveStatus.style.color = "green";

                browser.storage.local.set({ matrix: matrix });
            } catch (e) {
                let commaSeparated = inputValue.split(',').map(item => item.trim().replace(/[\s"\[\]\n]/g, ''));
                if (commaSeparated.length > 0) {
                    matrixDisplay.textContent = formatMatrixWithNewlines(commaSeparated);
                    saveStatus.textContent = "Matrix saved successfully!";
                    saveStatus.style.color = "green";

                    browser.storage.local.set({ matrix: commaSeparated });
                } else {
                    saveStatus.textContent = "Invalid input. Must contain exactly 81 elements.";
                    saveStatus.style.color = "red";
                }
            }
        } else {
            saveStatus.textContent = "Input cannot be empty.";
            saveStatus.style.color = "red";
        }
    });

    const dropArea = document.getElementById('drop-area');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('hover');
    }

    function unhighlight() {
        dropArea.classList.remove('hover');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        const file = files[0];
        if (file && file.type === 'application/pdf') {
            alert(`File ${file.name} uploaded successfully!`);
            // You can add further processing here, like uploading the file to a server
        } else {
            alert('Please upload a valid PDF file.');
        }
    }

    // Optional: Allow clicking to open file dialog
    dropArea.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';
        input.onchange = (e) => {
            const files = e.target.files;
            handleFiles(files);
        };
        input.click();
    });
});