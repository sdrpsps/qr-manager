import { Github } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface GitHubLinkProps {
  href: string
  className?: string
}

export default function GitHubLink({ href, className }: GitHubLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group inline-flex items-center justify-center rounded-full p-3 transition-all duration-300 bg-background border border-border hover:bg-accent hover:border-accent-foreground hover:shadow-xl",
            className
          )}
        >
          <Github className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:rotate-12 group-hover:text-accent-foreground" />
        </a>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Star on GitHub</p>
      </TooltipContent>
    </Tooltip>
  )
}
