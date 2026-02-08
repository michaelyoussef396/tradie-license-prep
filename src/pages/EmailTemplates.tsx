import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Bell, Reply, Clock, Star, Gift, UserPlus } from "lucide-react";

const flowSteps = [
  { label: "Lead Enquires", icon: Mail },
  { label: "You Get Notified", icon: Bell },
  { label: "Lead Gets Reply", icon: Reply },
  { label: "Follow-Ups Sent", icon: Clock },
];

const emailTemplates = [
  {
    id: 1,
    title: "Lead Notification",
    color: "bg-blue-500",
    colorLight: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    icon: Bell,
    to: "Adrian Nicolazzo",
    from: "Qualify Pro System",
    subject: "New Course Enquiry Received",
    body: [
      "You've received a new enquiry from a potential student:",
      "• Name: [Lead Name]",
      "• Phone: [Phone Number]",
      "• Email: [Email Address]",
      "• Course Interest: [Selected Course]",
      "• Message: [Their message]",
      "• Submitted: [Timestamp]",
    ],
    why: "Ensures no lead slips through the cracks. Adrian gets instant visibility into every enquiry with all the details needed to follow up personally.",
  },
  {
    id: 2,
    title: "Auto-Reply to Lead",
    color: "bg-emerald-500",
    colorLight: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
    icon: Reply,
    to: "[Lead Name]",
    from: "Adrian Nicolazzo – Qualify Pro",
    subject: "Thanks for your enquiry – Adrian here",
    body: [
      "Hi [Name],",
      "Thanks for reaching out about getting your building registration sorted.",
      "I'll personally call you within 24 hours to chat about your situation.",
      "A few things that set us apart:",
      "• Small groups (max 10 students)",
      "• 95% pass rate",
      "• Complete application & interview prep",
      "Talk soon,",
      "Adrian",
    ],
    why: "Immediate acknowledgement builds trust and sets expectations. Highlights key differentiators while the lead's interest is at its peak.",
  },
  {
    id: 3,
    title: "Follow-Up Day 3",
    color: "bg-orange-500",
    colorLight: "bg-orange-50 border-orange-200",
    textColor: "text-orange-700",
    icon: Clock,
    to: "[Lead Name]",
    from: "Adrian Nicolazzo – Qualify Pro",
    subject: "Still thinking about your builder's license?",
    body: [
      "Hi [Name],",
      "Just checking in — I know life gets busy on the tools.",
      "If you've got any questions about the registration process or which course suits you best, I'm happy to have a quick chat.",
      "No pressure, just here to help.",
      "Adrian",
    ],
    why: "Re-engages leads who haven't responded. Casual, low-pressure tone matches the tradie audience and keeps Qualify Pro top-of-mind.",
  },
  {
    id: 4,
    title: "Follow-Up Day 7",
    color: "bg-purple-500",
    colorLight: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    icon: Clock,
    to: "[Lead Name]",
    from: "Adrian Nicolazzo – Qualify Pro",
    subject: "Last check-in from Adrian",
    body: [
      "Hi [Name],",
      "This is my last follow-up — I don't want to be that guy who keeps emailing!",
      "If the timing isn't right, no worries at all. When you're ready to get your license sorted, I'll be here.",
      "Feel free to reach out anytime.",
      "Cheers,",
      "Adrian",
    ],
    why: "Final touchpoint that respects the lead's time. Creates a positive last impression so they return when ready — no burnt bridges.",
  },
  {
    id: 5,
    title: "Review Request",
    color: "bg-emerald-600",
    colorLight: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
    icon: Star,
    to: "[Graduate Name]",
    from: "Adrian Nicolazzo – Qualify Pro",
    subject: "Congrats on your registration! Quick favour?",
    body: [
      "Hi [Name],",
      "Huge congrats on getting your registration — you earned it!",
      "If you've got 2 minutes, a Google review would mean the world to me. It helps other tradies find us.",
      "[Leave a Review Button]",
      "Thanks legend,",
      "Adrian",
    ],
    why: "Catches graduates at their happiest moment. Social proof from real students is the most powerful marketing tool for the business.",
  },
  {
    id: 6,
    title: "Referral Program",
    color: "bg-pink-500",
    colorLight: "bg-pink-50 border-pink-200",
    textColor: "text-pink-700",
    icon: Gift,
    to: "[Current Student/Graduate]",
    from: "Qualify Pro",
    subject: "Know a tradie who needs their license?",
    body: [
      "Hi [Name],",
      "Got a mate thinking about getting registered?",
      "For every tradie you refer who enrols:",
      "• You get $150 cash back OR",
      "• They get 15% off their course",
      "Your referral code: [UNIQUE_CODE]",
      "Just get them to mention your name or use the code when they enquire.",
    ],
    why: "Turns happy students into brand ambassadors. Word-of-mouth referrals from tradies carry more weight than any ad campaign.",
  },
  {
    id: 7,
    title: "Referral Welcome",
    color: "bg-red-500",
    colorLight: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    icon: UserPlus,
    to: "[Referred Lead]",
    from: "Adrian Nicolazzo – Qualify Pro",
    subject: "Welcome — [Referrer] sent you our way!",
    body: [
      "Hi [Name],",
      "[Referrer Name] thought you'd benefit from our building registration mentorship.",
      "Great news — because you were referred, you're eligible for 15% off any course.",
      "I'll be in touch within 24 hours to chat about your goals and find the right fit.",
      "Looking forward to helping you get registered.",
      "Adrian",
    ],
    why: "Personalised welcome that leverages social proof from someone the lead already trusts. The discount incentive reduces friction to enrol.",
  },
];

