import { CheckCircle2, Circle, Clock, AlertCircle, Calendar } from "lucide-react";
import { useData } from "@/lib/dataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PhaseList({ isSupervisor = false }: { isSupervisor?: boolean }) {
  const { project, updatePhaseStatus } = useData();

  if (!project) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in_progress": return <Clock className="h-5 w-5 text-blue-500" />;
      case "rejected": return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-700 border-green-200";
      case "in_progress": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "rejected": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="font-serif text-xl">Thesis Timeline</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative space-y-0">
          {/* Vertical Line */}
          <div className="absolute left-2.5 top-2 bottom-4 w-px bg-border" />

          {project.phases.map((phase, index) => (
            <div key={phase.id} className="relative pl-10 pb-8 last:pb-0 group">
              {/* Status Dot */}
              <div className={cn(
                "absolute left-0 top-0.5 bg-background rounded-full p-0.5 ring-4 ring-background transition-all duration-300 group-hover:scale-110",
                phase.status === "in_progress" && "ring-blue-50"
              )}>
                {getStatusIcon(phase.status)}
              </div>

              <div className="bg-card rounded-xl border border-border p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-serif font-medium text-lg text-foreground">{phase.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Due: {new Date(phase.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("w-fit capitalize", getStatusColor(phase.status))}>
                    {phase.status.replace("_", " ")}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {phase.description}
                </p>

                {isSupervisor && phase.status === "in_progress" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-dashed border-border">
                    <Button size="sm" onClick={() => updatePhaseStatus(phase.id, "completed")} className="bg-green-600 hover:bg-green-700">
                      Approve Phase
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => updatePhaseStatus(phase.id, "rejected")}>
                      Request Revision
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
