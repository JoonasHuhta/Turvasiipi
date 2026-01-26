"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useState } from "react";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();
    const { getExpertiseLevel } = useProgress();
    const { level: expertise } = getExpertiseLevel();

    const navProps = {
        pathname,
        t,
        expertise
    };

    return (
        <>
            <DesktopNav {...navProps} />
            <MobileNav {...navProps} isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
