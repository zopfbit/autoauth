const values = Array.from(
    document.querySelectorAll('.otpInput .digit-label')
).map(el => el.textContent.trim());

const matrix = {
    'A1': 'U', 'A2': 'L', 'A3': '4', 'A4': 'T', 'A5': 'T', 'A6': 'M', 'A7': 'C', 'A8': 'e', 'A9': 'i',
    'B1': 'B', 'B2': 'B', 'B3': 'm', 'B4': 'm', 'B5': 'i', 'B6': 'M', 'B7': 'c', 'B8': 'n', 'B9': 'C',
    'C1': 'b', 'C2': 'S', 'C3': 'k', 'C4': 'h', 'C5': 'A', 'C6': 'f', 'C7': 'm', 'C8': 's', 'C9': 'b',
    'D1': 'c', 'D2': 'R', 'D3': 'k', 'D4': 'P', 'D5': '8', 'D6': '5', 'D7': 'V', 'D8': 'p', 'D9': 'e',
    'E1': 'a', 'E2': 'h', 'E3': 'w', 'E4': '2', 'E5': 'n', 'E6': '1', 'E7': 'Q', 'E8': 'T', 'E9': 'U',
    'F1': 'i', 'F2': 'B', 'F3': 'F', 'F4': 'j', 'F5': 'd', 'F6': 'C', 'F7': '1', 'F8': 'k', 'F9': 'V',
    'G1': 'd', 'G2': '9', 'G3': 'u', 'G4': 'w', 'G5': '3', 'G6': 'k', 'G7': 'S', 'G8': 'V', 'G9': 'H',
    'H1': 'B', 'H2': 'i', 'H3': 'F', 'H4': 'C', 'H5': 'p', 'H6': 'R', 'H7': 'L', 'H8': 's', 'H9': 'Q',
    'I1': 'o', 'I2': 'L', 'I3': 'w', 'I4': 'u', 'I5': 'W', 'I6': 'F', 'I7': 'B', 'I8': 'c', 'I9': 'd'
};

const containers = document.querySelectorAll('.input-container');

containers.forEach((container, index) => {
    const input = container.querySelector('input.digit-input');

    if (input && values[index] !== undefined) {
        input.value = matrix[values[index]];
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
});

