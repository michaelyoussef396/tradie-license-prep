import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Mail, Bell, Reply, Clock } from "lucide-react";

const flowSteps = [
  { num: 1, title: "Lead Enquires", desc: "Via website form" },
  { num: 2, title: "You Get Notified", desc: "Instant email" },
  { num: 3, title: "Lead Gets Reply", desc: "Automatic" },
  { num: 4, title: "Follow-Ups", desc: "Day 3 & 7" },
];

/* ── Reusable parts ── */

const EmailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-sm mb-1.5 last:mb-0">
    <span className="w-16 text-muted-foreground font-medium">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

const WhyNote = ({ text }: { text: string }) => (
  <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mt-4 text-sm text-amber-900">
    <strong>Why this matters:</strong> {text}
  </div>
);

const Sig = ({ full }: { full?: boolean }) => (
  <div className="border-t border-border pt-4 mt-5 text-muted-foreground text-sm">
    {full ? (
      <>
        <p className="font-semibold text-foreground">Adrian Nicolazzo</p>
        <p>Qualify Pro</p>
        <p>0411 626 398</p>
        <p>qualifypro.com.au</p>
      </>
    ) : (
      <>
        <p className="font-semibold text-foreground">Adrian</p>
        <p>0411 626 398</p>
      </>
    )}
  </div>
);

/* ── Page ── */

