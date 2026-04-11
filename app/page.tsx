"use client";

import { useMemo, useState } from "react";

type GoalFormData = {
  goalDomain: string;
  condition: string;
  behavior: string;
  measurement: string;
  criteria: string;
  timeline: string;
  baseline: string;
};

type OptionGroup = {
  label: string;
  options: string[];
};

type DomainConfig = {
  conditionGroups: OptionGroup[];
  behaviorGroups: OptionGroup[];
  measurementGroups: OptionGroup[];
};

type GoalTemplate = {
  id: number;
  title: string;
  domain: string;
  data: GoalFormData;
};

const goalDomains = [
  "Academic",
  "Communication / Language",
  "Social / Pragmatic Communication",
  "Behavior / Emotional Regulation",
  "Executive Functioning",
  "Adaptive / Daily Living",
  "Functional Academics",
  "Motor / Participation",
  "Sensory / Self-Regulation",
  "Transition / Postsecondary",
  "Deaf / Hard of Hearing",
  "Visual Impairment / Orientation & Mobility",
  "Extensive Support Needs",
];

const criteriaOptions = [
  "3 out of 4 opportunities",
  "4 out of 5 opportunities",
  "4 out of 5 trials",
  "80% accuracy across 3 consecutive sessions",
  "85% accuracy across 3 consecutive sessions",
  "90% accuracy across 4 consecutive trials",
  "with no more than 1 prompt in 4 out of 5 opportunities",
  "with no more than 2 prompts in 4 out of 5 opportunities",
  "with 80% independence across 3 consecutive sessions",
  "for 5 consecutive minutes in 4 out of 5 opportunities",
  "for 10 consecutive minutes in 4 out of 5 opportunities",
  "for 15 consecutive minutes in 4 out of 5 opportunities",
  "across 3 consecutive data collection periods",
];

const timelineOptions = [
  "within 9 weeks",
  "within 18 weeks",
  "by the end of the current semester",
  "by the end of the current school year",
  "by the next annual review",
  "by the end of the annual IEP period",
  "within 36 instructional weeks",
];

