/**
 * i18n 語系檔存放路徑（相對於專案根目錄）
 */
export const I18N_DIR = 'extensions/i18n/assets/i18n';

/**
 * 新語系 ts 檔案的範本，main.ts 與 panels/default.ts 共用
 */
export const languageContentTemplate = `
const win = window as any;

export const languages = {
    // Data
};

if (!win.languages) {
    win.languages = {};
}

win.languages.{{name}} = languages;
`;
