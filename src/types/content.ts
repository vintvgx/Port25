export interface NavItem {
  category: string;
  items: {
    id?: string;
    title?: string;
    version?: string;
    name?: string;
    description?: string;
    technologies?: string[];
    date?: Date | undefined;
    content?: {
      type: 'image' | 'video' | 'text';
      src?: string;
      text?: string;
    };
    links?: {
        demo?: string;
        github?: string;
        live?: string;
      };
  }[];
}
