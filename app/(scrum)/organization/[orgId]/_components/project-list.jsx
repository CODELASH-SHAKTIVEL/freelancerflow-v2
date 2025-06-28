// components/ProjectList.jsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/actions/organizations";
import DeleteProject from "./delete-project";
import {
  FileText,
  CalendarClock,
  Timer,
  Activity,
  Zap,
  ExternalLink,
} from "lucide-react";

export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-4">
        <p>No projects found.</p>
        <Link
          className="underline underline-offset-2 text-blue-500 hover:text-blue-700"
          href="/project/create"
        >
          Create a new project
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FileText className="text-blue-500" /> Your Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">
                      {project.name}
                    </span>
                    <Badge variant="secondary">{project.key}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {project.projectScope || "No scope defined"}
                  </div>
                </div>
                <DeleteProject projectId={project.id} />
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p className="line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-3 text-xs mt-2">
                {project.duration && (
                  <div className="flex items-center gap-1">
                    <Timer size={14} /> {project.duration} days
                  </div>
                )}
                {project.deadline && (
                  <div className="flex items-center gap-1">
                    <CalendarClock size={14} />
                    {new Date(project.deadline).toLocaleDateString()}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Zap size={14} /> {project.priority}
                </div>
                <div className="flex items-center gap-1">
                  <Activity size={14} /> {project.status.replace("_", " ")}
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href={`/project/${project.id}`}
                  className="text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  View Project <ExternalLink size={16} />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
