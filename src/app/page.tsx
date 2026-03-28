"use client";

import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  MessageSquare,
  Zap,
  Search,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  Activity,
  Layers,
  Sparkles,
  Terminal,
  BookOpen,
  Shield,
  Star,
  Users,
  Calendar,
  Clock,
  Video,
  UserCheck,
  ExternalLink,
  Play,
  ChevronLeft,
  ChevronRight,
  Slack,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type BriefTarget =
  | "employee-hero"
  | "employee-onboarding"
  | "employee-champions"
  | "employee-advocates"
  | "leadership-hero"
  | "leadership-departments"
  | "leadership-engineering"
  | "leadership-pulse";

type BriefStep = {
  id: BriefTarget;
  title: string;
  body: string;
};

type EmployeeViewProps = {
  onboardingOpen?: boolean;
  onOnboardingOpenChange?: (open: boolean) => void;
  championIndex?: number;
  onChampionIndexChange?: (index: number) => void;
  advocateFilter?: string;
  onAdvocateFilterChange?: (value: string) => void;
};

type LeadershipViewProps = {
  agentRunning: boolean;
  agentStep: number;
  onRunPulse: () => void;
  engExpanded?: boolean;
  onEngExpandedChange?: (open: boolean) => void;
  expandedDept?: number | null;
  onExpandedDeptChange?: (index: number | null) => void;
};

type FocusRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const BRIEF_STEPS: BriefStep[] = [
  {
    id: "employee-hero",
    title: "Start with the employee hub",
    body: "This is where adoption begins. Instead of dropping tools on people, the hub gives every employee one place to learn, discover wins, and understand where to start.",
  },
  {
    id: "employee-onboarding",
    title: "Enablement is structured",
    body: "The onboarding checklist turns curiosity into competence. Leadership is not funding licenses alone. It is funding a repeatable path to confident, safe usage.",
  },
  {
    id: "employee-champions",
    title: "Wins create belief",
    body: "AI Champions make the value concrete. Real stories from Finance, CX, and Product Ops show that adoption is grounded in visible outcomes, not abstract enthusiasm.",
  },
  {
    id: "employee-advocates",
    title: "Adoption spreads peer-to-peer",
    body: "Advocates are the amplification layer. They help each function learn from trusted peers so enablement becomes social, local, and durable.",
  },
  {
    id: "leadership-hero",
    title: "The same activity rolls up to leadership",
    body: "The leadership view turns grassroots usage into an executive system. It summarizes adoption health, momentum, and the signals that matter without requiring manual reporting.",
  },
  {
    id: "leadership-departments",
    title: "Outcomes are visible by team",
    body: "This is the barbell payoff. Leaders can see where AI is working, where it is lagging, and what action each department needs next.",
  },
  {
    id: "leadership-engineering",
    title: "Zoom into business proof",
    body: "Engineering makes the ROI tangible. This deep dive ties tooling adoption to PR velocity, seat utilization, and spend so the investment story is measurable.",
  },
  {
    id: "leadership-pulse",
    title: "Close the loop with field intelligence",
    body: "The AI Pulse Summary gives leadership passive visibility into wins and friction from across the org. It answers the question numbers alone cannot: what is actually happening on the ground right now?",
  },
];

const BRIEF_SELECTOR: Record<BriefTarget, string> = {
  "employee-hero": '[data-brief="employee-hero"]',
  "employee-onboarding": '[data-brief="employee-onboarding"]',
  "employee-champions": '[data-brief="employee-champions"]',
  "employee-advocates": '[data-brief="employee-advocates"]',
  "leadership-hero": '[data-brief="leadership-hero"]',
  "leadership-departments": '[data-brief="leadership-departments"]',
  "leadership-engineering": '[data-brief="leadership-engineering"]',
  "leadership-pulse": '[data-brief="leadership-pulse"]',
};

export default function AIPortal() {
  const [leadershipMode, setLeadershipMode] = useState(false);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [briefIntroOpen, setBriefIntroOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("brief") === "ceo" && params.get("autostart") !== "1";
  });
  const [briefStarted, setBriefStarted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("brief") === "ceo" && params.get("autostart") === "1";
  });
  const [briefStepIndex, setBriefStepIndex] = useState(0);

  const activeBriefStep = BRIEF_STEPS[briefStepIndex];
  const activeBriefStepId = activeBriefStep?.id;
  const briefShowsLeadership = briefStarted && activeBriefStepId?.startsWith("leadership");
  const effectiveLeadershipMode = briefStarted ? briefShowsLeadership : leadershipMode;
  const effectiveAgentRunning = briefStarted ? activeBriefStepId === "leadership-pulse" : agentRunning;
  const effectiveAgentStep = briefStarted ? (activeBriefStepId === "leadership-pulse" ? 6 : 0) : agentStep;

  // Simulate agent stream
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (agentRunning) {
      if (agentStep < 6) {
        timer = setTimeout(() => {
          setAgentStep(prev => prev + 1);
        }, 800 + Math.random() * 600); // Variable delay for realism
      }
    }
    return () => clearTimeout(timer);
  }, [agentRunning, agentStep]);

  const startBrief = () => {
    setBriefIntroOpen(false);
    setBriefStarted(true);
    setBriefStepIndex(0);
  };

  const stopBrief = () => {
    setBriefIntroOpen(false);
    setBriefStarted(false);
    setBriefStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-medium tracking-tight text-sidebar-primary">
              taskrabbit <span className="font-semibold">AI Hub</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search tools, guides..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              />
            </div>
            <Button
              variant={effectiveLeadershipMode ? "default" : "secondary"}
              className="rounded-full shadow-sm transition-all duration-300 w-[180px]"
              disabled={briefStarted}
              onClick={() => {
                setLeadershipMode(!leadershipMode);
                if (leadershipMode) {
                  setAgentRunning(false);
                  setAgentStep(0);
                }
              }}
            >
              {effectiveLeadershipMode ? "← Employee View" : "Leadership Mode →"}
            </Button>
            <Button
              variant={briefStarted ? "default" : "outline"}
              className="rounded-full shadow-sm"
              onClick={() => {
                if (briefStarted) {
                  stopBrief();
                  return;
                }

                setBriefIntroOpen(true);
              }}
            >
              {briefStarted ? "End Brief" : "Start CEO Walkthrough"}
            </Button>
            <Avatar className="h-8 w-8 ml-2 border border-border">
              <AvatarImage src="/placeholder-user.jpg" alt="@anya" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">AS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {!effectiveLeadershipMode ? (
          <EmployeeView
            onboardingOpen={briefStarted ? activeBriefStepId === "employee-onboarding" : undefined}
            championIndex={briefStarted ? (activeBriefStepId === "employee-champions" ? 1 : 0) : undefined}
            advocateFilter={briefStarted ? (activeBriefStepId === "employee-advocates" ? "Engineering" : "All") : undefined}
          />
        ) : (
          <LeadershipView
            agentRunning={effectiveAgentRunning}
            agentStep={effectiveAgentStep}
            onRunPulse={() => {
              setAgentRunning(true);
              setAgentStep(0);
            }}
            engExpanded={briefStarted ? activeBriefStepId === "leadership-engineering" : undefined}
            expandedDept={
              briefStarted
                ? activeBriefStepId === "leadership-departments" || activeBriefStepId === "leadership-engineering"
                  ? 1
                  : null
                : undefined
            }
          />
        )}
      </main>

      {briefIntroOpen ? (
        <CEOBriefIntro
          onClose={() => setBriefIntroOpen(false)}
          onStart={startBrief}
        />
      ) : null}

      {briefStarted ? (
        <CEOWalkthroughOverlay
          step={activeBriefStep}
          stepIndex={briefStepIndex}
          totalSteps={BRIEF_STEPS.length}
          onNext={() => {
            if (briefStepIndex >= BRIEF_STEPS.length - 1) {
              stopBrief();
              return;
            }

            setBriefStepIndex((current) => current + 1);
          }}
          onBack={() => setBriefStepIndex((current) => Math.max(0, current - 1))}
          onClose={stopBrief}
        />
      ) : null}
    </div>
  );
}

