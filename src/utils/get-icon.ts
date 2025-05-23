import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

export default function getIcon(name: string | null): React.ElementType {
  return (Icons[name as IconName] as React.ElementType) || Icons.Globe;
}
