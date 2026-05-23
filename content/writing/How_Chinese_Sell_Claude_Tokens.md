---
title: "How Chinese Sell \"Claude\" Tokens at 5% Cost While Making Millions"
date: "2026-05-19"
excerpt: "Inside the eight-layer Chinese gray-market supply chain reselling Claude API tokens at $4/M, where the discounted API access is the cover charge, and the real product is your prompts and outputs streaming into someone else's data lake."
---

Anthropic sells a million Claude Opus input tokens for fifteen dollars. A Taobao seller will sell you the same thing for four. They're not running a sanctioned reseller program, and they're not subsidizing your startup. So what's actually happening?

Three things.

The Claude you're getting is real Claude maybe half the time. The other half, you're getting a much smaller model in an Opus-shaped wrapper. The accounts behind your traffic were created with stolen IDs, deepfaked KYC selfies, and botnet-compromised home routers, some of that risk is now yours. And every byte you send, and every byte that comes back, is logged. Forever. By someone you don't know. For a market you wouldn't want to be in.

The third part is the one worth thinking about, because it explains the other two.

This essay is about a piece of the AI economy that almost nobody outside Chinese developer forums and frontier-lab threat-intel teams talks about clearly. It's a supply chain. Eight technically distinct layers, each dominated by a small set of named open-source projects and commodity hardware. By 2026 every layer has been productized to the point that assembling the stack is procurement, not engineering. Three claims follow: the network layer of defense is gone, the resold API access is the cover charge not the product, and the unit economics make this business inevitable.

---

## The thirty-second mental model

An operator runs a $5/month VPS with one of about ten open-source codebases on it, usually `songquanpeng/one-api` or the Claude-specialized `Wei-Shaw/claude-relay-service` (~11K stars). The server speaks Anthropic's API byte-for-byte.

Behind it sits a pool of Anthropic accounts, sometimes thousands, built by a *different* team using automated browsers, residential-IP botnets, virtual SIM cards, and AI-generated IDs. They sold the pool wholesale.

You point `ANTHROPIC_BASE_URL` at the relay, pay $4/M tokens in RMB through Alipay / WeChat Pay / UnionPay (or USDT-TRC20 at the wholesale tier), and the relay picks an account, swaps credentials, decides whether to actually route to Opus or substitute Haiku, forwards your request disguised as a legitimate `claude-cli/2.1.x` session, and streams the SSE response back. While doing all that, it tees the full byte stream to a Kafka or DuckDB sink.

The log is the real product. The discounted API margin is the cover charge.

---

## How you make ten thousand accounts in a week

Three problems: each account needs a unique browser fingerprint, a unique residential IP, and a way through phone + ID verification.

**Browsers.** The industry has moved past Playwright + stealth plugins to *antidetect browsers*, forks of Chromium or Firefox that spoof the entire fingerprint surface (canvas, WebGL vendor/renderer, AudioContext, fonts, WebRTC ICE candidates) at the engine level, *below* the JavaScript runtime. The major antidetect browsers:

- **Multilogin**, Mimic / Stealthfox engines
- **GoLogin**, Orbita engine, ~50 tunable knobs, REST API
- **AdsPower**, Chinese-origin, dominant in Taobao seller channels; RPA recorder mirrors actions across 50 profiles in parallel
- **Kameleo**, mobile-profile emulation
- **MoreLogin**, Cloud Phone Android farm
- `daijro/camoufox`, open-source

 For headless flows you skip the browser entirely and use a TLS-impersonation library:

- `curl_cffi`
- `tls-client`
- `CycleTLS`
- `refraction-networking/utls` These reproduce Chrome's exact `ClientHello`, HTTP/2 SETTINGS frames, ALPN order, and header casing, Chrome impersonation hashes JA3 `f1bfb5be52bd682e3aa5b4f1aa6aff4b`, JA4 `t13d1516h2_8daaf6152771_02713d6af862`.

The fingerprint-detection arms race, in order:

