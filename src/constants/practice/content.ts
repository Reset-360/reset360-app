// =============================================================================
// reset360Content.ts
//
// All content for the Reset360 self-regulation tool.
// Each technique has a universal version + per-userType contextual framing.
//
// Techniques:
//   breathing       — Paced breathing / box breathing
//   grounding       — 5-4-3-2-1 senses
//   reframing       — Cognitive reframing / thought challenging
//   bodyscan        — Progressive muscle relaxation / body scan
//   journaling      — Guided journaling prompts
// =============================================================================

import { EClientSegment } from '@/types/client';

export type TechniqueId = "breathing" | "grounding" | "reframing" | "bodyscan" | "journaling";

export interface TechniqueStep {
  instruction: string;
  duration?: string; // e.g. "4 seconds", "1 minute"
}

export interface TechniqueContent {
  id: TechniqueId;
  title: string;
  tagline: string;
  icon: string; // emoji used as visual anchor
  duration: string; // total estimated time
  bestFor: string; // when to use this
  intro: string;
  steps: TechniqueStep[];
  closing: string;
  tip: string;
}

export interface UserTypeContent {
  label: string;
  greeting: string;
  pageIntro: string;
  contextualTips: Record<TechniqueId, string>; // extra framing for this user type
}

// ── Technique content (universal) ────────────────────────────────────────────

