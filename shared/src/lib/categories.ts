export enum MainCategory {
    MENSTRUAL = 'MENSTRUAL',
    SUPPORTIVE = 'SUPPORTIVE',
}

export enum MenstrualSubCategory {
    PAD = 'PAD',
    PANTY_LINER = 'PANTY_LINER',
    TAMPON = 'TAMPON',
}

export enum SupportiveSubCategory {
    HEATING_PAD = 'HEATING_PAD',
    CYCLE_ESSENTIALS = 'CYCLE_ESSENTIALS',
    CRANBERRY_ESSENTIALS = 'CRANBERRY_ESSENTIALS',
}

export type Category =
    | {
        main: MainCategory.MENSTRUAL;
        sub: MenstrualSubCategory;
    }
    | {
        main: MainCategory.SUPPORTIVE;
        sub: SupportiveSubCategory;
    };
