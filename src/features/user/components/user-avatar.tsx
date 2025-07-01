import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const UserAvatar = ({
  name,
  image,
  size = "md",
  className,
}: UserAvatarProps) => {
  // 生成头像的初始字母
  const getInitials = (name: string) => {
    if (!name) return "?";

    // 处理中文名称
    if (/[\u4e00-\u9fa5]/.test(name)) {
      return name.slice(0, 2);
    }

    // 处理英文名称
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // 根据名称生成颜色
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-rose-500",
      "bg-cyan-500",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // 尺寸配置
  const sizeConfig = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initials = getInitials(name);
  const avatarColor = getAvatarColor(name);

  return (
    <Avatar className={`${sizeConfig[size]} ${className || ""}`}>
      {image && <AvatarImage src={image} alt={name} className="object-cover" />}
      <AvatarFallback
        className={`${avatarColor} text-white font-medium select-none`}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