export const TECHNIQUES: TechniqueContent[] = [
  {
    id: "breathing",
    title: "Paced Breathing",
    tagline: "Slow your nervous system in under 3 minutes.",
    icon: "🌬",
    duration: "3–5 min",
    bestFor: "Panic, racing heart, sudden anxiety, before a stressful event",
    intro:
      "When anxiety spikes, your breathing becomes shallow and fast — which actually signals your brain to stay in panic mode. Deliberately slowing your exhale activates your parasympathetic nervous system, the part responsible for rest and calm. This is one of the fastest evidence-based tools available for nervous system regulation.",
    steps: [
      { instruction: "Find a comfortable position — seated or lying down. Gently close your eyes or soften your gaze downward.", duration: "30 seconds" },
      { instruction: "Place one hand on your chest and one on your belly. For now, just notice your natural breath without changing anything.", duration: "30 seconds" },
      { instruction: "Inhale slowly through your nose for 4 counts. Feel your belly rise first, then your chest.", duration: "4 seconds" },
      { instruction: "Hold gently at the top for 2 counts. No strain — just a soft pause.", duration: "2 seconds" },
      { instruction: "Exhale slowly through your mouth for 6 counts. Let your belly fall first, then your chest. The longer exhale is what signals calm.", duration: "6 seconds" },
      { instruction: "Repeat this cycle 6–8 times. If your mind wanders, that is normal — just return your attention to counting.", duration: "2–3 minutes" },
      { instruction: "When you are ready, take one natural breath and slowly open your eyes. Notice how your body feels compared to when you started.", duration: "30 seconds" },
    ],
    closing:
      "Even one round of slow breathing changes the chemistry of your stress response. The more consistently you practise this — not just in moments of crisis — the faster it works when you need it most.",
    tip: "Set a daily reminder to do one round of paced breathing before a predictably stressful part of your day. Over time, your nervous system learns to associate that moment with calm.",
  },

  {
    id: "grounding",
    title: "5-4-3-2-1 Grounding",
    tagline: "Come back to the present moment through your senses.",
    icon: "🌿",
    duration: "3–5 min",
    bestFor: "Overwhelm, dissociation, intrusive thoughts, feeling 'out of your body'",
    intro:
      "Anxiety pulls your mind into the future — imagining worst-case scenarios that haven't happened yet. Grounding exercises use your five senses to anchor your attention to what is real and present right now. This technique interrupts the anxiety spiral by giving your brain concrete, immediate sensory information to process instead.",
    steps: [
      { instruction: "Pause wherever you are. You can do this standing, sitting, or lying down. Take one slow breath to begin." },
      { instruction: "Look around and name 5 things you can see. Say them silently or out loud. Be specific — not just 'a chair' but 'a blue plastic chair with a small scratch on the left leg'.", duration: "1 minute" },
      { instruction: "Notice 4 things you can physically feel. The weight of your feet on the floor. The texture of your clothes. The temperature of the air. The pressure of wherever you are sitting.", duration: "45 seconds" },
      { instruction: "Listen for 3 things you can hear. They can be nearby or distant — traffic, an air conditioner, your own breathing, voices, birds.", duration: "30 seconds" },
      { instruction: "Identify 2 things you can smell. If nothing is immediate, think of a scent you find calming and imagine it.", duration: "20 seconds" },
      { instruction: "Notice 1 thing you can taste. A faint taste in your mouth, a recent drink, anything at all.", duration: "10 seconds" },
      { instruction: "Take two slow breaths. Remind yourself: you are here, you are safe in this moment, and this feeling will pass.", duration: "30 seconds" },
    ],
    closing:
      "Anxiety lives in the future. Your senses only exist in the present. Every time you use this technique, you are training your brain to find safety in the here and now.",
    tip: "You can do a shortened version anywhere — even just the '5 things I can see' step takes 30 seconds and meaningfully interrupts an anxiety spiral.",
  },

  {
    id: "reframing",
    title: "Cognitive Reframing",
    tagline: "Challenge the thoughts feeding your stress.",
    icon: "🔄",
    duration: "5–10 min",
    bestFor: "Worry, self-criticism, catastrophic thinking, feeling stuck in a negative loop",
    intro:
      "Our thoughts are not facts — they are interpretations. When anxiety or low mood is high, our brains default to the most threatening interpretation of any situation. Cognitive reframing is the practice of examining those automatic thoughts, questioning their accuracy, and finding a perspective that is more balanced and useful. This is not about forced positivity — it is about thinking more accurately.",
    steps: [
      { instruction: "Write down (or say aloud) the thought that is causing you distress. Be as specific as possible. Example: 'I am going to fail this and everyone will think I'm incompetent.'" },
      { instruction: "Ask: What is the evidence FOR this thought? List only concrete facts — not feelings or assumptions.", duration: "2 minutes" },
      { instruction: "Ask: What is the evidence AGAINST this thought? What has happened before that contradicts it? What would a fair observer say?", duration: "2 minutes" },
      { instruction: "Ask: Am I confusing a feeling with a fact? ('I feel like a failure' is different from 'I am a failure.')" },
      { instruction: "Ask: What is the most realistic outcome here — not the best, not the worst, but the most likely?" },
      { instruction: "Ask: If a close friend came to me with this exact thought, what would I say to them?" },
      { instruction: "Write a reframed version of the original thought — one that is honest, balanced, and more useful. Example: 'This is hard and I'm worried, but I have prepared and I've gotten through difficult things before.'" },
    ],
    closing:
      "You will not always be able to think your way out of distress. But practising this regularly builds a habit of questioning automatic negative thoughts rather than accepting them as truth.",
    tip: "Keep a small notebook or use your phone's notes app to write down recurrent anxious thoughts. Patterns become visible over time, and visible patterns are easier to challenge.",
  },

  {
    id: "bodyscan",
    title: "Body Scan & Release",
    tagline: "Locate where you are holding tension and let it go.",
    icon: "🫀",
    duration: "8–12 min",
    bestFor: "Physical tension, difficulty sleeping, chronic stress, emotional numbness",
    intro:
      "Stress and anxiety are not just mental — they live in your body as physical tension, particularly in the jaw, shoulders, chest, and stomach. A body scan brings deliberate, non-judgmental attention to each part of your body in sequence, noticing tension without trying to force it away. The act of noticing is itself often enough to release it.",
    steps: [
      { instruction: "Lie down or sit in a comfortable chair. Close your eyes. Take three slow, deep breaths to begin.", duration: "1 minute" },
      { instruction: "Bring your attention to the top of your head and your scalp. Notice any sensation — tingling, tightness, or nothing at all. You are not trying to change anything, just noticing.", duration: "30 seconds" },
      { instruction: "Move your attention slowly down to your forehead, eyes, jaw, and neck. Many people hold significant tension in their jaw — if you notice tightness, gently unclench and let your tongue drop from the roof of your mouth.", duration: "1 minute" },
      { instruction: "Shift to your shoulders and upper back. Let them drop away from your ears. Notice if they were raised without you realising.", duration: "1 minute" },
      { instruction: "Move down to your arms, hands, and fingers. With each exhale, imagine tension flowing down your arms and out through your fingertips.", duration: "1 minute" },
      { instruction: "Bring attention to your chest and stomach. Notice your breathing here. If there is tightness or a feeling of weight, breathe into it gently — not to fix it, just to acknowledge it.", duration: "2 minutes" },
      { instruction: "Move down to your lower back, hips, and pelvis — an area that often holds stress without us noticing. Let the weight of your hips sink into the surface below you.", duration: "1 minute" },
      { instruction: "Continue down to your legs, knees, calves, and feet. Flex your toes gently and release. Notice the sensation of the ground or floor beneath your feet.", duration: "1 minute" },
      { instruction: "Now take a full breath and, as you exhale, imagine releasing any remaining tension from the top of your head all the way to the soles of your feet. Rest here for a moment before slowly opening your eyes.", duration: "2 minutes" },
    ],
    closing:
      "The body scan is most effective when done regularly — especially before sleep. Over time, you will become more attuned to where you carry tension, and release it earlier before it accumulates.",
    tip: "If you fall asleep during a body scan, that is not failure — it means your nervous system felt safe enough to let go. For a more alert version, try it seated rather than lying down.",
  },

  {
    id: "journaling",
    title: "Guided Journaling",
    tagline: "Process what you are carrying by putting it into words.",
    icon: "📓",
    duration: "10–15 min",
    bestFor: "Processing difficult emotions, low mood, worry, feeling overwhelmed or stuck",
    intro:
      "Writing about what you are experiencing externalises your thoughts — it moves them from a swirling internal loop onto a page where you can see them more clearly. Research consistently shows that expressive writing reduces emotional distress, improves mood, and helps people make sense of difficult experiences. You do not need to write well. You just need to write honestly.",
    steps: [
      { instruction: "Find a quiet space where you will not be interrupted for 10–15 minutes. Use paper or a private notes app — whichever feels more honest." },
      { instruction: "Start with: 'Right now I am feeling...' and write without stopping for 2 minutes. Do not edit, correct, or judge what comes out. Let it be messy.", duration: "2 minutes" },
      { instruction: "Then write: 'The thing that is most on my mind right now is...' Go deeper than the surface. What is underneath the surface worry?", duration: "3 minutes" },
      { instruction: "Write: 'If I am completely honest with myself, what I really need right now is...' This might surprise you.", duration: "2 minutes" },
      { instruction: "Write: 'One small thing I can do today that would help me feel even slightly better is...' Keep it realistic and within your control.", duration: "2 minutes" },
      { instruction: "Finally, write: 'Something I want to remember about getting through hard moments is...' This is for a future version of you who needs the reminder.", duration: "2 minutes" },
      { instruction: "When you are done, close the notebook or app. You do not have to read it back. The act of writing it was enough." },
    ],
    closing:
      "You do not need to solve everything in a journal entry. The goal is simply to move what is internal and overwhelming into an external form where it has less power over you.",
    tip: "Keep a dedicated journal — physical or digital — and date each entry. Reading back over past entries during calmer moments often reveals how much you have already moved through.",
  },
];

