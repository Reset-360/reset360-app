// =============================================================================
//
// Clinically-informed recommendations for all ADAPTS form types,
// organized by risk band and elevated subscale.
//
// Structure:
//   getRecommendations(adaptsType, riskBand, elevatedSubscales, hasSelfHarmFlag)
//
// Each result includes:
//   - description: 2–3 sentence summary of what the score means
//   - recommendations: 4–5 actionable steps, ordered by priority
//
// Subscale codes:
//   MDD = Major Depressive Disorder symptoms
//   GAD = Generalized Anxiety Disorder symptoms
//   PD  = Panic Disorder symptoms
//   SoA = Social Anxiety symptoms
//   SeA = Separation Anxiety symptoms
//   OCD = Obsessive-Compulsive symptoms
// =============================================================================

import { RCADSFactor, EAssessmentType, ERiskBand } from '@/types/adapts';

// ── Types ─────────────────────────────────────────────────────────────────────

export type RecommendationContent = {
  description: string;
  recommendations: string[];
};

// ── Self-harm override (all form types) ───────────────────────────────────────
// Always takes priority regardless of risk band or subscale.

const SELF_HARM_CONTENT: Record<EAssessmentType, RecommendationContent> = {
  [EAssessmentType.ADAPTS_S]: {
    description:
      'Your responses suggest you may be having thoughts of hurting yourself. This deserves immediate care and support. You don’t have to face this alone—reaching out is the most important step you can take right now.',
    recommendations: [
      'Please talk to a trusted adult, such as a parent, a school counselor, or a teacher, as soon as possible about how you are feeling.',
      'If you feel unsafe right now, contact a crisis line or go to your nearest emergency service immediately.',
      'Do not stay alone with these thoughts. Being around people you trust can help keep you safe.',
      'Book an urgent 1:1 Coaching Session so a trained professional can support you and connect you to the right resources.',
      'Use Reset360 grounding tools only as a short-term calming aid. They are not a substitute for talking to a real person.',
    ],
  },
  [EAssessmentType.ADAPTS_C]: {
    description:
      'Your responses suggest you may be experiencing thoughts of self-harm. This is a serious signal that you need and deserve immediate support. Reaching out is not a sign of weakness—it is the most important thing you can do for yourself right now.',
    recommendations: [
      'Contact a crisis line, a campus counseling center, or a trusted person in your life today. Do not wait.',
      'If you feel in immediate danger, go to your nearest emergency room or call emergency services.',
      'Book an urgent 1:1 Coaching Session to speak with someone trained to support you through this.',
      'Avoid being alone for extended periods while these thoughts are present. Staying connected to others matters.',
      'Use Reset360 grounding tools for moment-to-moment relief, but prioritize human support above everything else.',
    ],
  },
  [EAssessmentType.ADAPTS_P]: {
    description:
      'Your responses suggest you may be having thoughts of harming yourself. As a parent, it can be easy to put your own wellbeing last—but your mental health matters deeply, both for you and for your child. Please seek support now.',
    recommendations: [
      'Reach out to a mental health professional, a trusted person, or a crisis line today. You do not need to manage this alone.',
      'If you feel unsafe right now, contact emergency services or go to your nearest emergency room immediately.',
      'Book an urgent 1:1 Coaching Session for confidential, professional support tailored to where you are right now.',
      'Let someone you trust know how you are feeling so they can help keep you safe and supported.',
      'Use Reset360 grounding tools to help manage overwhelming moments, while prioritizing ongoing human support.',
    ],
  },
  [EAssessmentType.ADAPTS_T]: {
    description:
      'Your responses suggest you may be experiencing thoughts of self-harm. Supporting others every day can make it harder to recognize when you yourself need care. Please take this seriously and reach out—you deserve the same support you give others.',
    recommendations: [
      'Contact a mental health professional, a crisis line, or a trusted colleague or loved one today.',
      'If you feel in immediate danger, go to your nearest emergency room or call emergency services.',
      'Book an urgent 1:1 Coaching Session to speak with someone trained to help you through what you are experiencing.',
      'Do not carry this alone. Sharing how you feel with someone you trust is a vital first step.',
      'Use Reset360 grounding tools as immediate support, but make human connection your first priority.',
    ],
  },
};

// ── Low risk (T < 65) ─────────────────────────────────────────────────────────
// General wellness and maintenance. No subscale differentiation needed at this band.

