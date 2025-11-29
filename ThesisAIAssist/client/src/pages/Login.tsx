import { GraduationCap, UserCog, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useData, Role } from "@/lib/dataContext";
import { useLocation } from "wouter";

export default function Login() {
  const { login } = useData();
  const [, setLocation] = useLocation();

  const handleLogin = (role: Role) => {
    login(role);
    setLocation(role === "student" ? "/student" : "/supervisor");
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col gap-6 p-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight">
            Advance Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Academic Research
            </span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The all-in-one platform for managing your thesis, collaborating with supervisors, and accelerating your writing with AI.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <p className="font-bold text-2xl text-primary">50%</p>
              <p className="text-xs text-muted-foreground">Faster Research</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <p className="font-bold text-2xl text-primary">AI</p>
              <p className="text-xs text-muted-foreground">Powered Assistant</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Cards */}
        <div className="flex flex-col gap-4">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary" onClick={() => handleLogin("student")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-serif">Student Access</CardTitle>
              <GraduationCap className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Manage your phases, upload files, and chat with your AI assistant.
              </CardDescription>
              <Button className="w-full group-hover:bg-primary/90">
                Continue as Student <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative bg-[#f8fafc] px-2 text-xs text-muted-foreground uppercase tracking-widest">
              Or
            </span>
          </div>

          <Card className="hover:border-primary/30 transition-colors cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary" onClick={() => handleLogin("supervisor")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-serif">Supervisor Access</CardTitle>
              <UserCog className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Review student progress, approve phases, and provide feedback.
              </CardDescription>
              <Button variant="outline" className="w-full">
                Continue as Supervisor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