// ── Per user-type content ─────────────────────────────────────────────────────

export const USER_TYPE_CONTENT: Record<EClientSegment, UserTypeContent> = {
  [EClientSegment.STUDENT]: {
    label: "Students",
    greeting: "this is your space to slow down.",
    pageIntro:
      "School can feel overwhelming at times, with exams, friendships, family expectations, and figuring out who you are. These tools are not here to fix you. They are here to support you, to help you handle big emotions when they feel too much, so they do not take over your day.",
    contextualTips: {
      breathing:
        "Try this before an exam, a presentation, or anytime your heart starts racing in class. You can do the longer exhale version quietly at your desk and no one will even notice.",
      grounding:
        "If your thoughts keep spiraling during class or before sleep, this can help you reset quickly. The 5 things you see step is simple and works even in a busy hallway.",
      reframing:
        "Thoughts like 'everyone will judge me', 'I am going to fail', or 'I am not as smart as others' are very common. They can feel real, but they are often not accurate. This technique helps you gently question them.",
      bodyscan:
        "If you feel tension in your shoulders or stomach after a long day, try this while lying in bed. It helps your body relax even when your mind is still active.",
      journaling:
        "This is just for you. You do not have to share it with anyone. Write honestly about what you feel, not the version you show others.",
    },
  },

  [EClientSegment.INDIVIDUAL]: {
    label: "College Students & Young Adults",
    greeting: "this space is for the part of you that feels like it has been going too fast.",
    pageIntro:
      "Being a young adult often means navigating a lot at once, like academic pressure, independence, identity, relationships, and an uncertain future. It can feel like you are expected to handle everything without support. These tools are most helpful when used regularly, not just in difficult moments. They are a way to take care of your nervous system over time.",
    contextualTips: {
      breathing:
        "Before a difficult conversation, a big presentation, or when anxiety makes it hard to sleep, this can help. Slowing your exhale supports your nervous system in calming down.",
      grounding:
        "When everything feels overwhelming, grounding helps bring you back to what is real right now. It can be especially helpful if you feel disconnected or numb.",
      reframing:
        "This stage of life often comes with strong self-doubt, comparison, or fear of failure. Reframing is not about forcing positivity, it is about seeing your situation more clearly and fairly.",
      bodyscan:
        "If your body feels tense from long hours of studying or working, a body scan before sleep can help you unwind and settle your mind.",
      journaling:
        "Writing through what you are experiencing, your thoughts, fears, and hopes, can help you process everything more clearly. It is a simple but powerful way to make sense of things.",
    },
  },

  [EClientSegment.PARENT]: {
    label: "Parents",
    greeting: "you deserve care too.",
    pageIntro:
      "Parenting is deeply meaningful, but it can also be exhausting in ways that are hard to put into words. Many parents feel they have to keep going without pause. These tools are not a luxury. Taking even a few minutes for yourself helps you show up more fully, both for yourself and for your child.",
    contextualTips: {
      breathing:
        "When you feel overwhelmed or close to reacting in a way you might regret, pause and take a few slow breaths. Even a short pause can make a big difference.",
      grounding:
        "It is easy to feel mentally pulled into future worries while managing today. Grounding helps bring you back to the present moment, even in the middle of a busy day.",
      reframing:
        "Thoughts like 'I am not doing enough' or 'I am failing' are very common for parents. These thoughts can be harsh and not fully true. This helps you look at them with more balance.",
      bodyscan:
        "At the end of the day, your body has carried a lot. A body scan can help you release tension and settle before sleep.",
      journaling:
        "Writing about your experience, the love, the stress, the exhaustion, can be a safe and honest way to process what you are carrying.",
    },
  },

  [EClientSegment.TEACHER]: {
    label: "Teachers",
    greeting: "you give so much. This space is for you.",
    pageIntro:
      "Teaching asks a lot of you emotionally. You support others while often managing your own stress quietly. Over time, this can feel heavy. These tools are designed to fit into your day and support you in small but meaningful ways.",
    contextualTips: {
      breathing:
        "Before a challenging conversation, between classes, or even in your car before heading home, this can help you reset and steady yourself.",
      grounding:
        "If something difficult happens in class and you need to reset quickly, grounding can help you settle before your next group of students arrives.",
      reframing:
        "It is easy to be hard on yourself when things do not go as planned. Thoughts like 'I could have done better' or 'I am not enough' are common. This helps you reflect more kindly and realistically.",
      bodyscan:
        "If you carry the stress of the day in your body, a short body scan can help you transition out of work mode and into rest.",
      journaling:
        "Writing about your day, the challenges, the small wins, and everything in between, can help you release what you have been holding onto.",
    },
  },
};