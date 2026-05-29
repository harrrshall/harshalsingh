---
title: "How I Trained a TTS Naturalness Scorer on Free Kaggle GPUs"
date: "2026-05-29"
excerpt: "Modern text-to-speech got good enough to break the tools that grade it. So I trained a 400K-parameter scorer that runs on a laptop and lands within a point of a 7-billion-parameter judge, on nothing but Kaggle's free T4s."
coverImage: "/img/writing/natscore-param-efficiency.png"
---

Modern text-to-speech got good enough to break the tools that grade it.

That's the strange problem I set out to solve. A few years ago, if a TTS system sounded wrong, you could hear why. Clicks, buzzes, robotic flattening, a word mangled into noise. The artifacts were loud, and the scorers people built were artifact-detectors at heart. They worked because the failures were gross.

Then the failures got subtle. Systems like CosyVoice2, F5-TTS, MaskGCT, and Llasa cleared the line where the speech is clean and the thing that's off is the *prosody*. A breath in the wrong place. An emotional overshoot. A cloned voice drifting half a degree away from the speaker. Code-switching that lands on the wrong rhythm. All of these are naturalness errors, and the old scorers can't see them.

You can measure how badly they can't see them. UTMOSv2, which won the VoiceMOS 2024 challenge, was trained on read-speech opinion scores. Point it at conversational or expressive synthetic speech and it produces *negative* correlation with human judgment. It confidently grades the good clips as bad. WhiSQA was built for telecom and enhancement quality, which is a different question entirely. DNSMOS and NISQA-TTS predate the whole current generation of models. The map no longer matched the territory.

So the obvious move is to retrain on the right data. And in November 2025 the right data arrived. SpeechJudge-Data gave 99,000 human-labeled preference pairs across exactly the modern systems that matter, in English and Chinese plus code-switching, with a regular split and an expressive split. Someone had finally measured the territory. The same group shipped a scorer with it, SpeechJudge-GRM, which hits 77.2% pairwise agreement with humans. Excellent. Also a 7-billion-parameter audio language model that costs about a tenth of a cent per score and needs a GPU. You cannot put that inside a TTS training loop. You cannot run it on a laptop. It answers the research question and leaves the engineering question open.

The engineering question is the one I wanted. Could you get most of that accuracy from something small enough to run anywhere, on the CPU, cheap enough to leave on by default? That's NatScore.

## The bet

The whole design rests on one bet. A big frozen speech model already contains the information you need, and all you have to train is a tiny reader on top of it.

So I took `openai/whisper-small`, froze it, and never touched its weights again. Whisper was trained to transcribe 99 languages, which means its encoder already builds representations that track *what is being said and how*. That's most of the way to naturalness. On top of the frozen encoder I put three small things. A learned weighted sum over Whisper's 13 layers, because naturalness signal doesn't live in one layer and I'd rather let the model find it than guess. An attention pooler to collapse the time axis into one vector. A two-layer MLP that emits a single number. Add it up and the trainable part is about 400,000 parameters. The deployed model is 88 million, almost all of it frozen Whisper you download once.

That's roughly 1/17,000th the trainable weight of the 7B judge.

I considered the alternatives and rejected each for a concrete reason. Fine-tuning the whole encoder throws away Whisper's generalization and demands careful regularization to claw it back. A transformer head is overkill at this parameter budget. And a regression head predicting raw opinion scores would be fighting the data, because SpeechJudge is *pairwise*. Every label records which clip won, with no absolute score like "3.8" attached. So I trained pairwise and derived the pointwise score afterward.

That's the Bradley-Terry part. The loss is one line, `-log σ(s_chosen − s_rejected)`. Show the model two clips of the same sentence, ask it to give the human-preferred one a higher number, penalize it when the order is wrong. The annotations even carry magnitudes, "B is better by 2" versus "B is better by 1," so a strong preference can pull harder on the gradient than a coin-flip one. Stronger signal than a bare yes/no, for free.

## The grind

Then I hit the wall that every honest writeup buries and I'll put up front: the data is 5.34 terabytes of audio if you pre-extract the features. I don't have 5.34 terabytes. Nobody training on a weekend does.

So the trainer extracts features online, decoding audio and running Whisper as it streams pairs, never caching the whole thing. That moved the bottleneck from disk to audio I/O, which is the right place for it to be. The whole project ran on Kaggle's free tier, two T4 GPUs with a 9-hour wall on any single session. I wrote a DataParallel patch to use both GPUs, which doubled throughput to about 17 steps a minute, and a resume scaffold that checkpoints every 500 steps to a versioned Kaggle dataset. When the 9-hour wall hits, you re-run the same notebook and it picks up where it died. The headline run actually resumed mid-flight, from step 8,000, and finished the last two epochs the next day.

![NatScore training loss across 5 epochs on Kaggle T4 x2. The Bradley-Terry loss starts near ln 2, the chance baseline where the model can't tell the pair apart, and the final checkpoint reaches 0.226.](/img/writing/natscore-training-loss.png)

I did this in milestones, and committed at every one, because a project that can't be resumed from a cold start isn't really finished. M0 was scaffold and license. M1 was reading the dataset schema before writing a line of model code. M2 froze Whisper and built the cache. M3 was the head and a 30-pair sanity run, just to prove the loss went down. M4 was the eval suite, with bootstrap confidence intervals and calibration error, the metrics that tell you whether a result is trustworthy. The first end-to-end run, 500 pairs on a laptop CPU, scored 52% on the dev set. Barely above chance. That was the point. It proved the *pipeline* worked end to end, while 500 pairs was far too little data to make the model any good. You validate the plumbing before you spend the GPU.

## The number

The headline run, full training split, two T4s, finished in about four hours fifty-two minutes across two days. 71.3% pairwise accuracy on a thousand dev pairs, 95% confidence interval 68.6 to 74.1, calibration error 2.27%.

Put that next to the 7B baseline trained on the same data. SpeechJudge-BTRM gets 72.7%, and the gold-standard GRM gets 77.2%. I land at 71.3% with about 17,000 times fewer trainable parameters and a model that runs on a laptop. That gap is the chart at the top of this post, one small green dot sitting almost level with two giants.

So when I call it the best naturalness detector, I mean the best one you can actually deploy, the best accuracy per parameter, the best accuracy per dollar, on this distribution. A 1.4-point gap from a model 17,000 times larger is a trade most people would take every time.

The breakdown is honest about where it's weak.

![Per-language pairwise accuracy on SpeechJudge dev. English-to-Chinese and Chinese-to-Chinese ordering is strong, while code-switched English-to-mixed is the hard tail, dropping to 52.5%, barely above chance.](/img/writing/natscore-per-language.png)

Regular speech 74%, expressive 69.5%. Per language, English-to-Chinese ordering lands at 87.3% and Chinese-to-Chinese at 83.2%, while code-switched English-to-mixed sits down at 52.5%, barely above a coin flip. The tail is exactly where you'd expect the hard cases to be, which is its own kind of confirmation that the model learned something real about prosody.

The checkpoint is on the Hugging Face Hub. The API is two functions. `score(wav)` gives a number, and `compare(a, b)` gives a winner. Cheap enough to leave running inside a training loop, which was the entire point.

The real lesson here is general. When a big pretrained model already knows the hard part, the smart move is to train the smallest possible thing that can read what it knows. Most of the work is in admitting how little you have to build.
