export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'default',
  //       title: 'Default',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/dashboard/default',
  //       icon: 'dashboard',
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'main',
    title: 'Main',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'flights',
        title: 'Flights',
        type: 'item',
        classes: 'nav-item',
        url: '/flights',
        icon: 'send',
        breadcrumbs: false
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        classes: 'nav-item',
        url: '/users',
        icon: 'user',
        breadcrumbs: false
      },
      {
        id: 'personnel',
        title: 'Personnel',
        type: 'item',
        classes: 'nav-item',
        url: '/personnel',
        icon: 'team',
        breadcrumbs: false
      },
      {
        id: 'passengers',
        title: 'Passengers',
        type: 'item',
        classes: 'nav-item',
        url: '/passengers',
        icon: 'usergroup-add',
        breadcrumbs: false
      },
      {
        id: 'services',
        title: 'Services',
        type: 'item',
        classes: 'nav-item',
        url: '/services',
        icon: 'appstore',
        breadcrumbs: false
      }
    ]
  }
];
