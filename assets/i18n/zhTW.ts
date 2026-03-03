
const win = window as any;

export const languages = {
    "sys": {
        "default": {
            "log": "日誌",
            "warn": "警告",
            "error": "錯誤",
        },
        "timeOut": "連線超時",
        "sleepOut": "睡過頭",
    },
};

if (!win.languages) {
    win.languages = {};
}

win.languages.zhTW = languages;

// 遞迴取得所有 "xxx.yyy.zzz" 格式的 path
/**上面編譯完可以請AI生成這邊 */
