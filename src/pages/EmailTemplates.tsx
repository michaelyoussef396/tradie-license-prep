import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Bell, Reply, Clock, Star, Gift, UserPlus, Phone, ExternalLink } from "lucide-react";

const flowSteps = [
  { label: "Lead Enquires", icon: Mail },
  { label: "You Get Notified", icon: Bell },
  { label: "Lead Gets Reply", icon: Reply },
  { label: "Follow-Ups Sent", icon: Clock },
];

/* ── Shared email chrome ── */

const EmailHeader = ({ accent, label }: { accent: string; label: string }) => (
  <div className={`${accent} px-6 py-4 flex items-center justify-between`}>
    <img src="/images/qualify-pro-logo.png" alt="Qualify Pro" className="h-8 brightness-0 invert" />
    <span className="text-white/80 text-xs font-medium tracking-wide uppercase">{label}</span>
  </div>
);

const EmailMeta = ({ to, from, subject }: { to: string; from: string; subject: string }) => (
  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-sm space-y-1 font-mono">
    <p><span className="text-gray-400">To:</span> <span className="text-gray-700">{to}</span></p>
    <p><span className="text-gray-400">From:</span> <span className="text-gray-700">{from}</span></p>
    <p><span className="text-gray-400">Subject:</span> <span className="text-gray-900 font-semibold">{subject}</span></p>
  </div>
);

const EmailFooter = () => (
  <div className="bg-gray-800 text-gray-400 px-6 py-5 text-xs text-center space-y-1">
    <p className="text-gray-300 font-medium">Qualify Pro – Building Registration Mentorship</p>
    <p>Melbourne, Victoria&nbsp;·&nbsp;0411 626 398</p>
    <p>support@adcopropertyinspectionsmelbourne.com.au</p>
  </div>
);

const EmailCTA = ({ label, accent }: { label: string; accent: string }) => (
  <div className="text-center py-2">
    <span className={`inline-block ${accent} text-white font-semibold text-sm px-8 py-3 rounded-lg shadow-md`}>
      {label}
    </span>
  </div>
);

const Signature = () => (
  <div className="border-t border-gray-200 pt-4 mt-6 text-sm text-gray-600">
    <p className="font-semibold text-gray-800">Adrian Nicolazzo</p>
    <p>Registered Building Practitioner (Unlimited)</p>
    <p className="text-blue-600">0411 626 398</p>
  </div>
);

const WhyBox = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-4 mt-4">
    <span className="text-lg mt-0.5">💡</span>
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Why this matters</p>
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  </div>
);

