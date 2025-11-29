import { useData } from "@/lib/dataContext";
import Layout from "@/components/Layout";
import PhaseList from "@/components/PhaseList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, CheckCircle, MessageSquarePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardSupervisor() {
  const { project, files } = useData();
  const { toast } = useToast();

  if (!project) return null;

  const handleComment = (fileName: string) => {
    toast({
      title: "Comment Added",
      description: `Your feedback on "${fileName}" has been saved.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Overseeing 1 Active Project</p>
        </div>

        {/* Student Overview Card */}
        <Card className="bg-sidebar text-sidebar-foreground border-none shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-sidebar-accent">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-1">Alex Student</h2>
                  <p className="text-sidebar-foreground/70 mb-2">Master of Computer Science</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none">
                      Thesis Phase: Literature Review
                    </Badge>
                    <Badge variant="outline" className="text-sidebar-foreground/60 border-sidebar-foreground/20">
                      On Track
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sidebar-foreground/60">Overall Progress</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 bg-sidebar-accent rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[35%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Approval Workflow */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">Phase Approvals</h2>
              <Button variant="outline" size="sm">View All History</Button>
            </div>
            
            <PhaseList isSupervisor={true} />
          </div>

          {/* Right: Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {files.slice(0, 3).map((file) => (
                  <div key={file.id} className="group flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-muted/50 hover:border-border transition-all">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Uploaded {file.uploadedAt}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleComment(file.name)}
                      title="Add Comment"
                    >
                      <MessageSquarePlus className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-green-50/50 border-green-100">
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Action Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 mb-4">
                  Alex has submitted a draft for the <strong>Literature Review</strong> phase. Please review and approve or request changes.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Review Submission
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
}
