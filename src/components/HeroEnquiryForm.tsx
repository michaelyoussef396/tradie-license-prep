import { useId, useRef, useState, type Ref } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackContactFormStart, trackContactFormSubmit, trackLeadConversion } from "@/lib/analytics";
import { EXPERIENCE_OPTIONS, UNDER_MINIMUM_EXPERIENCE, getUnderMinimumNote } from "@/data/eligibility";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRADES = ["Carpenter", "Bricklayer", "Plumber", "Electrician", "Concreter", "Roof Tiler", "Other"];

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .email("Please enter a valid email address")
  .max(255, "Email is too long");

interface HeroEnquiryFormProps {
  /** Hidden source field value stored on the lead, identifying the page it came from. */
  source?: string;
  title?: string;
  /** Receives the first-name input, for a button that scrolls to the form and focuses it. */
  firstFieldRef?: Ref<HTMLInputElement>;
}

const HeroEnquiryForm = ({ source = "hero-eligibility-form", title, firstFieldRef }: HeroEnquiryFormProps) => {
  // A page can carry several of these forms (/builder-registration-course-melbourne and
  // /bpc-exam-changes have three), so every id is unique to this form. useId gives the same
  // ids in the prerendered HTML and on hydration. Reach a form through a wrapper id or
  // firstFieldRef, never through these ids.
  const uid = useId();
  const ids = {
    firstName: `${uid}first-name`,
    phone: `${uid}phone`,
    email: `${uid}email`,
    emailError: `${uid}email-error`,
    trade: `${uid}trade`,
    experience: `${uid}experience`,
  };
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedRef = useRef(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [trade, setTrade] = useState("");
  const [experience, setExperience] = useState("");

  const touch = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackContactFormStart();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim()) return;
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      setEmailError(parsedEmail.error.errors[0]?.message ?? "Please enter a valid email address");
      return;
    }
    setEmailError(null);
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: firstName.trim(),
        email: parsedEmail.data,
        phone: phone.trim(),
        license_type: trade || null,
        years_experience: experience || null,
        message: null,
        source,
        status: "new",
      });
      if (error) throw error;

      supabase.functions
        .invoke("send-lead-emails", {
          body: {
            name: firstName.trim(),
            email: parsedEmail.data,
            phone: phone.trim(),
            licenseType: trade || "",
            message: `Trade: ${trade || "n/a"} | Years experience: ${experience || "n/a"}`,
            referralCode: "",
          },
        })
        .catch((err) => console.error("Email send failed:", err));

      trackContactFormSubmit({
        license_type: trade || "not specified",
        years_experience: experience || "not specified",
        source,
      });
      trackLeadConversion();
      navigate("/thank-you");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please call us on 0411 626 398.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
      <div className="relative bg-white rounded-2xl p-5 sm:p-7 shadow-2xl">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          {title ?? "Check Your Eligibility — Free, No Obligation"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label htmlFor={ids.firstName} className="block text-sm font-medium text-gray-700 mb-1">
              First name *
            </label>
            <Input
              id={ids.firstName}
              ref={firstFieldRef}
              type="text"
              required
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => { touch(); setFirstName(e.target.value); }}
              className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor={ids.phone} className="block text-sm font-medium text-gray-700 mb-1">
              Phone number *
            </label>
            <Input
              id={ids.phone}
              type="tel"
              required
              placeholder="04XX XXX XXX"
              value={phone}
              onChange={(e) => { touch(); setPhone(e.target.value); }}
              className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor={ids.email} className="block text-sm font-medium text-gray-700 mb-1">
              Email address *
            </label>
            <Input
              id={ids.email}
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? ids.emailError : undefined}
              onChange={(e) => { touch(); setEmail(e.target.value); if (emailError) setEmailError(null); }}
              onBlur={() => {
                if (!email.trim()) return;
                const r = emailSchema.safeParse(email);
                setEmailError(r.success ? null : r.error.errors[0]?.message ?? null);
              }}
              className={`h-12 text-base focus:border-blue-500 focus:ring-blue-500 ${emailError ? "border-red-500" : "border-gray-200"}`}
            />
            {emailError && (
              <p id={ids.emailError} className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div>
            <label htmlFor={ids.trade} className="block text-sm font-medium text-gray-700 mb-1">Your trade</label>
            <Select value={trade} onValueChange={(v) => { touch(); setTrade(v); }}>
              <SelectTrigger id={ids.trade} className="h-12 text-base border-gray-200">
                <SelectValue placeholder="Select your trade" />
              </SelectTrigger>
              <SelectContent>
                {TRADES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor={ids.experience} className="block text-sm font-medium text-gray-700 mb-1">
              Years of experience
            </label>
            <Select value={experience} onValueChange={(v) => { touch(); setExperience(v); }}>
              <SelectTrigger id={ids.experience} className="h-12 text-base border-gray-200">
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_OPTIONS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y === UNDER_MINIMUM_EXPERIENCE ? "Under 3 years" : `${y} years`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {experience === UNDER_MINIMUM_EXPERIENCE && (
              <p className="mt-1 text-xs text-amber-700">{getUnderMinimumNote()}</p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold shadow-lg shadow-blue-500/25 group"
          >
            {isSubmitting ? "Sending..." : "Send My Enquiry"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroEnquiryForm;
