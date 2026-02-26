
import * as i18n from './LanguageData';

import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LocalizedSpriteItem')
class LocalizedSpriteItem {
    @property
    language: string = 'zh';
    @property({
        type: SpriteFrame,
    })
    spriteFrame: SpriteFrame | null = null;
}

@ccclass('LocalizedSprite')
@executeInEditMode
export class LocalizedSprite extends Component {
    sprite: Sprite | null = null;

    @property({
        type: LocalizedSpriteItem,
    })
    spriteList = [];

    async onLoad() {
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
        let sprite = this.getComponent('cc.Sprite') as Sprite;
        if (sprite) {
            this.sprite = sprite;
            this.updateSprite();
            return;
        }
    }

    updateSprite() {
        for (let i = 0; i < this.spriteList.length; i++) {
            const item = this.spriteList[i];
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                this.sprite.spriteFrame = item.spriteFrame;
                break;
            }
        }
    }
}
