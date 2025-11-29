import { Switch, Route, Redirect } from "wouter";
import { DataProvider, useData } from "@/lib/dataContext";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import DashboardStudent from "@/pages/DashboardStudent";
import DashboardSupervisor from "@/pages/DashboardSupervisor";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, allowedRole }: { component: React.ComponentType, allowedRole: string }) {
  const { user } = useData();
  
  if (!user) return <Redirect to="/" />;
  if (user.role !== allowedRole) return <Redirect to="/" />; // Or to unauthorized page
  
  return <Component />;
}

function Router() {
  const { user } = useData();

  return (
    <Switch>
      <Route path="/" component={Login} />
      
      <Route path="/student">
        <ProtectedRoute component={DashboardStudent} allowedRole="student" />
      </Route>
      <Route path="/student/phases">
        <ProtectedRoute component={DashboardStudent} allowedRole="student" />
      </Route>
      <Route path="/student/chat">
        <ProtectedRoute component={DashboardStudent} allowedRole="student" />
      </Route>

      <Route path="/supervisor">
        <ProtectedRoute component={DashboardSupervisor} allowedRole="supervisor" />
      </Route>
      <Route path="/supervisor/students">
        <ProtectedRoute component={DashboardSupervisor} allowedRole="supervisor" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <DataProvider>
      <Router />
      <Toaster />
    </DataProvider>
  );
}

export default App;
