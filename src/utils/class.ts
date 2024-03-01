export enum ClassType {
    STUDY_CIRCLE = 'Study_Circle',
    YOUTH_GROUP = 'Youth_Group',
    CHILDREN_CLASS = 'Children_Class',
    PRAYER_MEETING = 'Prayer_Meeting'
};

export const ClassTypeOptions: Array<{ id: number, label: string, value: string }> = [
    {
        id: 1,
        label: ClassType.STUDY_CIRCLE,
        value: ClassType.STUDY_CIRCLE,
    },
    {
        id: 2,
        label: ClassType.YOUTH_GROUP,
        value: ClassType.YOUTH_GROUP,
    },
    {
        id: 3,
        label: ClassType.CHILDREN_CLASS,
        value: ClassType.CHILDREN_CLASS,
    },
    {
        id: 4,
        label: ClassType.PRAYER_MEETING,
        value: ClassType.PRAYER_MEETING,
    },
]