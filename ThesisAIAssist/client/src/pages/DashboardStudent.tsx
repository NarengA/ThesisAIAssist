import { useData } from "@/lib/dataContext";
import Layout from "@/components/Layout";
import PhaseList from "@/components/PhaseList";
import ChatBox from "@/components/ChatBox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Clock, AlertTriangle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardStudent() {
  const { project, reminders, files, uploadFile } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (!project) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Mock phase selection for now - default to current active phase
      uploadFile(file, "Literature Review"); 
      toast({
        title: "File Uploaded",
        description: `${file.name} has been successfully uploaded.`,
      });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Supervisor: Dr. Sarah Supervisor</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {project.status}
              </Badge>
            </div>
          </div>
          <div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
            />
            <Button 
              className="shadow-lg shadow-primary/20"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Submit New File
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Timeline & Files */}
          <div className="lg:col-span-2 space-y-8">
            
            <Tabs defaultValue="phases" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="phases">Project Phases</TabsTrigger>
                <TabsTrigger value="files">File History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="phases" className="mt-0">
                <PhaseList />
              </TabsContent>
              
              <TabsContent value="files" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Submitted Documents</CardTitle>
                    <CardDescription>Version history of your thesis files.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="bg-white p-2 rounded-md border border-border shadow-sm">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{file.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>v{file.version}.0</span>
                                <span>•</span>
                                <span>{file.phase}</span>
                                <span>•</span>
                                <span>{file.uploadedAt}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed" onClick={() => fileInputRef.current?.click()}>
                        <Plus className="h-4 w-4 mr-2" /> Upload New Version
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

          </div>

          {/* Right Column: Assistant & Reminders */}
          <div className="space-y-8">
            
            {/* AI Assistant Widget */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur-sm opacity-50" />
              <ChatBox />
            </div>

            {/* Reminders */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reminders.map(reminder => (
                    <div key={reminder.id} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-900">{reminder.message}</p>
                        <p className="text-xs text-orange-700 mt-1">Due: {new Date(reminder.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </Layout>
  );
}
