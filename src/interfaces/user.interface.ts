export interface UserNavigation {
  title: string;
  href: string;
  color?: string;
  icon?: JSX.Element;
  onClick: () => void;
}
