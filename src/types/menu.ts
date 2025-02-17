import { CareerItem, InfoItem, Project } from "./content";

export interface MenuDialog {
    isOpen: boolean;
    onClose: () => void;
    projects?: Project[];
    onProjectSelect?: (index: number, version: string) => void;
    career?: CareerItem[];
    info?: InfoItem[];
}