const domainConfigs: Record<string, DomainConfig> = {
  Academic: {
    conditionGroups: [
      {
        label: "Foundational Literacy",
        options: [
          "Given letter cards and visual supports",
          "During phonological awareness instruction",
          "Given picture-supported literacy tasks",
          "During guided reading activities",
        ],
      },
      {
        label: "Reading",
        options: [
          "Given grade-level reading passages",
          "Given adapted reading passages",
          "During teacher-led reading instruction",
          "Given a graphic organizer and teacher modeling",
        ],
      },
      {
        label: "Writing",
        options: [
          "During written expression tasks",
          "Given a writing prompt and sentence frame support",
          "Given a paragraph organizer",
          "During independent writing assignments",
        ],
      },
      {
        label: "Math",
        options: [
          "Given math manipulatives and visual models",
          "During small-group math instruction",
          "Given teacher modeling and guided practice",
          "During independent math problem-solving tasks",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Foundational Reading",
        options: [
          "identify uppercase and lowercase letters",
          "produce letter sounds",
          "blend simple consonant-vowel-consonant words",
          "match spoken words to printed words or pictures",
        ],
      },
      {
        label: "Reading Comprehension",
        options: [
          "identify the main idea and supporting details",
          "answer comprehension questions using text evidence",
          "determine the meaning of unfamiliar vocabulary using context clues",
          "compare and contrast key details from text",
        ],
      },
      {
        label: "Writing",
        options: [
          "write a complete sentence using appropriate capitalization and punctuation",
          "write a complete paragraph with a topic sentence and supporting details",
          "revise written work for organization and clarity",
          "edit written work for capitalization, punctuation, and spelling",
        ],
      },
      {
        label: "Math",
        options: [
          "count objects accurately and match quantities to numerals",
          "solve addition and subtraction problems accurately",
          "solve multi-step math problems accurately",
          "explain mathematical reasoning using words, numbers, or models",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Academic Data",
        options: [
          "teacher-collected work samples",
          "curriculum-based assessments",
          "rubric-scored classroom assignments",
          "weekly progress monitoring probes",
        ],
      },
    ],
  },

  "Communication / Language": {
    conditionGroups: [
      {
        label: "Expressive / Receptive Language",
        options: [
          "Given visual supports and teacher cues",
          "During structured language activities",
          "During classroom discussion activities",
          "Given sentence frames and modeled responses",
        ],
      },
      {
        label: "Functional Communication",
        options: [
          "During daily classroom routines",
          "Given choices and communication supports",
          "During play-based or peer-supported activities",
          "During structured opportunities to request, protest, or comment",
        ],
      },
      {
        label: "AAC / Multimodal Communication",
        options: [
          "Given access to AAC or alternative communication supports",
          "During AAC-supported classroom activities",
          "Given modeling across communication partners",
          "During structured communication opportunities with speech, gesture, signs, symbols, or AAC",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Expressive Language",
        options: [
          "use complete sentences to express wants, needs, or ideas",
          "label and describe objects, actions, or events using age-appropriate language",
          "retell a familiar event or story using sequenced language",
          "answer wh-questions accurately",
        ],
      },
      {
        label: "Receptive Language",
        options: [
          "follow one-step directions accurately",
          "follow multi-step verbal directions",
          "demonstrate understanding of age-appropriate vocabulary and concepts",
          "identify key information from oral language tasks",
        ],
      },
      {
        label: "Functional Communication",
        options: [
          "request assistance appropriately",
          "communicate choices using speech, gesture, signs, symbols, or AAC",
          "respond to simple questions using an appropriate communication mode",
          "initiate communication to gain attention, request, protest, or comment",
        ],
      },
      {
        label: "Advanced Language",
        options: [
          "use descriptive language to explain ideas clearly",
          "use appropriate vocabulary in classroom speaking tasks",
          "answer inferential questions using complete responses",
          "engage in topic maintenance during structured language tasks",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Communication Data",
        options: [
          "language sample data",
          "trial-based data collection",
          "teacher observation data",
          "speech-language service data",
        ],
      },
    ],
  },

  "Social / Pragmatic Communication": {
    conditionGroups: [
      {
        label: "Foundational Social Interaction",
        options: [
          "During adult-led social play activities",
          "During structured peer interaction opportunities",
          "During turn-taking games and activities",
          "Given visual models and social cues",
        ],
      },
      {
        label: "Pragmatic Communication",
        options: [
          "During structured social skills instruction",
          "During role-play activities",
          "During classroom conversation opportunities",
          "During peer-supported group tasks",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Foundational Social Skills",
        options: [
          "respond to social interaction from peers or adults",
          "engage in joint attention during shared activities",
          "participate in turn-taking activities",
          "use nonverbal social behaviors such as eye gaze, gesture, or orientation to others",
        ],
      },
      {
        label: "Interaction Skills",
        options: [
          "initiate appropriate peer interactions",
          "maintain a back-and-forth conversation for multiple exchanges",
          "take turns appropriately during conversation or group work",
          "identify social cues and respond appropriately",
        ],
      },
      {
        label: "Advanced Pragmatics",
        options: [
          "use appropriate greetings, comments, and responses in conversation",
          "maintain topic during structured conversation",
          "adjust communication based on social context",
          "demonstrate perspective-taking during social interactions",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Social Data",
        options: [
          "teacher observation data",
          "frequency counts",
          "social skills checklist data",
          "trial-based data collection",
        ],
      },
    ],
  },

  "Behavior / Emotional Regulation": {
    conditionGroups: [
      {
        label: "Behavior Supports",
        options: [
          "Given a structured classroom routine",
          "During non-preferred tasks",
          "Given verbal and visual cues",
          "Given access to a self-regulation support plan",
        ],
      },
      {
        label: "Across Settings",
        options: [
          "During transitions between classroom activities",
          "During whole-group instruction",
          "During unstructured times such as lunch, recess, or hallway movement",
          "Given adult prompting and behavioral supports",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Emotional Regulation",
        options: [
          "use appropriate coping strategies when frustrated",
          "identify emotional state and select a regulation strategy",
          "return to task after redirection within a reasonable time",
          "use a taught regulation strategy before escalation",
        ],
      },
      {
        label: "Replacement Behaviors",
        options: [
          "replace unsafe or disruptive behavior with an appropriate alternative behavior",
          "request a break appropriately",
          "use functional communication instead of problem behavior",
          "follow adult redirection without escalation",
        ],
      },
      {
        label: "Broad Support Needs",
        options: [
          "reduce frequency of physical aggression, verbal aggression, or unsafe behavior by using a replacement response",
          "transition out of challenging situations using adult-supported regulation strategies",
          "remain in the instructional setting with appropriate behavioral support",
          "demonstrate recovery after dysregulation with reduced adult support",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Behavior Data",
        options: [
          "behavior tracking data",
          "frequency counts",
          "duration data",
          "incident log review",
        ],
      },
    ],
  },

  "Executive Functioning": {
    conditionGroups: [
      {
        label: "Task Supports",
        options: [
          "Given a visual checklist and teacher prompts",
          "During independent work time",
          "During multi-step classroom tasks",
          "Given a timer and structured task breakdown",
        ],
      },
      {
        label: "Organization / Planning",
        options: [
          "Given planning tools and organizational supports",
          "During long-term assignment completion",
          "During note-taking and materials-management tasks",
          "Given teacher check-ins and guided planning tools",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Initiation / Attention",
        options: [
          "begin assigned tasks within 2 minutes",
          "follow multi-step directions in sequence",
          "sustain attention to a task for a set period of time",
          "shift between tasks with reduced prompting",
        ],
      },
      {
        label: "Organization / Planning",
        options: [
          "organize materials needed for class tasks",
          "use a planner, checklist, or calendar to track assignments",
          "break larger assignments into smaller steps",
          "plan and complete multi-step tasks with reduced adult support",
        ],
      },
      {
        label: "Time Management",
        options: [
          "manage time appropriately during class tasks",
          "estimate and monitor time needed for assignments",
          "complete tasks within a designated time frame",
          "use self-monitoring strategies to stay on task",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Executive Functioning Data",
        options: [
          "task completion checklists",
          "teacher observation data",
          "duration data",
          "self-monitoring logs",
        ],
      },
    ],
  },

  "Adaptive / Daily Living": {
    conditionGroups: [
      {
        label: "Self-Care",
        options: [
          "During daily hygiene routines",
          "Given a visual task analysis",
          "During dressing or personal care tasks",
          "During snack or meal routines",
        ],
      },
      {
        label: "School Routines",
        options: [
          "During daily classroom routines",
          "Given a visual schedule and classroom supports",
          "During arrival, dismissal, or transitions",
          "During structured independence routines",
        ],
      },
      {
        label: "Life Skills",
        options: [
          "During school-based daily living instruction",
          "During community-based instruction",
          "Given direct instruction, modeling, and prompting",
          "During functional independence tasks",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Self-Care",
        options: [
          "complete hygiene routines with increased independence",
          "complete dressing-related routines with reduced prompting",
          "use mealtime or feeding routines appropriately",
          "follow toileting or handwashing routines with increased independence",
        ],
      },
      {
        label: "Daily Routines",
        options: [
          "follow a visual schedule for daily routines",
          "independently gather and put away personal materials",
          "complete school routines with reduced adult prompting",
          "use appropriate steps to prepare for classroom activities",
        ],
      },
      {
        label: "Independence Skills",
        options: [
          "demonstrate increased independence in classroom self-help tasks",
          "use task analysis steps to complete a daily living task",
          "complete simple household or classroom maintenance tasks",
          "carry out a familiar routine with reduced prompting",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Adaptive Data",
        options: [
          "task analysis checklist data",
          "teacher observation data",
          "frequency counts",
          "independence rubric data",
        ],
      },
    ],
  },

  "Functional Academics": {
    conditionGroups: [
      {
        label: "Functional Reading",
        options: [
          "Given real-life reading materials",
          "Given environmental print, signs, symbols, or labels",
          "During functional reading activities",
          "During community-based instruction tasks",
        ],
      },
      {
        label: "Functional Math",
        options: [
          "Given money, clocks, schedules, or measurement tools",
          "During functional math activities",
          "During classroom store or simulated life-skills tasks",
          "During community-based problem-solving tasks",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Functional Reading",
        options: [
          "read and interpret functional words, signs, or symbols",
          "identify important information on forms, schedules, or menus",
          "use environmental print to make functional choices",
          "match symbols, words, or pictures to routine tasks",
        ],
      },
      {
        label: "Functional Math",
        options: [
          "use functional math skills in real-life scenarios",
          "identify coin and bill values accurately",
          "use time concepts to follow a routine or schedule",
          "apply reading or math skills to daily living tasks",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Functional Data",
        options: [
          "teacher-collected work samples",
          "task completion checklists",
          "community-based instruction data",
          "trial-based data collection",
        ],
      },
    ],
  },

  "Motor / Participation": {
    conditionGroups: [
      {
        label: "Fine Motor",
        options: [
          "During classroom fine motor tasks",
          "During writing, cutting, or manipulatives tasks",
          "Given adapted materials and positioning supports",
          "During seated tabletop activities",
        ],
      },
      {
        label: "Gross Motor",
        options: [
          "During gross motor activities",
          "During adapted physical participation tasks",
          "During movement-based classroom routines",
          "During playground or physical education participation",
        ],
      },
      {
        label: "Participation",
        options: [
          "During classroom routines requiring motor participation",
          "During transitions across classroom environments",
          "During multi-step school participation tasks",
          "During adapted participation opportunities with supports",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Fine Motor",
        options: [
          "use fine motor skills to complete classroom tasks",
          "manipulate classroom tools and materials more independently",
          "maintain grasp and control during writing or tool use",
          "complete bilateral tasks with improved coordination",
        ],
      },
      {
        label: "Gross Motor",
        options: [
          "demonstrate improved gross motor coordination during movement activities",
          "participate in movement-based activities with increased balance and control",
          "complete gross motor actions as part of classroom or school routines",
          "navigate school activities with improved motor planning",
        ],
      },
      {
        label: "Participation",
        options: [
          "participate in classroom routines with improved motor coordination",
          "maintain participation in motor-based tasks for a set duration",
          "use positioning or adaptive supports to increase engagement",
          "complete school participation routines with reduced physical assistance",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Motor Data",
        options: [
          "teacher observation data",
          "task completion checklist data",
          "occupational or physical therapy session data",
          "duration data",
        ],
      },
    ],
  },

  "Sensory / Self-Regulation": {
    conditionGroups: [
      {
        label: "Sensory Supports",
        options: [
          "Given sensory supports and scheduled regulation breaks",
          "During classroom transitions",
          "During sensory-rich or challenging environments",
          "Given access to a sensory regulation plan",
        ],
      },
      {
        label: "Across Levels",
        options: [
          "During group instruction and classroom routines",
          "During unstructured times and transitions",
          "Given adult support and sensory tools",
          "During tasks requiring sustained attention and regulation",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Sensory Regulation",
        options: [
          "use a sensory strategy to regulate arousal level",
          "identify need for a break and request it appropriately",
          "return to learning after use of a regulation strategy",
          "maintain regulation during transitions or environmental changes",
        ],
      },
      {
        label: "Broad PK–12 Regulation",
        options: [
          "use a taught strategy to remain regulated during instruction",
          "demonstrate improved body regulation during classroom activities",
          "recover from sensory overload with reduced adult support",
          "participate in classroom routines after using a sensory support",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Sensory Data",
        options: [
          "behavior tracking data",
          "teacher observation data",
          "frequency counts",
          "self-monitoring logs",
        ],
      },
    ],
  },

  "Transition / Postsecondary": {
    conditionGroups: [
      {
        label: "Vocational / School-Based Transition",
        options: [
          "During school-based vocational activities",
          "Given a job task checklist",
          "During postsecondary planning activities",
          "During structured self-advocacy instruction",
        ],
      },
      {
        label: "Community / Adult Living",
        options: [
          "During community-based instruction",
          "During independent living instruction",
          "Given direct instruction and visual supports",
          "During real-world transition tasks",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Vocational",
        options: [
          "complete job-related tasks with increased independence",
          "demonstrate workplace readiness behaviors",
          "use a task checklist to complete assigned vocational steps",
          "follow job-site expectations with reduced prompts",
        ],
      },
      {
        label: "Postsecondary Planning",
        options: [
          "identify postsecondary goals and related action steps",
          "use self-advocacy skills to communicate transition needs and preferences",
          "identify school or community resources related to postsecondary planning",
          "participate in transition planning activities with increased independence",
        ],
      },
      {
        label: "Independent / Supported Living",
        options: [
          "demonstrate daily living or community access skills needed for adult life",
          "complete supported living or independent living tasks with increased independence",
          "use transportation, community, or life-skills routines appropriately",
          "apply transition-related skills across school and community settings",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Transition Data",
        options: [
          "task completion checklist data",
          "teacher observation data",
          "vocational performance rubrics",
          "community-based instruction data",
        ],
      },
    ],
  },

  "Deaf / Hard of Hearing": {
    conditionGroups: [
      {
        label: "Communication Access",
        options: [
          "Given visual supports and signed or spoken instruction",
          "During interpreter-supported classroom instruction",
          "During listening and communication activities",
          "Given access to assistive listening technology",
        ],
      },
      {
        label: "Across PK–12",
        options: [
          "During classroom communication opportunities",
          "During group instruction and discussion",
          "Given direct teaching of self-advocacy and communication strategies",
          "During language-rich or peer interaction tasks",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Access / Comprehension",
        options: [
          "demonstrate understanding of classroom information presented through the student’s communication mode",
          "follow instructional directions presented with auditory and visual supports",
          "participate appropriately in classroom discussion using the student’s communication mode",
          "demonstrate comprehension of instruction with reduced need for repetition",
        ],
      },
      {
        label: "Self-Advocacy / Communication",
        options: [
          "use self-advocacy skills to request clarification or repetition",
          "communicate needs related to hearing devices, interpreter support, or classroom access",
          "use appropriate communication repair strategies during breakdowns",
          "engage with peers and adults using the student’s primary communication mode",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "DHH Data",
        options: [
          "teacher observation data",
          "trial-based data collection",
          "language sample data",
          "service-provider progress data",
        ],
      },
    ],
  },

  "Visual Impairment / Orientation & Mobility": {
    conditionGroups: [
      {
        label: "Instructional Access",
        options: [
          "Given tactile, auditory, or enlarged materials",
          "Given access to assistive technology for visual support",
          "During classroom tasks requiring access to printed or visual content",
          "Given direct instruction in adapted access strategies",
        ],
      },
      {
        label: "Orientation & Mobility",
        options: [
          "During orientation and mobility instruction",
          "During classroom travel routines",
          "During school navigation tasks",
          "During supported community travel activities",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Instructional Access",
        options: [
          "use visual, tactile, or auditory strategies to access instructional materials",
          "use assistive tools to access classroom content more independently",
          "demonstrate effective use of adapted materials during instruction",
          "access grade-level or adapted content using appropriate visual supports",
        ],
      },
      {
        label: "Orientation & Mobility",
        options: [
          "navigate familiar school environments safely",
          "use orientation and mobility techniques during travel routines",
          "demonstrate safe movement through classroom and school environments",
          "use environmental cues and mobility strategies with increased independence",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "VI / O&M Data",
        options: [
          "teacher observation data",
          "orientation and mobility progress data",
          "task completion checklist data",
          "trial-based data collection",
        ],
      },
    ],
  },

  "Extensive Support Needs": {
    conditionGroups: [
      {
        label: "Functional Communication",
        options: [
          "During highly supported instructional routines",
          "During functional communication opportunities",
          "Given repeated modeling, prompting, and visual supports",
          "During structured daily living activities",
        ],
      },
      {
        label: "Participation / Foundational Skills",
        options: [
          "During familiar classroom routines",
          "Given consistent adult support and repeated practice",
          "During sensory, motor, or communication-based activities",
          "During highly structured participation opportunities",
        ],
      },
    ],
    behaviorGroups: [
      {
        label: "Communication / Response",
        options: [
          "demonstrate a consistent response to a communication cue",
          "make choices using available communication supports",
          "use a consistent signal, gesture, symbol, or AAC response to communicate a need",
          "demonstrate intentional communication during familiar routines",
        ],
      },
      {
        label: "Participation / Foundations",
        options: [
          "participate in a familiar routine with increased independence",
          "demonstrate cause-and-effect understanding during structured activities",
          "engage in a familiar activity for an increased duration",
          "complete routine participation steps with reduced prompting",
        ],
      },
      {
        label: "PK–12 Friendly Functional Skills",
        options: [
          "demonstrate increased engagement in age-appropriate instructional routines",
          "use foundational skills to participate meaningfully in daily activities",
          "respond consistently across multiple communication partners or settings",
          "participate in functional tasks with increased independence and reduced prompting",
        ],
      },
    ],
    measurementGroups: [
      {
        label: "Extensive Support Needs Data",
        options: [
          "trial-based data collection",
          "frequency counts",
          "task analysis checklist data",
          "teacher observation data",
        ],
      },
    ],
  },
};

const initialForm: GoalFormData = {
  goalDomain: "",
  condition: "",
  behavior: "",
  measurement: "",
  criteria: "",
  timeline: "",
  baseline: "",
};

const goalTemplates: GoalTemplate[] = [
  {
    id: 1,
    title: "Letter Identification",
    domain: "Academic",
    data: {
      goalDomain: "Academic",
      condition: "Given letter cards and visual supports",
      behavior: "identify uppercase and lowercase letters",
      measurement: "teacher-collected work samples",
      criteria: "4 out of 5 trials",
      timeline: "by the end of the current school year",
      baseline: "Currently identifies some letters inconsistently and needs repeated prompting.",
    },
  },
  {
    id: 2,
    title: "Phonics / Letter Sounds",
    domain: "Academic",
    data: {
      goalDomain: "Academic",
      condition: "During phonological awareness instruction",
      behavior: "produce letter sounds",
      measurement: "weekly progress monitoring probes",
      criteria: "80% accuracy across 3 consecutive sessions",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently produces letter sounds with less than 50% accuracy.",
    },
  },
  {
    id: 3,
    title: "Reading Comprehension",
    domain: "Academic",
    data: {
      goalDomain: "Academic",
      condition: "Given adapted reading passages",
      behavior: "answer comprehension questions using text evidence",
      measurement: "curriculum-based assessments",
      criteria: "80% accuracy across 3 consecutive sessions",
      timeline: "by the next annual review",
      baseline: "Currently answers comprehension questions with about 45% accuracy.",
    },
  },
  {
    id: 4,
    title: "Written Paragraph",
    domain: "Academic",
    data: {
      goalDomain: "Academic",
      condition: "Given a paragraph organizer",
      behavior: "write a complete paragraph with a topic sentence and supporting details",
      measurement: "rubric-scored classroom assignments",
      criteria: "4 out of 5 trials",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently writes simple sentences but needs support to organize a paragraph.",
    },
  },
  {
    id: 5,
    title: "Foundational Math",
    domain: "Academic",
    data: {
      goalDomain: "Academic",
      condition: "Given math manipulatives and visual models",
      behavior: "count objects accurately and match quantities to numerals",
      measurement: "teacher-collected work samples",
      criteria: "4 out of 5 trials",
      timeline: "by the end of the current school year",
      baseline: "Currently counts with errors and needs visual support.",
    },
  },
  {
    id: 6,
    title: "Multi-Step Problem Solving",
    domain: "Academic",
    data: {
      goalDomain: "Academic",
      condition: "During independent math problem-solving tasks",
      behavior: "solve multi-step math problems accurately",
      measurement: "curriculum-based assessments",
      criteria: "80% accuracy across 3 consecutive sessions",
      timeline: "by the next annual review",
      baseline: "Currently solves multi-step problems with about 40% accuracy.",
    },
  },
  {
    id: 7,
    title: "Expressive Sentences",
    domain: "Communication / Language",
    data: {
      goalDomain: "Communication / Language",
      condition: "Given sentence frames and modeled responses",
      behavior: "use complete sentences to express wants, needs, or ideas",
      measurement: "language sample data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently communicates basic wants and needs using short or incomplete utterances.",
    },
  },
  {
    id: 8,
    title: "Following Directions",
    domain: "Communication / Language",
    data: {
      goalDomain: "Communication / Language",
      condition: "Given visual supports and teacher cues",
      behavior: "follow multi-step verbal directions",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "within 36 instructional weeks",
      baseline: "Currently follows one-step directions consistently but struggles with multi-step directions.",
    },
  },
  {
    id: 9,
    title: "Functional Communication Requesting",
    domain: "Communication / Language",
    data: {
      goalDomain: "Communication / Language",
      condition: "During structured opportunities to request, protest, or comment",
      behavior: "initiate communication to gain attention, request, protest, or comment",
      measurement: "trial-based data collection",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently initiates communication inconsistently and often requires prompts.",
    },
  },
  {
    id: 10,
    title: "AAC Choice Making",
    domain: "Communication / Language",
    data: {
      goalDomain: "Communication / Language",
      condition: "Given access to AAC or alternative communication supports",
      behavior: "communicate choices using speech, gesture, signs, symbols, or AAC",
      measurement: "speech-language service data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently communicates choices inconsistently with support.",
    },
  },
  {
    id: 11,
    title: "Joint Attention",
    domain: "Social / Pragmatic Communication",
    data: {
      goalDomain: "Social / Pragmatic Communication",
      condition: "During adult-led social play activities",
      behavior: "engage in joint attention during shared activities",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the current school year",
      baseline: "Currently inconsistently joins shared activities and needs prompting.",
    },
  },
  {
    id: 12,
    title: "Turn Taking",
    domain: "Social / Pragmatic Communication",
    data: {
      goalDomain: "Social / Pragmatic Communication",
      condition: "During turn-taking games and activities",
      behavior: "participate in turn-taking activities",
      measurement: "frequency counts",
      criteria: "4 out of 5 opportunities",
      timeline: "within 18 weeks",
      baseline: "Currently requires adult support to wait and take turns.",
    },
  },
  {
    id: 13,
    title: "Peer Interaction",
    domain: "Social / Pragmatic Communication",
    data: {
      goalDomain: "Social / Pragmatic Communication",
      condition: "During peer-supported group tasks",
      behavior: "initiate appropriate peer interactions",
      measurement: "social skills checklist data",
      criteria: "3 out of 4 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently interacts with peers inconsistently and often requires prompting to initiate.",
    },
  },
  {
    id: 14,
    title: "Conversation Maintenance",
    domain: "Social / Pragmatic Communication",
    data: {
      goalDomain: "Social / Pragmatic Communication",
      condition: "During classroom conversation opportunities",
      behavior: "maintain a back-and-forth conversation for multiple exchanges",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently responds in conversation but struggles to maintain reciprocal exchange.",
    },
  },
  {
    id: 15,
    title: "Coping Strategy Use",
    domain: "Behavior / Emotional Regulation",
    data: {
      goalDomain: "Behavior / Emotional Regulation",
      condition: "Given access to a self-regulation support plan",
      behavior: "use appropriate coping strategies when frustrated",
      measurement: "behavior tracking data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently needs frequent adult support to use coping strategies appropriately.",
    },
  },
  {
    id: 16,
    title: "Break Request",
    domain: "Behavior / Emotional Regulation",
    data: {
      goalDomain: "Behavior / Emotional Regulation",
      condition: "During transitions between classroom activities",
      behavior: "request a break appropriately",
      measurement: "frequency counts",
      criteria: "4 out of 5 opportunities",
      timeline: "within 18 weeks",
      baseline: "Currently escalates or leaves task without using a break request.",
    },
  },
  {
    id: 17,
    title: "Replacement Behavior",
    domain: "Behavior / Emotional Regulation",
    data: {
      goalDomain: "Behavior / Emotional Regulation",
      condition: "During non-preferred tasks",
      behavior: "replace unsafe or disruptive behavior with an appropriate alternative behavior",
      measurement: "incident log review",
      criteria: "with no more than 2 prompts in 4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently demonstrates disruptive behavior during challenging tasks on most school days.",
    },
  },
  {
    id: 18,
    title: "Recovery After Redirection",
    domain: "Behavior / Emotional Regulation",
    data: {
      goalDomain: "Behavior / Emotional Regulation",
      condition: "During whole-group instruction",
      behavior: "return to task after redirection within a reasonable time",
      measurement: "duration data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently requires extended time and multiple adult prompts to return to task.",
    },
  },
  {
    id: 19,
    title: "Task Initiation",
    domain: "Executive Functioning",
    data: {
      goalDomain: "Executive Functioning",
      condition: "Given a visual checklist and teacher prompts",
      behavior: "begin assigned tasks within 2 minutes",
      measurement: "task completion checklists",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently begins tasks independently in about 1 out of 5 opportunities.",
    },
  },
  {
    id: 20,
    title: "Materials Organization",
    domain: "Executive Functioning",
    data: {
      goalDomain: "Executive Functioning",
      condition: "During note-taking and materials-management tasks",
      behavior: "organize materials needed for class tasks",
      measurement: "teacher observation data",
      criteria: "with 80% independence across 3 consecutive sessions",
      timeline: "within 36 instructional weeks",
      baseline: "Currently loses materials and needs repeated reminders to organize.",
    },
  },
  {
    id: 21,
    title: "Planning Long-Term Assignments",
    domain: "Executive Functioning",
    data: {
      goalDomain: "Executive Functioning",
      condition: "During long-term assignment completion",
      behavior: "break larger assignments into smaller steps",
      measurement: "self-monitoring logs",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently struggles to plan and sequence multi-step assignments.",
    },
  },
  {
    id: 22,
    title: "Time Management",
    domain: "Executive Functioning",
    data: {
      goalDomain: "Executive Functioning",
      condition: "Given planning tools and organizational supports",
      behavior: "manage time appropriately during class tasks",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently needs frequent prompts to stay aware of time limits.",
    },
  },
  {
    id: 23,
    title: "Hygiene Routine",
    domain: "Adaptive / Daily Living",
    data: {
      goalDomain: "Adaptive / Daily Living",
      condition: "During daily hygiene routines",
      behavior: "complete hygiene routines with increased independence",
      measurement: "task analysis checklist data",
      criteria: "with no more than 1 prompt in 4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently completes parts of the routine but requires multiple prompts.",
    },
  },
  {
    id: 24,
    title: "Visual Schedule Follow Through",
    domain: "Adaptive / Daily Living",
    data: {
      goalDomain: "Adaptive / Daily Living",
      condition: "Given a visual schedule and classroom supports",
      behavior: "follow a visual schedule for daily routines",
      measurement: "independence rubric data",
      criteria: "4 out of 5 opportunities",
      timeline: "within 18 weeks",
      baseline: "Currently needs frequent adult assistance to move through daily routines.",
    },
  },
  {
    id: 25,
    title: "Material Management",
    domain: "Adaptive / Daily Living",
    data: {
      goalDomain: "Adaptive / Daily Living",
      condition: "During daily classroom routines",
      behavior: "independently gather and put away personal materials",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the current semester",
      baseline: "Currently needs repeated adult support to manage belongings.",
    },
  },
  {
    id: 26,
    title: "Functional Self-Help",
    domain: "Adaptive / Daily Living",
    data: {
      goalDomain: "Adaptive / Daily Living",
      condition: "During school-based daily living instruction",
      behavior: "use task analysis steps to complete a daily living task",
      measurement: "task analysis checklist data",
      criteria: "with 80% independence across 3 consecutive sessions",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently completes some steps independently but misses others without prompting.",
    },
  },
  {
    id: 27,
    title: "Functional Reading",
    domain: "Functional Academics",
    data: {
      goalDomain: "Functional Academics",
      condition: "Given environmental print, signs, symbols, or labels",
      behavior: "read and interpret functional words, signs, or symbols",
      measurement: "trial-based data collection",
      criteria: "4 out of 5 trials",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently identifies some functional words and symbols but not consistently.",
    },
  },
  {
    id: 28,
    title: "Functional Money Skills",
    domain: "Functional Academics",
    data: {
      goalDomain: "Functional Academics",
      condition: "Given money, clocks, schedules, or measurement tools",
      behavior: "use functional math skills in real-life scenarios",
      measurement: "community-based instruction data",
      criteria: "80% accuracy across 3 consecutive sessions",
      timeline: "by the next annual review",
      baseline: "Currently uses basic functional math skills with frequent prompting.",
    },
  },
  {
    id: 29,
    title: "Environmental Print Use",
    domain: "Functional Academics",
    data: {
      goalDomain: "Functional Academics",
      condition: "During functional reading activities",
      behavior: "use environmental print to make functional choices",
      measurement: "teacher-collected work samples",
      criteria: "4 out of 5 opportunities",
      timeline: "within 18 weeks",
      baseline: "Currently recognizes some common signs but needs support to use them functionally.",
    },
  },
  {
    id: 30,
    title: "Schedule / Menu Reading",
    domain: "Functional Academics",
    data: {
      goalDomain: "Functional Academics",
      condition: "Given real-life reading materials",
      behavior: "identify important information on forms, schedules, or menus",
      measurement: "task completion checklists",
      criteria: "4 out of 5 trials",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently can identify limited information with support.",
    },
  },
  {
    id: 31,
    title: "Fine Motor Classroom Task",
    domain: "Motor / Participation",
    data: {
      goalDomain: "Motor / Participation",
      condition: "During classroom fine motor tasks",
      behavior: "use fine motor skills to complete classroom tasks",
      measurement: "occupational or physical therapy session data",
      criteria: "4 out of 5 opportunities",
      timeline: "within 36 instructional weeks",
      baseline: "Currently requires support to manipulate classroom materials efficiently.",
    },
  },
  {
    id: 32,
    title: "Gross Motor Participation",
    domain: "Motor / Participation",
    data: {
      goalDomain: "Motor / Participation",
      condition: "During gross motor activities",
      behavior: "demonstrate improved gross motor coordination during movement activities",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently participates with limited coordination and frequent support.",
    },
  },
  {
    id: 33,
    title: "Adaptive Participation",
    domain: "Motor / Participation",
    data: {
      goalDomain: "Motor / Participation",
      condition: "Given adapted materials and positioning supports",
      behavior: "participate in classroom routines with improved motor coordination",
      measurement: "duration data",
      criteria: "for 10 consecutive minutes in 4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently participates briefly before fatigue or motor difficulty impacts engagement.",
    },
  },
  {
    id: 34,
    title: "Tool Manipulation",
    domain: "Motor / Participation",
    data: {
      goalDomain: "Motor / Participation",
      condition: "During writing, cutting, or manipulatives tasks",
      behavior: "manipulate classroom tools and materials more independently",
      measurement: "task completion checklist data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the current semester",
      baseline: "Currently needs physical support to use some classroom tools.",
    },
  },
  {
    id: 35,
    title: "Sensory Break Request",
    domain: "Sensory / Self-Regulation",
    data: {
      goalDomain: "Sensory / Self-Regulation",
      condition: "Given access to a sensory regulation plan",
      behavior: "identify need for a break and request it appropriately",
      measurement: "frequency counts",
      criteria: "4 out of 5 opportunities",
      timeline: "within 18 weeks",
      baseline: "Currently needs adult prompting to recognize and communicate regulation needs.",
    },
  },
  {
    id: 36,
    title: "Transition Regulation",
    domain: "Sensory / Self-Regulation",
    data: {
      goalDomain: "Sensory / Self-Regulation",
      condition: "During classroom transitions",
      behavior: "maintain regulation during transitions or environmental changes",
      measurement: "teacher observation data",
      criteria: "with no more than 2 prompts in 4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently dysregulates during transitions and often needs multiple prompts and support.",
    },
  },
  {
    id: 37,
    title: "Sensory Strategy Use",
    domain: "Sensory / Self-Regulation",
    data: {
      goalDomain: "Sensory / Self-Regulation",
      condition: "Given sensory supports and scheduled regulation breaks",
      behavior: "use a sensory strategy to regulate arousal level",
      measurement: "behavior tracking data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently relies on adult initiation of sensory strategies.",
    },
  },
  {
    id: 38,
    title: "Body Regulation",
    domain: "Sensory / Self-Regulation",
    data: {
      goalDomain: "Sensory / Self-Regulation",
      condition: "During group instruction and classroom routines",
      behavior: "demonstrate improved body regulation during classroom activities",
      measurement: "teacher observation data",
      criteria: "for 10 consecutive minutes in 4 out of 5 opportunities",
      timeline: "by the end of the current school year",
      baseline: "Currently needs frequent prompts and movement breaks to maintain regulation.",
    },
  },
  {
    id: 39,
    title: "Workplace Readiness",
    domain: "Transition / Postsecondary",
    data: {
      goalDomain: "Transition / Postsecondary",
      condition: "During school-based vocational activities",
      behavior: "demonstrate workplace readiness behaviors",
      measurement: "vocational performance rubrics",
      criteria: "with 80% independence across 3 consecutive sessions",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently demonstrates some workplace behaviors but needs frequent reminders and prompts.",
    },
  },
  {
    id: 40,
    title: "Job Task Completion",
    domain: "Transition / Postsecondary",
    data: {
      goalDomain: "Transition / Postsecondary",
      condition: "Given a job task checklist",
      behavior: "complete job-related tasks with increased independence",
      measurement: "task completion checklist data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently completes job tasks with partial independence and staff support.",
    },
  },
  {
    id: 41,
    title: "Self-Advocacy for Transition",
    domain: "Transition / Postsecondary",
    data: {
      goalDomain: "Transition / Postsecondary",
      condition: "During structured self-advocacy instruction",
      behavior: "use self-advocacy skills to communicate transition needs and preferences",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the current school year",
      baseline: "Currently participates in planning but rarely communicates needs independently.",
    },
  },
  {
    id: 42,
    title: "Community Living Skills",
    domain: "Transition / Postsecondary",
    data: {
      goalDomain: "Transition / Postsecondary",
      condition: "During independent living instruction",
      behavior: "demonstrate daily living or community access skills needed for adult life",
      measurement: "community-based instruction data",
      criteria: "with 80% independence across 3 consecutive sessions",
      timeline: "by the next annual review",
      baseline: "Currently performs selected community routines with frequent support.",
    },
  },
  {
    id: 43,
    title: "DHH Self-Advocacy",
    domain: "Deaf / Hard of Hearing",
    data: {
      goalDomain: "Deaf / Hard of Hearing",
      condition: "During interpreter-supported classroom instruction",
      behavior: "use self-advocacy skills to request clarification or repetition",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "within 36 instructional weeks",
      baseline: "Currently inconsistently requests clarification when communication breakdown occurs.",
    },
  },
  {
    id: 44,
    title: "Instructional Understanding",
    domain: "Deaf / Hard of Hearing",
    data: {
      goalDomain: "Deaf / Hard of Hearing",
      condition: "Given visual supports and signed or spoken instruction",
      behavior:
        "demonstrate understanding of classroom information presented through the student’s communication mode",
      measurement: "service-provider progress data",
      criteria: "80% accuracy across 3 consecutive sessions",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently demonstrates partial understanding but often misses details without added support.",
    },
  },
  {
    id: 45,
    title: "Communication Repair",
    domain: "Deaf / Hard of Hearing",
    data: {
      goalDomain: "Deaf / Hard of Hearing",
      condition: "During classroom communication opportunities",
      behavior: "use appropriate communication repair strategies during breakdowns",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently experiences communication breakdowns without consistently repairing them.",
    },
  },
  {
    id: 46,
    title: "Discussion Participation",
    domain: "Deaf / Hard of Hearing",
    data: {
      goalDomain: "Deaf / Hard of Hearing",
      condition: "During group instruction and discussion",
      behavior: "participate appropriately in classroom discussion using the student’s communication mode",
      measurement: "language sample data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the current school year",
      baseline: "Currently participates inconsistently in discussion without support.",
    },
  },
  {
    id: 47,
    title: "Orientation and Mobility",
    domain: "Visual Impairment / Orientation & Mobility",
    data: {
      goalDomain: "Visual Impairment / Orientation & Mobility",
      condition: "During orientation and mobility instruction",
      behavior: "use orientation and mobility techniques during travel routines",
      measurement: "orientation and mobility progress data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently uses some travel routines with support but needs prompts for consistency.",
    },
  },
  {
    id: 48,
    title: "Accessible Material Use",
    domain: "Visual Impairment / Orientation & Mobility",
    data: {
      goalDomain: "Visual Impairment / Orientation & Mobility",
      condition: "Given tactile, auditory, or enlarged materials",
      behavior: "use visual, tactile, or auditory strategies to access instructional materials",
      measurement: "teacher observation data",
      criteria: "with 80% independence across 3 consecutive sessions",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently accesses instructional materials with adult setup and prompting.",
    },
  },
  {
    id: 49,
    title: "School Navigation",
    domain: "Visual Impairment / Orientation & Mobility",
    data: {
      goalDomain: "Visual Impairment / Orientation & Mobility",
      condition: "During school navigation tasks",
      behavior: "navigate familiar school environments safely",
      measurement: "orientation and mobility progress data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the end of the current school year",
      baseline: "Currently navigates familiar routes with support and verbal prompting.",
    },
  },
  {
    id: 50,
    title: "Assistive Access Strategy",
    domain: "Visual Impairment / Orientation & Mobility",
    data: {
      goalDomain: "Visual Impairment / Orientation & Mobility",
      condition: "Given access to assistive technology for visual support",
      behavior: "use assistive tools to access classroom content more independently",
      measurement: "task completion checklist data",
      criteria: "with 80% independence across 3 consecutive sessions",
      timeline: "by the next annual review",
      baseline: "Currently uses assistive tools inconsistently and needs adult setup.",
    },
  },
  {
    id: 51,
    title: "Choice Making",
    domain: "Extensive Support Needs",
    data: {
      goalDomain: "Extensive Support Needs",
      condition: "During functional communication opportunities",
      behavior: "make choices using available communication supports",
      measurement: "trial-based data collection",
      criteria: "4 out of 5 opportunities",
      timeline: "within 36 instructional weeks",
      baseline: "Currently makes choices inconsistently and often requires full prompting.",
    },
  },
  {
    id: 52,
    title: "Routine Participation",
    domain: "Extensive Support Needs",
    data: {
      goalDomain: "Extensive Support Needs",
      condition: "During familiar classroom routines",
      behavior: "participate in a familiar routine with increased independence",
      measurement: "task analysis checklist data",
      criteria: "with no more than 2 prompts in 4 out of 5 opportunities",
      timeline: "by the end of the annual IEP period",
      baseline: "Currently participates in familiar routines with significant adult support.",
    },
  },
  {
    id: 53,
    title: "Consistent Communication Response",
    domain: "Extensive Support Needs",
    data: {
      goalDomain: "Extensive Support Needs",
      condition: "Given repeated modeling, prompting, and visual supports",
      behavior: "demonstrate a consistent response to a communication cue",
      measurement: "teacher observation data",
      criteria: "4 out of 5 opportunities",
      timeline: "by the next annual review",
      baseline: "Currently responds inconsistently to communication cues across partners.",
    },
  },
  {
    id: 54,
    title: "Cause and Effect Participation",
    domain: "Extensive Support Needs",
    data: {
      goalDomain: "Extensive Support Needs",
      condition: "During highly structured participation opportunities",
      behavior: "demonstrate cause-and-effect understanding during structured activities",
      measurement: "trial-based data collection",
      criteria: "4 out of 5 trials",
      timeline: "by the end of the current school year",
      baseline: "Currently demonstrates emerging awareness of cause and effect with full support.",
    },
  },
];

function buildGoalVariants(formData: GoalFormData) {
  const { condition, behavior, measurement, criteria, timeline } = formData;

  if (!condition || !behavior || !measurement || !criteria || !timeline) {
    return [];
  }

  return [
    `${condition}, the student will ${behavior} as measured by ${measurement}, achieving ${criteria} ${timeline}.`,
    `${condition}, the student will ${behavior} with progress documented through ${measurement}, meeting ${criteria} ${timeline}.`,
    `${timeline}, the student will ${behavior} ${condition.toLowerCase()} as measured by ${measurement}, achieving ${criteria}.`,
  ];
}

function getQualityChecks(formData: GoalFormData) {
  return [
    {
      label: "Goal domain selected",
      status: formData.goalDomain ? "pass" : "fail",
      message: formData.goalDomain
        ? "A goal domain is selected."
        : "Select a goal domain to narrow the tool to the right need area.",
    },
    {
      label: "Condition included",
      status: formData.condition ? "pass" : "fail",
      message: formData.condition
        ? "A condition is included."
        : "Add a condition for when or how the skill will be performed.",
    },
    {
      label: "Behavior is measurable",
      status: formData.behavior ? "pass" : "fail",
      message: formData.behavior
        ? "A target behavior is included."
        : "Add a clear, observable behavior.",
    },
    {
      label: "Measurement included",
      status: formData.measurement ? "pass" : "fail",
      message: formData.measurement
        ? "A measurement method is included."
        : "Add how progress will be measured.",
    },
    {
      label: "Criteria is specific",
      status:
        formData.criteria &&
        /%|opportunities|trials|sessions|minutes|prompt|independence|accuracy/i.test(
          formData.criteria
        )
          ? "pass"
          : formData.criteria
            ? "warn"
            : "fail",
      message:
        formData.criteria &&
        /%|opportunities|trials|sessions|minutes|prompt|independence|accuracy/i.test(
          formData.criteria
        )
          ? "Criteria looks specific."
          : formData.criteria
            ? "Criteria may be too vague. Try using prompts, opportunities, minutes, or accuracy."
            : "Add success criteria.",
    },
    {
      label: "Timeline present",
      status: formData.timeline ? "pass" : "fail",
      message: formData.timeline
        ? "A timeline is included."
        : "Add a timeline for when the goal should be achieved.",
    },
  ];
}

function getStatusStyles(status: string) {
  if (status === "pass") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "warn") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-rose-200 bg-rose-50 text-rose-800";
}

function getStatusIcon(status: string) {
  if (status === "pass") return "✅";
  if (status === "warn") return "⚠️";
  return "❌";
}

function getSmartSuggestions(formData: GoalFormData) {
  const suggestions: string[] = [];

  if (!formData.goalDomain) {
    suggestions.push(
      "Start by selecting a goal domain so the tool can narrow the options to the right need area."
    );
  }

  if (formData.goalDomain === "Academic") {
    suggestions.push(
      "Academic goals should now work across PK–12. Choose foundational, grade-level, or advanced options based on student need rather than age."
    );
  }

  if (formData.goalDomain === "Communication / Language") {
    suggestions.push(
      "This domain now includes expressive, receptive, AAC, and functional communication paths. Pick the communication mode that actually fits the student."
    );
  }

  if (formData.goalDomain === "Social / Pragmatic Communication") {
    suggestions.push(
      "This area should scale from foundational engagement to advanced conversation skills. Choose an option that matches the student’s actual communication level."
    );
  }

  if (formData.goalDomain === "Behavior / Emotional Regulation") {
    suggestions.push(
      "Behavior goals are stronger when they name the replacement behavior, not just the problem behavior."
    );
  }

  if (formData.goalDomain === "Executive Functioning") {
    suggestions.push(
      "Executive functioning should stay targeted to older students. Focus on initiation, planning, organization, time management, and sustained task behavior."
    );
  }

  if (formData.goalDomain === "Adaptive / Daily Living") {
    suggestions.push(
      "Adaptive / Daily Living is a major area in special education. Use self-care, routine, and independence options that fit the student’s actual support level."
    );
  }

  if (formData.goalDomain === "Transition / Postsecondary") {
    suggestions.push(
      "Transition is not one path. Choose options that fit college, work, supported employment, independent living, or supported living needs."
    );
  }

  if (
    formData.goalDomain === "Deaf / Hard of Hearing" ||
    formData.goalDomain === "Visual Impairment / Orientation & Mobility"
  ) {
    suggestions.push(
      "These domains should explicitly reflect how the student accesses instruction, communicates, travels, and advocates in real school settings."
    );
  }

  if (formData.goalDomain === "Extensive Support Needs") {
    suggestions.push(
      "For extensive support needs, functional communication, participation, cause-and-effect, and routine engagement may be more appropriate than grade-level academic wording."
    );
  }

  if (!formData.measurement) {
    suggestions.push(
      "Choose a measurement method so progress can be documented clearly over time."
    );
  }

  if (!formData.criteria) {
    suggestions.push(
      "Use concrete criteria such as opportunities, trials, sessions, prompts, minutes, or accuracy."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Use the Goal Bank for a faster starting point, then edit the language to fit the student need."
    );
  }

  return suggestions;
}

function renderGroupedOptions(groups: OptionGroup[]) {
  return groups.map((group) => (
    <optgroup key={group.label} label={group.label}>
      {group.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </optgroup>
  ));
}

function countGroupedOptions(groups: OptionGroup[]) {
  return groups.reduce((total, group) => total + group.options.length, 0);
}

export default function Home() {
  const [formData, setFormData] = useState<GoalFormData>(initialForm);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const selectedDomainConfig =
    formData.goalDomain && domainConfigs[formData.goalDomain]
      ? domainConfigs[formData.goalDomain]
      : null;

  const filteredTemplates = formData.goalDomain
    ? goalTemplates.filter((template) => template.domain === formData.goalDomain)
    : [];

  const goalVariations = useMemo(() => buildGoalVariants(formData), [formData]);
  const qualityChecks = useMemo(() => getQualityChecks(formData), [formData]);
  const smartSuggestions = useMemo(() => getSmartSuggestions(formData), [formData]);

  const selectedGoal =
    goalVariations[selectedVariationIndex] ||
    "Select a domain and complete the required fields to generate goal options.";

  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    if (name === "goalDomain") {
      setFormData({
        goalDomain: value,
        condition: "",
        behavior: "",
        measurement: "",
        criteria: "",
        timeline: "",
        baseline: "",
      });
      setSelectedTemplateId("");
      setSelectedVariationIndex(0);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedVariationIndex(0);
  }

  function handleTemplateChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const templateId = event.target.value;
    setSelectedTemplateId(templateId);

    const selectedTemplate = goalTemplates.find(
      (template) => template.id === Number(templateId)
    );

    if (selectedTemplate) {
      setFormData(selectedTemplate.data);
      setSelectedVariationIndex(0);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(selectedGoal);
      alert("Goal copied to clipboard.");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  }

  function handleReset() {
    setFormData(initialForm);
    setSelectedVariationIndex(0);
    setSelectedTemplateId("");
  }

  const availableConditionCount = selectedDomainConfig
    ? countGroupedOptions(selectedDomainConfig.conditionGroups)
    : 0;

  const availableBehaviorCount = selectedDomainConfig
    ? countGroupedOptions(selectedDomainConfig.behaviorGroups)
    : 0;

  const availableMeasurementCount = selectedDomainConfig
    ? countGroupedOptions(selectedDomainConfig.measurementGroups)
    : 0;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            GoalCraft
          </p>
          <h1 className="mt-2 text-4xl font-bold">IEP Goal Generator</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Create clearer, more measurable IEP goals with domain-based options,
            grouped dropdowns, reusable templates, and quick quality feedback.
          </p>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_1.2fr]">
          <section className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Goal Details</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Start with a domain, then choose from grouped options built for that area.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                >
                  Clear Form
                </button>
              </div>

              <div className="mt-8 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="goalDomain">
                    Goal Domain
                  </label>
                  <select
                    id="goalDomain"
                    name="goalDomain"
                    value={formData.goalDomain}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  >
                    <option value="">Select goal domain</option>
                    {goalDomains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.goalDomain && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    This domain currently includes {availableConditionCount} condition options,{" "}
                    {availableBehaviorCount} behavior options, and {availableMeasurementCount} measurement options.
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="condition">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleFieldChange}
                    disabled={!selectedDomainConfig}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    <option value="">
                      {selectedDomainConfig ? "Select condition" : "Choose a domain first"}
                    </option>
                    {selectedDomainConfig &&
                      renderGroupedOptions(selectedDomainConfig.conditionGroups)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="behavior">
                    Behavior
                  </label>
                  <select
                    id="behavior"
                    name="behavior"
                    value={formData.behavior}
                    onChange={handleFieldChange}
                    disabled={!selectedDomainConfig}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    <option value="">
                      {selectedDomainConfig ? "Select behavior" : "Choose a domain first"}
                    </option>
                    {selectedDomainConfig &&
                      renderGroupedOptions(selectedDomainConfig.behaviorGroups)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="measurement">
                    Measurement
                  </label>
                  <select
                    id="measurement"
                    name="measurement"
                    value={formData.measurement}
                    onChange={handleFieldChange}
                    disabled={!selectedDomainConfig}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    <option value="">
                      {selectedDomainConfig ? "Select measurement" : "Choose a domain first"}
                    </option>
                    {selectedDomainConfig &&
                      renderGroupedOptions(selectedDomainConfig.measurementGroups)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="criteria">
                    Criteria
                  </label>
                  <select
                    id="criteria"
                    name="criteria"
                    value={formData.criteria}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  >
                    <option value="">Select criteria</option>
                    {criteriaOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="timeline">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="baseline">
                    Baseline (optional)
                  </label>
                  <input
                    id="baseline"
                    name="baseline"
                    type="text"
                    value={formData.baseline}
                    onChange={handleFieldChange}
                    placeholder="Example: Currently completes this skill with frequent prompting."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Goal Bank</h2>
              <p className="mt-2 text-sm text-slate-500">
                Pick a template after selecting a domain, then edit as needed.
              </p>

              <div className="mt-6 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="template">
                    Template
                  </label>
                  <select
                    id="template"
                    value={selectedTemplateId}
                    onChange={handleTemplateChange}
                    disabled={!formData.goalDomain}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >
                    <option value="">
                      {formData.goalDomain ? "Select template" : "Choose a domain first"}
                    </option>
                    {filteredTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.title}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedTemplateId && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    Loaded template:{" "}
                    <span className="font-medium">
                      {
                        goalTemplates.find(
                          (template) => template.id === Number(selectedTemplateId)
                        )?.title
                      }
                    </span>
                  </div>
                )}

                {formData.goalDomain && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    {filteredTemplates.length} template{filteredTemplates.length === 1 ? "" : "s"} available in this domain.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="grid gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Generated Goal Options</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Choose the version that reads best, then copy it.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedVariationIndex(index)}
                      disabled={!goalVariations.length}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedVariationIndex === index
                          ? "bg-slate-900 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      } ${!goalVariations.length ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      Option {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <p className="leading-7 text-slate-800">{selectedGoal}</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold">Structured View</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <p>
                      <span className="font-semibold text-slate-700">Domain:</span>{" "}
                      {formData.goalDomain || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Condition:</span>{" "}
                      {formData.condition || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Behavior:</span>{" "}
                      {formData.behavior || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Measurement:</span>{" "}
                      {formData.measurement || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Criteria:</span>{" "}
                      {formData.criteria || "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Timeline:</span>{" "}
                      {formData.timeline || "—"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-semibold">Baseline</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {formData.baseline || "No baseline entered yet."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:opacity-90"
                >
                  Copy Selected Goal
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-slate-300 px-5 py-3 transition hover:bg-slate-100"
                >
                  Reset Form
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Smart Suggestions</h2>
              <p className="mt-2 text-sm text-slate-500">
                Quick guidance based on the goal you are building.
              </p>

              <div className="mt-6 space-y-3">
                {smartSuggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Goal Quality Check</h2>
              <p className="mt-2 text-sm text-slate-500">
                Quick feedback to help make the goal clearer and more measurable.
              </p>

              <div className="mt-6 grid gap-3">
                {qualityChecks.map((check) => (
                  <div
                    key={check.label}
                    className={`rounded-2xl border p-4 ${getStatusStyles(check.status)}`}
                  >
                    <p className="font-medium">
                      {getStatusIcon(check.status)} {check.label}
                    </p>
                    <p className="mt-1 text-sm">{check.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}