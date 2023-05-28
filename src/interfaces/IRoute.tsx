export interface IRoute {
    // id
    id?: number;
    // Path, like in basic prop
    path: string;
    // Exact, like in basic prop
    exact?: boolean;
    // Preloader for lazy loading
    // fallback?: NonNullable<ReactNode> | null;
    // Lazy Loaded component
    // component?: LazyExoticComponent<ComponentType<any>>;
    element?: any;
    // Sub routes
    routes?: IRoute[];
    // Redirect path
    redirect?: boolean;
    // If router is private, this is going to be true
    private?: boolean;
    // redirect url
    to?: string;
    //navbar title
    sidebarName?: string;
    // show in bottom navigation
    bottomNavigation?: boolean;
    // category of routes
    pageCategory?: string;
    // icon className
    iconClass?: string;
}