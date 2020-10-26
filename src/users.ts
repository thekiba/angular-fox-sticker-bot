import {Font} from "./font";
import {MaskType} from "./image";
import {TelegrafContext} from "telegraf/typings/context";

export interface UserSettings {
    name: string;
    id: number;
    mask: MaskType;
    font: Font;
}

const usersSettings: UserSettings[] = [
    {
        name: 'dragon',
        id: 223840521,
        mask: 'dragon',
        font: Font.PixelWhite
    },
    {
        name: 'fox',
        id: 191513399,
        mask: 'fox',
        font: Font.PixelWhite
    },
    {
        name: 'olegha',
        id: 623275753,
        mask: 'loli',
        font: Font.PixelWhite
    },
    {
        name: 'prince',
        id: 240533420,
        mask: 'prince',
        font: Font.PixelWhite
    },
    {
        name: 'mefest',
        id: 93158165,
        mask: 'chii',
        font: Font.PixelWhite
    },
    {
        name: 'smooth operator',
        id: 182958337,
        mask: 'cheetah',
        font: Font.PixelWhite
    },
    {
        name: 'Eugene 🏖',
        id: 365151175,
        mask: 'cat',
        font: Font.PixelWhite
    },
    {
        name: 'Никита',
        id: 707778546,
        mask: 'nikita',
        font: Font.PixelWhite
    },
    {
        name: 'Глеб',
        id: 252455916,
        mask: 'dog',
        font: Font.PixelWhite
    },
    {
        name: 'Дима',
        id: 281131613,
        mask: 'snail',
        font: Font.PixelWhite
    },
    {
        name: 'obenjiro',
        id: 227646933,
        mask: 'tanya',
        font: Font.PixelWhite
    },
    {
        name: 'kisya lisya',
        id: 412714053,
        mask: 'kisya',
        font: Font.PixelWhite
    },
    {
        name: 'miralina',
        id: 280700978,
        mask: 'miralina',
        font: Font.PixelWhite
    },
    {
        name: 'alex kulagin',
        id: 87416394,
        mask: 'coffee',
        font: Font.PixelWhite
    },
    {
        name: 'nodir',
        id: 387088592,
        mask: 'pilaf',
        font: Font.PixelWhite
    }
];

const defaultUserSettings: UserSettings = {
    id: 0,
    name: '',
    mask: 'raspberry',
    font: Font.PixelWhite
};

export function resolveUserSettings(
    ctx: TelegrafContext,
    defaultSettings: UserSettings = defaultUserSettings
): UserSettings {
    const userSettings = usersSettings.find(u => u.id === ctx.from.id);

    return userSettings ?? defaultSettings;
}
