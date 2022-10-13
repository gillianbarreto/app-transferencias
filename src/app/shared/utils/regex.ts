export const validFormat = {
    RUT: /^[0-9]+[-|‐]{1}[0-9kK]{1}$/,
    ONLY_LETTERS: /[a-zA-Z\-\s]/,
    ONLY_NUMBERS: /^[0-9]+$/i,
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}