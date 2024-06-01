export const changeRouteFromMenu = (menuKey: string) => {
    switch (menuKey) {
        case '1':
            return "";
        case '2':
            return "projects";
        case '3':
            return "departments";
        // case '4':
        //     return "news";
        // case '5':
        //     return "testimonials";
        // case '6':
        //     return "faq";
        default:
            return "";
    }

}