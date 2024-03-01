export enum UserRole {
    TUTOR = 'Tutor',
    ANIMATOR = 'Animator',
    INSTRUCTOR = 'Instructor',
    PRAYER_ORGANIZOR = 'Prayer_Organizor'
};

export const UserRoleOptions: Array<{ id: number, label: string, value: string }> = [
    {
        id: 1,
        label: UserRole.TUTOR,
        value: UserRole.TUTOR,
    },
    {
        id: 2,
        label: UserRole.ANIMATOR,
        value: UserRole.ANIMATOR,
    },
    {
        id: 3,
        label: UserRole.INSTRUCTOR,
        value: UserRole.INSTRUCTOR,
    },
    {
        id: 4,
        label: UserRole.PRAYER_ORGANIZOR,
        value: UserRole.PRAYER_ORGANIZOR,
    },
]