import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

export default function getIcon(
  name: string | null
): React.ElementType<Icons.LucideProps> {
  return (Icons[name as IconName] as Icons.LucideIcon) || Icons.Globe;
}
