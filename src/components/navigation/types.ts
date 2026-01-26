// Shared navigation types and interfaces
export interface NavLinkItem {
    href: string;
    label: string;
    translationKey: string;
}

export interface NavDropdownItem {
    title: string;
    translationKey: string;
    items: NavLinkItem[];
}

export interface NavigationProps {
    pathname: string;
    t: (key: string) => string;
    expertise: {
        name: string;
        icon: string;
    };
}

export interface MobileNavProps extends NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}
