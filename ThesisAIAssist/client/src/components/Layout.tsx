import { Link, useLocation } from "wouter";
import { useData } from "@/lib/dataContext";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  LogOut, 
  GraduationCap,
  Users,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useData();
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!user) return <>{children}</>;

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground p-4 border-r border-sidebar-border">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="bg-primary/20 p-2 rounded-lg">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-lg leading-none">ThesisFlow</h1>
          <p className="text-xs text-sidebar-foreground/60">Academic Suite</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href={user.role === "student" ? "/student" : "/supervisor"}>
          <Button 
            variant={location.includes("dashboard") || location === "/student" || location === "/supervisor" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-3 font-normal"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        
        {user.role === "student" && (
          <>
            <Link href="/student/phases">
              <Button 
                variant={location.includes("phases") ? "secondary" : "ghost"} 
                className="w-full justify-start gap-3 font-normal"
              >
                <FileText className="h-4 w-4" />
                My Phases
              </Button>
            </Link>
            <Link href="/student/chat">
              <Button 
                variant={location.includes("chat") ? "secondary" : "ghost"} 
                className="w-full justify-start gap-3 font-normal"
              >
                <MessageSquare className="h-4 w-4" />
                AI Assistant
              </Button>
            </Link>
          </>
        )}

        {user.role === "supervisor" && (
          <Link href="/supervisor/students">
            <Button 
              variant={location.includes("students") ? "secondary" : "ghost"} 
              className="w-full justify-start gap-3 font-normal"
            >
              <Users className="h-4 w-4" />
              Students
            </Button>
          </Link>
        )}
      </nav>

      <div className="mt-auto pt-4 border-t border-sidebar-border/20">
        <div className="flex items-center gap-3 px-2 mb-4">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:text-red-500 hover:bg-red-950/10" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-full">
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto p-6 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
