import { CareerItem, InfoItem, Project } from "./content";

export interface MenuDialog {
    isOpen: boolean;
    onClose: () => void;
    projects?: Project[];
    onProjectSelect?: (index: number) => void;
    career?: CareerItem[];
    info?: InfoItem[];
}