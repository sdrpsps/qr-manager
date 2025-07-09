import { Loader2Icon } from "lucide-react";

export default function WorkspaceLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2Icon className="text-blue-600 size-12 animate-spin mx-auto" />
        <p className="text-gray-600 dark:text-gray-400">加载中...</p>
      </div>
    </div>
  );
}
