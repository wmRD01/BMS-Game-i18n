export enum I18nKeys {
    SYS_DEFAULT_LOG,
    SYS_DEFAULT_WARN,
    SYS_DEFAULT_ERROR,
    SYS_TIME_OUT,
    SYS_SLEEP_OUT,
}

export const I18nKeyMap: Record<I18nKeys, string> = {
    [I18nKeys.SYS_DEFAULT_LOG]: 'sys.default.log',
    [I18nKeys.SYS_DEFAULT_WARN]: 'sys.default.warn',
    [I18nKeys.SYS_DEFAULT_ERROR]: 'sys.default.error',
    [I18nKeys.SYS_TIME_OUT]: 'sys.timeOut',
    [I18nKeys.SYS_SLEEP_OUT]: 'sys.sleepOut',
};