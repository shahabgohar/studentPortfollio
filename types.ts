export type Experience = {
    endDate: string
    startDate: string
    companyName: string
    designation: string
    roleSummary: string
    achievements?: string[]
    technologies?: string[]
}

export type Skill = {
    firstName: string
    lastName: string
    description: string
    proficiencyLevel?: number
}

export type Project = {
    id: string
    title: string
    description: string
    longDescription?: string
    technologies: string[]
    imageUrl: string
    liveUrl?: string
    githubUrl?: string
    featured: boolean
    category: 'web' | 'mobile' | 'ai' | 'other'
    completionDate: string
}

export type ContactOption = {
    title: string
    link: string
    icon: any
}

export type AboutContent = {
    headline: string
    bio: string
    highlights: string[]
}

export enum Theme {
    DARK = 'myDark',
    LIGHT = 'myLight'
}

export const INJECT_THEME_KEY = 'theme'
