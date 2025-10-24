import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, FileText, Trophy } from "lucide-react";

const CourseOverview = () => {
  const courses = [
    {
      icon: BookOpen,
      title: "Interview Preparation",
      description: "Master the VBA interview process with proven techniques and practice sessions.",
    },
    {
      icon: MessageSquare,
      title: "1-on-1 Mentorship",
      description: "Personalized guidance tailored to your trade background and experience level.",
    },
    {
      icon: FileText,
      title: "Documentation Support",
      description: "Ensure your application is complete and meets all VBA requirements.",
    },
    {
      icon: Trophy,
      title: "Success Strategies",
      description: "Learn from real-world scenarios and proven success cases from past students.",
    },
  ];

  return (
    <section id="courses" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Approach
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support designed to maximize your chances of success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
