import {
    AlertCircle,
    Check,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Edit,
    FileText,
    Loader2,
    LucideIcon,
    MoreHorizontal,
    RefreshCw,
    Search,
    TrashIcon,
    User,
    UserPlus,
    X,
    XCircle
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  spinner: Loader2,
  user: User,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  refresh: RefreshCw,
  create: FileText,
  add: UserPlus,
  search: Search,
  more: MoreHorizontal,
  check: Check,
  x: X,
  delete: TrashIcon,
  edit: Edit,
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle
} 