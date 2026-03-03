'use strict';

export function load() { }
export function unload() { }

export const methods = {
    queryCurrentLanguage() {
        const win = window as any;
        return win._languageData.language;
    },
    changeCurrentLanguage(lang: string) {
        const win = window as any;
        console.log("初始化?", lang);

        win._languageData.init(lang);
        win._languageData.updateSceneRenderers();
        // @ts-ignore
        cce.Engine.repaintInEditMode();
    },
};