const LOW_RISK_CONTENT: Record<EAssessmentType, RecommendationContent> = {
  [EAssessmentType.ADAPTS_S]: {
    description:
      'Your responses suggest that you are managing well emotionally at this time. This is a great sign, and continuing to build healthy habits now will help you stay resilient when life gets more demanding.',
    recommendations: [
      'Keep up the routines that are working for you, such as sleep, physical activity, and spending time with people you enjoy. These all support emotional wellbeing.',
      'Check in with yourself regularly. If you notice your mood or energy shifting, pay attention to what has changed.',
      'Consider a 1:1 Coaching Session to strengthen your emotional toolkit and build skills that will help you handle challenges before they escalate.',
      'Re-take the ADAPTS assessment every 4–6 weeks to track how you are feeling over time.',
      'Remember that asking for support is always a sign of strength, even when things feel okay.',
    ],
  },
  [EAssessmentType.ADAPTS_C]: {
    description:
      'Your responses suggest you are in a relatively stable emotional place right now. Life as a young adult comes with real pressures — academic, social, and personal, and maintaining this foundation takes genuine effort.',
    recommendations: [
      'Stay consistent with habits that support your mental health, such as rest, movement, social connection, and moments of downtime.',
      'Notice early warning signs in yourself. Changes in sleep, motivation, or mood often signal that stress is building before it becomes overwhelming.',
      'A 1:1 Coaching Session can help you develop proactive strategies for managing the unique pressures of this season of life.',
      'Re-take the ADAPTS assessment every 4–6 weeks, especially during high-stress periods like exam season or major life transitions.',
      'You do not need to be in crisis to benefit from support. Investing in your wellbeing early pays off.',
    ],
  },
  [EAssessmentType.ADAPTS_P]: {
    description:
      'Your responses suggest you are coping reasonably well at this time. Parenting brings its own particular weight, and the fact that you are checking in on your emotional health is already a meaningful step.',
    recommendations: [
      'Protect small pockets of time for yourself. Even brief moments of rest or activities you enjoy help sustain your emotional capacity.',
      'Stay connected to other adults in your life. Parenting can be isolating, and peer support matters.',
      'A 1:1 Coaching Session can help you build sustainable strategies for managing parenting stress before it accumulates.',
      'Re-take the ADAPTS assessment every 4–6 weeks, or sooner if family circumstances change significantly.',
      'Model the self-care practices you want your child to develop. Your wellbeing and theirs are connected.',
    ],
  },
  [EAssessmentType.ADAPTS_T]: {
    description:
      'Your responses suggest your emotional wellbeing is in a manageable place right now. Teaching is an emotionally demanding profession, and maintaining this baseline requires consistent attention to your own needs alongside those of your students.',
    recommendations: [
      'Build boundaries between work and personal time where possible. Emotional exhaustion often builds gradually when these lines blur.',
      'Stay connected to colleagues and maintain relationships outside of work. Professional isolation is a risk factor for burnout.',
      'A 1:1 Coaching Session can help you strengthen your resilience and develop sustainable coping strategies for the demands of your role.',
      'Re-take the ADAPTS assessment every 4–6 weeks, or after particularly demanding periods in the school calendar.',
      'You invest a great deal in others every day. Investing in your own mental health is not optional—it is necessary.',
    ],
  },
};

// ── Moderate risk (T 65–69) — per subscale ────────────────────────────────────

const MODERATE_RISK_CONTENT: Record<
  EAssessmentType,
  Record<RCADSFactor, RecommendationContent>