const EmailShell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-[600px] mx-auto rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white ${className}`}>
    {children}
  </div>
);

/* ── Page ── */

const EmailTemplates = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section id="hero-section" className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-6 text-sm">
              <Mail className="w-4 h-4 mr-1.5" /> Automation System
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">Email Templates</h1>
            <p className="text-lg sm:text-xl text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
              Professionally designed email sequences that keep leads and students engaged
            </p>
          </div>
        </section>

        {/* Flow */}
        <section className="py-12 sm:py-16 bg-muted/50">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">How the Automation Works</h2>
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
                    {i < flowSteps.length - 1 && <ArrowRight className="hidden sm:block w-6 h-6 text-primary mx-3 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Templates */}
        <section className="py-16 sm:py-20 bg-gray-100">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">All 7 Email Templates</h2>
              <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
                Each email is production-ready — designed to look polished in any inbox
              </p>
            </ScrollReveal>

            <div className="space-y-16">

              {/* 1 ─ Lead Notification */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-blue-600 border-blue-300">Template 1</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-blue-600" label="Admin Alert" />
                  <EmailMeta to="Adrian Nicolazzo" from="Qualify Pro System" subject="🔔 New Lead: James Mitchell – 0412 345 678" />
                  <div className="px-6 py-6 space-y-5 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base font-semibold text-gray-900">New enquiry received:</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium text-gray-900">James Mitchell</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-medium text-gray-900">0412 345 678</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-medium text-gray-900">james.m@email.com</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Course</span><span className="font-medium text-gray-900">Comprehensive Builder Program</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Submitted</span><span className="font-medium text-gray-900">8 Feb 2026, 2:34 PM</span></div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Message</p>
                      <p className="text-gray-700">"Hey Adrian, I've been a chippie for 6 years and want to get my builder's license. What's the best course for me?"</p>
                    </div>
                    <EmailCTA label="Call James Now →" accent="bg-blue-600" />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Ensures no lead slips through the cracks. Adrian gets instant visibility into every enquiry with all the details needed to follow up personally." />
              </ScrollReveal>

              {/* 2 ─ Auto-Reply */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-emerald-600 border-emerald-300">Template 2</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-emerald-600" label="Welcome" />
                  <EmailMeta to="James Mitchell" from="Adrian Nicolazzo – Qualify Pro" subject="Thanks for contacting Qualify Pro ✅" />
                  <div className="px-6 py-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base">Hi James,</p>
                    <p>Thanks for reaching out about getting your building registration sorted. I'll personally call you <strong>within 24 hours</strong> to chat about your situation and recommend the best path forward.</p>
                    <p className="font-semibold text-gray-900 pt-2">In the meantime, here's what sets us apart:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { stat: "10 max", desc: "Students per class" },
                        { stat: "95%", desc: "Pass rate" },
                        { stat: "Full", desc: "Application & interview prep" },
                      ].map(item => (
                        <div key={item.stat} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                          <p className="text-xl font-bold text-emerald-700">{item.stat}</p>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <p>This isn't a one-size-fits-all course. I find your knowledge gaps and fill them — so you walk into the BPC interview confident.</p>
                    <EmailCTA label="View Our Courses" accent="bg-emerald-600" />
                    <Signature />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Immediate acknowledgement builds trust and sets expectations. Highlights key differentiators while the lead's interest is at its peak." />
              </ScrollReveal>

              {/* 3 ─ Follow-Up Day 3 */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-orange-600 border-orange-300">Template 3</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-orange-500" label="Follow-Up" />
                  <EmailMeta to="James Mitchell" from="Adrian Nicolazzo – Qualify Pro" subject="Still keen to get your builder's license?" />
                  <div className="px-6 py-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base">Hi James,</p>
                    <p>Just checking in — I know life gets busy on the tools.</p>
                    <p>If you've got any questions, here are the ones I get asked the most:</p>
                    <div className="border border-orange-200 rounded-lg overflow-hidden">
                      {[
                        "How long before I can get registered?",
                        "What experience do I actually need?",
                        "Do you help with the application too?",
                      ].map((q, i) => (
                        <div key={i} className={`px-4 py-3 flex items-center gap-2 ${i < 2 ? "border-b border-orange-100" : ""} ${i % 2 === 0 ? "bg-orange-50/50" : ""}`}>
                          <span className="text-orange-500 font-bold text-xs">Q</span>
                          <span className="text-gray-800">{q}</span>
                        </div>
                      ))}
                    </div>
                    <p>Happy to jump on a quick call whenever suits you. No pressure, just here to help.</p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <EmailCTA label="📞 Call Adrian" accent="bg-orange-500" />
                      <EmailCTA label="✉️ Reply to This Email" accent="bg-gray-700" />
                    </div>
                    <Signature />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Re-engages leads who haven't responded. Casual, low-pressure tone matches the tradie audience and keeps Qualify Pro top-of-mind." />
              </ScrollReveal>

              {/* 4 ─ Follow-Up Day 7 */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-purple-600 border-purple-300">Template 4</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-purple-600" label="Final Follow-Up" />
                  <EmailMeta to="James Mitchell" from="Adrian Nicolazzo – Qualify Pro" subject="Quick question" />
                  <div className="px-6 py-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base">Hi James,</p>
                    <p>This is my last follow-up — I don't want to be that guy who keeps emailing! 😄</p>
                    <p>If the timing isn't right, no worries at all. When you're ready to get your license sorted, I'll be here.</p>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center space-y-2">
                      <p className="text-gray-800 font-medium">Whenever you're ready, you can:</p>
                      <div className="flex flex-col sm:flex-row justify-center gap-3 text-sm">
                        <span className="flex items-center justify-center gap-1.5"><Phone className="w-4 h-4 text-purple-600" /> Call 0411 626 398</span>
                        <span className="flex items-center justify-center gap-1.5"><Mail className="w-4 h-4 text-purple-600" /> Reply to this email</span>
                      </div>
                    </div>
                    <p>Cheers,</p>
                    <Signature />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Final touchpoint that respects the lead's time. Creates a positive last impression so they return when ready — no burnt bridges." />
              </ScrollReveal>

              {/* 5 ─ Review Request */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-emerald-600 border-emerald-300">Template 5</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-emerald-600" label="Congratulations" />
                  <EmailMeta to="Fauzi Rahman" from="Adrian Nicolazzo – Qualify Pro" subject="Quick favour? (30 seconds) ⭐" />
                  <div className="px-6 py-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base">Hi Fauzi,</p>
                    <p>Huge congrats on getting your registration — you put in the work and you earned it! 🎉</p>
                    <p>If you've got 30 seconds, a quick Google review would mean the world to me. It helps other tradies find us when they're looking to get registered.</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center space-y-3">
                      <div className="flex justify-center gap-1 text-yellow-400 text-2xl">★ ★ ★ ★ ★</div>
                      <p className="text-gray-700 font-medium">How was your experience with Qualify Pro?</p>
                      <EmailCTA label="Leave a Google Review →" accent="bg-emerald-600" />
                    </div>
                    <p>Thanks legend,</p>
                    <Signature />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Catches graduates at their happiest moment. Social proof from real students is the most powerful marketing tool for the business." />
              </ScrollReveal>

              {/* 6 ─ Referral Program */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-pink-600 border-pink-300">Template 6</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-pink-600" label="Referral Program" />
                  <EmailMeta to="Jordan Peters" from="Qualify Pro" subject="Get $150 when your mates get their license 💰" />
                  <div className="px-6 py-6 space-y-5 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base">Hi Jordan,</p>
                    <p>Got a mate thinking about getting registered? Here's a win-win:</p>
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-5 space-y-4">
                      <p className="font-bold text-gray-900 text-center text-base">How it works</p>
                      <div className="space-y-3">
                        {[
                          { step: "1", text: "Share your unique referral code with a mate" },
                          { step: "2", text: "They mention your name or code when they enquire" },
                          { step: "3", text: "Once they enrol, you both get rewarded" },
                        ].map(s => (
                          <div key={s.step} className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</span>
                            <p className="text-gray-800 pt-0.5">{s.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <div className="flex-1 bg-white rounded-lg border border-pink-200 p-3 text-center">
                          <p className="text-2xl font-bold text-pink-600">$150</p>
                          <p className="text-xs text-gray-500">Cash back for you</p>
                        </div>
                        <div className="flex items-center justify-center text-gray-400 font-bold text-xs">OR</div>
                        <div className="flex-1 bg-white rounded-lg border border-pink-200 p-3 text-center">
                          <p className="text-2xl font-bold text-pink-600">15%</p>
                          <p className="text-xs text-gray-500">Off for your mate</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Your Referral Code</p>
                      <p className="text-xl font-mono font-bold text-gray-900 tracking-widest">JORDAN-QP2026</p>
                    </div>
                    <EmailCTA label="Share with a Mate" accent="bg-pink-600" />
                    <Signature />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Turns happy students into brand ambassadors. Word-of-mouth referrals from tradies carry more weight than any ad campaign." />
              </ScrollReveal>

              {/* 7 ─ Referral Welcome */}
              <ScrollReveal>
                <Badge variant="outline" className="mb-3 text-red-600 border-red-300">Template 7</Badge>
                <EmailShell>
                  <EmailHeader accent="bg-red-600" label="Welcome" />
                  <EmailMeta to="Marcus Nguyen" from="Adrian Nicolazzo – Qualify Pro" subject="Welcome! Jordan sent you our way 🤝" />
                  <div className="px-6 py-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base">Hi Marcus,</p>
                    <p><strong>Jordan Peters</strong> thought you'd benefit from our building registration mentorship — and any mate of Jordan's is welcome here.</p>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center space-y-2">
                      <p className="text-xs text-red-500 uppercase font-semibold">Referral Discount</p>
                      <p className="text-3xl font-bold text-red-600">15% OFF</p>
                      <p className="text-gray-600 text-sm">Any course — applied automatically</p>
                    </div>
                    <p className="font-semibold text-gray-900 pt-2">Here's what you're getting:</p>
                    <div className="space-y-2">
                      {[
                        "Small groups — max 10 students per class",
                        "95% pass rate — students who complete gain their license",
                        "Full application & BPC interview preparation",
                        "Personalised coaching that fills your knowledge gaps",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                    <p>I'll be in touch within 24 hours to chat about your goals and find the right fit.</p>
                    <EmailCTA label="View Courses" accent="bg-red-600" />
                    <Signature />
                  </div>
                  <EmailFooter />
                </EmailShell>
                <WhyBox text="Personalised welcome that leverages social proof from someone the lead already trusts. The discount incentive reduces friction to enrol." />
              </ScrollReveal>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default EmailTemplates;