const EmailTemplates = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-muted/40">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-background text-center">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Qualify Pro</h1>
            <p className="text-muted-foreground">Email Automation Templates</p>
          </div>
        </section>

        {/* Flow */}
        <section className="pb-10">
          <div className="container mx-auto max-w-[650px] px-4">
            <ScrollReveal>
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-lg font-semibold text-foreground text-center mb-5">How It Works</h2>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                  {flowSteps.map((s, i) => (
                    <div key={s.num} className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex-1 sm:flex-initial text-center bg-primary/5 rounded-lg p-4 min-w-[120px]">
                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2">
                          {s.num}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                      </div>
                      {i < flowSteps.length - 1 && (
                        <span className="hidden sm:block text-primary text-xl">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Templates */}
        <section className="pb-16">
          <div className="container mx-auto max-w-[650px] px-4 space-y-10">

            {/* 1 — Lead Notification */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="bg-primary px-5 py-3 text-primary-foreground">
                  <p className="font-semibold">1. Lead Notification</p>
                  <p className="text-sm opacity-90">Sent to you immediately when someone enquires</p>
                </div>
                <div className="bg-muted/50 px-5 py-3 border-b border-border">
                  <EmailRow label="To:" value="Adrian (your email)" />
                  <EmailRow label="From:" value="Qualify Pro <hello@qualifypro.com.au>" />
                  <EmailRow label="Subject:" value="New Lead: Jordan Smith - 0412 345 678" />
                </div>
                <div className="bg-background px-5 py-5 text-sm leading-relaxed text-foreground space-y-4">
                  <div className="bg-primary/5 border-l-4 border-primary p-3 font-semibold text-primary rounded-r-lg">
                    🔔 NEW ENQUIRY FROM WEBSITE
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg overflow-hidden text-sm">
                    {[
                      ["Name:", "Jordan Smith"],
                      ["Phone:", "0412 345 678"],
                      ["Email:", "jordan.smith@email.com"],
                      ["Course Interest:", "Comprehensive Builder Program"],
                      ["Message:", "Hi, I'm a carpenter with 5 years experience looking to get my domestic builder license."],
                      ["Submitted:", "15 Dec 2025, 2:34 PM"],
                    ].map(([label, value], i) => (
                      <div key={i} className="flex px-4 py-2.5 border-b border-border last:border-b-0">
                        <span className="w-28 font-semibold text-muted-foreground shrink-0">{label}</span>
                        <span className="text-primary">{value}</span>
                      </div>
                    ))}
                  </div>
                  <p>Reply directly to this email or call them on <strong>0412 345 678</strong></p>
                </div>
              </div>
              <WhyNote text="You get notified instantly so you can call while they're still interested." />
            </ScrollReveal>

            {/* 2 — Auto-Reply */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="bg-emerald-600 px-5 py-3 text-white">
                  <p className="font-semibold">2. Auto-Reply to Lead</p>
                  <p className="text-sm opacity-90">Sent immediately to the person who enquired</p>
                </div>
                <div className="bg-muted/50 px-5 py-3 border-b border-border">
                  <EmailRow label="To:" value="jordan.smith@email.com" />
                  <EmailRow label="From:" value="Qualify Pro <hello@qualifypro.com.au>" />
                  <EmailRow label="Subject:" value="Thanks for contacting Qualify Pro" />
                </div>
                <div className="bg-background px-5 py-5 text-sm leading-relaxed text-foreground space-y-4">
                  <p>Hey Jordan,</p>
                  <p>Thanks for reaching out about getting your builders license.</p>
                  <p>Our team will give you a call within 24 hours to have a chat about where you're at and how we can help.</p>
                  <p>In the meantime, here's what most tradies want to know:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Our courses run in small groups (max 10) so you get real support</li>
                    <li>95% of our students pass first time</li>
                    <li>We focus on getting you registered, not just giving you a certificate</li>
                  </ul>
                  <p>Talk soon,</p>
                  <Sig full />
                </div>
              </div>
              <WhyNote text="Builds trust immediately. They know you'll call within 24 hours." />
            </ScrollReveal>

            {/* 3 — Follow-Up Day 3 */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="bg-amber-600 px-5 py-3 text-white">
                  <p className="font-semibold">3. Follow-Up (Day 3)</p>
                  <p className="text-sm opacity-90">Sent automatically if no contact has been made</p>
                </div>
                <div className="bg-muted/50 px-5 py-3 border-b border-border">
                  <EmailRow label="To:" value="jordan.smith@email.com" />
                  <EmailRow label="From:" value="Qualify Pro <hello@qualifypro.com.au>" />
                  <EmailRow label="Subject:" value="Still keen to get your builders license?" />
                </div>
                <div className="bg-background px-5 py-5 text-sm leading-relaxed text-foreground space-y-4">
                  <p>Hey Jordan,</p>
                  <p>Just checking in – I tried to reach you but might have missed you.</p>
                  <p>If you're still thinking about getting your BPC registration, happy to have a quick chat about:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>What experience you need</li>
                    <li>Which course suits your situation</li>
                    <li>How long the process takes</li>
                  </ul>
                  <p>Just reply to this email or call me on <strong>0411 626 398</strong>.</p>
                  <Sig />
                </div>
              </div>
              <WhyNote text="Catches leads who got busy or missed your call. Many sales happen from follow-ups." />
            </ScrollReveal>

            {/* 4 — Final Follow-Up Day 7 */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="bg-violet-600 px-5 py-3 text-white">
                  <p className="font-semibold">4. Final Follow-Up (Day 7)</p>
                  <p className="text-sm opacity-90">Last touchpoint – keeps the door open</p>
                </div>
                <div className="bg-muted/50 px-5 py-3 border-b border-border">
                  <EmailRow label="To:" value="jordan.smith@email.com" />
                  <EmailRow label="From:" value="Qualify Pro <hello@qualifypro.com.au>" />
                  <EmailRow label="Subject:" value="Quick question" />
                </div>
                <div className="bg-background px-5 py-5 text-sm leading-relaxed text-foreground space-y-4">
                  <p>Hey Jordan,</p>
                  <p>Last one from me – just wanted to check if you had any questions I can help with?</p>
                  <p>No stress either way. When you're ready to get your license, we're here.</p>
                  <Sig />
                </div>
              </div>
              <WhyNote text="Short and low-pressure. Leaves a good impression even if they don't convert now." />
            </ScrollReveal>

            {/* 5 — Review Request */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="bg-emerald-600 px-5 py-3 text-white">
                  <p className="font-semibold">5. Review Request</p>
                  <p className="text-sm opacity-90">Send to students after they pass (not automated)</p>
                </div>
                <div className="bg-muted/50 px-5 py-3 border-b border-border">
                  <EmailRow label="To:" value="successful.student@email.com" />
                  <EmailRow label="From:" value="Qualify Pro <hello@qualifypro.com.au>" />
                  <EmailRow label="Subject:" value="Quick favour? (30 seconds)" />
                </div>
                <div className="bg-background px-5 py-5 text-sm leading-relaxed text-foreground space-y-4">
                  <p>Hey mate,</p>
                  <p>Hope business is going well since getting your license!</p>
                  <p>Would you mind leaving a quick Google review about your experience with Qualify Pro?</p>
                  <p>It really helps other tradies find us.</p>
                  <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-lg">
                    <p className="font-semibold text-emerald-700">👉 Click here to leave a review</p>
                    <p className="text-xs text-muted-foreground">(Just a sentence or two is perfect)</p>
                  </div>
                  <Sig />
                </div>
              </div>
              <WhyNote text="Your competitors have 100-400+ reviews. You need to start collecting them to compete on Google Maps." />
            </ScrollReveal>

          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default EmailTemplates;
