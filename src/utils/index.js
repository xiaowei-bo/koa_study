/**
 * @description 复制文本
 * @param {*} text
 */
export function copyText(text) {
    return new Promise(resolve => {
        const hideInput = document.createElement("input");
        hideInput.value = text;
        document.body.appendChild(hideInput);
        hideInput.select();
        document.execCommand("Copy");
        hideInput.style.display = "none";
        hideInput.remove();
        resolve();
    });
}