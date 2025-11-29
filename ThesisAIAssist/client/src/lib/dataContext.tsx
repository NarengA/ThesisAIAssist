import { createContext, useContext, useState, ReactNode } from "react";

// Types
export type Role = "student" | "supervisor" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Phase {
  id: number;
  name: string;
  status: "completed" | "in_progress" | "pending" | "rejected";
  dueDate: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  studentId: number;
  supervisorId: number;
  status: string;
  phases: Phase[];
}

export interface FileRecord {
  id: number;
  name: string;
  uploadedAt: string;
  version: number;
  phase: string;
}

export interface Reminder {
  id: number;
  message: string;
  dueDate: string;
  status: "active" | "completed";
}

// Mock Data
const MOCK_USER_STUDENT: User = {
  id: 1,
  name: "Alex Student",
  email: "alex@university.edu",
  role: "student",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
};

const MOCK_USER_SUPERVISOR: User = {
  id: 2,
  name: "Dr. Sarah Supervisor",
  email: "sarah@university.edu",
  role: "supervisor",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
};

const MOCK_PROJECT: Project = {
  id: 101,
  title: "Machine Learning Applications in Climate Modeling",
  studentId: 1,
  supervisorId: 2,
  status: "In Progress",
  phases: [
    { id: 1, name: "Proposal Submission", status: "completed", dueDate: "2024-02-15", description: "Submit initial research proposal and methodology." },
    { id: 2, name: "Literature Review", status: "in_progress", dueDate: "2024-04-01", description: "Comprehensive review of existing literature." },
    { id: 3, name: "Data Collection", status: "pending", dueDate: "2024-06-01", description: "Gather datasets and preprocess for analysis." },
    { id: 4, name: "Model Development", status: "pending", dueDate: "2024-08-01", description: "Train and validate ML models." },
    { id: 5, name: "Final Defense", status: "pending", dueDate: "2024-11-01", description: "Defense presentation and final thesis submission." },
  ]
};

const MOCK_FILES: FileRecord[] = [
  { id: 1, name: "thesis_proposal_v1.pdf", uploadedAt: "2024-02-01", version: 1, phase: "Proposal Submission" },
  { id: 2, name: "thesis_proposal_final.pdf", uploadedAt: "2024-02-14", version: 2, phase: "Proposal Submission" },
  { id: 3, name: "lit_review_draft.docx", uploadedAt: "2024-03-10", version: 1, phase: "Literature Review" },
];

const MOCK_REMINDERS: Reminder[] = [
  { id: 1, message: "Submit Literature Review Draft", dueDate: "2024-03-25", status: "active" },
  { id: 2, message: "Weekly Meeting with Dr. Sarah", dueDate: "2024-03-15", status: "active" },
];

// Context
interface DataContextType {
  user: User | null;
  project: Project | null;
  files: FileRecord[];
  reminders: Reminder[];
  login: (role: Role) => void;
  logout: () => void;
  uploadFile: (file: File, phase: string) => void;
  updatePhaseStatus: (phaseId: number, status: Phase["status"]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project>(MOCK_PROJECT);
  const [files, setFiles] = useState<FileRecord[]>(MOCK_FILES);
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);

  const login = (role: Role) => {
    if (role === "student") setUser(MOCK_USER_STUDENT);
    else if (role === "supervisor") setUser(MOCK_USER_SUPERVISOR);
  };

  const logout = () => setUser(null);

  const uploadFile = (file: File, phase: string) => {
    const newFile: FileRecord = {
      id: Date.now(),
      name: file.name,
      uploadedAt: new Date().toISOString().split('T')[0],
      version: 1,
      phase: phase
    };
    setFiles([newFile, ...files]);
  };

  const updatePhaseStatus = (phaseId: number, status: Phase["status"]) => {
    setProject(prev => ({
      ...prev,
      phases: prev.phases.map(p => p.id === phaseId ? { ...p, status } : p)
    }));
  };

  return (
    <DataContext.Provider value={{ user, project, files, reminders, login, logout, uploadFile, updatePhaseStatus }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
