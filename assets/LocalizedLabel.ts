
import { I18nKeys } from 'db://assets/resources/i18n/zhTW';
import * as i18n from './LanguageData';

import { _decorator, Component, Enum, Label } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LocalizedLabel')
@executeInEditMode
export class LocalizedLabel extends Component {
    //#region useString
    get _useString() { return this.useString; }
    set _useString(v: boolean) {
        this.useString = v;
        if (v) {
            this.useEnum = false;
            this.updateLabel();
        }
    }
    @property({ displayName: '換使用字串', visible() { return !this.useEnum; } })
    private useString: boolean = false;
    //#endregion
    //#region useEnum
    get _useEnum() { return this.useEnum; }
    set _useEnum(v: boolean) {
        this.useEnum = v;
        if (v) {
            this.useString = false;
            this.updateLabelForEnum();
        }
    }
    @property({ displayName: '換使用Enum', visible() { return !this.useString; } })
    private useEnum: boolean = true;
    //#endregion
    //#region i18nKeyEnum
    @property({ visible: false })
    i18nKeyEnum: I18nKeys = I18nKeys.SYS_DEFAULT_LOG;
    @property({
        type: Enum(I18nKeys), displayName: 'i18n', visible() {
            if (this.useEnum) this.updateLabelForEnum();
            return this.useEnum;
        }
    })
    private get _i18nKeyEnum() {
        return this.i18nKeyEnum;
    }
    private set _i18nKeyEnum(str: string) {
        this.i18nKeyEnum = str as I18nKeys;
        this.updateLabelForEnum();
    }
    //#endregion
    //#region key
    @property({ visible: false })
    key: string = '';

    @property({
        displayName: 'Key', visible() {
            if (this.useString) this.updateLabel();
            return this.useString;
        }
    })
    private get _key() {
        return this.key;
    }
    private set _key(str: string) {
        this.key = str;
        this.updateLabel();
    }
    //#endregion
    label: Label | null = null;

    async onLoad() {
        if (!i18n.ready) {
            ''
            const lang = await Editor.Profile.getProject('i18n', 'lang')
            if (!lang) {
                console.error("找不到對應初始化語系，請新增");
                return
            }
            i18n.init(lang);
        }
        this.fetchRender();
    }

    fetchRender() {
        let label = this.getComponent('cc.Label') as Label;
        if (label) {
            this.label = label;
            this.updateLabel();
            return;
        }
    }
    updateLabelForEnum() {
        this.label && (this.label.string = i18n.t(this.i18nKeyEnum));
    }
    updateLabel() {
        this.label && (this.label.string = i18n.t(this.key));
    }
}
