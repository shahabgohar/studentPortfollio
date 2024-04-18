export type Experience = {
    endDate: string;
    startDate: string;
    companyName: string;
    designation: string;
    roleSummary: string;
}

export type Skill = {
    firstName: string;
    lastName: string;
    description: string;
}

export enum Theme {
    DARK= 'myDark',
    LIGHT = 'myLight'
}

export const INJECT_THEME_KEY = 'theme'