> = {
  [EAssessmentType.ADAPTS_S]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing a noticeable dip in mood, energy, or motivation. This is more than just a tough week. When these patterns are left unaddressed, they can start to affect your schoolwork, friendships, and sense of self.',
      recommendations: [
        'Talk to someone you trust about how you have been feeling, such as a parent, school counselor, or friend. You do not have to figure this out alone.',
        'Try to maintain a basic daily routine even when motivation is low. Get up at the same time, eat regularly, and spend some time outside.',
        'Book a 1:1 Coaching Session to explore what is driving these feelings and build practical strategies to lift your mood and energy.',
        'Limit time on social media if it is making comparisons or negative thoughts worse.',
        'Re-take the ADAPTS assessment in 3–4 weeks to see whether things are improving or if more structured support is needed.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be worrying more than usual about things in your life—school, family, the future, or things you cannot control. This level of worry can feel exhausting and make it hard to focus or feel settled.',
      recommendations: [
        'When worry feels overwhelming, try writing down what you are anxious about and separating what is within your control from what is not.',
        'Limit how often you check news, social media, or anything else that feeds the worry cycle.',
        'Book a 1:1 Coaching Session to learn practical worry-management and grounding strategies tailored to your situation.',
        'Build moments of calm into your day. Even 5–10 minutes of quiet breathing or light movement can reduce the background noise of anxiety.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track whether your worry levels are shifting.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing sudden physical symptoms of anxiety, such as a racing heart, dizziness, or shortness of breath. These experiences are real, and they can be helped.',
      recommendations: [
        'When you notice physical anxiety symptoms rising, try slow diaphragmatic breathing: inhale for 4 counts, hold for 4, exhale for 6.',
        'Reduce or eliminate caffeine, which can trigger or worsen physical anxiety symptoms.',
        'Book a 1:1 Coaching Session to learn how to recognize and interrupt the panic cycle before it escalates.',
        'Talk to a trusted adult or school counselor about what you have been experiencing. They can help connect you with additional support.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor whether these physical symptoms are improving.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest you may be feeling significant anxiety around social situations—worrying about being judged, embarrassed, or not measuring up. This can make school, friendships, and everyday interactions feel much harder than they should.',
      recommendations: [
        'Try to identify one small social situation each week where you can practice stepping slightly outside your comfort zone. Small steps add up.',
        'Challenge the thoughts telling you others are judging you negatively. Most people are far more focused on themselves than on you.',
        'Book a 1:1 Coaching Session to work on building confidence and managing social anxiety in a practical, supportive way.',
        'Avoid avoiding. The more situations you sidestep, the more anxiety tends to grow. Gradual exposure, with support, helps.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track changes in how social situations feel.',
      ],
    },
    SeA: {
      description:
        'Your responses suggest you may feel significant anxiety when separated from family or people you feel safe with. This kind of worry can make independence feel overwhelming and affect your confidence in everyday situations.',
      recommendations: [
        'Talk to a parent or trusted adult about how you have been feeling. Understanding this together can help reduce the fear.',
        'Practice short, manageable periods of independence gradually, with support, to build confidence over time.',
        'Book a 1:1 Coaching Session to develop strategies for managing separation anxiety in a way that feels safe and achievable.',
        'Focus on what helps you feel grounded when you are away from people you rely on, such as a familiar object, a breathing technique, or a short check-in call.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor how these feelings are changing.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest you may be experiencing intrusive thoughts or repetitive behaviors that feel hard to control or dismiss. These patterns can feel distressing and take up a lot of mental energy, even when you know they do not fully make sense.',
      recommendations: [
        'Recognize that intrusive thoughts are not the same as intentions. Having an unwanted thought does not mean you want it or will act on it.',
        'Try to resist the urge to perform compulsive actions, even briefly. Each time you do, you are building your ability to tolerate the discomfort.',
        'Book a 1:1 Coaching Session to learn structured techniques for managing intrusive thoughts and compulsive patterns.',
        'Talk to a trusted adult or school counselor about what you have been experiencing. OCD-related symptoms respond well to the right support.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track whether these patterns are improving.',
      ],
    },
  },

  [EAssessmentType.ADAPTS_C]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing a persistent low mood, reduced motivation, or a loss of enjoyment in things that used to matter to you. These are meaningful signals that your emotional wellbeing needs attention, not something to push through alone.',
      recommendations: [
        'Reach out to someone you trust, such as a friend, family member, or campus counselor, and let them know how you have been feeling.',
        'Try to maintain structure in your day even when motivation is absent. Basic routines around sleep, meals, and movement are the foundation for mood recovery.',
        'Book a 1:1 Coaching Session to explore what is contributing to your low mood and build a personalised plan for getting back to yourself.',
        'Consider a 4 or 8-week Coaching Package if these feelings have been present for more than a few weeks. Consistent support tends to produce the best outcomes.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track how your mood is responding to any changes you make.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest that worry may be taking up significant mental space in your life. This kind of pervasive anxiety about your future, relationships, performance, or things outside your control can be draining and make it hard to be present.',
      recommendations: [
        'Practise scheduled worry time. Give yourself 15 minutes a day to write down concerns, then consciously set them aside outside that window.',
        "Notice when your thinking patterns spiral into 'what if' territory, and practise redirecting to what is actually true and present right now.",
        'Book a 1:1 Coaching Session to develop personalised strategies for managing worry and building tolerance for uncertainty.',
        'Consider a 4 or 8-week Coaching Package to build deeper, lasting skills for managing anxiety across different areas of your life.',
        'Re-take the ADAPTS assessment in 3–4 weeks, especially if you are in a high-pressure academic or personal period.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing sudden episodes of intense physical anxiety, such as heart racing, breathlessness, or dizziness. These experiences can feel frightening and unpredictable, but they are manageable with the right tools and support.',
      recommendations: [
        'Learn and practise paced breathing daily, not just during episodes. A 4-count inhale and 6-count exhale trains your nervous system over time.',
        'Reduce stimulants like caffeine and energy drinks, which are known to lower the threshold for panic symptoms.',
        'Book a 1:1 Coaching Session to understand your panic triggers and develop a personalised plan for managing and reducing episodes.',
        'Consider a 4 or 8-week Coaching Package if panic episodes are occurring frequently or affecting your daily life.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor whether the frequency or intensity of symptoms is changing.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest that social anxiety may be affecting your confidence in everyday situations, such as classes, social events, group settings, or interactions where you feel observed or evaluated. This is one of the most common and most treatable forms of anxiety.',
      recommendations: [
        'Identify the specific situations that trigger the most anxiety and work toward them gradually, starting with lower-stakes interactions.',
        "Challenge cognitive distortions like mind-reading ('they think I'm stupid') and catastrophizing ('I'll embarrass myself completely').",
        'Book a 1:1 Coaching Session to build practical confidence skills and work through social anxiety in a structured, supportive way.',
        'Consider a 4 or 8-week Coaching Package to develop lasting confidence and communication skills across social and academic contexts.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track how social situations are feeling as you practise new strategies.',
      ],
    },
    SeA: {
      description:
        'Your responses suggest you may feel a significant level of anxiety when separated from people you are emotionally close to, such as a partner, family member, or close friend. This can make independence, travel, or time alone feel disproportionately distressing.',
      recommendations: [
        'Practise gradually increasing periods of independence while using grounding techniques to manage the discomfort that arises.',
        'Talk honestly with the people you are close to about how you have been feeling. Shared understanding reduces the anxiety around separation.',
        'Book a 1:1 Coaching Session to explore the root of separation anxiety and develop strategies for building a stronger sense of internal security.',
        'Consider a 4 or 8-week Coaching Package for sustained support in building emotional independence and resilience.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track progress as you work on this.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest you may be struggling with recurring intrusive thoughts or compulsive behaviours that feel difficult to control. These patterns can be exhausting and isolating, but they are well understood and respond well to targeted support.',
      recommendations: [
        'Understand that intrusive thoughts are a feature of how minds work under stress. The goal is to change your relationship to them, not eliminate them entirely.',
        'Begin practising response delay. When an urge to perform a compulsive action arises, try waiting even 5 minutes before acting on it.',
        'Book a 1:1 Coaching Session to learn evidence-informed techniques for breaking the intrusive thought and compulsion cycle.',
        'Consider a 4 or 8-week Coaching Package for consistent, structured support. OCD-related patterns benefit significantly from sustained practice.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track changes in the frequency and intensity of intrusive thoughts and compulsions.',
      ],
    },
  },

  [EAssessmentType.ADAPTS_P]: {
    MDD: {
      description:
        'Your responses suggest you may be carrying a significant emotional load, feeling persistently low, drained, or disconnected from things that used to bring you satisfaction. Parenting while running on empty is genuinely hard, and you deserve support.',
      recommendations: [
        'Acknowledge that what you are feeling is real and valid. Low mood in parents is extremely common and does not reflect your love for your child or your capability as a parent.',
        'Prioritise sleep and nutrition as your foundation. These are often the first things to slip under parenting stress and the first to impact mood.',
        'Book a 1:1 Coaching Session to talk through what you are experiencing and build a realistic, personalised plan for recovery.',
        'Consider a 4 or 8-week Coaching Package if these feelings have been present for more than a few weeks. Consistent support leads to more lasting change.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor how your mood shifts as you make changes.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be caught in a cycle of persistent worry about your child, your family, the future, or your ability to manage everything well. This kind of background anxiety can make it hard to feel calm or present even in quiet moments.',
      recommendations: [
        'Try distinguishing between productive worry (problems you can act on) and unproductive worry (things outside your control). Focus your energy on the former.',
        'Build short daily anchors, such as a morning routine, a brief walk, or a few minutes of quiet, to reduce the low-level hum of anxiety across the day.',
        'Book a 1:1 Coaching Session to develop concrete strategies for managing worry and building a greater tolerance for uncertainty.',
        'Consider a 4 or 8-week Coaching Package for sustained support in rewiring habitual anxiety patterns.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track how your anxiety levels are responding to changes.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing sudden episodes of intense physical anxiety, such as heart pounding, shortness of breath, or dizziness. These experiences are real, and they can improve significantly with the right support.',
      recommendations: [
        'When you notice physical symptoms building, slow your breath intentionally: inhale for 4 counts, hold for 2, exhale slowly for 6. Repeat until your body begins to settle.',
        'Identify patterns in when episodes occur, such as time of day, specific triggers, sleep, or caffeine levels, to understand what is feeding them.',
        'Book a 1:1 Coaching Session to develop a personalised plan for managing panic symptoms and reducing their frequency.',
        'Consider a 4 or 8-week Coaching Package if episodes are occurring regularly or affecting your confidence in daily tasks.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor whether episodes are becoming less frequent or intense.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest you may be experiencing notable anxiety in social or evaluative situations, such as worrying about judgment from other parents, teachers, or people in your community. This can make social participation feel exhausting or something to be avoided.',
      recommendations: [
        'Recognise that the standard you are holding yourself to in social situations is likely far higher than what others are actually observing.',
        'Identify one low-stakes social situation each week to engage with, rather than avoid. Avoidance tends to deepen anxiety over time.',
        'Book a 1:1 Coaching Session to work on building social confidence and managing the self-critical thinking that fuels social anxiety.',
        'Consider a 4 or 8-week Coaching Package for consistent support in developing lasting confidence across social contexts.',
        'Re-take the ADAPTS assessment in 3–4 weeks to see how your experience of social situations is shifting.',
      ],
    },
    SeA: {
      description:
        "Your responses suggest you may experience significant anxiety when separated from your child, beyond what feels manageable or proportionate. This is a pattern that can affect both your wellbeing and your child's developing independence.",
      recommendations: [
        'Reflect on whether your anxiety about separation is being communicated to your child, and consider how to model calm confidence when separating.',
        'Practise self-soothing strategies for the moments you are apart, such as grounding techniques, scheduled distractions, or connecting with another adult.',
        'Book a 1:1 Coaching Session to explore the roots of separation anxiety and develop strategies for building confidence in both you and your child.',
        'Consider a 4 or 8-week Coaching Package for sustained work on building emotional independence and reducing anxiety around separation.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track changes as you work on this pattern.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest you may be struggling with intrusive thoughts or repetitive behaviours that feel hard to dismiss or control. These patterns can take up significant mental energy and are often made worse by the heightened responsibility that comes with parenting.',
      recommendations: [
        'Recognise that intrusive thoughts, even disturbing ones, do not define you or predict your behaviour. They are a symptom, not a truth.',
        'Practise delaying compulsive responses. When an urge arises, try to wait 5–10 minutes before acting on it. Over time, the urge loses intensity.',
        'Book a 1:1 Coaching Session to learn structured, evidence-informed approaches to managing obsessive-compulsive patterns.',
        'Consider a 4 or 8-week Coaching Package. OCD-related patterns benefit significantly from consistent, sustained practice with a coach.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor how these patterns are responding to the work you are doing.',
      ],
    },
  },

  [EAssessmentType.ADAPTS_T]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing signs of low mood, emotional exhaustion, or a reduced sense of meaning in your work. These are early indicators of burnout that are extremely common in teaching and deserve attention before they deepen.',
      recommendations: [
        'Name what you are experiencing without judgment. Emotional fatigue in teachers is not a failure; it is a signal that your needs have not been met for too long.',
        'Protect non-negotiable recovery time outside of school hours. Work that expands into all hours will deplete you faster than the work itself.',
        'Book a 1:1 Coaching Session to explore what is driving your low mood and develop a realistic, sustainable plan for recovery.',
        'Consider a 4 or 8-week Coaching Package for ongoing support in rebuilding your emotional reserves and reconnecting with what matters to you.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track how your mood and energy are shifting.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be carrying a high level of background worry about your students, your performance, your school environment, or the future. Teaching today involves real and legitimate stressors, and this level of worry can make it hard to feel settled or effective.',
      recommendations: [
        'At the end of each workday, write down three things you completed or did well. Anxiety tends to focus on what is unfinished; this practice rebalances the picture.',
        'Establish clear mental boundaries between school time and personal time. Checking messages, planning lessons, or ruminating on school issues during off-hours sustains anxiety.',
        'Book a 1:1 Coaching Session to develop personalised strategies for managing work-related worry and building a healthier relationship with uncertainty.',
        'Consider a 4 or 8-week Coaching Package for sustained support in rewiring anxiety patterns that have built up over time.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor whether these strategies are helping reduce your worry load.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing sudden episodes of physical anxiety, such as a racing heart, dizziness, or difficulty breathing. These can feel alarming and unpredictable, sometimes even during school hours.',
      recommendations: [
        'Learn to recognise the early physical signals that an episode may be building, so you can intervene earlier with breathing or grounding techniques.',
        'Reduce caffeine intake, especially during the school day, as it is a known contributor to physical anxiety symptoms.',
        'Book a 1:1 Coaching Session to understand your panic triggers and develop a practical management plan for both school and personal contexts.',
        'Consider a 4 or 8-week Coaching Package if these episodes are frequent or are affecting your confidence in the classroom.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track whether episodes are becoming less frequent or intense.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest you may feel significant anxiety in evaluative or observed situations, such as staff meetings, performance reviews, parent interactions, or times when you feel your competence is under scrutiny. This can make an already demanding role feel even more pressured.',
      recommendations: [
        'Prepare thoroughly for high-stakes situations to reduce uncertainty, but also practise tolerating imperfection. You do not need to perform flawlessly to be effective.',
        'Challenge the assumption that others are evaluating you as harshly as you are evaluating yourself. Most people are focused on their own concerns.',
        'Book a 1:1 Coaching Session to build confidence in professional and evaluative situations and manage the anxiety that comes with being observed.',
        'Consider a 4 or 8-week Coaching Package for sustained work on professional confidence and managing social anxiety in a high-visibility role.',
        'Re-take the ADAPTS assessment in 3–4 weeks to monitor how these situations feel as you apply new strategies.',
      ],
    },
    SeA: {
      description:
        'Your responses suggest you may experience notable anxiety when separated from people you rely on emotionally. For educators, this can show up as difficulty setting boundaries, over-reliance on connection at work, or discomfort during breaks, holidays, or periods of isolation.',
      recommendations: [
        'Identify the specific separation situations that feel most activating and explore what need is being triggered, such as safety, validation, or connection.',
        'Practise brief, manageable periods of solitude with grounding tools available, gradually building your comfort with being alone.',
        'Book a 1:1 Coaching Session to understand the roots of your separation anxiety and build strategies for strengthening your internal sense of security.',
        'Consider a 4 or 8-week Coaching Package for consistent, structured support in building emotional independence.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track how these feelings are shifting with practice.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest you may be experiencing intrusive thoughts or compulsive patterns that are difficult to manage. In a high-responsibility role like teaching, OCD-related symptoms can intensify around themes of making mistakes, harm, or not doing enough, adding an extra layer of pressure to an already demanding job.',
      recommendations: [
        'Understand that intrusive thoughts, even those that feel deeply uncomfortable, are not a reflection of your character or intentions.',
        'Practise not acting on compulsive urges immediately. A brief delay before checking, correcting, or repeating an action helps reduce the cycle over time.',
        'Book a 1:1 Coaching Session to work through OCD-related patterns using structured, evidence-informed approaches.',
        'Consider a 4 or 8-week Coaching Package. Sustained, consistent practice is one of the most effective ways to reduce OCD symptom severity.',
        'Re-take the ADAPTS assessment in 3–4 weeks to track changes in the frequency and intensity of intrusive thoughts and compulsions.',
      ],
    },
  },
};

// ── High risk (T ≥ 70) — per subscale ────────────────────────────────────────

const HIGH_RISK_CONTENT: Record<
  EAssessmentType,
  Record<RCADSFactor, RecommendationContent>
> = {
  [EAssessmentType.ADAPTS_S]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing significant depression symptoms, such as persistent low mood, loss of energy, and difficulty finding motivation or joy. This level of distress is serious, and it is important that you get proper support now rather than waiting to see if it passes.',
      recommendations: [
        'Tell a trusted adult, such as a parent, school counselor, or teacher, how you have been feeling. Do not try to handle this alone.',
        'Book a 1:1 Coaching Session as soon as possible to get personalised support and a clear plan for moving forward.',
        'Consider a 4 or 8-week Coaching Package to provide consistent, structured support while you work through this difficult period.',
        'Try to maintain basic daily structure, including consistent sleep, regular meals, and some time outside, even when it feels impossibly hard.',
        'If your low mood is accompanied by thoughts of self-harm or hopelessness about the future, please reach out to a crisis resource or trusted adult immediately.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be experiencing a high level of generalised anxiety that is significantly affecting your ability to feel calm, present, or in control. This level of worry can be exhausting and deserves focused, timely support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin working on strategies for managing the volume and intensity of your worry.',
        'Consider a 4 or 8-week Coaching Package to build lasting skills for managing anxiety across the different areas of your life.',
        'Talk to a trusted adult or school counselor about what you are experiencing. You should not be carrying this level of anxiety alone.',
        'Begin a simple grounding practice for moments when worry peaks: name five things you can see, four you can touch, and three you can hear.',
        'Temporarily reduce exposure to news, social media, and any content that is feeding the anxiety cycle.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing frequent or severe panic symptoms, such as sudden physical episodes of fear that can feel overwhelming and out of your control. This is significantly affecting your wellbeing and needs prompt attention.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin structured support for managing panic symptoms.',
        'Consider a 4 or 8-week Coaching Package to work consistently on understanding your panic cycle and reducing episodes over time.',
        'Talk to a parent or school counselor about what you have been experiencing. A medical check-up may also be worthwhile to rule out physical causes.',
        'Practise slow, deliberate breathing every day, not just during episodes. This trains your nervous system toward calm over time.',
        'Avoid avoiding the situations that trigger panic, where possible. Avoidance tends to maintain and worsen panic over the long term.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest that social anxiety is significantly impacting your daily life, making school, friendships, and normal interactions feel frightening or overwhelming. This level of social anxiety is serious, and with the right support, it is very treatable.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin working on the cognitive and behavioural patterns maintaining your social anxiety.',
        'Consider a 4 or 8-week Coaching Package for consistent, structured support in building social confidence over time.',
        'Talk to a school counselor or trusted adult about the impact this is having on your daily life. You deserve more support than you are currently getting.',
        'Begin very small. One brief social interaction per day, even just a greeting, builds the foundation for larger change.',
        'Reduce safety behaviours, the things you do to feel less exposed in social situations, as these maintain anxiety over time.',
      ],
    },
    SeA: {
      description:
        'Your responses suggest that separation anxiety is significantly affecting your independence and daily functioning. This level of distress when away from family or safe people is something that needs dedicated, timely support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently so you can begin working on this with a trained coach in a safe and structured way.',
        'Consider a 4 or 8-week Coaching Package for sustained support in gradually building your confidence and independence.',
        'Talk openly with a parent or trusted adult about the extent of what you are experiencing. Shared understanding is a key first step.',
        'Work with your coach or counselor to create a gradual exposure plan, taking small, supported steps toward independence consistently.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early signs of progress.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest you may be experiencing significant OCD-related symptoms, such as intrusive thoughts and compulsive behaviours that are taking up a lot of time, causing distress, and interfering with daily life. This level of symptoms warrants prompt, targeted support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin learning structured techniques for managing intrusive thoughts and compulsive cycles.',
        'Consider a 4 or 8-week Coaching Package. OCD responds best to consistent, sustained intervention rather than occasional support.',
        'Talk to a trusted adult or school counselor. OCD at this level often benefits from a combination of coaching and professional mental health support.',
        'Begin practising exposure and response prevention in small ways. Allow the intrusive thought to be present without performing the compulsion, starting with your least distressing triggers.',
        'Re-take the ADAPTS assessment in 2–3 weeks to monitor the impact of early interventions.',
      ],
    },
  },

  [EAssessmentType.ADAPTS_C]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing significant depression, such as persistent low mood, loss of motivation, and difficulty functioning across important areas of your life. This is not something to push through alone. Seeking support now is the most important step you can take.',
      recommendations: [
        'Book a 1:1 Coaching Session as soon as possible to begin working through what you are experiencing with structured, personalised support.',
        'Consider a 4 or 8-week Coaching Package to provide the consistency and depth of support that depression recovery genuinely requires.',
        'Reach out to your campus counseling centre or a trusted person in your life today. You should not be navigating this alone.',
        'Focus first on the basics: consistent sleep, regular meals, and daily movement, even minimal. These are the biological foundation of mood recovery.',
        'If your symptoms include thoughts of self-harm or a feeling that there is no point continuing, please contact a crisis line or emergency service immediately.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be experiencing a high level of generalised anxiety that is significantly disrupting your ability to study, sleep, or feel present in your own life. This level of anxiety needs prompt, focused attention.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin working on managing the intensity and frequency of your worry.',
        'Consider a 4 or 8-week Coaching Package to build deep, lasting anxiety management skills across the pressures of young adult life.',
        'Reach out to your campus counseling service. GAD at this level benefits from combined coaching and clinical support.',
        'Establish firm daily boundaries around worry, such as scheduled concern time, limits on news and social media, and intentional moments of rest.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early shifts in your anxiety as you begin making changes.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing frequent, intense panic episodes that are significantly disrupting your ability to engage with daily life, including classes, social situations, or simply feeling safe in your body. This level of panic warrants immediate, structured support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin developing a personalised plan for managing and reducing panic episodes.',
        'Consider a 4 or 8-week Coaching Package for consistent support in understanding your panic cycle and building lasting regulation skills.',
        'Visit a campus health centre or GP to rule out any physical contributors to your symptoms.',
        'Practise diaphragmatic breathing twice daily as a baseline regulation practice. This is one of the most effective short-term tools for panic.',
        'Avoid arranging your life around avoiding panic triggers. Avoidance provides short-term relief but sustains the disorder over time.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest that social anxiety is significantly affecting your ability to engage in academic, social, and professional life. At this level, avoidance and distress around social situations can narrow your world in ways that compound over time.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin structured work on the thought and behaviour patterns maintaining your social anxiety.',
        'Consider a 4 or 8-week Coaching Package for the consistent support needed to meaningfully shift entrenched social anxiety.',
        'Reach out to campus counseling. Social anxiety at this level benefits from combined coaching and clinical intervention.',
        'Identify one avoided situation per week to approach, starting with the least distressing. Consistent, gradual exposure is the evidence base for recovery.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early shifts as you begin making changes.',
      ],
    },
    SeA: {
      description:
        'Your responses suggest that separation anxiety is significantly affecting your ability to function independently, whether in academic settings, living arrangements, or relationships. This level of distress warrants dedicated, structured support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to explore what is driving your separation anxiety and begin building strategies for managing it.',
        'Consider a 4 or 8-week Coaching Package for sustained support in gradually building emotional independence and internal security.',
        'Talk honestly with the people you are close to about how you have been feeling, and with a counselor or health professional if symptoms are affecting your daily functioning.',
        'Develop a personalised grounding toolkit for the moments you are separated from people you rely on.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early progress.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest that OCD-related symptoms, such as intrusive thoughts and compulsive behaviours, are significantly interfering with your daily life. At this level, these symptoms warrant prompt and structured intervention.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin learning evidence-informed techniques for breaking the OCD cycle.',
        'Consider a 4 or 8-week Coaching Package. OCD at this level benefits most from sustained, structured support over time.',
        'Reach out to campus counseling or a mental health professional. Clinical intervention alongside coaching tends to produce the best outcomes at this level.',
        'Begin practising small acts of exposure and response prevention, starting with your least distressing triggers and working gradually upward.',
        'Re-take the ADAPTS assessment in 2–3 weeks to monitor the impact of early intervention.',
      ],
    },
  },

  [EAssessmentType.ADAPTS_P]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing significant depression symptoms that are affecting your ability to function, connect, and find meaning in daily life. This is serious, and it is not something you should manage alone, especially while caring for a child.',
      recommendations: [
        'Book a 1:1 Coaching Session as soon as possible. Talking to someone trained to help is the most important step you can take right now.',
        'Consider a 4 or 8-week Coaching Package to provide the structured, consistent support that depression recovery requires over time.',
        'Reach out to your GP, a mental health professional, or a trusted person in your life today. Parenting through untreated depression is exhausting and unsustainable.',
        'Accept help where it is offered, whether from a partner, family member, or friend. Depression makes it hard to ask, but do it anyway.',
        'If you are experiencing thoughts of self-harm or hopelessness, please contact a crisis line or emergency service immediately.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be living with a high level of chronic anxiety, with persistent worry about your child, your family, your performance as a parent, or things outside your control. At this level, anxiety is not just uncomfortable; it is taking a real toll on your daily life.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin developing structured strategies for managing the volume and intensity of your worry.',
        'Consider a 4 or 8-week Coaching Package for sustained, deep work on the anxiety patterns that have likely been building over time.',
        'Speak to your GP or a mental health professional. Anxiety at this level often benefits from combined professional support and coaching.',
        'Establish firm daily limits on worry-feeding behaviours such as constant checking, catastrophising, and seeking reassurance. These tend to sustain rather than reduce anxiety.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early shifts as you begin making changes.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing frequent or severe panic episodes that are significantly disrupting your daily life and your ability to parent calmly and confidently. This level of panic warrants prompt, dedicated support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin a structured plan for understanding and managing your panic symptoms.',
        'Consider a 4 or 8-week Coaching Package for the sustained support needed to reduce panic frequency and build lasting regulation skills.',
        'See your GP to discuss your symptoms and rule out any physical contributors.',
        'Practise slow, deliberate breathing every day, not just in moments of panic. Consistent daily practice builds regulation capacity over time.',
        'Re-take the ADAPTS assessment in 2–3 weeks to monitor early changes in symptom frequency and intensity.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest that social anxiety is significantly affecting your confidence and daily functioning, making parent-teacher interactions, social situations, or community involvement feel overwhelming or something to avoid. This level of social anxiety deserves real, structured support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin working on the thinking patterns and avoidance behaviours that maintain social anxiety.',
        'Consider a 4 or 8-week Coaching Package for consistent, sustained support in building social confidence across your role as a parent and as an individual.',
        'Consider speaking with a mental health professional alongside coaching. Social anxiety at this level benefits from combined support.',
        'Begin gradually re-engaging with situations you have been avoiding, starting with the least distressing.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early progress.',
      ],
    },
    SeA: {
      description:
        "Your responses suggest that anxiety around separation from your child has reached a level that is significantly affecting both you and potentially your child's developing independence. This pattern warrants timely and dedicated support.",
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin exploring what is driving your separation anxiety and develop a structured plan for managing it.',
        'Consider a 4 or 8-week Coaching Package for sustained support in building emotional independence and reducing the anxiety cycle around separation.',
        "Speak with a family therapist or child psychologist if your separation anxiety is affecting your child's ability to separate comfortably from you.",
        'Work on identifying and soothing the underlying fear driving the anxiety, not just managing the surface behaviour.',
        'Re-take the ADAPTS assessment in 2–3 weeks to monitor progress.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest that OCD-related symptoms are significantly affecting your daily life, with intrusive thoughts and compulsive behaviours that take up considerable time, cause distress, and interfere with your parenting and personal functioning.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin structured work on breaking the OCD cycle.',
        'Consider a 4 or 8-week Coaching Package. OCD at this severity responds best to consistent, prolonged support.',
        'Speak with a mental health professional alongside coaching. Clinical intervention and coaching together tend to produce the best outcomes at this level.',
        'Begin practising small acts of response prevention, resisting one compulsion at a time, starting with your lowest-distress triggers.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track changes in symptom frequency and intensity.',
      ],
    },
  },

  [EAssessmentType.ADAPTS_T]: {
    MDD: {
      description:
        'Your responses suggest you may be experiencing significant depression, with deep emotional exhaustion, persistent low mood, and reduced ability to find meaning or energy in your work and personal life. This is a serious signal that should not be ignored or delayed.',
      recommendations: [
        'Book a 1:1 Coaching Session as soon as possible to get structured, personalised support for what you are going through.',
        'Consider a 4 or 8-week Coaching Package. Depression recovery is not quick, and consistent support over weeks makes a meaningful difference.',
        'Speak with your GP or a mental health professional today. Teacher burnout and clinical depression often overlap, and both deserve professional attention.',
        'Talk to someone at your school, such as occupational health, your union, or a trusted colleague, about accessing adjustments or support during this period.',
        'If you are experiencing thoughts of self-harm or a complete loss of hope, please contact a crisis resource or emergency service immediately.',
      ],
    },
    GAD: {
      description:
        'Your responses suggest you may be carrying a very high level of chronic anxiety, worrying about your students, your performance, the demands of your role, and concerns that follow you well beyond school hours. At this level, anxiety is significantly eroding your quality of life.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin structured work on the worry patterns that are most disruptive to your daily functioning.',
        'Consider a 4 or 8-week Coaching Package for sustained support in building lasting anxiety management skills within the demands of your profession.',
        'Speak with your GP or a mental health professional. Anxiety at this level often benefits from clinical support alongside coaching.',
        'Establish firm daily limits on work-related worry outside of school hours. Your nervous system needs genuine recovery time to regulate.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early shifts as you begin making changes.',
      ],
    },
    PD: {
      description:
        'Your responses suggest you may be experiencing significant and frequent panic symptoms that are affecting your ability to function confidently in the classroom and in daily life. This level of panic requires prompt and structured support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin developing a personalised plan for managing and reducing panic episodes.',
        'Consider a 4 or 8-week Coaching Package for the consistency of support needed to meaningfully reduce panic frequency.',
        'See your GP to rule out physical contributors and discuss what level of clinical support is appropriate.',
        'Develop a discreet in-classroom grounding protocol so that if symptoms arise at work, you have a practiced plan ready.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early changes in the frequency and intensity of panic episodes.',
      ],
    },
    SoA: {
      description:
        'Your responses suggest that social anxiety is significantly affecting your professional life, making observations, staff meetings, parent evenings, or interactions with leadership feel distressing or something to be dreaded and avoided. This level of social anxiety is impairing your professional functioning.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin structured work on managing evaluative anxiety and building professional confidence.',
        'Consider a 4 or 8-week Coaching Package for consistent support in shifting the patterns that are affecting your confidence in a high-visibility role.',
        'Speak with occupational health or a mental health professional. Social anxiety at this severity is affecting your career and deserves professional attention.',
        'Begin engaging gradually with the situations you have been avoiding, starting with the least threatening. Gradual re-engagement is the evidence base for recovery.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track early progress.',
      ],
    },
    SeA: {
      description:
        'Your responses suggest that anxiety around separation from people you rely on is significantly affecting your daily functioning and emotional stability. For educators, this can show up as difficulty with transitions, holidays, or changes in key relationships, and warrants dedicated support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to explore the root of your separation anxiety and begin building internal security.',
        'Consider a 4 or 8-week Coaching Package for sustained work on building emotional independence and reducing the anxiety cycle around separation.',
        'Speak with a mental health professional alongside coaching. Anxiety at this level benefits from combined support.',
        'Develop a daily grounding practice to use during periods of separation or heightened anxiety.',
        'Re-take the ADAPTS assessment in 2–3 weeks to track progress.',
      ],
    },
    OCD: {
      description:
        'Your responses suggest that OCD-related symptoms are significantly affecting your functioning, both professionally and personally. Intrusive thoughts and compulsive behaviours at this level are time-consuming, distressing, and deserve immediate, structured support.',
      recommendations: [
        'Book a 1:1 Coaching Session urgently to begin learning evidence-informed approaches to managing intrusive thoughts and compulsive cycles.',
        'Consider a 4 or 8-week Coaching Package. OCD at this severity responds best to intensive, sustained intervention over time.',
        'Speak with a mental health professional as soon as possible. Clinical intervention combined with coaching typically produces the best outcomes at this level.',
        'Practise exposure and response prevention in small, manageable steps starting today, beginning with your least distressing triggers.',
        'Re-take the ADAPTS assessment in 2–3 weeks to monitor the impact of early intervention.',
      ],
    },
  },
};

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Returns the appropriate description and recommendations based on:
 * - adaptsType: which questionnaire was administered
 * - riskBand: the overall risk classification (low / moderate / high)
 * - elevatedSubscales: which subscales are at or above borderline clinical threshold
 * - hasSelfHarmFlag: whether item 32 was endorsed at any level
 *
 * When multiple subscales are elevated, the most severe subscale drives
 * the recommendation content. Priority order: MDD > OCD > GAD > PD > SoA > SeA
 */
