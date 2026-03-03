import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { I18N_DIR, languageContentTemplate } from './languageTemplate';

const DEFAULT_LANG = 'zhTW';

/**
 * 確保 i18n 資料夾存在，若不存在則建立
 */
function ensureI18nDir(): string {
    const dir = join(Editor.Project.path, I18N_DIR);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    return dir;
}

/**
 * 建立預設語系 ts 檔案
 * @param langName 語系名稱（作為檔名）
 * @returns 是否成功
 */
function createDefaultLanguageFile(langName: string): boolean {
    try {
        ensureI18nDir();
        const filePath = join(Editor.Project.path, I18N_DIR, `${langName}.ts`);
        const content = languageContentTemplate.replace(/\{\{name\}\}/g, langName);
        writeFileSync(filePath, content.trim() + '\n', 'utf-8');
        return true;
    } catch (e) {
        console.error('建立語系檔案失敗:', e);
        return false;
    }
}

/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    openDefaultPanel() {
        Editor.Panel.open('i18n');
    },
    /**
     * 檢查 extensions/i18n/assets/i18n 資料夾內是否有語系 ts 檔案
     * @returns 第一個語系檔名（無副檔名），若資料夾不存在或無檔案則回傳 null
     */
    getAvailableLanguages() {
        const dir = join(Editor.Project.path, I18N_DIR);
        if (!existsSync(dir)) {
            return null;
        }
        const names = readdirSync(dir);
        const tsFiles = names.filter((name: string) => name.endsWith('.ts'));
        if (tsFiles.length === 0) {
            return null;
        }
        const firstLang = tsFiles[0].replace(/\.ts$/, '');
        return firstLang;
    },
};

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export const load = async function () {
    let firstLang = methods.getAvailableLanguages();
    if (!firstLang) {
        await Editor.Profile.removeProject('i18n', 'lang');
        // 無語系時自動建立：createDefaultLanguageFile 內會呼叫 ensureI18nDir
        if (createDefaultLanguageFile(DEFAULT_LANG)) {
            firstLang = DEFAULT_LANG;
        }
    }
    const flag = await Editor.Profile.getProject('i18n', 'first');
    let lang = await Editor.Profile.getProject('i18n', 'lang');

    // 若 Profile 無語系，檢查 extensions/i18n/assets/i18n 是否有語系 ts 檔案
    if (!lang) {
        if (firstLang) {
            lang = firstLang;
            await Editor.Profile.setProject('i18n', 'lang', lang);
        } else {
            console.error("找不到對應初始化語系，且無法建立預設語系檔");
        }
    }

    if (!flag) {
        console.log(Editor.I18n.t('i18n.warnA'));
        console.log(Editor.I18n.t('i18n.warnB'));
        console.log(Editor.I18n.t('i18n.warnC'));
        console.log(Editor.I18n.t('i18n.warnD'));
        Editor.Profile.setProject('i18n', 'first', true);
    }
};

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () { };
