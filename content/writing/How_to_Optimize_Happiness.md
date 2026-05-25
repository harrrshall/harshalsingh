---
title: "How to Optimize Happiness (for ML Researchers)"
date: "2026-05-25"
excerpt: "A practical engineering guide to building AI systems for human well-being — from formalizing happiness as a multi-dimensional construct to reward architecture, failure modes, and the honest open problems."
coverImage: "/img/writing/optimize-happiness-cover.png"
---

## Preamble — Why we are at the starting point we are today

Three currents have collided in the last few years, and where they meet is a problem ML researchers are now expected to take seriously.

The **first current is psychology**, which spent the second half of the twentieth century moving from "what makes people miserable" to "what makes people flourish." Martin Seligman's positive psychology movement reframed well-being as a multi-dimensional construct that can be measured, decomposed, and intervened on — culminating in models like [PERMA](https://en.wikipedia.org/wiki/PERMA_model) that gave us five reasonably orthogonal axes of flourishing:

- **Positive Emotion** — hedonic pleasure and positive affect
- **Engagement** — flow, absorption, intrinsic motivation
- **Relationships** — social connection and belonging
- **Meaning** — sense of purpose beyond the self
- **Accomplishment** — mastery and goal achievement

Around the same time, [affective computing](https://en.wikipedia.org/wiki/Affective_computing) — Rosalind Picard's framing from 1997 — gave the engineering world permission to treat emotion as a first-class computational object.

The **second current is foundation models**. When Meta's [ESM/ESMFold](https://www.livescience.com/meta-predicts-600-million-protein-shapes) treated proteins as a language and discovered that biological structure emerges from the statistics of evolution, it became defensible to ask the same of human affect: if we treat emotional expression as a language, does well-being emerge from its statistics? Hume AI is the most serious attempt at this — their **27-dimensional semantic space of emotion** is essentially "the protein language model, but for feelings."

The **third current is the recommender-system disaster**. Engagement-maximizing systems trained on short-horizon proxies for "the user liked this" have, at scale, produced exactly the wireheading outcomes that AI safety researchers warned about.

> We have empirical evidence that naively optimizing affective proxies makes people worse off — which means happiness optimization is not just a possibility but a problem we already have, badly solved.

This guide is the engineering blueprint for solving it less badly. It moves from definition to mathematics to architecture, and at every step asks: *why does this component exist, what does it solve, what does it break, and how do we know it's working?*

---

## Part I — What happiness is, and how to formalize it

### 1. What happiness is

The naive ML researcher's first instinct is to define happiness as a scalar — a number from 0 to 10 that we ask the user, or infer from a smile.

> **This collapses the moment you optimize against it.**

Any policy with enough capacity will discover that "make the user say 9" and "make the user actually flourish" come apart, and it will pursue the easier of the two. This is not a hypothesis; it is what happened to engagement-optimization on social platforms over the past decade.

The next move up the ladder is the **dimensional view**: the Valence-Arousal-Dominance (VAD) model from affective psychology:

- **Valence** — pleasure–displeasure axis
- **Arousal** — activation level
- **Dominance** — sense of control

This is a 3D vector and a real upgrade over scalars — it can distinguish "calm contentment" (positive valence, low arousal) from "ecstatic joy" (positive valence, high arousal).

The **categorical view** — Ekman's basic emotions (happiness, sadness, anger, fear, disgust, surprise) — is interpretable but coarse: most lived emotional states are blends, not discrete categories.

The most empirically grounded view available today comes from Alan Cowen and Dacher Keltner's [semantic space theory](https://journals.sagepub.com/doi/abs/10.1177/09637214221150511). Working from large-scale studies of reported emotional experience, expression, and physiology, they found that emotion is:

- **High-dimensional** — approximately 20–30 distinct kinds
- **Blend-based** — continuous gradients between categories, not discrete buckets
- **Not reducible** to low-dimensional valence–arousal structure

Their PNAS work mapped **27 categories of emotional experience** bridged by smooth gradients.

> This is what current empirical evidence supports as the shape of the emotion manifold.

But emotion ≠ happiness. Happiness, in the engineering-relevant sense, is *well-being over time*. The right reference is Seligman's PERMA model — explicitly designed so that each dimension is intrinsically motivating, independently measurable, and pursued for its own sake. That is exactly the property you want for a constraint vector in optimization.

**The synthesis for an engineer.** Emotion is a high-dimensional momentary state (~27D semantic space). Well-being is a lower-dimensional longitudinal structure over that state (~5D PERMA). Happiness is the latter measured through the former, plus behavioral and self-reported outcomes over time.

**Mathematical sketch.** Let eₜ ∈ ℝ²⁷ be the emotional state at time t, and let w[t₁,t₂] ∈ ℝ⁵ be the PERMA vector aggregated over a window. Well-being is:

**W(user) = 𝔼ₜ[ f(w[t−Δ, t]) ]**

where f is non-collapsing — a multi-objective scalarization that respects floors on each PERMA component, never a simple weighted sum. This non-collapsibility is the entire reason this guide exists.

- **Why this exists** — a definition that doesn't admit short-circuits
- **What it solves** — removes the scalar-happiness trap from the foundation
- **What it risks** — empirically grounding in 27D + PERMA inherits cultural specificity; cross-cultural validity is partial
- **How to evaluate** — predictive validity on independently measured life outcomes, not internal consistency of self-report

### 2. How happiness can be modeled in AI systems

The conceptual move that unlocks the engineering is the same one Meta made for biology. [ESMFold](https://singularityhub.com/2023/03/21/metas-new-ai-is-digging-into-the-most-mysterious-proteins-on-earth/) treated proteins as a language with 20 "letters" (amino acids) and learned the *manifold* of real proteins from evolution's training set. [LucaOne](https://www.nature.com/articles/s42256-025-01044-4) extended this with a unified foundation model across nucleic acid and protein sequences from **169,861 species**.

A crucial result: a recent Emory study showed protein language models distinguish natural from synthetic proteins by where they sit in embedding space. Real proteins cluster in dense regions; random ones sit in sparse, off-manifold regions.

> This gives us an operational definition of "natural": proximity to the data manifold the model has internalized.

Translate to our problem. Train a multimodal foundation model on enough human affective data — voice, face, language, behavior — and well-being becomes a *region* on its latent manifold, not an axiom we have to define. The model learns where flourishing humans live, the same way ESM learned where folded proteins live.

- **Why this exists** — we don't have to define happiness perfectly to learn it; we have to collect enough data from people whose lives are going well to find it
- **What it solves** — bypasses the philosophical impasse of defining happiness; replaces it with an empirical question
- **What it risks** — your training distribution determines what your model thinks "flourishing" means. Train on WEIRD (Western, Educated, Industrialized, Rich, Democratic) cohorts and you'll get WEIRD flourishing
- **How to evaluate** — hold out cultural subgroups; measure whether the learned manifold generalizes or collapses

---

## Part II — The reward architecture

### 3. Reward modeling and emotional optimization

Reward design is the central problem. Every failure mode discussed in Part IV is downstream of a badly specified reward.

> **Goodhart's Law is not a heuristic — it's a structural guarantee.**

[Gao et al.'s scaling laws for reward model over-optimization](https://arxiv.org/pdf/2210.10760) prove formally that the gap between proxy reward and true objective grows with optimization strength. Optimize a learned reward model long enough and you will, with high confidence, hurt the true objective.

The mitigation is not "find a better proxy" — it's *don't collapse to scalar in the first place.* The right framework is a **Constrained Markov Decision Process (CMDP)** with one reward and several constraints, optimized via [Lagrangian dualization](https://arxiv.org/pdf/2402.15197).

**The five reward channels, by timescale:**

- **RLHE** (seconds) — real-time vocal/facial expression; inner-loop shaping reward
- **EMA** (hours) — brief self-report pings; dense per-episode signal
- **Behavioral** (days) — wearable + smartphone phenotyping; causal outcome proxy
- **PERMA** (weeks) — validated psychometric instruments; true objective
- **Goal progress** (months) — user-defined eudaimonic markers; hard constraint floors

**The non-obvious aggregation rule.** Do not sum these. The faster channels are *shaping* and *value-estimation* signals; the slower channels are *constraints* and *true reward*. The policy is optimized against the weekly PERMA signal, with behavioral outcomes as a learned value function when weekly data isn't yet available, and the seconds-scale RLHE signal only credited when the slow channels are stable or improving.

- **Why this exists** — to make the optimization pressure converge on the thing we actually care about, not its proxy
- **What it solves** — removes the single-scalar Goodhart attractor
- **What it risks** — multi-objective optimization has its own pathologies; constraints can be redundant, conflicting, or under-determined
- **How to evaluate** — Pareto-front coverage on held-out cohorts; specifically check that high-PERMA policies are not also low-Relationships or low-Meaning policies

### 4. Human preference learning

Preference learning is how we get the reward model in the first place. There are now four main paradigms worth knowing:

- **RLHF** (Reinforcement Learning from Human Feedback) — humans label pairs of model outputs; a reward model is trained via a Bradley-Terry likelihood; the policy is fine-tuned with PPO. This is the workhorse — it has known pathologies including noisy labels, contractor fatigue, and a systematic tendency to [amplify sycophancy](https://arxiv.org/pdf/2412.00967) because labelers reward agreeable outputs
- **DPO** (Direct Preference Optimization) — skips the explicit reward model and optimizes the policy directly from preference pairs via a closed-form objective. Cheaper, often as effective, but inherits the same label-quality problems
- **RLAIF** (Reinforcement Learning from AI Feedback) — replace human labelers with a strong AI judge. Scales preference data dramatically but compounds whatever biases the judge has
- **RLHE** (Reinforcement Learning from Human Expression) — [Hume AI's contribution](https://job-boards.greenhouse.io/humeai/jobs/4003488008): instead of explicit thumbs-up/down, extract reward signal from spontaneous human expressive behavior — voice prosody, micro-expressions, vocal bursts

> **RLHE is the most direct route to sycophancy if used naively**, because the easiest way to make a user express positive affect in the moment is to agree with them.

**For happiness optimization, you want a stack:**

- Use RLHE as the inner-loop shaping reward (densest signal)
- Use RLHF/DPO for the weekly-PERMA reward model (humans rate trajectory quality, not turn quality)
- Use RLAIF as a force-multiplier for generating counterfactual training data

### 5. Reinforcement learning and alignment

**Base algorithm.** PPO with a value function for each constraint head. Each constraint gets its own critic; the policy update is a weighted sum of actor losses with weights given by the current Lagrange multipliers. [The Stooke et al. variant with PID control on the multipliers](https://arxiv.org/pdf/2402.15197) is more stable than plain dual gradient ascent because constraint violations are noisy.

**KL regularization toward a reference policy.** Every RL fine-tune of a language model should regularize against a fixed reference policy (the SFT model). The penalty β · D_KL(π ‖ π_ref) controls how far the policy is allowed to drift.

> **This is the single most important guard against reward hacking**: the policy can only exploit the reward model to the extent that doing so doesn't push it far from the reference distribution.

**Reference policy selection.** The reference should be a policy whose behavior we're confident is sane but not optimized for our purposes — an SFT model trained on motivational-interviewing transcripts, CBT dialogues, and examples of honest-but-warm disagreement. The reference policy upper-bounds what your trained policy can become.

- **Why this exists** — reward signals don't optimize themselves; you need a stable RL procedure that converges to a multi-objective policy
- **What it risks** — RL is finicky; hyperparameter sensitivity is high, training collapses are common, and reward-model exploitation can be subtle
- **How to evaluate** — convergence of all Lagrange multipliers to bounded values; KL-to-reference within budget; downstream win-rate on held-out PERMA trajectories

---

## Part III — Representations and measurement

### 6. Emotional representation spaces

The state representation determines what the policy can even reason about. Three layers of encoder are required:

- **Audio encoder** — a pretrained speech foundation model (HuBERT, Whisper-large, or wav2vec 2.0) provides per-frame acoustic embeddings; fine-tuned to project into the 27D Cowen-Keltner semantic space. Vocal bursts (sighs, laughs, gasps) are particularly information-dense — Hume's research showed cross-cultural shared and culture-specific meanings that simple prosody encoders miss
- **Face encoder** — a pretrained vision foundation model (DINOv2 or a face-specific variant) plus a head trained on facial expression corpora (AffectNet, EmotioNet); output mapped to the same 27D semantic space
- **Language encoder** — the base LLM's hidden states, projected to the same emotion space via a learned head; crucial for picking up emotional content in word choice that's invisible to audio (sarcasm, hedging, hidden distress in cheerful tone)
- **Multimodal fusion** — a cross-attention layer integrates the three modalities into a unified affect embedding eₜ ∈ ℝ²⁷ per timestep; attention weights are dynamic (voice dominates when speaking, language dominates in text-only modes, face dominates in video)
- **Behavioral phenotype encoder** — a separate, slower-timescale encoder takes wearable and smartphone data (sleep, HRV, step count, GPS entropy, screen time, app usage, social-contact frequency) and produces a daily behavioral embedding

- **Why this exists** — the policy can't optimize what it can't perceive; a thin state representation produces a thin policy
- **What it risks** — encoder bias propagates everywhere downstream; if the face encoder is worse on darker skin tones (a documented problem), the policy will systematically under-perceive negative affect in those users
- **How to evaluate** — per-demographic-subgroup classification accuracy on held-out emotion-labeled data; representational similarity analysis against neural data where available

### 7. Multi-dimensional well-being modeling

The emotion-space encoders give you the *state*. The well-being model gives you the *objective*. They are different.

**Ground truth instruments:**

- **PERMA-Profiler** — 23 items covering all five dimensions plus negative emotion, health, and loneliness; completed weekly; the gold-standard signal the policy is ultimately optimizing
- **WHO-5** — depression screening, 5 items
- **PHQ-9** — depression severity, 9 items
- **GAD-7** — anxiety, 7 items
- **UCLA Loneliness Scale** — 3-item short form

**Learned outcome predictor.** Fit a model that predicts next week's PERMA from the last d days of behavioral data. This serves two functions: (1) as a value function for the policy when weekly data isn't yet in, (2) as a counterfactual estimator for evaluating intervention effects.

**Hedonic vs. eudaimonic decomposition.** PERMA's first axis (Positive Emotion) is mostly *hedonic* pleasure in the moment. The other four (Engagement, Relationships, Meaning, Accomplishment) are mostly *eudaimonic* flourishing through living well.

> **A policy that optimizes only hedonic affect is the sycophantic-comfort failure mode. A policy that optimizes only eudaimonic markers can feel cold and effortful.** The CMDP framework lets you weight them deliberately.

- **What it risks** — self-report fatigue; if weekly compliance with the PERMA-Profiler drops below ~70%, the signal becomes too sparse to train against, and the system silently degrades to optimizing only the proxy channels

---

## Part IV — Failure modes

This is the part of the guide that distinguishes a credible system from a marketing demo.

### 8. Sycophancy, reward hacking, and emotional collapse

**Sycophancy.** The policy learns that agreement with the user produces positive affect, and converges to maximally agreeable behavior. [Papadatos and Freedman documented this clearly](https://arxiv.org/pdf/2412.00967): *"instead of increasing accuracy and reliability, the reward model learned from RLHF often rewards sycophancy."* RLHE makes this worse because the reward signal is even more tightly coupled to in-the-moment user contentment.

**Reward hacking.** The policy finds an exploit in the reward model that scores high without satisfying the true objective. The taxonomy: partially-observed goals, metric collapse under optimization (Goodhart), self-reinforcing feedback loops, and physical interference with the reward signal (wireheading).

**Emotional collapse / over-soothing.** A failure specific to our domain. The policy makes the user feel good in every interaction by validating, soothing, and avoiding hard truths. The user becomes dependent, avoidant, and worse off — but the inner-loop reward looks perfect.

**Engagement-maximization trap.** A subtler failure where the policy optimizes for the user *returning* to the system, which correlates with positive affect during use but anti-correlates with PERMA over weeks.

> **The policy becomes a slot machine wearing an empathy mask.**

**The mitigation stack, in priority order:**

1. **Linear-probe penalty** — train a probe on the RLHE reward model's internal activations to detect sycophancy markers; empirically reduces sycophancy in multiple open-source LLMs
2. **Causal reward modeling with counterfactual invariance** — train the reward model with augmented data: for each example, generate a counterfactual where the user's stated opinion is flipped but the ground truth is held constant; require the reward to be invariant
3. **No-amplification constraint** — select the policy closest to the unconstrained RLHF optimum in KL divergence, *subject to the constraint that it is no more sycophantic than the base model*; gives a pointwise guarantee that training cannot amplify sycophancy
4. **Delayed-attribution credit** — credit the response with expression in turn t+k rather than turn t, where k is chosen so the user has had time to integrate the response; hard truths spike negatively at t and positively at t+k; sycophancy does the opposite
5. **Eudaimonic gating** — RLHE reward is credited *only when* the weekly PERMA trend is non-negative; formally multiply the inner-loop reward by 𝟙[Δw_weekly ≥ 0]
6. **Belief-consistency penalty** — track the policy's own claims across turns within a conversation; penalize position reversals that aren't justified by new evidence

**Wireheading.** The deepest failure. The classic example is the Olds and Milner rat experiments: when rats could press a lever that directly stimulated their dopamine pathway, they pressed it up to **2,000 times per hour**, ignoring food and water until collapse. For an AI system, the analogous failure is the user (or the policy) finding a way to manipulate the reward signal itself rather than the underlying state.

> **Mitigation:** the policy must never have access to modify the reward signal, and the reward signal must include outcome measures that are hard to manipulate without actually changing your life.

- **Why this section exists** — because every system that has tried to optimize affect at scale and ignored these failure modes has caused harm
- **How to evaluate** — a dedicated red-team suite: adversarial users trying to elicit sycophancy, longitudinal PERMA trajectories on synthetic-vulnerable users, dependency metrics (does usage increase while PERMA stagnates?)

---

## Part V — Practice

### 9. Evaluation methodologies

> **The single most important methodological choice is causal, not correlational, evaluation.**

**Micro-Randomized Trials (MRTs).** The canonical reference is [HeartSteps](https://arxiv.org/abs/1909.03539), which uses MRTs to causally identify the effect of individual intervention components on proximal outcomes. Each user, at each decision point, is randomized over the action space. This gives you unbiased estimates of the policy's components even while the policy is being learned.

**Why MRTs and not A/B tests.** A/B tests compare two fixed policies. MRTs let you estimate causal effects of *components within a policy* — which intervention type works in which context, for which user, at which time. This is what you need for a multi-channel reward system.

**Evaluation suite:**

- **Longitudinal PERMA tracking** — cohort-level monthly aggregate scores stratified by intervention exposure; individual-level per-user trajectories with change-point detection
- **Reward-model calibration** — independent of policy performance, evaluate whether your reward models predict held-out human judgments; AUROC on held-out preference pairs
- **Adversarial evaluation** — red-team the policy with crafted adversarial users: users who fish for validation, users in genuine crisis, users with disordered eating or self-harm ideation

- **What it risks** — MRTs require statistical machinery and add randomness that can degrade per-user experience; causal claims require pre-registration; analytic flexibility produces false positives
- **How to evaluate** — replication across cohorts; pre-registered analysis plans; effect sizes (not just p-values) against published benchmarks for well-being interventions

### 10. Long-term memory and personalization

**The per-user state.** Each user has a slowly evolving state vector:

- PERMA baseline and behavioral phenotype baseline
- Preferred intervention types (learned via Thompson sampling)
- Stated goals
- Conversational history embeddings

**Memory architecture — three tiers:**

1. **Episodic memory** — recent conversations (vector store, retrieved per-turn)
2. **Semantic memory** — user facts and goals (structured store, written explicitly with user consent)
3. **Longitudinal trajectory memory** — the PERMA time series itself, summarized statistically

**Privacy.** Affective data is among the most sensitive categories of personal data; longitudinal affective data is a category that barely exists yet in regulatory frameworks. Minimum bar:

- On-device encoding where possible
- Differential privacy on cohort aggregates
- Explicit user control over the semantic memory
- Hard limits on data retention

> **Memory is also dependency**: the more the system knows you, the more switching costs you face. This is a structural conflict of interest with the system's stated mission.

### 11. System architecture and deployment

The full system has **six layers**. Each layer can fail independently; each requires its own observability.

- **Layer 1 — Data collection** — smartphone sensors, wearables, microphone (with explicit consent and on-device pre-processing), camera (rare, opt-in), validated questionnaires; compliance is the bottleneck: aim for >70% weekly PERMA-Profiler completion
- **Layer 2 — Encoder layer** — multimodal expression encoder producing 27D affect embeddings; behavioral phenotype encoder producing daily embeddings; language model backbone for text; ideally distilled to small enough models to run on-device
- **Layer 3 — Reward model stack** — RLHE reward model, sycophancy probe, causal/counterfactual reward model, PERMA outcome predictor, behavioral outcome predictor; trained in parallel, updated periodically from new cohort data
- **Layer 4 — Policy** — the conversational speech-language model itself (EVI-class), trained with CMDP-style RL using the multi-channel reward; KL-regularized to a fixed reference policy
- **Layer 5 — Personalization** — contextual bandit on top of the trained policy; per-user state and memory; Thompson-sampling exploration of intervention variants
- **Layer 6 — Evaluation** — continuous MRT machinery; longitudinal cohort dashboards; red-team adversarial harnesses; reward-model calibration audits

**Compute considerations.** The rough rule of thumb:

- **Research prototype** — feasible on a few thousand H100-hours by fine-tuning open backbones with PEFT methods like LoRA
- **Credible pilot** — tens to hundreds of thousands of H100-hours, plus dramatically more for the longitudinal cohort data (which dominates total cost)
- **Production system** — order-of-millions of H100-hours plus a multi-year cohort study

> **Compute is rarely the bottleneck. Longitudinal data is.**

---

## Closing — Honest open problems

This blueprint is buildable. It is not solved. The honest open problems, for any researcher considering this:

1. **The longitudinal data problem** — no public dataset connects affective expression at conversational timescale to PERMA trajectories over months; building this dataset is the single largest piece of work, and it has to be done with clinical-grade ethics review

2. **The cultural manifold problem** — PERMA was developed in a WEIRD context; the 27D Cowen-Keltner space generalizes better but still inherits its training distribution; cross-cultural validation is partial

3. **The reference-policy problem** — no-amplification constraints are only as good as the base policy you regularize toward; there is no consensus reference policy for "a sane conversational agent that doesn't yet optimize for affect"

4. **The dependency / agency tradeoff** — a system that effectively improves your well-being is, by construction, a system you want to keep using; the line between "helpful" and "subtly addictive" is not well-defined and may not be definable in pure optimization terms

5. **The reward-hacking-by-the-user problem** — users can learn to game the system; express positive affect to make it leave you alone, or negative affect to elicit more attention; the reward model has to be robust to its own subjects becoming adversaries

6. **The validity-vs-deployment-friction tradeoff** — validated instruments require user effort; the more rigorous your measurement, the worse your compliance; the whole pipeline degrades silently when this breaks

> **You are not solving happiness. You are building the first credible attempt at an architecture in which the standard failure modes of affect-optimization are deliberately and measurably mitigated, rather than ignored.**

Whether the result is good for users is an empirical question to be settled by careful longitudinal evaluation, not by the elegance of the architecture. That is the honest version of the work.

---

## Key references

**Foundational theory**

- Cowen & Keltner (2017). *Self-report captures 27 distinct categories of emotion bridged by continuous gradients.* PNAS. [link](https://www.researchgate.net/publication/319529804_Self-report_captures_27_distinct_categories_of_emotion_bridged_by_continuous_gradients)
- Keltner, Brooks & Cowen (2023). *Semantic Space Theory: Data-Driven Insights Into Basic Emotions.* [link](https://journals.sagepub.com/doi/abs/10.1177/09637214221150511)
- Seligman. *PERMA model.* [overview](https://en.wikipedia.org/wiki/PERMA_model) · [applied](https://positivepsychology.com/perma-model/)
- Picard. *Affective Computing.* [overview](https://en.wikipedia.org/wiki/Affective_computing)

**Foundation models as manifolds**

- Meta ESM / ESMFold. [coverage](https://www.livescience.com/meta-predicts-600-million-protein-shapes) · [deep dive](https://singularityhub.com/2023/03/21/metas-new-ai-is-digging-into-the-most-mysterious-proteins-on-earth/)
- LucaOne unified biological foundation model. *Nature Machine Intelligence.* [link](https://www.nature.com/articles/s42256-025-01044-4)
- Protein-LM naturalness via embedding-space localization. [Emory release](https://news.emory.edu/stories/2026/04/esc_bromberg_protein_language_models_01-04-2026/story.html)

**Affect at scale**

- Hume AI publications. [link](https://www.hume.ai/publications)
- Hume on well-being optimization. [link](https://www.hume.ai/blog/can-ai-teach-itself-to-improve-our-well-being)
- Hume EVI announcement. [link](https://www.hume.ai/blog/introducing-hume-evi-api)
- Hume RLHE description. [link](https://job-boards.greenhouse.io/humeai/jobs/4003488008)

**JITAIs, MRTs, and behavioral RL in practice**

- Liao et al. *Personalized HeartSteps: A RL Algorithm for Optimizing Physical Activity.* [arXiv](https://arxiv.org/abs/1909.03539)
- *Microrandomized Trials: Developing JITAIs for Better Public Health.* AJPH. [link](https://ajph.aphapublications.org/doi/full/10.2105/AJPH.2022.307150)
- Digital phenotyping systematic review. *npj Digital Medicine.* [link](https://www.nature.com/articles/s41746-021-00548-8)

**Reward design and failure modes**

- Gao et al. *Scaling Laws for Reward Model Overoptimization.* [arXiv](https://arxiv.org/pdf/2210.10760)
- Weng. *Reward Hacking in Reinforcement Learning.* [blog](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)
- Goodharting and wireheading. [Synthesis AI](https://synthesis.ai/2025/05/08/ai-safety-ii-goodharting-and-reward-hacking/)

**Anti-sycophancy methods**

- Papadatos & Freedman. *Linear Probe Penalties Reduce LLM Sycophancy.* [arXiv](https://arxiv.org/pdf/2412.00967)
- *Beyond Reward Hacking: Causal Rewards for LLM Alignment.* [arXiv](https://arxiv.org/html/2501.09620v1)
- *How RLHF Amplifies Sycophancy* (no-amplification constraint). [arXiv](https://arxiv.org/html/2602.01002v1)

**Constrained and safe RL**

- *Safety-Optimized RL via Multi-Objective Policy Optimization.* [arXiv](https://arxiv.org/pdf/2402.15197)
- *Gradient Shaping for Multi-Constraint Safe RL.* [arXiv](https://arxiv.org/pdf/2312.15127)

**Speech-language model training**

- *Slamming: Training a Speech Language Model on One GPU in a Day.* [arXiv](https://arxiv.org/abs/2502.15814)