export function getRecommendations(
  adaptsType: EAssessmentType,
  riskBand: ERiskBand,
  elevatedSubscales: RCADSFactor[],
  hasSelfHarmFlag: boolean
): RecommendationContent {
  // Self-harm always overrides everything
  if (hasSelfHarmFlag) {
    return SELF_HARM_CONTENT[adaptsType];
  }

  // Low risk — no subscale differentiation needed
  if (riskBand === ERiskBand.low) {
    return LOW_RISK_CONTENT[adaptsType];
  }

  // Priority order for picking the primary subscale when multiple are elevated
  const PRIORITY_ORDER: RCADSFactor[] = [
    'MDD',
    'OCD',
    'GAD',
    'PD',
    'SoA',
    'SeA',
  ];

  const primarySubscale =
    PRIORITY_ORDER.find((f) => elevatedSubscales.includes(f)) ??
    elevatedSubscales[0];

  // Fall back to low risk content if no subscale is elevated (should not happen)
  if (!primarySubscale) {
    return LOW_RISK_CONTENT[adaptsType];
  }

  if (riskBand === ERiskBand.high) {
    return HIGH_RISK_CONTENT[adaptsType][primarySubscale];
  }

  // Moderate
  return MODERATE_RISK_CONTENT[adaptsType][primarySubscale];
}