const EmailTemplates = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-6 text-sm">
              <Mail className="w-4 h-4 mr-1.5" /> Automation System
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Email Templates
            </h1>
            <p className="text-lg sm:text-xl text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
              Automated sequences that keep leads and students engaged throughout their journey
            </p>
          </div>
        </section>

        {/* Flow Diagram */}
        <section className="py-12 sm:py-16 bg-muted/50">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
                How the Automation Works
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
                {flowSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 min-w-[120px]">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-semibold text-foreground text-center">{step.label}</span>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <ArrowRight className="hidden sm:block w-6 h-6 text-primary mx-3 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Email Templates */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
                All 7 Email Templates
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Each email is crafted to match Qualify Pro's approachable, tradie-friendly voice
              </p>
            </ScrollReveal>

            <div className="space-y-10">
              {emailTemplates.map((template, i) => (
                <ScrollReveal key={template.id} delay={i * 0.05}>
                  <Card className={`overflow-hidden border ${template.colorLight}`}>
                    {/* Color strip */}
                    <div className={`h-1.5 ${template.color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center`}>
                          <template.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Badge variant="secondary" className={`${template.textColor} text-xs font-medium`}>
                            Template {template.id}
                          </Badge>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-1">
                            {template.title}
                          </h3>
                        </div>
                      </div>
                      {/* Email header */}
                      <div className="bg-muted/60 rounded-lg p-3 text-sm space-y-1 font-mono">
                        <p><span className="text-muted-foreground">To:</span> <span className="text-foreground">{template.to}</span></p>
                        <p><span className="text-muted-foreground">From:</span> <span className="text-foreground">{template.from}</span></p>
                        <p><span className="text-muted-foreground">Subject:</span> <span className="text-foreground font-semibold">{template.subject}</span></p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Email body */}
                      <div className="bg-background rounded-lg border p-4 space-y-2 text-sm sm:text-base text-foreground leading-relaxed">
                        {template.body.map((line, li) => (
                          <p key={li} className={line.startsWith("•") ? "pl-4" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                      {/* Why this matters */}
                      <div className="flex items-start gap-3 bg-muted/40 rounded-lg p-4">
                        <span className="text-lg mt-0.5">💡</span>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Why this matters
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {template.why}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default EmailTemplates;
