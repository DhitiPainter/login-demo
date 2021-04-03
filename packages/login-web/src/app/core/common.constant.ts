export const BroadcastKeys = {
    headerSearchValue: 'headerSearchValue',
    userRoles: 'userRoles',
    cartCount: 'cartCount',
};

export const Roles = {
    admin: 'Admin',
    employee: 'Employee',
    client: 'Client',
}

export const SideBar = [
    {
        displayName: 'Home',
        route: '/home',
        access: [Roles.admin, Roles.employee, Roles.client],
        icon: 'home',
    },
    {
        displayName: 'Manage',
        route: '/manage',
        access: [Roles.employee, Roles.admin],
        icon: 'build',
        subMenus: [
            {
                displayName: 'Products',
                route: '/manage/product',
                access: [Roles.employee, Roles.admin],
                icon: 'scatter_plot',
            },
            {
                displayName: 'Admins',
                route: '/manage/admin',
                access: [Roles.employee],
                icon: 'supervised_user_circle',
            },
        ]
    },
    {
        displayName: 'Shop by Categories',
        route: '/product', // category',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'category',
    },
    {
        displayName: 'Orders',
        route: '/history',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'timeline',
    },
    {
        displayName: 'Favourites',
        route: '/fav',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'favorite',
    },
    {
        displayName: 'Profile Settings',
        route: '/profile/settings',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'settings',
    },
    {
        displayName: 'FAQs',
        route: '/faq',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'question_answer',
    },
    {
        displayName: 'Contact Us',
        route: '/contact',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'contact_page',
    },
    {
        displayName: 'Feedback',
        route: '/feedback',
        access: [Roles.employee, Roles.admin, Roles.client],
        icon: 'feedback',
    },
]