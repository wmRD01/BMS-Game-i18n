
// import { I18nKeys } from 'db://assets/resources/i18n/zhTW';
import * as i18n from './LanguageData';

import { _decorator, Component, Enum, Label } from 'cc';
import { I18nKeyMap, I18nKeys } from './PublicEnum';
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
            this.updateLabel();
        }
    }
    @property({ displayName: '換使用Enum', visible() { return !this.useString; } })
    private useEnum: boolean = false;
    //#endregion
    //#region i18nKeyEnum
    @property({ visible: false })
    i18nKeyEnum: I18nKeys = I18nKeys.SYS_DEFAULT_LOG;
    @property({
        type: Enum(I18nKeys), displayName: 'i18n', visible() {
            if (this.useEnum) this.updateLabel();
            return this.useEnum;
        }
    })

    private get _i18nKeyEnum() {
        return this.i18nKeyEnum;
    }

    private set _i18nKeyEnum(v: I18nKeys) {
        this.i18nKeyEnum = v;
        this.updateLabel();
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

        if (!this.getComponent(Label)) this.addComponent(Label)
        if (!i18n.ready) {
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
        const label = this.getComponent(Label);
        if (label) {
            this.label = label;
            this.updateLabel();
        }
    }

    updateLabel() {
        if (this.label) {
            if (this.useEnum) {
                const key = I18nKeyMap[this.i18nKeyEnum];
                if (key) {
                    this.label.string = i18n.t(key);
                }
            } else {
                this.label.string = i18n.t(this.key);
            }
        }
    }

}
