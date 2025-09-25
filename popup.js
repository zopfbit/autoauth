
// MV2 background script: handle runtime messages to get/set matrix per-locale
// Keys are stored as matrix_<locale>
import * as pdfjsLib from "pdfjs-dist";

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
    }

    return text;
}

document.addEventListener("DOMContentLoaded", function () {
    const homeSection = document.getElementById("home");
    const editSection = document.getElementById("edit");
    const uploadSection = document.getElementById("upload-pdf");
    const matrixDisplay = document.getElementById("matrix");
    const matrixInput = document.getElementById("matrixInput");
    const saveStatus = document.getElementById("saveStatus");

    const storedMatrix = localStorage.getItem("matrix");
    if (storedMatrix) {
        matrixDisplay.textContent = storedMatrix;
    }

    document.getElementById("btn-edit").addEventListener("click", function () {
        homeSection.style.display = "none";
        editSection.style.display = "block";
    });

    document.getElementById("btn-upload").addEventListener("click", function () {
        homeSection.style.display = "none";
        uploadSection.style.display = "block";
    });

    document.getElementById("btn-back-home").addEventListener("click", function () {
        homeSection.style.display = "block";
        uploadSection.style.display = "none";
        editSection.style.display = "none";
    });

    document.getElementById("btn-save").addEventListener("click", function () {
        const inputValue = matrixInput.value.trim();
        if (inputValue) {
            // Validate and save the matrix
            try {
                const matrix = JSON.parse(inputValue);
                matrixDisplay.textContent = JSON.stringify(matrix, null, 2);
                saveStatus.textContent = "Matrix saved successfully!";
                saveStatus.style.color = "green";
                localStorage.setItem("matrix", JSON.stringify(matrix));
            } catch (e) {
                const commaSeparated = inputValue.split(',').map(item => item.trim());
                if (commaSeparated.length > 0) {
                    matrixDisplay.textContent = JSON.stringify(commaSeparated);
                    saveStatus.textContent = "Matrix saved successfully!";
                    saveStatus.style.color = "green";
                    localStorage.setItem("matrix", JSON.stringify(matrix));
                } else {
                    saveStatus.textContent = "Invalid input. Please enter valid JSON or comma-separated values.";
                    saveStatus.style.color = "red";
                }
            }
        } else {
            saveStatus.textContent = "Input cannot be empty.";
            saveStatus.style.color = "red";
        }
    });

    document.getElementById("btn-cancel").addEventListener("click", function () {
        editSection.style.display = "none";
        homeSection.style.display = "block";
        saveStatus.textContent = ""; // Clear previous save status
    });
});