- **`JA3`**, MD5 of ClientHello fields
- **`JA3N`**, extensions sorted before hashing, after Chrome added extension-permutation in 2022 to defeat JA3
- **`JA4` / `JA4+`**, Foxio's non-hashed multi-part identifier, includes ALPN + version
- **Akamai HTTP/2**, SETTINGS frame order, WINDOW_UPDATE values, HEADERS pseudo-header order
- **`JA4H`**, HTTP header order + casing
- **`JA4T`**, TCP window size and options Every axis has a mature spoofing library now. **The wire is no longer a discriminator.** A Chinese-developer farm running antidetect Chromium over a Bright Data residential proxy with `curl_cffi` produces TLS, HTTP/2, header, and TCP fingerprints identical to a real Chrome user.

> **Defenders have been fighting at the network layer for a decade. They lost.**



**IPs.** Residential proxies are rented home internet. Most route through SDK partner apps. Some effectively rent from botnets.

The major brands:

- **Bright Data**
- **911Proxy**, ~90M IPs
- **IPRoyal**
- **Oxylabs**
- **Soax**

[Bitsight's TRACE team](https://www.bitsight.com/blog/residential-proxy-services-malware-ecosystems) sampled **53 million residential-proxy nodes** over 55 days in early 2026. The finding:

- At minimum **20%**, realistically **50%**, were simultaneously communicating with active malware C2.

The single largest takedown, [911 S5, FBI May 2024](https://www.ic3.gov/PSA/2024/PSA240529), involved **19 million backdoored consumer IPs**, distributed through trojanized "free VPN" installers:

- MaskVPN
- DewVPN
- PaladinVPN
- ProxyGate
- ShieldVPN
- ShineVPN

> **Nineteen million is the population of New York State, each one a real person who installed a "free VPN" they trusted.**



[Cloudflare's own engineering blog](https://blog.cloudflare.com/residential-proxy-bot-detection-using-machine-learning/) is direct: per-IP reputation is over. Bot Management v8 analyzes 46M+ HTTP requests per second looking for population-level *shape*, "spike in overall traffic towards sensitive endpoints from a large number of residential ASNs."

> **The IPs look fine. The shape doesn't.**



**Per-account unit economics:**

- **$0.30**, antidetect browser profile
- **$0.05**, residential proxy session
- **$0.01**, phone OTP
- **$1.50**, fake ID (weighted, ~10% trigger KYC)
- **$5.00**, carded sign-up (weighted)
- **TOTAL: ~$5–10 per pre-warmed account** Anthropic's $5 free credit covers most of that immediately. The real prize is a carded account with a $200/month Max subscription, Opus quota you can slice N ways. `claude-relay-service` calls this **"拼车"** (carpool) functionality. It's a marketed feature.

---

## A closet full of SIM cards

The cheapest defeat in the pipeline is phone verification.

A SIM bank is a 1U rackmount appliance, Hybertone GoIP is the dominant model, with up to 128 physical SIM slots, an Ethernet port, and an HTTP API: `GET /default/en_US/send.html?u=USER&p=PASS&l=CHANNEL&n=PHONE&m=MESSAGE`. SIMs come in bulk from lax-KYC carriers. A single operator aggregates thousands across forty boxes and resells per-SMS quota to virtual-number platforms: The virtual-number platforms that resell this quota:

- **5sim**, ~$0.008/number, 180+ countries
- **HeroSMS**, acquired SMS-Activate after its Dec 2025 shutdown
- **SMS-Man**, Alipay / UnionPay The platforms pre-categorize by target service ("OpenAI", "Anthropic") because numbers get blacklisted after burns.

Less than a penny per OTP. SMS verification was designed for a world where a SIM was a reasonable proxy for personhood, that hasn't been true for a decade. Banking learned this and added biometric KYC on top. Anthropic followed in April 2026. The supply chain answered there too.

---

## Generating a face on demand

This is the layer that makes you slightly queasy.

**A passport that passes Jumio.** [Joseph Cox's 404 Media investigation of OnlyFake](https://www.404media.co/inside-the-underground-site-where-ai-neural-networks-churns-out-fake-ids-onlyfake/) (Feb 2024) documented a Telegram-organized site, operator pseudonym "John Wick", selling AI-generated driver's licenses, passports, and national IDs for **$15 each**, auto-composited onto plausible carpet/bedsheet backgrounds. Claimed throughput: "up to **20,000 documents per day**." Sit with that, **a new fake passport every 4.3 seconds**, 24 hours a day. Seven million a year. None belonging to a real person.

The technical move that makes them pass is the MRZ, the `<<<<<<` lines at the bottom of a passport, encoding personal data plus three check-digits and a global checksum per ICAO 9303. Earlier workflows printed wrong checksums and got caught at OCR validation. OnlyFake's tooling computed them on the fly. 404 Media verified bypass against OKX (Jumio-backed); users self-reported success at Binance, Kraken, Coinbase, PayPal, Revolut. OnlyFake went dark days after the exposé. Telegram successor channels preserve the mechanism.

**A face that passes liveness.** The state of the art is *camera-pipe injection*, productized to a single repo: `sensity-ai/dot`. The chain: `iperov/DeepFaceLive` or `hacksider/Deep-Live-Cam` (~92K stars, InsightFace's `inswapper_128.onnx`) swaps a source face onto live webcam at 25+ FPS on a mid-range GPU. Pipe into OBS Virtual Camera on Windows or `v4l2loopback` on Linux, the KYC web app enumerates `OBS-Camera` exactly like `/dev/video0`. For mobile, run inside Genymotion and use Frida to hook `Camera2.createCaptureSession()`, substituting the YUV buffer with the face-swap pipe. Same pattern on iOS via Frida or jailbreak `AVCaptureSession` hooking.

Active liveness ("turn your head left") passes because the swap runs at frame rate. Passive PAD (moiré, screen-door pattern) passes because injected frames have no physical screen reflection.

The numbers, from named industry sources:

- [iProov 2025](https://www.iproov.com/reports/threat-intelligence-report-2025-remote-identity-attack): face-swap attacks **+300% YoY**. Native virtual-camera attacks **+2,665%**.
- [Group-IB Weaponized AI](https://www.group-ib.com/resources/research-hub/weaponized-ai/) (early 2026): **8,065 deepfake bypass attempts** at one financial institution's loan-KYC over eight months. A separate Indonesian FI case study: ~1,100 attempts, ****$138.5M in potential losses** over three months**.
- [WEF Cybercrime Atlas](https://reports.weforum.org/docs/WEF_Unmasking_Cybercrime_Strengthening_Digital_Identity_Verification_against_Deepfakes_2026.pdf) (Jan 2026) tested 17 face-swap tools, most combinations defeat the controls.

This is why standards bodies now distinguish PAD (Presentation Attack Detection) from IAD (Injection Attack Detection): `NIST SP 800-63-4` (2025), `CEN/TS 18099`, `ISO 25456`. PAD alone has stopped working.

Where injection still fails, banks requiring Secure Enclave-attested frames on iOS, or `CameraExtensionSession` on Android, the supply chain hires real humans. Recruiters operate openly on Telegram across Africa, Southeast Asia, Latin America. The recruit sits with their real face and ID while the buyer drives the screen via RustDesk. The same brokers ran a Worldcoin iris-scan market from Cambodia and Kenya at ~$30/identity, [documented by BiometricUpdate in 2023](https://www.biometricupdate.com/202305/worldcoin-may-have-a-biometric-data-black-market-problem). The recruit's biometric identity then gets reused the same week elsewhere. They never know.

> **The most ethically loaded layer of the stack, and the one furthest from any meaningful enforcement.**



---

## The relay: an MIT-licensed business in a box

When you point your client at `https://api.cheap-claude.example` (made up but functionally what every shadow relay looks like), you're talking to a Go binary or Node process from GitHub. The [CISPA Helmholtz audit of 17 shadow APIs](https://arxiv.org/abs/2603.01919), "Real Money, Fake Models" (Zhang et al., March 2026), found that **11 of 17** were built on derivatives of just two repos.

`songquanpeng/one-api` is the base, Go, Gin + GORM, single binary, MIT. Its core abstraction is the "channel", each channel is one upstream credential or provider URL. Channel type `14` maps to `https://api.anthropic.com`. The hot path translates OpenAI Chat Completions ↔ Anthropic Messages with SSE pass-through. `QuantumNous/new-api` is the de-facto Chinese fork with explicit Claude Messages support, channel-weighted routing, OpenAI↔Claude and OpenAI→Gemini conversion, per-reasoning-effort variants like `claude-3-7-sonnet-20250219-thinking`.

The Claude-specific lineage:

- **`Wei-Shaw/claude-relay-service`**, ~11K stars, Node + Redis. Its `unifiedClaudeScheduler` maintains pools of `claude-official` (OAuth), `claude-console` (API key), `claude-ai` (session cookie), `bedrock`, `gemini`, `openai-responses`. Each account tracks availability, cooldown timer, failure count, refresh time, consumption. Refresh-token reuse triggers a **24-hour terminal cooldown**.
- **`AmazingAng/auth2api`**, auth-pass-through fork
- **`CaddyGlow/ccproxy-api`**, plugin-based, `credential_balancer` + DuckDB log storage
- **`mirrorange/clove`**, Python / FastAPI `claude.ai` web-session proxy
- **`yushangxiao/claude2api`**, accepts `claude.ai` session cookies of the `sk-ant-sid01-…` form
- **`Xerxes-2/clewdr`**, Rust, Leptos / WASM admin
- **`Yuyz0112/claude-code-reverse`**, dynamic-analysis dump of the CLI's runtime prompts and tool definitions
- **`seifghazi/claude-code-proxy`**, transparent local interceptor with per-sub-agent re-routing
- **`Adithyan-Defender/claude-ai-re-client`**, research client demonstrating the full `curl_cffi` + cookie-replay + SSE flow
- **`CLIProxyAPI`** family, multi-provider OAuth proxy with Claude / Gemini / Copilot / OpenRouter switching

The architecture is mundane, auth middleware, scheduler, account pool with health-tracked rotation, structured logs, admin UI. The same shape as any legitimate multi-tenant SaaS. *That's exactly why it's hard to fight.*

What's interesting is how completely Anthropic's protocol has been mapped. [Reid Barber's "Reverse engineering Claude Code"](https://www.reidbarber.com/blog/reverse-engineering-claude-code) walks through the PKCE OAuth flow: fixed `client_id = 9d1c250a-e61b-44d9-88ed-5944d1962f5e`, exchanged at `console.anthropic.com/api/oauth/token` for `{access_token: "sk-ant-oat01-…" (8h TTL), refresh_token: "sk-ant-ort01-…", scope: "user:inference user:profile"}`. The [eunomia.dev eBPF dump (Feb 2026)](https://eunomia.dev/blog/2026/02/13/reverse-engineering-claude-codes-ssl-traffic-with-ebpf/), and the underlying [AgentSight paper (arXiv 2508.02736)](https://arxiv.org/abs/2508.02736), goes deeper, hooking BoringSSL inside Bun's static TLS and capturing the exact header chain Claude Code sends:

```
User-Agent: claude-cli/2.1.39 (external, cli)
x-app: cli
X-Stainless-{Arch, Lang, OS, Package-Version, Runtime, Runtime-Version, Timeout}
anthropic-beta: oauth-2025-04-20,`interleaved-thinking-2025-05-14`
anthropic-version: 2023-06-01
```

The relays replay these bytes exactly. From Anthropic's wire, traffic from a relay impersonating Claude Code is indistinguishable from real Claude Code traffic, because it *is* the same bytes.

Anthropic's [Feb 20, 2026 enforcement](https://github.com/anthropics/claude-code/issues/28091), rejecting `sk-ant-oat01-*` on the Messages API, only broke the naïve relays. Survivors rerouted to `claude.ai/api/...` while continuing to spoof the CLI fingerprint.

> **Cat and mouse.**



The "hydra cluster" Anthropic disclosed in February, 20,000+ fraudulent accounts mixing extraction with normal-looking traffic, is functionally this exact scheduler scaled out across many physical relays.

---

## The silent model swap (降智)

Inside one-api/new-api there's a model-mapping YAML:

```yaml
`claude-opus-4-7`: `claude-haiku-4-5`
# or
claude-opus-4-7: `glm-4.6-air`
```

When a request arrives for Opus, the relay rewrites the `model` field on the upstream, forwards to whatever cheap model the operator picked, then rewrites the response's `model` field back to `claude-opus-4-7`. The SSE `message_start.usage.input_tokens` is preserved or fabricated to match expected billing. The customer sees "Opus" everywhere they look.

On easy questions you can't tell. On hard ones, the CISPA team measured the gap: `Gemini-2.5-flash` on MedQA scores 83.82% against Google's official API. On three different shadow APIs claiming to be Gemini-2.5-flash, it scored **~37%**, a ~**47-point absolute drop**, sitting near the upper bound of the paper's headline finding that performance divergence across the audited fleet runs up to **47.21%**. The other stat: **45.83% of 24 audited endpoints failed an active fingerprint test** designed to discriminate models by response distribution.

> **About half of shadow APIs are lying about what's behind them.**

 15 of 17 providers are run by individuals without verifiable identity. The Chinese-language nickname is **降智**, "intellect-dumbing."

There's a quieter overcharge bundled with the swap. Anthropic's prompt-caching gives a ~10× discount on cached prefix tokens (system prompts, prior turns). Every time the relay rotates accounts to evade detection, the per-account cache is destroyed, full-price input tokens get burned on context that would otherwise be near-free. The relay can also synthesize the `cache_creation_input_tokens` / `cache_read_input_tokens` SSE fields the user sees in their billing, so cache-miss inflation is invisible from the client side. Whether it's purely structural or partly deliberate over-billing is impossible to determine from outside.

---

## The logs are the actual product

Every relay tees the SSE stream to a logger. This is not optional, it's the standard implementation pattern. In Go you wrap the upstream response body in an `io.TeeReader` and pipe to (a) the client connection and (b) a Kafka/Redis/DuckDB sink. Overhead is negligible.

What gets captured: every user message and system prompt; every `content_block_delta` (concatenated to reconstruct full assistant turns); every `thinking` block under `interleaved-thinking-2025-05-14`; every tool-call and tool-result JSON. For agentic Claude Code traffic, most of the actually-valuable traffic, this includes file paths and contents read via `BashTool`/`FileReadTool`, the structured tool-call JSON for the full Claude Code tool surface, and **the final code the developer accepted**.

That last bullet is the prize. Most distillation pipelines need a verifier model to label which outputs are correct. Agentic Claude Code traces don't, *the developer accepted them.*

> **Free, human-grade SFT labels harvested at zero marginal cost from someone else's coding session.**



Open HuggingFace today and search "Opus reasoning":

- `Crownelius/Opus-4.6-Reasoning-3300x`
- `nohurry/Opus-4.6-Reasoning-3000x-filtered`
- `LEGENDQ/Claude-Opus-4.6-Reasoning-Dataset`
- `Jackrong/Qwen3.5-{2B,4B,9B,27B}-Claude-4.6-Opus-Reasoning-Distilled-v2`
- `lordx64/reasoning-distill-claude-opus-4-7-max`, 8,124 conversations explicitly via official API; the upfront-provenance counterexample

The Jackrong repos publish the full recipe: loss curves descending from ~0.73 to ~0.19 over three epochs, Unsloth + LoRA with `train_on_responses_only`, Qwen template `<|im_start|>assistant\n<think>{thinking}</think>\n{final_answer}<|im_end|>`. Anyone with a 3090 can finetune a Qwen base on Claude reasoning traces in an afternoon.

[Anthropic's Feb 23, 2026 disclosure](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks) puts numbers on the largest extractions: **DeepSeek ~150K exchanges, Moonshot ~3.4M, MiniMax ~13M**, across roughly **24,000 fraudulent accounts**. At 1–2K assistant tokens per exchange, that's **tens of billions of tokens** of Claude output captured for downstream training.

> **Pre-training-corpus scale.**



Whether you believe the specific lab attributions, *the mechanism is real and reproducible*. You can build the pipeline in a weekend.

Now the loop closes. The reason API access can be sold so cheap is that the API access is the cover charge. The actual product, the durable asset on the operator's balance sheet, is the log corpus. Every paying customer is unknowingly contributing labeled, human-accepted, agentic-coding training data, which is exactly what second-tier Chinese AI labs need most and are hardest-pressed to generate organically.

> **The API revenue is the customer-acquisition cost. The logs are the actual margin.**



---

## Why Clio catches some attacks and misses the bigger ones

Anthropic's content-side defense is [**Clio**](https://www.anthropic.com/research/clio) ([arXiv 2412.13678](https://arxiv.org/abs/2412.13678)): Claude facets each conversation → embed → k-means cluster → `claude-3.5-haiku` labels leaves → `claude-3-opus` merges upward. A privacy-preserving map of "what Claude is being used for at population scale." Clio caught an SEO-spam ring on free Claude.ai. There's an open-source replica, `Phylliida/OpenClio`.

What Clio struggles with, by construction: a relay's traffic dilutes any single extraction campaign across thousands of unrelated-looking conversations from "different" customers. The relay's actual paying customers, indie hackers, vibe coders doing legitimate startup work for $4/M tokens, are *perfect background traffic*. A targeted extraction campaign hidden inside that crowd is statistically diverse at the facet level. K-means won't cluster it.

> **You can't find a needle by clustering a haystack made of needles.**



How did Anthropic actually catch the 20,000-account hydra in February? Not with Clio, with cross-signal correlation:

- **Shared payment metadata.** Carded sign-ups share processor IDs, BIN ranges, anti-fraud flags.
- **Infrastructure correlation.** Proxy egress traced to common datacenter ranges.
- **Synchronized timing.** Requests pulsing in lockstep across dispersed residential IPs.
- **Prompt-sequence fingerprints.** Each campaign has a characteristic *order* of capability probes, hard to fake even when you can fake the IPs.

Anthropic's phrasing, "all roads lead to Rome", is jargon for: even with perfect network-layer spoofing, you can't make 20,000 accounts truly independent in their payment, infrastructure, timing, and request-graph structure.

> **That's the defender's actual moat.**



---

## The math of the scam

| Per-account costs | $ |
|---|---|
| Antidetect browser profile | 0.30 |
| Residential proxy session | 0.05 |
| Phone OTP | 0.01 |
| Fake ID (weighted, ~10% trigger KYC) | 1.50 |
| Carded sign-up (weighted) | 5.00 |
| **Total** | **~$5–10** |

Revenue side: Anthropic list ~$15/M input + $75/M output Opus. Shadow relay ~$4–5/M input + $20–25/M output (~30% of list). If Opus→Haiku swap fires half the time, real upstream cost on that half collapses to ~$1/M input + ~$5/M output. On the unswapped half, the upstream cost is also near-zero whenever the request rides on a free-credit or carded account. **Effective gross margin per "Opus" token: 80%+** under realistic mix assumptions, with the cap set by how much of the pool is actually paid-USD accounts vs subsidized ones.

That's the visible business. The log corpus is the invisible one. No public price sheet exists, but the strategic value to a Chinese lab trying to close the agentic-coding gap with Anthropic is enormous, and the HuggingFace evidence shows the workflow is productized and ongoing. The corpus *compounds*: every month of operation adds another month of human-verified agentic traces. API margin pays customer-acquisition cost; the corpus pays for the future.

Positive-NPV at every layer, commodity tooling, a moat that compounds. That's why it persists.

---

## The defense playbook

1. **Stop investing in network-layer detection.** TLS (JA3/JA4), HTTP/2 SETTINGS, header order, TCP fingerprints, assume all match real Chrome on real residential IPs. Detect on what's *inside* the request, not how it arrives.
2. **Build graph-level cross-account analysis.** Pattern-matching across the entire request stream, timing correlation, prompt-sequence fingerprinting, payment-graph clustering, infrastructure-range correlation. This is what caught the hydra.
3. **Mandate Injection Attack Detection in KYC, not just liveness.** NIST SP 800-63-4, CEN/TS 18099, ISO 25456 distinguish PAD from IAD for a reason. Hardware-attested camera frames (Secure Enclave on iOS, `CameraExtensionSession` on Android) raise cost-of-attack and push the supply chain toward slower human-in-the-loop fallbacks.
4. **Audit your "Claude" suppliers.** Run the CISPA fingerprint methodology, LLMmap-style probes, MedQA/GSM8K/MMLU spreads. A silent 45% capability gap is the baseline, not the worst case.
5. **Watch your own egress.** If a proxy is misrepresenting itself as Claude Code, your outbound `claude-cli/x.y.z` User-Agent will reveal it. Cheap to monitor.
6. **Treat any prompt routed through a third-party proxy as published.** Especially agentic coding. The file contents read by `BashTool`, the tool-call JSON, the accepted code, all of it lands in someone's logger.

> **If you wouldn't paste it in a public Discord, don't paste it into a $4/M reseller.**



If you're an indie hacker eyeing the discount: sometimes you're getting real Claude. Often you're getting Haiku in an Opus wrapper. Always you're logging your prompts to someone you don't know.

---

## Honest qualifications

- Anthropic's named figures (DeepSeek 150K, Moonshot 3.4M, MiniMax 13M, ~24K accounts) are the defender's narrative. Attributions could be wrong in either direction.
- The CISPA paper anonymizes the three shadow APIs it audited deeply (A, E, H). We can't publicly map named relays to measured drops.
- "The logs are the actual margin" is the consensus interpretation, supported by HuggingFace evidence but no published relay-to-buyer transaction trail exists. Strong inference, not court-grade proof.
- Several relay codebases, `claude-relay-service`, `one-api`, `auth2api`, `ccproxy-api`, have legitimate single-user purposes: personal multi-account, household Max-plan sharing. Same code drives the abusive transfer stations. Mechanism is identical regardless of intent.

---

## The actual game

A lot of security writing about grey markets ends with "this should not exist." That framing isn't useful. Of course it exists. Every layer is commodity. Every layer has a legitimate counterpart. The economics make it inevitable.

The shape of the threat model is what matters:

- **The network layer is gone.** No fingerprint at the TCP/TLS/HTTP layer survives contact with a competent attacker who has `curl_cffi` and a proxy subscription.
- **Content-side detection has structural limits.** Clio finds large single-purpose campaigns; it cannot find a distributed extraction that synthesizes client-side from facet-level noise.
- **The reliable signal lives at the cross-account graph level**, payment metadata, infrastructure ranges, timing correlation, prompt-sequence patterns. That's where Anthropic caught the hydra. That's where the next defensive stack has to be built.
- **The actual product on offer is not the API access. It's the logs.** The relay is a customer-acquisition funnel for a training-data business operating on a different time horizon than the visible margin.

The CISPA paper, the iProov and Group-IB reports, Bitsight's TRACE telemetry, the WEF Cybercrime Atlas, the eunomia.dev eBPF dump, Reid Barber's reverse-engineering writeup, and Anthropic's own Clio research are the building blocks of the next defensive stack. They're public. Read them. Build on them.

The grey market won't go away. The economics are too good. But the cost-of-attack can be raised meaningfully, and the cost-of-detection can be brought down.

> **That's the actual game.**



---

*Primary sources: [CISPA](https://arxiv.org/abs/2603.01919) · [Anthropic distillation](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks) · [Clio paper](https://arxiv.org/abs/2412.13678) / [blog](https://www.anthropic.com/research/clio) · [404 Media OnlyFake](https://www.404media.co/inside-the-underground-site-where-ai-neural-networks-churns-out-fake-ids-onlyfake/) · [iProov 2025](https://www.iproov.com/reports/threat-intelligence-report-2025-remote-identity-attack) · [Group-IB Weaponized AI](https://www.group-ib.com/resources/research-hub/weaponized-ai/) · [WEF Cybercrime Atlas](https://reports.weforum.org/docs/WEF_Unmasking_Cybercrime_Strengthening_Digital_Identity_Verification_against_Deepfakes_2026.pdf) · [FBI 911 S5 PSA](https://www.ic3.gov/PSA/2024/PSA240529) · [Bitsight TRACE](https://www.bitsight.com/blog/residential-proxy-services-malware-ecosystems) · [eunomia.dev eBPF](https://eunomia.dev/blog/2026/02/13/reverse-engineering-claude-codes-ssl-traffic-with-ebpf/) · [Reid Barber](https://www.reidbarber.com/blog/reverse-engineering-claude-code) · [Cloudflare residential-proxy bot ML](https://blog.cloudflare.com/residential-proxy-bot-detection-using-machine-learning/).*