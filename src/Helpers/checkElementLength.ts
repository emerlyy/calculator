export const checkElementLength = (element: HTMLElement, length: number) => {
    if (element.textContent)
        return element.textContent.length > length;
    return false;
}