// ----------------------------------------------------------------------
// VIEW 1: EMPLOYEE HUB
// ----------------------------------------------------------------------

function EmployeeView({
  onboardingOpen: onboardingOpenProp,
  onOnboardingOpenChange,
  championIndex: championIndexProp,
  onChampionIndexChange,
  advocateFilter: advocateFilterProp,
  onAdvocateFilterChange,
}: EmployeeViewProps) {
  const [onboardingStep] = useState(3);
  const totalSteps = 5;
  const [localChampionIndex, setLocalChampionIndex] = useState(0);
  const [localOnboardingOpen, setLocalOnboardingOpen] = useState(false);
  const [localAdvocateFilter, setLocalAdvocateFilter] = useState("All");

  const championIndex = championIndexProp ?? localChampionIndex;
  const setChampionIndex = onChampionIndexChange ?? setLocalChampionIndex;
  const onboardingOpen = onboardingOpenProp ?? localOnboardingOpen;
  const setOnboardingOpen = onOnboardingOpenChange ?? setLocalOnboardingOpen;
  const advocateFilter = advocateFilterProp ?? localAdvocateFilter;
  const setAdvocateFilter = onAdvocateFilterChange ?? setLocalAdvocateFilter;

  const champions = [
    {
      initials: "PM", name: "Priya M.", role: "Finance", badge: "Mar 5 Power Hour",
      title: "\"How I automated 3 hours of month-end close in 10 minutes\"",
      body: "Priya used Gemini + a custom Google Apps Script to pull budget actuals, flag variances, and draft the CFO summary automatically — without touching a spreadsheet. She reduced month-end forecast prep from 4 hours to 20 minutes.",
      boldPhrase: "4 hours to 20 minutes",
    },
    {
      initials: "MT", name: "Marcus T.", role: "Customer Experience", badge: "Mar 4 Power Hour",
      title: "\"40+ extra tickets closed on our best Tuesday ever\"",
      body: "Marcus set up Gemini to draft reply templates based on ticket context. The CX team used those drafts to cut copy-paste time and close 40+ more tickets than their previous record — with no extra headcount.",
      boldPhrase: "40+ more tickets",
    },
    {
      initials: "SK", name: "Sarah K.", role: "Product Ops", badge: "Mar 2 Power Hour",
      title: "\"Vibe-coded our entire Tasker onboarding copy in one sitting\"",
      body: "Sarah prompted Gemini with TaskRabbit brand guidelines, Tasker ICP notes, and tone examples. First draft of a full onboarding email sequence landed in under 10 minutes — ready for editing, not starting from scratch.",
      boldPhrase: "under 10 minutes",
    },
  ];

  const champion = champions[championIndex];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── SECTION 1: Hero + Onboarding ── */}
      <div
        data-brief="employee-hero"
        className="rounded-2xl border border-border bg-gradient-to-br from-white to-secondary/40 p-6 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[200px] pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight mb-1">👋 Welcome back, Ania</h1>
            <p className="text-muted-foreground text-[15px] mb-5">Your AI hub for learning, tools, and what&apos;s happening across the org.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 font-medium shadow-sm gap-2">
                <BookOpen className="w-4 h-4" /> New to AI? Start the onboarding
              </Button>
              <Button className="font-medium shadow-sm gap-2">
                <Calendar className="w-4 h-4" /> Join the next Power Hour
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center min-w-[280px]" data-brief="employee-onboarding">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div
                className="p-3 border-b border-border/50 bg-secondary/20 flex justify-between items-center cursor-pointer hover:bg-secondary/40 transition-colors"
                onClick={() => setOnboardingOpen(!onboardingOpen)}
              >
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Your Onboarding</p>
                  <p className="text-sm font-medium"><span className="text-primary font-bold">{onboardingStep}/{totalSteps}</span> steps complete</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground font-medium mr-1">{Math.round((onboardingStep / totalSteps) * 100)}%</span>
                    {onboardingOpen ? <ChevronLeft className="w-4 h-4 rotate-90 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
              </div>
              <Progress value={(onboardingStep / totalSteps) * 100} className="h-1 rounded-none bg-secondary" indicatorClassName="bg-primary rounded-none" />

              {onboardingOpen && (
                <div className="p-2 bg-white animate-in slide-in-from-top-2 fade-in duration-200">
                  <div className="space-y-0.5">
                    {[
                      { title: "Read the AI @ TaskRabbit Policy", done: true },
                      { title: "Watch the 5-min intro video", done: true },
                      { title: "Log in to Gemini Enterprise", done: true },
                      { title: "Run your first agentic workflow", done: false, active: true },
                      { title: "Share a win in #ai-wins", done: false },
                    ].map((step, i) => (
                      <div key={i} className={`flex items-start gap-3 p-2 rounded-md text-sm ${step.active ? 'bg-primary/5 border border-primary/20' : 'hover:bg-secondary/50'} transition-colors cursor-pointer`}>
                        {step.done ? (
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border border-muted-foreground mt-0.5 shrink-0 ${step.active ? 'border-primary' : ''}`} />
                        )}
                        <span className={`${step.done ? 'text-muted-foreground line-through opacity-70' : step.active ? 'text-foreground font-medium' : 'text-foreground/80'}`}>
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Rotating AI Champions ── */}
      <div data-brief="employee-champions">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 text-chart-3 fill-chart-3" /> AI Champions
          </h2>
          <div className="flex items-center gap-2">
            {/* Dot indicators */}
            <div className="flex gap-1.5 mr-2">
              {champions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setChampionIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === championIndex ? 'bg-primary w-3' : 'bg-border hover:bg-muted-foreground'}`}
                  aria-label={`Champion ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="ghost" size="sm"
              className="h-7 w-7 p-0 rounded-full"
              onClick={() => setChampionIndex((championIndex - 1 + champions.length) % champions.length)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost" size="sm"
              className="h-7 w-7 p-0 rounded-full"
              onClick={() => setChampionIndex((championIndex + 1) % champions.length)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Card className="border-border shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gradient-to-br from-chart-2/10 to-primary/10 p-6 flex flex-col items-center justify-center gap-3 min-w-[180px] border-r border-border/50">
              <Avatar className="w-16 h-16 shadow-md border-2 border-white">
                <AvatarFallback className="text-lg font-bold bg-primary/20 text-primary">{champion.initials}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-sm">{champion.name}</p>
                <p className="text-xs text-muted-foreground">{champion.role}</p>
              </div>
              <Badge className="bg-chart-3/10 text-chart-3 border border-chart-3/20 font-medium text-[11px]">{champion.badge}</Badge>
            </div>
            <CardContent className="p-6 flex-1">
              <p className="text-lg font-semibold leading-snug mb-3 text-foreground">
                {champion.title}
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                {champion.body.split(champion.boldPhrase).map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && <strong className="text-foreground">{champion.boldPhrase}</strong>}</span>
                ))}
              </p>
              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline" className="gap-2 font-medium border-primary/20 text-primary hover:bg-primary/5">
                  <Play className="w-3 h-3" /> Watch the 3-min recap
                </Button>
                <Button size="sm" variant="ghost" className="gap-2 text-muted-foreground font-medium">
                  <UserCheck className="w-3.5 h-3.5" /> Request a 1:1
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* ── SECTION 2.5: AI Advocates (Amplification Loop) ── */}
      <div data-brief="employee-advocates">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-chart-2" /> Your Team&apos;s AI Advocates
          </h2>
        </div>
        <Card className="border-border shadow-sm">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-border/50 bg-secondary/10 flex flex-col justify-center">
                <h3 className="font-semibold text-sm mb-2">Want to learn more?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Advocates are your go-to peers for questions, prompt reviews, or figuring out if an AI tool can help with your specific tasks.
                </p>
                <Button variant="outline" size="sm" className="w-fit text-xs h-7 font-medium border-primary/20 text-primary">
                  Become an Advocate
                </Button>
              </div>
              <div className="p-4 md:w-2/3 flex flex-col">
                <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
                  {["All", "Engineering", "Finance", "Cust. Experience", "Product Ops"].map((dept) => (
                    <Badge
                      key={dept}
                      variant={advocateFilter === dept ? "default" : "outline"}
                      className={`cursor-pointer whitespace-nowrap transition-colors ${advocateFilter !== dept ? 'hover:bg-secondary/50 border-border text-muted-foreground font-medium' : 'shadow-sm'}`}
                      onClick={() => setAdvocateFilter(dept)}
                    >
                      {dept}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                  {[
                    { name: "Devon R.", role: "Engineering", avatar: "DR" },
                    { name: "Anita J.", role: "Finance", avatar: "AJ" },
                    { name: "Marcus T.", role: "Cust. Experience", avatar: "MT" },
                    { name: "Sarah K.", role: "Product Ops", avatar: "SK" },
                    { name: "Jason W.", role: "Engineering", avatar: "JW" },
                    { name: "Chloe M.", role: "Cust. Experience", avatar: "CM" }
                  ].filter(a => advocateFilter === "All" || a.role === advocateFilter)
                    .slice(0, 4) // Keep it to 4 visible max for layout stability
                    .map((advocate, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-secondary/30 transition-colors group">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">{advocate.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-[13px]">{advocate.name}</p>
                            <p className="text-[11px] text-muted-foreground">{advocate.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── SECTION 3: How-To Guides ── */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-chart-2" /> Quick Guides
          </h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">View all →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: "🎯", title: "Write Prompts That Actually Work", time: "5 min read", level: "Beginner", levelColor: "text-primary bg-primary/10" },
            { emoji: "⚙️", title: "Build Your First AI Workflow with Gemini", time: "15 min walkthrough", level: "Intermediate", levelColor: "text-chart-3 bg-chart-3/10" },
            { emoji: "🧑‍💻", title: "Set Up Augment in VS Code", time: "10 min setup", level: "For Engineers", levelColor: "text-chart-2 bg-chart-2/10" },
          ].map((guide, i) => (
            <Card key={i} className="border-border shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5">
                <div className="text-3xl mb-3">{guide.emoji}</div>
                <p className="font-semibold text-[13px] leading-snug mb-3 group-hover:text-primary transition-colors">{guide.title}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${guide.levelColor}`}>{guide.level}</span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {guide.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── SECTIONS 4+5: Tools strip + Policy + Power Hour ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Tools + Policy */}
        <div className="space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Approved Tools</CardTitle>
                <Button variant="ghost" size="sm" className="text-[11px] h-6 text-muted-foreground">+ Request</Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {[
                  { name: "Gemini", desc: "Chat & writing", icon: MessageSquare, tag: "Everyone" },
                  { name: "Augment", desc: "Code assist", icon: Terminal, tag: "Engineers" },
                  { name: "Figma AI", desc: "Design", icon: Layers, tag: "Design" },
                ].map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group">
                    <div className="p-2 rounded-lg bg-primary/8 text-primary">
                      <tool.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{tool.name}</p>
                      <p className="text-[11px] text-muted-foreground">{tool.desc}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{tool.tag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-chart-3/20 bg-chart-3/3 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-chart-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-1.5">AI @ TaskRabbit Policy</p>
                  <ul className="text-[12px] text-muted-foreground space-y-1.5">
                    <li className="flex gap-1.5"><CheckCircle2 className="w-3 h-3 text-primary mt-0.5 shrink-0" /> Use Gemini, Augment, Figma AI</li>
                    <li className="flex gap-1.5"><CheckCircle2 className="w-3 h-3 text-primary mt-0.5 shrink-0" /> New tools? Submit via /ai-idea first</li>
                    <li className="flex gap-1.5"><AlertCircle className="w-3 h-3 text-chart-3 mt-0.5 shrink-0" /> Never paste customer PII or Tasker data</li>
                  </ul>
                  <Button variant="ghost" size="sm" className="mt-3 h-7 text-xs text-chart-3 hover:text-chart-3/80 hover:bg-chart-3/10 gap-1.5 -ml-1">
                    <ExternalLink className="w-3 h-3" /> Read full policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Enriched Power Hour */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> AI Power Hour Feed
            </h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">All sessions →</Button>
          </div>

          {/* Upcoming session banner */}
          <div className="flex items-center justify-between bg-chart-2/8 border border-chart-2/20 rounded-xl px-5 py-3.5 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-chart-2/15 text-chart-2 p-2 rounded-lg">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Next session: <span className="text-chart-2">Mar 14</span> · &quot;Using AI for Email Triage&quot;</p>
                <p className="text-xs text-muted-foreground">50 spots available · 30 min</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-chart-2/30 text-chart-2 hover:bg-chart-2/10 font-medium shrink-0">
              Save Spot
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "How Priya automated month-end close",
                author: "Priya M.", role: "Finance", date: "Mar 5",
                stat: "4h → 20m", statLabel: "time saved",
                summary: "Used Gemini + Apps Script to pull actuals, flag variances, and draft the CFO summary automatically.",
                attendees: 45, hasRecap: true
              },
              {
                title: "AI reply drafts in the CS queue",
                author: "Marcus T.", role: "Customer Experience", date: "Mar 4",
                stat: "40+", statLabel: "extra tickets closed",
                summary: "Gemini drafts reduced copy-paste work and got the team to their best Tuesday throughput ever.",
                attendees: 38, hasRecap: true
              },
              {
                title: "Vibe-coding Tasker onboarding copy",
                author: "Sarah K.", role: "Product Ops", date: "Mar 2",
                stat: "10 min", statLabel: "to first draft",
                summary: "Prompted Gemini with brand guidelines and ICP notes to generate onboarding email copy in one pass.",
                attendees: 29, hasRecap: false
              }
            ].map((win, i) => (
              <Card key={i} className="border-border shadow-sm hover:shadow-md transition-all group">
                <CardContent className="p-4 flex gap-4">
                  <div className="bg-secondary/60 rounded-xl p-3 text-center min-w-[80px] flex flex-col items-center justify-center border border-border/50">
                    <p className="text-lg font-bold text-primary leading-tight">{win.stat}</p>
                    <p className="text-[10px] text-muted-foreground font-medium leading-tight">{win.statLabel}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] leading-snug mb-1 group-hover:text-primary transition-colors">{win.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{win.summary}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="w-4 h-4">
                          <AvatarFallback className="text-[8px] bg-primary/20 text-primary">{win.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-[11px] text-muted-foreground font-medium">{win.author} · {win.role}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">{win.attendees} attended</span>
                      {win.hasRecap && (
                        <Button variant="ghost" size="sm" className="h-6 text-[11px] text-primary hover:bg-primary/5 gap-1 font-medium ml-auto">
                          <Play className="w-3 h-3" /> Watch recap
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VIEW 2: LEADERSHIP HUB
// ----------------------------------------------------------------------

function LeadershipView({
  agentRunning,
  agentStep,
  onRunPulse,
  engExpanded: engExpandedProp,
  onEngExpandedChange,
  expandedDept: expandedDeptProp,
  onExpandedDeptChange,
}: LeadershipViewProps) {
  const [slackRefreshing, setSlackRefreshing] = useState(false);
  const [slackCardCount, setSlackCardCount] = useState(3);
  const [localEngExpanded, setLocalEngExpanded] = useState(false);
  const [localExpandedDept, setLocalExpandedDept] = useState<number | null>(null);

  const engExpanded = engExpandedProp ?? localEngExpanded;
  const setEngExpanded = onEngExpandedChange ?? setLocalEngExpanded;
  const expandedDept = expandedDeptProp ?? localExpandedDept;
  const setExpandedDept = onExpandedDeptChange ?? setLocalExpandedDept;

  const refreshSlack = () => {
    setSlackRefreshing(true);
    setSlackCardCount(3);
    let count = 3;
    const interval = setInterval(() => {
      count += 1;
      setSlackCardCount(count);
      if (count >= 6) { clearInterval(interval); setSlackRefreshing(false); }
    }, 900);
  };

  const allSlackCards = [
    { type: "positive", avatar: "DO", name: "Derek Ops", channel: "#ai-enablement", time: "2h", text: "The Gemini scheduling tool saved our Ops weekly sync 45 min. Insane 🚀" },
    { type: "negative", avatar: "JC", name: "Jasmine CX", channel: "#ai-tools-feedback", time: "4h", text: "Can we get AI reply drafts for Tasker support queue too? Only client-side right now is a gap." },
    { type: "idea", avatar: "DT", name: "Dev Team", channel: "via /ai-idea", time: "1d", text: "Auto-tag task categories in the backlog based on user description.", upvotes: 18 },
    { type: "positive", avatar: "PR", name: "Priya Finance", channel: "#ai-wins", time: "30m", text: "Month-end close went from a half-day to literally 20 minutes this cycle. CFO was floored." },
    { type: "negative", avatar: "TK", name: "Tom K.", channel: "#general", time: "5h", text: "I keep forgetting Gemini is even there. We need reminders or something in our standups." },
    { type: "positive", avatar: "SK", name: "Sarah K.", channel: "#ai-wins", time: "12h", text: "Vibe-coded an entire Tasker onboarding email sequence. First draft done in under 10min." },
  ];

  const deptOutcomes = [
    {
      dept: "Customer Support", icon: "🎧", rag: "yellow",
      status: "Progressing", goal: "15% ticket deflection via AI drafts",
      current: 9, targetVal: 15, unit: "%",
      delta: "+3pp MoM", note: "AI draft adoption up in Tier 1 queue — advocate scheduled training this month.",
      action: "→ Unlock Tasker-side reply draft tooling to close the gap."
    },
    {
      dept: "Engineering", icon: "⚙️", rag: "green",
      status: "On Track", goal: "50% of PRs AI-assisted",
      current: 38, targetVal: 50, unit: "%",
      delta: "+22% MoM", note: "Augment + Gemini Code Assist both active. PR velocity 2.3× vs. non-users.",
      action: "→ Consider expanding Augment seats — 22 idle licenses already flagged."
    },
    {
      dept: "Finance & Ops", icon: "📊", rag: "green",
      status: "On Track", goal: "4 automated reporting workflows live",
      current: 3, targetVal: 4, unit: " of 4",
      delta: "+1 this month", note: "Month-end close + variance summary live. Q1 forecast workflow in review.",
      action: "→ CFO to greenlight Q1 forecast workflow for launch."
    },
    {
      dept: "Product", icon: "🧩", rag: "red",
      status: "At Risk", goal: "80% of PMs using AI monthly",
      current: 45, targetVal: 80, unit: "%",
      delta: "flat", note: "No meaningful movement this month. AI Advocate role vacant.",
      action: "→ Assign AI Advocate for Product by end of month."
    },
    {
      dept: "Change Management", icon: "🔄", rag: "green",
      status: "On Track", goal: "AI comms on all major rollouts",
      current: 3, targetVal: 5, unit: " of 5",
      delta: "+1 this month", note: "3/5 last rollouts used AI-generated comms. Strong quality scores.",
      action: "→ Socialize template with remaining Ops leads."
    },
  ];

  const ragBg = (r: string) =>
    r === "green" ? "bg-emerald-50 border-emerald-200" : r === "yellow" ? "bg-amber-50 border-amber-200" : "bg-rose-50 border-rose-200";
  const ragText = (r: string) =>
    r === "green" ? "text-emerald-700" : r === "yellow" ? "text-amber-700" : "text-rose-700";

  // SVG ring math
  const score = 72;
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const filled = (score / 100) * circ;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

      {/* ── HEADER ── */}
      <div
        data-brief="leadership-hero"
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            CEO Executive Pulse
            <Badge variant="outline" className="ml-2 bg-primary/5 text-primary border-primary/20 font-medium">Live Data</Badge>
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">Week of Mar 3–7, 2026 · TaskRabbit AI Enablement</p>
        </div>
        {!agentRunning && agentStep === 0 ? (
          <Button onClick={onRunPulse} className="bg-chart-2 hover:bg-chart-2/90 text-white shadow-md group transition-all">
            <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Generate Weekly Pulse
          </Button>
        ) : (
          <Button disabled variant="outline" className="border-primary/20 text-primary bg-primary/5 font-medium">
            <Activity className="w-4 h-4 mr-2 animate-pulse" />
            {agentStep >= 6 ? "Synthesis Complete" : "Agent Running..."}
          </Button>
        )}
      </div>

      {agentRunning && (
        <div className="mb-8 animate-in expand-in duration-500 origin-top">
          <AgentStreamPanel step={agentStep} />
        </div>
      )}

      {/* ── HEALTH SCORE + MEMO (hero row) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Health Score ring */}
        <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background shadow-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">AI Enablement Score</p>
            {/* SVG ring */}
            <div className="relative w-36 h-36 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-border" />
                <circle
                  cx="60" cy="60" r={radius} fill="none"
                  stroke="hsl(142, 64%, 40%)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${filled} ${circ}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-foreground leading-none">{score}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">/ 100</span>
              </div>
            </div>
            <p className="text-base font-semibold text-primary mb-1">Strong · Accelerating</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[200px]">
              Score up <strong className="text-foreground">+4 pts</strong> MoM — Finance crossing 50% regular-use pushed Adoption Breadth from 68→75.
            </p>
            {/* Sub-dimensions */}
            <div className="w-full mt-5 space-y-2 text-left">
              {[
                { label: "Adoption Breadth", val: 75 },
                { label: "Usage Depth", val: 65 },
                { label: "Business Impact", val: 80 },
                { label: "Momentum", val: 72 },
              ].map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-muted-foreground font-medium">{d.label}</span>
                    <span className="font-bold">{d.val}</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${d.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editorial memo digest */}
        <Card className="lg:col-span-3 border-border shadow-sm flex flex-col">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Monthly AI Briefing</p>
              <Badge variant="outline" className="text-[9px] h-4 border-primary/20 text-primary font-semibold ml-auto">AI-Generated · Mar 6</Badge>
            </div>
            <ul className="space-y-3">
              {[
                { icon: "📈", bold: "Active users up 8% MoM", rest: "— 312 → 337 unique Gemini users this month." },
                { icon: "🏦", bold: "Finance hit 50% regular use", rest: "— first non-Eng team to cross that mark." },
                { icon: "⚠️", bold: "CX adoption stalled at 34%", rest: "— Marcus T. flagged onboarding friction in #ai-tools-feedback." },
                { icon: "⏱", bold: "Est. 568 hrs saved this month", rest: "(~$80,000 in labor value)." },
                { icon: "💡", bold: "3 new /ai-idea submissions", rest: "— top-voted: auto-tag backlog from user description (18 👍)." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed">
                  <span className="shrink-0 mt-0.5 text-base">{item.icon}</span>
                  <span><strong>{item.bold}</strong> {item.rest}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground italic mt-4 pt-3 border-t border-border/50">
              ⏱ Time savings extrapolated from Power Hour self-reports + /ai-idea submissions, cross-referenced with active-user counts.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── 3 CEO NUMBERS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Spend */}
        <Card className="border-border shadow-sm flex flex-col justify-between">
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total AI Spend</p>
              <p className="text-2xl font-black tracking-tight leading-none">$44,160<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            </div>
            <div className="mt-auto space-y-1.5 pt-2">
              {[
                { label: "Internal workflows", pct: 67, color: "bg-primary" },
                { label: "External / customer-facing", pct: 33, color: "bg-chart-2" },
              ].map((row, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-0.5 text-muted-foreground">
                    <span className="truncate mr-2">{row.label}</span><span>{row.pct}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Saved */}
        <Card className="border-primary/20 bg-primary/5 shadow-sm flex flex-col justify-between">
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Time Saved</p>
              <p className="text-2xl font-black tracking-tight text-primary leading-none">568 hrs<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            </div>
            <div className="mt-4">
              <p className="text-[11px] text-muted-foreground"><span className="text-foreground font-semibold">~$80,000</span> in labor value</p>
              <p className="text-[9px] text-muted-foreground/70 italic mt-0.5">Based on self-reports & idea backlog</p>
            </div>
          </CardContent>
        </Card>

        {/* License alert */}
        <Card className="border-chart-3/30 bg-chart-3/5 shadow-sm flex flex-col justify-between">
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-chart-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-chart-3">Savings Opp</p>
              </div>
              <p className="text-2xl font-black tracking-tight leading-none">$15,840<span className="text-sm font-normal text-muted-foreground">/yr</span></p>
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <p className="text-[11px] text-muted-foreground leading-tight flex-1">22 Augment seats<br />with <strong className="text-foreground">zero activity</strong></p>
              <Button size="sm" variant="outline" className="text-[10px] h-6 px-2 font-semibold border-chart-3/20 text-chart-3 hover:bg-chart-3/10 shrink-0">
                Reclaim Seats
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── TWO-PANE: DEPT OUTCOMES + FROM THE FIELD ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Department AI Outcomes (RAG) */}
        <div className="lg:col-span-2" data-brief="leadership-departments">
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Department AI Outcomes
                </CardTitle>
                <Badge variant="outline" className="text-[10px] font-semibold border-primary/20 text-primary">Q1 2026</Badge>
              </div>
              <CardDescription className="mt-1">Click any row to see detail + recommended action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {deptOutcomes.map((dept, i) => (
                <div key={i}>
                  {/* RAG row */}
                  <button
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left hover:shadow-sm ${expandedDept === i
                      ? ragBg(dept.rag) + ' border-transparent'
                      : dept.rag === 'green' ? 'bg-primary/5 border-primary/10 hover:bg-primary/10'
                        : dept.rag === 'yellow' ? 'bg-amber-500/5 border-amber-500/10 hover:bg-amber-500/10'
                          : 'bg-chart-3/5 border-chart-3/10 hover:bg-chart-3/10'
                      }`}
                    onClick={() => setExpandedDept(expandedDept === i ? null : i)}
                  >
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${ragBg(dept.rag)} ${ragText(dept.rag)} shrink-0 border border-current/10 w-[72px] text-center uppercase tracking-wider`}>
                      {dept.status}
                    </span>
                    <span className="text-lg shrink-0 ml-1">{dept.icon}</span>
                    <div className="flex-1 min-w-0 ml-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold">{dept.dept}</p>
                      </div>
                      <p className="text-[12px] text-muted-foreground truncate">{dept.goal}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[12px] font-bold">{dept.current}{dept.unit}</p>
                      <p className="text-[10px] text-muted-foreground">of {dept.targetVal}{dept.unit}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ml-1 ${expandedDept === i ? 'rotate-90' : ''}`} />
                  </button>
                  {/* Expanded detail */}
                  {expandedDept === i && (
                    <div className={`mx-2 px-4 py-3 rounded-b-xl border border-t-0 ${ragBg(dept.rag)} animate-in fade-in duration-200`}>
                      <Progress
                        value={(dept.current / dept.targetVal) * 100}
                        className="h-1.5 bg-white/60 mb-2"
                        indicatorClassName={dept.rag === 'green' ? 'bg-emerald-500' : dept.rag === 'yellow' ? 'bg-amber-400' : 'bg-rose-500'}
                      />
                      <p className="text-[11px] text-foreground/80 leading-relaxed mb-1.5">{dept.note}</p>
                      <p className={`text-[11px] font-semibold ${ragText(dept.rag)}`}>{dept.action}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Δ {dept.delta}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: From the Field */}
        <div>
          <Card className="border-border shadow-sm h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-border/50 bg-secondary/10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Slack className="w-5 h-5 text-chart-2" />
                    From the Field
                  </CardTitle>
                  <CardDescription className="mt-0.5 flex items-center gap-1">
                    Passive sentiment <span className="text-muted-foreground/50 mx-1">•</span> No surveys
                  </CardDescription>
                </div>
                <Button
                  size="sm" variant="outline"
                  className="text-xs h-7 gap-1.5 font-medium border-chart-2/20 text-chart-2 hover:bg-chart-2/10 shrink-0 mt-0.5"
                  onClick={refreshSlack} disabled={slackRefreshing}
                >
                  {slackRefreshing ? <Activity className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                  {slackRefreshing ? 'Scanning...' : 'Refresh'}
                </Button>
              </div>
              {slackRefreshing && (
                <div className="mt-2 text-[10px] font-mono text-muted-foreground bg-secondary/30 rounded-lg px-3 py-2 space-y-1 animate-in fade-in duration-300">
                  <p className="text-chart-2 font-semibold">→ agent scanning channels...</p>
                  <p>↳ reading #ai-enablement (142 messages)</p>
                  <p>↳ reading #ai-wins (38 messages)</p>
                  {slackCardCount >= 4 && <p>↳ reading #ai-tools-feedback (29 messages)</p>}
                  {slackCardCount >= 5 && <p>↳ reading #general (filtering for AI keywords)</p>}
                  {slackCardCount >= 6 && <p className="text-primary font-semibold">✓ extracted {slackCardCount} signals</p>}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0 flex-1 bg-background/50">
              <ScrollArea className="h-full min-h-[400px]">
                <div className="p-4 space-y-3">
                  {allSlackCards.slice(0, slackCardCount).map((card, i) => (
                    <div
                      key={i}
                      className={`group flex items-start gap-3 p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-300
                        ${card.type === 'negative'
                          ? 'bg-chart-3/5 border-l-4 border-l-chart-3 border-y border-r border border-chart-3/20'
                          : card.type === 'idea'
                            ? 'bg-chart-2/5 border border-chart-2/20'
                            : 'bg-primary/5 border border-primary/20'}`}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {card.type === 'idea' ? (
                        <div className="flex flex-col items-center justify-center min-w-[32px] mt-0.5">
                          <Lightbulb className="w-5 h-5 text-chart-2" />
                          <span className="text-[8px] font-extrabold text-chart-2 mt-0.5">IDEA</span>
                        </div>
                      ) : (
                        <Avatar className="w-9 h-9 mt-0.5 shrink-0 border border-current/10">
                          <AvatarFallback className={`text-[11px] font-bold ${card.type === 'negative' ? 'bg-white text-chart-3' : 'bg-white text-primary'}`}>
                            {card.avatar}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[13px] font-bold text-foreground/90">{card.name}</span>
                          <span className="text-[10px] text-muted-foreground bg-white/50 px-1.5 py-0.5 rounded font-mono border border-current/5">{card.channel}</span>
                          <span className="text-[10px] text-muted-foreground ml-auto group-hover:hidden">{card.time}</span>
                          <a href="#" className="hidden group-hover:flex ml-auto text-[10px] items-center gap-1 text-chart-2 hover:underline">
                            View <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className={`text-[13px] leading-relaxed font-medium ${card.type === 'negative' ? 'text-chart-3/90' : card.type === 'idea' ? 'text-chart-2/90' : 'text-primary/90'
                          }`}>{card.text}</p>
                        {card.type === 'idea' && 'upvotes' in card && (
                          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-chart-2 bg-chart-2/10 w-fit px-2 py-0.5 rounded-full">
                            <ThumbsUp className="w-3 h-3" /> {card.upvotes} upvotes
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── ENGINEERING DEEP DIVE (collapsible) ── */}
      <div data-brief="leadership-engineering">
        <button
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors text-left"
          onClick={() => setEngExpanded(!engExpanded)}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-chart-2" />
            <span className="text-sm font-semibold">Engineering Deep Dive</span>
            <span className="text-[10px] text-muted-foreground font-medium">PR velocity, coding agents, spend/head</span>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${engExpanded ? 'rotate-90' : ''}`} />
        </button>

        {engExpanded && (
          <div className="mt-3 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "Avg Spend / Head", value: "$480", sub: "per month", delta: "-12%", deltaPos: true },
                { title: "Engineers Using AI", value: "64 / 92", sub: "70% of eng team", delta: "+6", deltaPos: true },
                { title: "Non-Eng Coding Agent Users", value: "31 / 58", sub: "Product · Design · Analytics", delta: "+9", deltaPos: true },
                { title: "AI-Assisted PRs", value: "38%", sub: "of all PRs merged", delta: "+22%", deltaPos: true },
              ].map((m, i) => (
                <Card key={i} className="border-border shadow-sm">
                  <CardContent className="p-4">
                    <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider mb-2 leading-tight">{m.title}</p>
                    <div className="flex items-baseline gap-1.5">
                      <h4 className="text-xl font-bold tracking-tight">{m.value}</h4>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${m.deltaPos ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                        {m.deltaPos ? '↑' : '↓'} {m.delta}
                      </span>
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-1">{m.sub}</p>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-primary/30 bg-primary/5 shadow-sm">
                <CardContent className="p-4 flex flex-col justify-center h-full">
                  <p className="text-[9px] font-medium text-primary/70 uppercase tracking-wider mb-1">PR Velocity</p>
                  <p className="text-2xl font-black text-primary">2.3×</p>
                  <p className="text-[9px] text-primary/80 font-semibold leading-tight mt-1">AI vs non-users<br />4.1 vs 1.8 PRs/wk</p>
                </CardContent>
              </Card>
            </div>
            {/* Spend breakdown */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Monthly Token Spend Breakdown</p>
                  <span className="text-sm font-bold">$44,160 <span className="text-[10px] font-normal text-muted-foreground">/ month</span></span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Internal Workflows", detail: "dev tooling, ops automation, reporting", spend: 29700, pct: 67, color: "bg-primary" },
                    { label: "External / Customer-Facing", detail: "Tasker matching, support reply drafts", spend: 14460, pct: 33, color: "bg-chart-2" },
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-[12px] font-semibold">{row.label}</span>
                          <span className="text-[10px] text-muted-foreground ml-2">{row.detail}</span>
                        </div>
                        <span className="text-[11px] font-bold">${(row.spend / 1000).toFixed(1)}k <span className="text-muted-foreground font-normal">({row.pct}%)</span></span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

    </div>
  );
}

function CEOBriefIntro({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <Card className="w-full max-w-2xl border-primary/20 shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary font-medium">
                CEO Brief Mode
              </Badge>
              <CardTitle className="text-2xl tracking-tight">A guided walkthrough of the TaskRabbit AI Enablement prototype</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                This walkthrough shows the full barbell strategy: bottom-up adoption through the employee hub, and top-down visibility through the leadership dashboard.
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { title: "Guide employees", body: "Show the structure behind onboarding, champions, and advocates." },
              { title: "Roll up impact", body: "Connect local activity to executive visibility and measurable outcomes." },
              { title: "Close the loop", body: "Show how leadership sees wins and friction from the field in one place." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-secondary/20 p-4">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border/60 pt-5">
          <p className="text-xs text-muted-foreground">About 90 seconds. You can skip any time.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>Explore Freely</Button>
            <Button onClick={onStart} className="shadow-sm">Start Walkthrough</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function CEOWalkthroughOverlay({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onBack,
  onClose,
}: {
  step: BriefStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const [focusRect, setFocusRect] = useState<FocusRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      const target = document.querySelector(BRIEF_SELECTOR[step.id]);

      if (!(target instanceof HTMLElement)) {
        setFocusRect(null);
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });

      const rect = target.getBoundingClientRect();
      const padding = 14;

      setFocusRect({
        top: Math.max(12, rect.top - padding),
        left: Math.max(12, rect.left - padding),
        width: Math.min(window.innerWidth - 24, rect.width + padding * 2),
        height: Math.min(window.innerHeight - 24, rect.height + padding * 2),
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [step.id]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {focusRect ? (
        <div
          className="absolute rounded-[28px] border border-primary/40 shadow-[0_0_0_9999px_rgba(10,14,12,0.62)] transition-all duration-500"
          style={{
            top: focusRect.top,
            left: focusRect.left,
            width: focusRect.width,
            height: focusRect.height,
            boxShadow: "0 0 0 9999px rgba(10,14,12,0.62), 0 0 0 1px rgba(71, 169, 92, 0.28), 0 16px 60px rgba(0, 0, 0, 0.32)",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-black/60" />
      )}

      <Card className="pointer-events-auto absolute bottom-6 right-6 w-[420px] max-w-[calc(100vw-2rem)] border-primary/20 shadow-2xl">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Step {stepIndex + 1} of {totalSteps}
              </p>
              <CardTitle className="text-xl leading-tight">{step.title}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            {step.body}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
          <Button variant="ghost" onClick={onClose}>Skip</Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onBack} disabled={stepIndex === 0}>
              Back
            </Button>
            <Button onClick={onNext}>
              {stepIndex === totalSteps - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENT: AGENT STREAM PANEL
// ----------------------------------------------------------------------

function AgentStreamPanel({ step }: { step: number }) {
  const isComplete = step >= 6;

  if (isComplete) {
    return (
      <Card
        data-brief="leadership-pulse"
        className="border-primary/30 shadow-xl shadow-primary/5 bg-gradient-to-br from-card to-primary/[0.02] animate-in zoom-in-95 duration-400"
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-primary" />
              Monthly AI Pulse Summary
            </CardTitle>
            <span className="text-[11px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-1 rounded">Generated Just Now</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-[14px] leading-relaxed">
            <strong className="text-foreground">Adoption is accelerating, but training gaps remain.</strong> Gemini MAU grew 6% this month, largely driven by adoption in Finance and early testing in CX. Token spend remains highly efficient at 61% of budget, indicating we have headroom to scale Augment licenses for engineering.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
              <h4 className="text-[10px] font-bold text-chart-3 uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" /> Needs Attention
              </h4>
              <ul className="text-[13px] space-y-3">
                <li className="flex gap-2.5 items-start">
                  <span className="text-chart-3 mt-1 text-[10px]">●</span>
                  <span className="leading-relaxed"><strong className="font-semibold text-foreground">CX Bot Parity:</strong> Friction flagged around AI reply drafts missing in Tasker support queue (3 complaints).</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-chart-3/50 mt-1 text-[10px]">●</span>
                  <span className="leading-relaxed text-muted-foreground"><strong className="font-semibold text-foreground">Procurement Block:</strong> 2 critical tool reviews (Perplexity, Runway) are stalled in InfoSec.</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
              <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> Strategic Wins
              </h4>
              <ul className="text-[13px] space-y-3">
                <li className="flex gap-2.5 items-start">
                  <span className="text-primary mt-1 text-[10px]">●</span>
                  <span className="leading-relaxed"><strong className="font-semibold text-foreground">Finance ROI:</strong> Month-end forecast prep reduced from 4h to 20m. Recommend surfacing at All Hands.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-primary/50 mt-1 text-[10px]">●</span>
                  <span className="leading-relaxed text-muted-foreground"><strong className="font-semibold text-foreground">Idea Pipeline:</strong> Dev team proposal for auto-tagging backlog has strong validation (18 upvotes).</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border/50">
            <Button variant="outline" size="sm" className="font-medium">Export Report</Button>
            <Button size="sm" className="font-medium shadow-sm">
              <MessageSquare className="w-4 h-4 mr-2" /> Share to #slt-updates
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-[#0F1A0C] text-[#E0E0E0] font-mono text-xs sm:text-[13px] p-6 rounded-xl border border-primary/30 shadow-2xl shadow-primary/10 overflow-hidden relative min-h-[280px]">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 animate-pulse"></div>

      <div className="flex items-center gap-2 mb-5 text-primary font-semibold border-b border-primary/20 pb-3 tracking-tight">
        <Zap className="w-4 h-4 animate-pulse" /> [AI PULSE AGENT] — Initializing Monthly Synthesis Module...
      </div>

      <div className="space-y-5">
        {/* Step 1 */}
        {step >= 1 && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-blue-400">🔌</span> Connecting to Google Workspace Admin API...
            </div>
            <div className="pl-6 mt-1.5 space-y-1.5 text-gray-400">
              <div className="flex gap-2"><span className="text-primary">✓</span> Retrieved Gemini login events: 942 unique users (last 30 days)</div>
              <div className="flex gap-2"><span className="text-primary">✓</span> Identified 86 first-time users this month</div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step >= 2 && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-purple-400">📨</span> Scanning Slack: #ai-enablement, #ai-wins, #ai-tools-feedback...
            </div>
            <div className="pl-6 mt-1.5 space-y-1.5 text-gray-400">
              <div className="flex gap-2"><span className="text-primary">✓</span> Indexed 3,847 messages from the last 30 days</div>
              <div className="flex gap-2"><span className="text-primary">✓</span> 23 messages flagged: positive sentiment</div>
              <div className="flex gap-2"><span className="text-[#F5A623]">⚠</span> 4 friction signals detected (scheduling, CS parity)</div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-[#50AF33]">📊</span> Querying token usage (BigQuery: ai_usage.monthly_rollup)...
            </div>
            <div className="pl-6 mt-1.5 space-y-2 text-gray-400 grid grid-cols-2 gap-x-4 max-w-[400px]">
              <div className="flex items-center gap-1.5 group hover:text-white transition-colors"><span className="text-primary group-hover:animate-pulse">✓</span> Eng: 8.4M → $1,680</div>
              <div className="flex items-center gap-1.5 group hover:text-white transition-colors"><span className="text-primary group-hover:animate-pulse">✓</span> Prod: 7.2M → $1,440</div>
              <div className="flex items-center gap-1.5 group hover:text-white transition-colors"><span className="text-primary group-hover:animate-pulse">✓</span> CX: 3.7M → $740</div>
              <div className="flex items-center gap-1.5 group hover:text-white transition-colors font-medium border-t border-gray-700 pt-1 mt-1"><span className="text-primary">✓</span> Total: $19,360 / $32,000</div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step >= 4 && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-orange-400">🔗</span> Cross-referencing signals and detecting patterns...
            </div>
            <div className="pl-6 mt-1.5 space-y-1.5 text-gray-400">
              <div>→ Adoption trend: <span className="text-white">↑ MAU +6% (consistent 4-month climb)</span></div>
              <div>→ Friction hotspot: <span className="text-[#F5A623]">CS bot parity intent (3 complaints)</span></div>
              <div>→ Spend efficiency: <span className="text-white">Eng tokens ↑ but PR velocity ↑ 18%</span></div>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step >= 5 && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300 mt-6 border-t border-[#50AF33]/20 pt-4">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="text-primary animate-bounce">✍️</span> Generating executive summary...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
