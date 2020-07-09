
export const createDom = (text) => {
    const dom = document.createElement('div');
    dom.innerHTML = text;
    return dom.children[0];
}

export default {
    createDom
}