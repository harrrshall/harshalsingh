---
# Physics Learning Progress Tracking
# Update these fields to reflect your current position

current_section: "I.B"
current_topic: "Mathematical Prerequisites Roadmap"
completed_sections:
  - "I.A"
last_updated: "2026-01-07"
---

# COMPREHENSIVE PHYSICS LEARNING ROADMAP
## From Undergraduate to Professional Research Competence

**Version:** 1.0 | **Last Updated:** January 2026 | **Audience:** Aspiring Research Physicists & Deep-Tech Engineers

---

## EXECUTIVE SUMMARY & QUICK-START CHECKLIST

This roadmap provides a complete curriculum spanning first-year undergraduate physics through professional research readiness, typically requiring 4–6 years of disciplined study. Success depends on three pillars:

1. **Mastery of Core Theory** – Classical mechanics through quantum field theory
2. **Calculation Proficiency** – Problem-solving at progressively advanced levels
3. **Experimental & Computational Skills** – Hands-on integration with theory

### 20 Core Competencies (End-of-Roadmap Checkpoints)

By completion, you should be able to:

1. Solve Lagrangian/Hamiltonian problems with constraints and gauge theory
2. Apply Maxwell's equations to novel boundary-value problems and radiation
3. Compute quantum observables using perturbation theory and scattering amplitudes
4. Derive thermodynamic quantities from partition functions and ensembles
5. Perform Fourier transforms and asymptotics on complex integrals
6. Design and analyze precise experiments with uncertainty quantification
7. Implement numerical ODE/PDE solvers and Monte Carlo simulations
8. Apply geometric optics and diffractive phenomena to optical systems
9. Calculate band structures and electronic properties in solids
10. Transform between inertial and non-inertial reference frames (special relativity)
11. Model incompressible and viscous flows; boundary layer approximations
12. (Elective) Compute cross-sections and decay rates in particle physics
13. (Elective) Analyze plasma instabilities and wave propagation
14. (Elective) Model protein dynamics or biomolecular systems
15. (Elective) Couple atmospheric dynamics to thermodynamic processes
16. Critique and build upon peer-reviewed literature
17. Mentor junior students in problem-solving
18. Propose and defend original research project
19. Implement version control and reproducible computational workflows
20. Communicate physics clearly to technical and general audiences

---

## I. FOUNDATIONAL PREREQUISITES & DIAGNOSTIC ASSESSMENTS

### A. Assumed Background

Students entering this roadmap should have:

- **High School Physics:** Newtonian mechanics, basic electromagnetism, waves
- **Single-Variable Calculus:** Limits, derivatives, integrals, series
- **Linear Algebra Basics:** Vectors, matrices, determinants (see Section I.B for depth)

### B. Mathematical Prerequisites Roadmap

| **Topic** | **Minimum Competency** | **Primary Resource** | **Secondary** | **Milestone Exercise** |
|---|---|---|---|---|
| **Calculus (Multivariable)** | Partial derivatives, Jacobians, Hessians, gradients, divergence, curl | Stewart's *Calculus* 8th ed., Ch. 14–16 (2–3 weeks) | MIT OCW 18.02 | Compute ∇×**E** in spherical coords for point dipole |
| **Linear Algebra** | Eigenvalue problems, matrix diagonalization, vector spaces, basis sets | Strang *Linear Algebra and Its Applications*, Ch. 1–6 (4 weeks) | MIT OCW 18.06 (free) | Find eigenvectors of 3×3 symmetric matrix; interpret physical meaning |
| **Complex Analysis** | Cauchy-Riemann equations, residue calculus, Laurent series, analytic continuation | Boas *Mathematical Methods* Ch. 2, 13–14 (3–4 weeks) | – | Evaluate ∫₀^∞ dx/(x⁴+1) using residue theorem |
| **Differential Equations** | 1st & 2nd order ODEs, series solutions, Frobenius method, Sturm-Liouville | Boas Ch. 8; Arfken & Weber Ch. 9 (4–5 weeks) | – | Solve Bessel equation; sketch eigenvalue spectrum |
| **Fourier Analysis** | Series, transforms, convolution, Parseval's theorem | Boas Ch. 7; Arfken Ch. 14 (3 weeks) | – | FT of Gaussian; interpret bandwidth |
| **Special Functions** | Bessel, Legendre, Hermite, Laguerre functions; recurrence relations | Boas Ch. 11; Arfken Ch. 11–13 (ongoing) | – | Express exp(-x²) as Hermite series; evaluate ∫Jₙ(x)dx |
| **Tensor Calculus** | Covariant/contravariant indices, metric tensor, Christoffel symbols (optional pre-GR) | Carroll *Lecture Notes on GR* Appendix; Misner-Thorne-Wheeler Chs. 8–10 | Schutz *A First Course in GR* | Index contraction; raise/lower indices with metric |
| **Group Theory & Symmetries** | Rotation groups, SO(3), SU(2), representations; Noether's theorem | Arfken Ch. 4 (intro); Georgi *Lie Algebras in Particle Physics* (advanced) | – | Derive conserved quantities from Lagrangian symmetries |
| **Probability & Statistics** | Distributions, moments, hypothesis testing, error propagation, Bayesian inference | Boas Ch. 15; Taylor *An Introduction to Error Analysis* | – | Propagate errors; construct confidence intervals |
| **Numerical Methods** | Root-finding, interpolation, differentiation, integration, linear systems | Numerical Recipes 3rd ed., Chs. 5–9; scipy.integrate docs | – | Implement RK4 for harmonic oscillator; compare to analytical |

**Competency Milestones:**

- **Week 0–2:** Review single-variable calculus; confirm comfort with series and limits
- **Week 2–6:** Master multivariable calculus (partial derivatives, vector calculus, coordinate transformations)
- **Week 6–10:** Linear algebra (eigenvalue problems are essential for QM)
- **Week 10–14:** Complex analysis (residues for integrals, analyticity)
- **Week 14–18:** ODEs and Fourier analysis (foundation for wave equations, normal modes)
- **Throughout:** Special functions, probability, numerics on-demand based on current physics coursework

**Recommended Combined Track:**

Use **Boas** as primary undergraduate text (more accessible, physics-focused); transition to **Arfken & Weber** (6th ed.) as graduate reference by Year 2. Both are comprehensive; Boas builds intuition, Arfken provides rigor.

---

## II. UNDERGRADUATE CORE SEQUENCE

### A. Classical Mechanics

**Learning Outcomes:**
- Master Lagrangian and Hamiltonian formulations; solve constrained systems
- Apply variational principles; understand Noether's theorem and conservation laws
- Solve nonlinear oscillators, coupled systems, rigid body motion, and chaos basics
- Apply perturbation theory to slightly perturbed systems

**Recommended Sequence (1–1.5 semesters):**

| **Stage** | **Primary Text** | **Chapters** | **Alternatives & Why** | **Problem Sets** |
|---|---|---|---|---|
| **Intro (Weeks 1–3)** | Kleppner & Kolenkow *An Intro to Mechanics* 2nd ed. (Cambridge, 2014) | 1–5: Newton's laws, energy, momentum | Marion & Thornton 5th ed. (more comprehensive but denser) | K&K: Chapters end with ~20 problems each; work all odd |
| **Lagrangian (Weeks 4–7)** | Goldstein *Classical Mechanics* 3rd ed. (Addison-Wesley, 2002) | 1–3: Lagrangian formulation, symmetries, conservation | Landau & Lifshitz *Mechanics* Vol. 1 (terse, elegant, post-Lagrangian) | Goldstein: 40–60 problems per chapter; select ~30% (starred) |
| **Hamiltonian (Weeks 8–10)** | Goldstein Ch. 8–9 | Canonical transformations, Hamilton-Jacobi theory | Kleppner Ch. 6–7 (less rigorous, good intuition) | Goldstein Ch. 8–9 problems |
| **Advanced Topics (Weeks 11–14)** | Landau & Lifshitz *Mechanics* Ch. 4–6 | Rigid body dynamics, small oscillations, chaos | Goldstein Ch. 10 (chaos intro) | L&L problem sets (few but challenging) |

**Core Problem Sets (Grade Difficulty 1–5):**

1. **Kleppner & Kolenkow Problem Bank:** ~100 problems; Difficulty 2–3; select 30 for fluency
2. **Goldstein Problem Bank:** ~150 problems; Difficulty 3–4; target 50 problems (force deep understanding)
3. **Marion & Thornton (supplementary):** Advanced problems on coupled oscillators, nonlinear dynamics
4. **Online Resource:** MIT OCW 8.09 (Classical Mechanics III) – lecture notes + exams with solutions

**Diagnostic Test Problems (Set CM1 – End of Classical Mechanics):**

*Problem 1 (Difficulty 2):* A bead slides on a frictionless wire in the shape of y = x². Use Lagrangian mechanics to find the equation of motion. Verify using Newton's laws.
- **Rubric:** Correct Lagrangian (KE + PE), Euler-Lagrange, confirmation of physics

*Problem 2 (Difficulty 3):* Two masses m₁, m₂ connected by a massless rod of length L oscillate on a frictionless surface. Find normal modes and frequencies.
- **Rubric:** Correct Lagrangian for coupled system, matrix eigenvalue problem, physical interpretation of modes

*Problem 3 (Difficulty 3):* A symmetric top precesses under gravity. Derive the precession frequency. What is the relationship to angular momentum?
- **Rubric:** Euler angles, Hamiltonian approach or Lagrangian with constraints, connection to L·g

*Problem 4 (Difficulty 4):* Derive the action-angle variables for the 1D harmonic oscillator. Show that action is an adiabatic invariant.
- **Rubric:** Canonical transformation structure, evaluation of phase-space integral, slow-parameter variation

*Problem 5 (Difficulty 4):* Analyze the stability of a fixed point in the Hénon map. What conditions lead to chaos?
- **Rubric:** Linearization, Lyapunov exponent, bifurcation diagram sketch

---

### B. Electromagnetism (E&M)

**Learning Outcomes:**
- Master Maxwell's equations in integral and differential forms
- Solve boundary-value problems (Laplace/Poisson equations, Cartesian/spherical/cylindrical)
- Understand electromagnetic waves, radiation, and energy/momentum transport
- Apply to waveguides, transmission lines, multipole expansions

**Recommended Sequence (1.5–2 semesters):**

| **Stage** | **Primary Text** | **Chapters** | **Alternatives** | **Problem Sets** |
|---|---|---|---|---|
| **Statics (Weeks 1–6)** | Griffiths *Introduction to Electrodynamics* 5th ed. (Cambridge, 2023) | 1–4: Vector calc, E-field, potentials, conductors, dielectrics | Jackson *Classical Electrodynamics* 3rd ed. (graduate, skip initially) | Griffiths: ~10 problems per chapter; aim for 50+ |
| **Magnetostatics (Weeks 7–10)** | Griffiths 5–6 | Lorentz force, B-field, magnetic materials | – | Griffiths Ch. 5–6: 40+ problems |
| **Maxwell & Waves (Weeks 11–14)** | Griffiths 7–9 | Faraday's law, Maxwell's eq., EM waves, energy/momentum | Purcell *Electricity and Magnetism* 2nd ed. (Berkeley, more intuitive) | Griffiths: 60+ problems; select 40 for depth |
| **Radiation & Advanced (Weeks 15–16)** | Griffiths 10–11; Jackson 6–9 (selectively) | Radiation, retarded potentials, relativistic E&M | – | Jackson problems (very challenging) |

**Core Problem Sets:**

1. **Griffiths Problem Bank:** ~200 problems; Difficulty 2–3 (undergraduate)
2. **Jackson Selected Problems:** ~100; Difficulty 4–5 (graduate-level mastery)
3. **MIT OCW 8.07 (Electromagnetism II):** Exams + solutions, esp. on BVPs
4. **Free Online:** David Tong's E&M lecture notes (Cambridge)

**Diagnostic Test Problems (Set EM1 – End of Electromagnetism):**

*Problem 1 (Difficulty 2):* A uniformly charged sphere of radius R carries total charge Q. Find E-field inside and outside; verify Gauss's law.
- **Rubric:** Correct application of Gauss's law, boundary conditions, physical limits (Q→0, R→∞)

*Problem 2 (Difficulty 3):* Solve Laplace's equation inside a grounded conducting sphere of radius a with hemisphere at potential V₀. Use separation of variables and Legendre polynomials.
- **Rubric:** Boundary conditions, series expansion, summation to closed form if possible, verification

*Problem 3 (Difficulty 3):* A plane EM wave polarized in the x-direction propagates in +z. Find **E**, **B**, Poynting vector. Verify Maxwell's equations are satisfied.
- **Rubric:** Correct wave form, **E** ⊥ **B** ⊥ **k**, energy density, correct Poynting magnitude

*Problem 4 (Difficulty 4):* Compute the multipole expansion of the electric field for a dipole **p** = p**ẑ** at the origin. Verify agreement with direct calculation at r >> d.
- **Rubric:** Dipole moment definition, expansion in Legendre polynomials, monopole suppression, r⁻³ dipole field

*Problem 5 (Difficulty 4):* Derive the reflection and transmission coefficients for EM waves at a boundary between media with ε₁, μ₁ and ε₂, μ₂. Verify energy conservation.
- **Rubric:** Boundary conditions for **E** ∥, **H** ∥, Fresnel equations, Brewster angle, Total internal reflection

---

### C. Quantum Mechanics

**Learning Outcomes:**
- Understand wave-particle duality, superposition, uncertainty principle
- Solve Schrödinger equation for standard potentials (particle in box, harmonic oscillator, hydrogen)
- Master operator formalism, eigenvalues, measurement postulates
- Apply time-dependent perturbation theory, scattering, identical particles

**Recommended Sequence (1.5–2 semesters):**

| **Stage** | **Primary Text** | **Chapters** | **Alternatives** | **Problem Sets** |
|---|---|---|---|---|
| **Wave Mechanics (Weeks 1–6)** | Griffiths *Introduction to Quantum Mechanics* 3rd ed. (Cambridge, 2018) | 1–2: Wave function, Schrödinger eq., probability, uncertainty | Shankar *Principles of Quantum Mechanics* (more abstract, Hilbert space earlier) | Griffiths: 30+ problems |
| **Formalism (Weeks 7–10)** | Griffiths 3 | Hilbert spaces, operators, observables, eigenfunctions, completeness | Cohen-Tannoudji et al. Vol. I Ch. 2–3 (comprehensive, graduate-level) | Griffiths Ch. 3: 40 problems |
| **1D Potentials (Weeks 11–13)** | Griffiths 2 (revisited), detail | Bound states, scattering, tunneling, finite square well | – | Griffiths: 50 problems |
| **3D & Central Potentials (Weeks 14–17)** | Griffiths 4 | Hydrogen atom, angular momentum, spin, addition of angular momenta | Landau & Lifshitz *Quantum Mechanics* (terse, powerful) | Griffiths Ch. 4: 60 problems |
| **Approximation Methods (Weeks 18–20)** | Griffiths 6 | Time-independent perturbation theory, WKB approximation, variational principle | Cohen-Tannoudji Vol. II (time-dependent perturbation) | Griffiths Ch. 6: 40 problems |
| **Scattering & Identical Particles (Weeks 21–22)** | Griffiths 11 (Ch. 11, Brief Intro); Cohen-Tannoudji Vol. III Ch. XIII | Born approximation, partial waves, indistinguishable particles (bosons/fermions) | – | Advanced problems |

**Core Problem Sets:**

1. **Griffiths Problem Bank:** ~200 problems; Difficulty 2–3
2. **Cohen-Tannoudji Problems:** ~300 (very comprehensive, graduate level)
3. **Landau & Lifshitz (optional):** 50 advanced problems on scattering, perturbation
4. **MIT OCW 8.04-8.06 (Quantum Physics I–III):** Exams + solutions

**Diagnostic Test Problems (Set QM1 – End of Quantum Mechanics):**

*Problem 1 (Difficulty 2):* A particle in an infinite square well of width a is in a superposition of first two energy eigenstates with equal amplitudes. If measured at position, what are possible outcomes and probabilities?
- **Rubric:** Correct normalization, energy eigenvalues, position eigenstate overlap integrals

*Problem 2 (Difficulty 3):* Apply time-independent perturbation theory (1st order) to the 1D harmonic oscillator with perturbation H' = λx⁴. Find correction to ground-state energy.
- **Rubric:** Correct matrix elements ⟨0|x⁴|0⟩, convergence condition, physical interpretation

*Problem 3 (Difficulty 3):* Hydrogen atom: Find 2P state energy to 1st order in fine structure (spin-orbit coupling). What is the degeneracy lifting?
- **Rubric:** Spin-orbit Hamiltonian, |L·S⟩ eigenstates, matrix elements, energy shifts

*Problem 4 (Difficulty 4):* Two identical fermions (1/2 spin) in a 1D box. Construct properly antisymmetrized state for ground + first excited level. What is the ground-state spin state?
- **Rubric:** Slater determinant, exchange symmetry, spin singlet/triplet, correct Pauli exclusion

*Problem 5 (Difficulty 4):* Derive the scattering length in the Born approximation for a spherical potential V(r). For hard spheres (V=∞ for r<a), verify s-wave dominance at low energy.
- **Rubric:** Born approximation formula, momentum transfer, differential cross-section, total cross-section σ=4πa²

---

### D. Thermodynamics & Statistical Mechanics

**Learning Outcomes:**
- Master laws of thermodynamics, thermodynamic potentials, Legendre transformations
- Understand ensemble theory (microcanonical, canonical, grand-canonical)
- Calculate thermal properties from partition functions
- Apply to phase transitions, critical phenomena, transport theory

**Recommended Sequence (1–1.5 semesters):**

| **Stage** | **Primary Text** | **Chapters** | **Alternatives** | **Problem Sets** |
|---|---|---|---|---|
| **Thermo Foundations (Weeks 1–5)** | Reif *Fundamentals of Statistical and Thermal Physics* (McGraw-Hill, 1965) | 1–6: Probability, 1st/2nd laws, entropy, potentials | Schroeder *An Introduction to Thermal Physics* (more modern pedagogy) | Reif: 30 problems |
| **Stat Mech Basics (Weeks 6–10)** | Reif 7–10 | Ensembles, partition functions, ideal gases, equipartition | Landau & Lifshitz *Statistical Physics* Vol. 5 (rigorous) | Reif: 40 problems |
| **Applications (Weeks 11–14)** | Reif 11–13 | Phase transitions, quantum gases (Fermi, Bose), kinetic theory | Pathria *Statistical Mechanics* 3rd ed. (graduate, advanced) | Reif: 50 problems |
| **Advanced Topics (Weeks 15–16)** | Reif 14; David Tong's *Statistical Physics* lecture notes | Irreversible processes, fluctuations, Fokker-Planck (optional) | – | Challenge problems |

**Core Problem Sets:**

1. **Reif Problem Bank:** ~230 problems; Difficulty 2–3 (well-graded progression)
2. **MIT OCW 8.333 (Statistical Mechanics I):** Exams, lecture notes
3. **Pathria (graduate):** 100 challenging problems
4. **Dill & Bromberg *Molecular Driving Forces*:** Toy model approach, intuition-building

**Diagnostic Test Problems (Set TSM1 – End of Thermo/Stat Mech):**

*Problem 1 (Difficulty 2):* Ideal gas of N particles in volume V at temperature T. Calculate partition function Z, Helmholtz free energy F, entropy S. Verify thermodynamic relations.
- **Rubric:** Correct Z = (V/λ³)ᴺ/N!, F = -kT ln Z, S = -∂F/∂T, etc.

*Problem 2 (Difficulty 3):* Einstein model of solids: N oscillators each with frequency ω. Find internal energy, heat capacity at low/high T. Compare to Dulong-Petit.
- **Rubric:** Single-oscillator partition function, N-oscillator Z, U = Nℏω/(exp(ℏω/kT)-1), C_v, limits

*Problem 3 (Difficulty 3):* Phase transition: Mean-field Ising model in 1D. Derive free energy, find critical point (if any), compare to exact solution.
- **Rubric:** Free energy formulation, magnetization, susceptibility, Landau theory coefficients

*Problem 4 (Difficulty 4):* Ideal Bose gas: Derive Bose-Einstein distribution. Calculate T_c for Bose-Einstein condensation. Find N_condensed vs. T below T_c.
- **Rubric:** Fugacity expansion, density of states, Riemann zeta function ζ(3/2), physical interpretation

*Problem 5 (Difficulty 4):* Boltzmann transport equation: Derive collision-term simplification in relaxation-time approximation. Apply to electrical conductivity; obtain Drude formula.
- **Rubric:** BTE derivation, collision integral linearization, current-field relation, σ = ne²τ/m

---

### E. Mathematical Methods for Physicists

**Integrated Throughout Cores; Dedicated Focus:**

| **Topic** | **Stage** | **Primary Resource** | **Mastery Milestone** |
|---|---|---|---|
| **Vector Calculus in Physics** | Concurrently with E&M (Griffiths Ch. 1) | Boas Ch. 1; Arfken Ch. 1 | Apply to Maxwell's equations; verify Stokes, divergence theorems |
| **Complex Analysis** | Concurrent with Math Prereq; deepen in QM | Boas Ch. 2, 13; Arfken Ch. 6–7 | Evaluate oscillating integrals by contour; identify poles of scattering amplitude |
| **Fourier Methods** | Concurrent with Wave Physics (QM, E&M) | Boas Ch. 7; Arfken Ch. 14 | Decompose any potential into Fourier series; solve PDEs by FT |
| **Special Functions** | Ongoing in QM, Thermo, Classical Mech | Boas Ch. 11; Arfken Ch. 11–13 | Recognize Bessel, Legendre in various physics; use recurrence relations |
| **Differential Equations** | Concurrent with Classical Mech, QM, Thermo | Boas Ch. 8; Arfken Ch. 9; ODEs course (if available) | Solve Bessel, Legendre, Hermite equations from scratch |
| **Variational Methods** | In Classical Mech; deepen in QM | Goldstein Ch. 2; Griffiths 2 | Derive Lagrange eqs. from least action; apply variational principle to QM states |
| **Linear Algebra Applications** | Throughout (QM especially) | Boas Ch. 3; Strang's course; MIT 18.06 | Diagonalize Hermitian operators; find eigenvalue spectra |

---

### F. Experimental Physics & Lab Methods

**Learning Outcomes:**
- Understand sources of error (systematic, random), uncertainty propagation
- Design experiments with proper control and precision
- Calibrate instruments and verify theoretical predictions
- Analyze data statistically; communicate results with proper error bars

**Recommended Resources:**

1. **Error Analysis:** Taylor *An Introduction to Error Analysis* 3rd ed. (leading text; Chs. 1–5 mandatory)
2. **Experiment Design:** Bevington & Robinson *Data Reduction and Error Analysis* (4th ed., 2020)
3. **Laboratory Practices:** Hughes & Hase *Measurements and their Uncertainties* (physics-specific)
4. **Online Resource:** MIT OCW 8.13-14 (Experimental Physics I & II, Junior Lab) – actual experiments with rubrics

**Core Laboratory Skills (Checklist):**

- [ ] Error propagation (linear and nonlinear cases)
- [ ] Calibration curves and regression analysis
- [ ] Chi-square fitting and goodness-of-fit tests
- [ ] Control of systematic errors
- [ ] Measurement of fundamental constants (g, e/m, speed of light)
- [ ] Signal-to-noise ratio optimization
- [ ] Data logging and spreadsheet analysis
- [ ] Scientific plotting (Matplotlib, Python)
- [ ] Report writing with results, uncertainty discussion, comparison to theory

**Mini-Projects (Semesters 3–4):**

1. **Measure g using simple pendulum:** ~10 measurements, error analysis, comparison to local value
2. **E/m ratio using cathode ray tube:** Deflection measurement, systematic error identification
3. **Speed of light using modulated LED:** Timing accuracy; proper propagation of uncertainties
4. **Verify Stefan-Boltzmann law:** Temperature measurement, radiative heat transfer

---

### G. Computational Physics (Integrated)

**Goals:** Numerical solution of physics equations; simulation; data analysis

**Software Stack (Python-based, open-source):**

- **NumPy** (arrays, linear algebra): Core for all numerics
- **SciPy** (optimization, ODE/PDE solvers, special functions, statistics): Integration, fitting
- **Matplotlib** (plotting): Publication-quality figures
- **Pandas** (data frames): Experiment data organization
- **Jupyter Notebooks:** Interactive exploration and documentation

**Skill Progression:**

| **Semester** | **Topic** | **Project Examples** | **Required Milestones** |
|---|---|---|---|
| **1–2** | NumPy basics, plotting | Plot analytical solutions; compare units; interpolate data | 1. NumPy array operations; 2. Basic Matplotlib plots; 3. Read CSV data |
| **3–4** | ODE solvers (RK4, adaptive) | Harmonic oscillator with damping; nonlinear pendulum bifurcation | 1. scipy.integrate.odeint; 2. Convergence testing; 3. Phase portraits |
| **5–6** | Linear algebra (eigenvalues) | Normal modes of coupled oscillators; diagonalize Hamiltonian matrix | 1. np.linalg.eig; 2. Visualize eigenmodes; 3. Verify orthogonality |
| **7–8** | PDE solvers (finite difference) | 1D wave equation (FTCS scheme); 2D heat diffusion | 1. Boundary conditions; 2. Stability analysis (CFL); 3. Animation of solution |
| **9–10** | FFT and Fourier analysis | Spectral methods for Schrödinger equation; signal processing | 1. scipy.fft; 2. Convolution; 3. Parseval's theorem verification |
| **11–12** | Optimization & root-finding | Minimize action in mechanics; find energy levels by matrix iteration | 1. scipy.optimize; 2. Constrained vs. unconstrained; 3. Compare methods |
| **13–14** | Monte Carlo basics | Estimate π; random walk; basic statistical mechanics | 1. Random number generation; 2. Importance sampling; 3. Error estimation |
| **15–16** | Scientific computing best practices | Version control (Git), reproducible workflows, literate programming | 1. GitHub repo setup; 2. README + documentation; 3. Reproducible environment |

**Sample Code Templates (to be provided separately):**

- solve_oscillator.py (RK4 for SHO with friction)
- eigen_coupled_system.py (normal modes)
- wave_equation_1d.py (FTCS scheme with stability check)
- monte_carlo_pi.py (basic MC integration)
- fourier_particle_box.py (spectral method for particle in box)

---

## III. ADVANCED UNDERGRADUATE / EARLY GRADUATE SEQUENCE

### A. Mathematical Methods (Deeper)

**Goals:** Bridge gap to graduate-level rigor; master advanced mathematical tools

**Primary Text:** Arfken, Weber & Harris *Mathematical Methods for Physicists* 7th ed. (2013)

| **Topic** | **Chapters** | **Depth** | **Application in Physics** | **Estimated Hours** |
|---|---|---|---|---|
| Tensors & Curvilinear Coords | 1–2 | Rigorous; multilinear algebra | GR, continuum mechanics | 15 |
| Vector Spaces, Linear Operators | 3 | Hilbert space axioms | Quantum mechanics foundation | 12 |
| Tensor Analysis | (Ch. 2) | Covariance, contravariance, metric | GR, electromagnetism | 20 |
| Group Theory (Intro) | 4 | Rotation groups SO(3), SU(2), representations | Particle physics, symmetries | 20 |
| Real & Complex Analysis | 5–7 | Riemann, Lebesgue, contours, residues | Perturbation theory, scattering | 30 |
| Differential Equations (Advanced) | 9–10 | Series solutions, singular points, Sturm-Liouville | Eigenvalue problems, quantum | 25 |
| Special Functions (Systematic) | 11–13 | Orthogonal polynomials, generating functions, asymptotics | All areas of physics | 30 |
| Integral Transforms | 14 | Fourier, Laplace, Hankel, convolution theorems | Signal processing, PDEs | 20 |
| Partial Differential Equations | (Ch. 10 synthesis) | Classification, separation of variables, Green's functions, numerical | Wave, heat, Schrödinger equations | 25 |
| **Total** | | | | **197 hours** (~1 intensive semester) |

**Diagnostic Problems (Set MAM1 – Advanced Mathematical Methods):**

*Problem 1 (Difficulty 3):* Given a symmetric rank-2 tensor T_ij, show how to find its principal axes and eigenvalues. Interpret physically for stress tensor.
- **Rubric:** Eigenvalue equation det(T - λI) = 0, orthogonal eigenvectors, principal stress directions

*Problem 2 (Difficulty 4):* Derive the Christoffel symbols for spherical coordinates. Show that ∇·**v** in spherical coords equals the result in Cartesian.
- **Rubric:** Metric tensor g_ij, definition of Γ, covariant derivative, divergence formula

*Problem 3 (Difficulty 4):* Solve Laplace's equation in spherical coordinates using separation of variables and Legendre polynomials. Apply to boundary conditions V(R, θ) = V_0 cos(θ).
- **Rubric:** Eigenvalues, Legendre expansion, matching BCs, closed-form solution

*Problem 4 (Difficulty 4):* Evaluate ∫_{-∞}^{∞} x⁴/(x²+a²)² dx using residue theorem. Verify dimensional analysis.
- **Rubric:** Contour choice, pole identification, residue calculation, Jordan's lemma (if needed)

*Problem 5 (Difficulty 5):* Fourier transform a Gaussian ψ(x) = A exp(-x²/2σ²). Show that the product of uncertainties Δx·Δk ≥ 1/2 is minimized for Gaussians (uncertainty principle connection).
- **Rubric:** Integral evaluation, FT formula, variance calculations, interpretation

---

### B. Classical Electrodynamics (Advanced)

**Goals:** Master radiation, advanced boundary-value problems, relativistic formulation

**Primary Text:** Jackson *Classical Electrodynamics* 3rd ed. (Wiley, 1999) – selectively

| **Topic** | **Jackson Ch.** | **Griffiths Alternative** | **Key Skills** |
|---|---|---|---|
| **Multipole Expansions** | 4 | Griffiths 11 (brief) | Dipole/quadrupole fields; multipole moments |
| **Special Boundary Value Problems** | 2 (image charges), 3 (systems) | Griffiths 3 | Green's functions; method of images; conformal mapping |
| **Waveguides & Cavities** | 8 | (not in Griffiths) | TE/TM modes; cutoff frequencies; Q-factor |
| **Radiation** | 9 | Griffiths 11 | Dipole, quadrupole, magnetic dipole radiation; power patterns |
| **Relativistic Electrodynamics** | 11–12 | Griffiths 12 (brief) | 4-vectors, Lorentz transformations, field tensors |
| **Scattering & Absorption** | (Ch. 10 partial) | – | Rayleigh scattering; Born approximation; optical theorem |

**Problem Bank:** Jackson has ~200 problems (Difficulty 4–5); select 40–50 for mastery

**Diagnostic Problems (Set EM2 – Advanced E&M):**

*Problem 1 (Difficulty 4):* Two grounded conducting planes at angles φ = 0 and φ = π/3 in cylindrical coords. Point charge q at position (s₀, φ₀). Find potential using method of images.
- **Rubric:** Image charge locations, distances, superposition, boundary condition verification

*Problem 2 (Difficulty 4):* EM waveguide (rectangular, dimensions a × b, b < a). Derive TE₁₀ mode. Find dispersion relation ω(k); cutoff frequency.
- **Rubric:** Wave equation in waveguide, boundary conditions (E_tangential = 0), longitudinal component elimination

*Problem 3 (Difficulty 4):* Oscillating electric dipole **p**(t) = **p₀** cos(ωt). Calculate radiated power (Larmor formula) and angular distribution of radiation.
- **Rubric:** Retarded time, dipole field asymptotic form, Poynting vector, integration for total power

*Problem 4 (Difficulty 5):* Lorentz transformation of **E**, **B** fields. Show that invariants E² - B² and **E**·**B** are frame-independent.
- **Rubric:** Transformation formulas, 4-vector formulation, dual tensor, covariance verification

*Problem 5 (Difficulty 5):* Rayleigh scattering: small conducting sphere (radius a) in oscillating **E**-field. Derive scattered field amplitude and differential cross-section.
- **Rubric:** Boundary conditions on sphere, dipole moment induced, radiation pattern, σ_Rayleigh ∝ ω⁴

---

### C. Quantum Mechanics (Advanced)

**Goals:** Scattering theory, perturbation methods, many-body basics

**Primary Texts:**
- Cohen-Tannoudji, Diu & Laloe *Quantum Mechanics* Vols. II–III (comprehensive, graduate standard)
- Landau & Lifshitz *Quantum Mechanics* Vol. 3 (terse, deep)
- Sakurai & Napolitano *Modern Quantum Mechanics* 3rd ed. (2021) – modern perspective

| **Topic** | **Resource** | **Key Concepts** | **Milestone Problem** |
|---|---|---|---|
| **Time-Dependent Perturbation Theory** | Cohen-Tannoudji Vol. II, Ch. XIII; Griffiths 11 (brief) | Transition rates, Fermi's golden rule, resonance | Compute transition rate for photon-atom scattering |
| **Scattering Theory** | Cohen-Tannoudji Vol. III, Ch. XIX; Landau Vol. 3, Ch. VI | Born approximation, partial waves, S-matrix, optical theorem | Phase shifts; low-energy s-wave scattering |
| **Identical Particles** | Cohen-Tannoudji Vol. III, Ch. XIV; Griffiths 5 | Permutation symmetry, antisymmetrization, Slater determinants, exchange forces | Construct antisymmetric state for 3-electron system |
| **Spin & Magnetic Moments** | Cohen-Tannoudji Ch. IV; Griffiths 4.4 | Spin operators, Pauli matrices, magnetic moment, hyperfine structure | Coupling of two spin-1/2 particles |
| **Path Integrals (Intro)** | Feynman & Hibbs; Sakurai & Napolitano Ch. 2 (brief) | Functional integral, action principle, classical limit ℏ→0 | Recover classical trajectory from path integral; double-slit experiment |
| **Relativistic QM (Brief)** | Landau Vol. 3, Ch. VIII; Sakurai Appendix | Dirac equation, antiparticles, hole theory (conceptual) | Dirac equation for free particle; interpret negative energy states |

**Diagnostic Problems (Set QM2 – Advanced Quantum Mechanics):**

*Problem 1 (Difficulty 4):* Time-dependent perturbation: Hydrogen atom in oscillating electric field **E**(t) = **E₀** cos(ωt). Find transition rate 1s→2p to 1st order; interpret resonance condition.
- **Rubric:** Interaction Hamiltonian, matrix elements ⟨2p|z|1s⟩, Fermi golden rule, ω ≈ (E₂ - E₁)/ℏ

*Problem 2 (Difficulty 4):* Scattering of particles from potential V(r) = V₀ exp(-r/a). Calculate scattering amplitude in Born approximation; find s-wave phase shift at low energy.
- **Rubric:** Born amplitude f(q); momentum transfer; partial-wave expansion; δ₀ ≈ -ka³/3 for small k

*Problem 3 (Difficulty 4):* Two identical fermions in infinite 1D box [0, L]. Ground state energy and wavefunction; compare to distinguishable particles.
- **Rubric:** Single-particle eigenstates; antisymmetrization; Pauli exclusion; exchange energy effect

*Problem 4 (Difficulty 5):* Construct Clebsch-Gordan coefficients for coupling two spin-1/2 particles. Form singlet and triplet states; verify orthonormality and completeness.
- **Rubric:** Angular momentum addition, symmetry properties, explicit |↑↑⟩, |↑↓⟩+|↓↑⟩, etc. combinations

*Problem 5 (Difficulty 5):* Dirac equation: free particle of mass m. Find plane-wave solutions u(p) exp(-iEt/ℏ) for E = +mc² (electron) and E = -mc² (positron). Interpret.
- **Rubric:** Dirac matrices, dispersion E² = (pc)² + (mc²)², spinors u, v, helicity states

---

### D. Advanced Classical Mechanics (Optional, for theoretical track)

**Goals:** Lagrange and Hamilton formalisms at professional depth; symmetries and conserved quantities

**Primary Texts:**
- Landau & Lifshitz *Mechanics* Vol. 1 (Ch. 5–8 especially; terse, powerful)
- Goldstein *Classical Mechanics* 3rd ed. (Ch. 8–10, rigorous approach)
- V.I. Arnold *Mathematical Methods of Classical Mechanics* (advanced, for mathematically sophisticated)

| **Topic** | **Hours** | **Key Concepts** | **Application** |
|---|---|---|---|
| **Hamilton-Jacobi Theory** | 12 | Action-angle variables, generating functions, adiabatic invariants, canonical perturbations | Perturbation of oscillators, action conservation |
| **Canonical Transformations** | 10 | Phase-space symplectic structure, Lie groups, contact transformations | Symmetry → conservation laws (Noether) |
| **Poisson Brackets & Lie Algebras** | 8 | {F,G} = ∑(∂F/∂q_i ∂G/∂p_i - ...), infinitesimal generators, rotations SO(3) | Gauge theories, symplectic geometry |
| **Nonlinear Dynamics & Chaos** | 12 | Fixed points, stability analysis, Lyapunov exponents, bifurcations, KAM theorem | Systems with competing frequencies; onset of chaos |
| **Relativistic Mechanics** | 8 | 4-vector formalism, relativistic Lagrangian, electromagnetism coupling | Covariant mechanics |

**Diagnostic Problems (Set CM2 – Advanced Classical Mechanics):**

*Problem 1 (Difficulty 4):* Kepler problem: Use Hamilton-Jacobi theory to solve for orbit u(θ). Derive Laplace-Runge-Lenz vector; interpret as conservation law.
- **Rubric:** Generating function for canonical transformation, separation of variables, inverse-square law predictions

*Problem 2 (Difficulty 4):* Two weakly coupled nonlinear oscillators: H = H₀ + εH'. Use canonical perturbation to 1st order. Find shifted frequencies and first-order correction to action.
- **Rubric:** Resonance conditions, secular terms, action conservation, limits of perturbation validity

*Problem 3 (Difficulty 4):* Hénon-Heiles potential: H = (p_x² + p_y²)/2 + (x² + y²)/2 + xy². Identify periodic orbits and analyze stability. Sketch phase-space portrait.
- **Rubric:** Fixed points, eigenvalues of linearization matrix, KAM tori breakdown

*Problem 4 (Difficulty 5):* Derive Noether's theorem: given Lagrangian L and continuous symmetry generated by G, show that d/dt[∂L/∂q̇ᵢ (dqᵢ/dε)|_{ε=0}] = 0.
- **Rubric:** Symmetry transformation, invariance of action, explicit conservation laws (E, **p**, **L**)

*Problem 5 (Difficulty 5):* Relativistic charged particle in EM field. Covariant Lagrangian; derive equations of motion. Show that rest mass is conserved.
- **Rubric:** 4-vector velocity, Lorentz covariance, Lorentz force law, energy-momentum 4-vector

---

## IV. GRADUATE-LEVEL TOPICS

### A. Quantum Field Theory

**Prerequisites:** Quantum mechanics (advanced), special relativity, classical field theory (or learn concurrently)

**Recommended Sequence (2 semesters):**

| **Topic** | **Primary Text Ch.** | **Hours** | **Milestone Problem** |
|---|---|---|---|
| **Foundations & Relativistic QM** | Peskin & Schroeder 1–2; Ryder 1–2 | 20 | Klein-Gordon equation: plane-wave solutions, dispersion relation |
| **Quantum Field Theory Formalism** | Peskin & Schroeder 3; Ryder 3 | 25 | Quantization of scalar field: commutation relations, creation/annihilation operators |
| **Interactions & Feynman Diagrams** | Peskin & Schroeder 4–5 | 30 | λφ⁴ theory: leading-order scattering amplitude, crossing symmetry |
| **QED: Leptons & Photons** | Peskin & Schroeder 5–7 | 35 | Electron-photon vertex; one-loop correction to electron self-energy |
| **Renormalization** | Peskin & Schroeder 10–11 | 30 | Dimensional analysis in QED; renormalization group flow of coupling |
| **Gauge Theories & Standard Model** | Peskin & Schroeder 15–20 | 40 | Non-abelian gauge fields (Yang-Mills); Higgs mechanism; fermion masses |

**Problem Progression:**

1. **Peskin & Schroeder:** ~100 problems; Difficulty 4–5; select 60 for mastery
2. **Ryder:** 80 problems; alternative perspective on many topics
3. **MIT OCW 8.323:** Exams with solutions (graduate QFT)

---

### B. General Relativity

**Prerequisites:** Special relativity, differential geometry basics (or learn in course), classical mechanics

**Recommended Sequence (1–2 semesters):**

| **Topic** | **Primary Text** | **Hours** | **Learning Outcome** |
|---|---|---|---|
| **Differential Geometry Intro** | Carroll *Lecture Notes* Chs. 1–3; Misner-Thorne-Wheeler Chs. 8–9 | 15 | Manifolds, tangent spaces, metric tensor, covariant derivative |
| **Spacetime & Curvature** | Carroll Ch. 3; MTW Ch. 10–11 | 15 | Riemann tensor, symmetries; geodesics and parallel transport |
| **Einstein Field Equations** | Carroll Ch. 4; MTW Ch. 16–18 | 20 | Ricci tensor, Einstein tensor; stress-energy tensor; field equations |
| **Schwarzschild Metric** | Carroll Ch. 5; MTW Ch. 31–32 | 15 | Black holes, event horizon, geodesics, light deflection |
| **Cosmology & FLRW Metric** | Carroll Ch. 5; MTW Ch. 27–28 | 12 | Friedmann equations, matter/radiation domination, expansion |
| **Gravitational Waves** | Carroll Ch. 6; MTW Ch. 35–37 | 12 | Linearized gravity, TT gauge, quadrupole radiation, GW detection |
| **Advanced Topics** | Wald or Misner-Thorne-Wheeler Pt. IV | 15 | Thermodynamics of black holes, Penrose singularity theorem, etc. (optional) |

**Primary Texts (Choose based on style):**

- **Carroll *Lecture Notes on General Relativity* (1997):** Modern, concise, free online; best for 1-semester intro
- **Hartle *Gravity: An Introduction to Einstein's General Relativity* (2003):** Undergraduate-accessible; good for first exposure
- **Wald *General Relativity* (1984):** Rigorous graduate standard; standard reference
- **Misner, Thorne & Wheeler *Gravitation* (1973):** Comprehensive, idiosyncratic style; best as reference

**Diagnostic Problems (Set GR1 – General Relativity Basics):**

*Problem 1 (Difficulty 3):* Schwarzschild metric: Find timelike geodesic for circular orbit. Derive orbital angular momentum and energy; verify photon sphere at r = 3M.
- **Rubric:** Geodesic equation, Killing vectors, effective potential analysis, orbital mechanics

*Problem 2 (Difficulty 4):* Ricci tensor of FLRW metric ds² = -dt² + a(t)²[dr²/(1-kr²) + r²(dθ² + sin²θ dφ²)]. Verify Friedmann equations.
- **Rubric:** Christoffel symbols, Ricci components, stress-energy tensor (perfect fluid), constraint equations

*Problem 3 (Difficulty 4):* Linearized gravity near Minkowski: h_μν perturbation. Derive gravitational wave equation in TT gauge. Show E/M radiation analogy.
- **Rubric:** Gauge fixing, wave equation, dispersion ω = ck, polarization tensors

*Problem 4 (Difficulty 4):* Light deflection by Sun (weak field limit). Calculate bending angle; compare to observational value ~1.75 arcsec.
- **Rubric:** Effective potential in Schwarzschild geometry, impact parameter, deflection angle integral

*Problem 5 (Difficulty 5):* Black hole thermodynamics: Hawking radiation, entropy, temperature. Derive S = A/(4ℓ_p²) where A is event horizon area.
- **Rubric:** Quantum field theory in curved spacetime (conceptual); entropy interpretation

---

### C. Many-Body Physics & Condensed Matter

**Prerequisites:** Quantum mechanics (advanced), statistical mechanics, solid state basics

**Roadmap Topics (2–3 semesters):**

| **Topic** | **Primary Text** | **Focus** | **Difficulty** |
|---|---|---|---|
| **Second Quantization** | Fetter & Walecka Vol. 1, Ch. 1; Altland & Simons Ch. 1 | Bosons, fermions, operators in occupation number basis | 4 |
| **Green's Functions & Feynman Diagrams** | Fetter & Walecka Vol. 1, Ch. 2–3; Altland & Simons Ch. 2 | Non-equilibrium, retarded/advanced/Matsubara formalism | 4 |
| **Electron Interactions** | Ashcroft & Mermin Ch. 17; Altland & Simons Ch. 4–5 | Hartree-Fock, interactions, dielectric response | 4 |
| **Band Theory & Semiconductors** | Ashcroft & Mermin Ch. 8–9; Kittel Ch. 8–9 | Bloch theorem, band structure, effective mass, semiconductors | 3 |
| **Superconductivity** | Ashcroft & Mermin Ch. 34; Tinkham *Intro. to Superconductivity* | BCS theory, gap, Cooper pairs, critical fields | 4 |
| **Magnetism & Spin Waves** | Ashcroft & Mermin Ch. 31–32; Auerbach *Interacting Electrons* | Magnons, ferromagnetism, Heisenberg model | 4 |
| **Quantum Phases & Transitions** | Sachdev *Quantum Phase Transitions*; Altland & Simons Ch. 7 | Scaling theory, critical phenomena, conformal invariance | 5 |

**Key Textbooks:**

- **Ashcroft & Mermin *Solid State Physics* (1976):** Heavy; still the standard
- **Kittel *Introduction to Solid State Physics* (9th ed., 2018):** More accessible; undergraduate-to-graduate level
- **Altland & Simons *Condensed Matter Field Theory* (2nd ed., 2010):** Modern, field-theoretic approach; excellent problems
- **Fetter & Walecka *Quantum Theory of Many-Particle Systems* (1971):** Reference-level; Green's functions emphasis
- **Sachdev *Quantum Phase Transitions* (2nd ed., 2011):** Modern perspective on critical phenomena

---

## V. PROBLEM-SOLVING ASSESSMENT ROADMAP

### A. Assessment Strategy

**Goal:** Track mastery progression from calculation fluency to research-ready independence

**Timeline:**

- **Weeks 1–4 (Each Semester):** Weekly problem sets; ~5–8 problems, mixed difficulty 2–3
- **Weeks 5–8:** Monthly projects; design and execute; write-ups
- **Weeks 9–12:** Problem sets + capstone exam (mock GRE-level)
- **Semester End:** Comprehensive exam; 8–10 problems, Difficulty 3–4

---

### B. Diagnostic Exam Sequence (12 Exams Over Roadmap)

| **Milestone** | **Timing** | **Format** | **Topics** | **Total Problems** | **Time Allowed** |
|---|---|---|---|---|---|
| **DX1: End Yr 1 Semester 1** | Week 16 | 3–4 problems | Newtonian mechanics; calculus review | 4 | 3 hours |
| **DX2: End Yr 1 Semester 2** | Week 32 | 5–6 problems | Lagrangian mechanics, waves, oscillations | 6 | 4 hours |
| **DX3: End Yr 2 Semester 1** | Week 48 | 6–8 problems | E&M (statics + waves); multivariable calculus | 7 | 4.5 hours |
| **DX4: End Yr 2 Semester 2** | Week 64 | 7–10 problems | Quantum mechanics (wave mechanics, operators, potentials) | 8 | 5 hours |
| **DX5: Intro Grad (Core Review)** | Week 72 | 8–10 problems | Classical + quantum mechanics + E&M + thermo review | 10 | 6 hours |
| **DX6: End Yr 3 Semester 1** | Week 88 | 10 problems | Advanced quantum mechanics; scattering; perturbation theory | 10 | 6 hours |
| **DX7: End Yr 3 Semester 2** | Week 104 | 10 problems | Classical field theory; intro QFT; GR basics | 10 | 6 hours |
| **DX8: GRE Physics Mock** | Week 120 | 100 questions (MC) | All undergraduate topics; standardized format | 100 | 2.75 hours |
| **DX9: Qualifying Level 1** | Week 136 | 6–8 problems | Advanced classical mechanics + advanced E&M | 7 | 5 hours |
| **DX10: Qualifying Level 2** | Week 152 | 6–8 problems | QFT fundamentals + GR basics | 7 | 5 hours |
| **DX11: Qualifying Level 3** | Week 168 | 6–8 problems | Many-body/condensed matter OR particle physics (elective) | 7 | 5 hours |
| **DX12: Research Readiness** | Week 180+ | Paper presentation + research proposal | Thesis proposal; defend; critique | 1 | Varies |

**Benchmark Expectations:**

- **DX1–DX2:** Average score ≥ 60% indicates adequate progress
- **DX3–DX4:** Average score ≥ 70% (harder material, more preparation time needed)
- **DX5–DX7:** Average score ≥ 65% (cumulative; expected to have gaps)
- **DX8 (GRE):** Target score ≥ 75th percentile (~860/1000 in old scale) for top graduate programs
- **DX9–DX11:** Average score ≥ 70% (qualifying-level; must master most topics)

---

### C. GRE Physics Subject Test Preparation

**Content Distribution (ETS official):**

- Classical Mechanics: 20%
- Electromagnetism: 18%
- Optics & Wave Phenomena: 9%
- Thermodynamics & Statistical Mechanics: 10%
- Quantum Mechanics: 12%
- Atomic Physics: 10%
- Special Relativity: 6%
- Laboratory Methods: 6%
- Specialized Topics (nuclear, particle, condensed matter): 9%

**Recommended Prep Timeline (12 weeks):**

- **Weeks 1–4:** Topic-by-topic review using Griffiths + Boas math review
- **Weeks 5–8:** Practice full-length exams (ETS official + Physics GRE subreddit archives)
- **Weeks 9–12:** Drill weak areas; take 1 practice exam weekly

**Key Resources:**

- **ETS Official Practice Book:** Essential; use full exams
- **Physics GRE Subreddit:** r/PhysicsGRE (problem discussions, score reports)
- **Physics Forums GRE Prep:** PhysicsForums.com (archived solutions)
- **Websites:** physicsgreprep.com (categorized problems)

**Target Milestones for GRE:**

- 50th percentile: ~800 (adequate for many schools)
- 75th percentile: ~860 (competitive for top 30 programs)
- 90th percentile: ~920 (excellent; strong candidacy)

---

## VI. PROJECTS & DESIGN INTEGRATION

### A. Project Structure & Learning Outcomes

**Philosophy:** Each project integrates theory + calculation + simulation + measurement/design

### B. Introductory Projects (Yr 1, Difficulty 1–2)

| **#** | **Title** | **Physics Content** | **Skills** | **Duration** | **Deliverables** |
|---|---|---|---|---|---|
| **P1** | Simple Pendulum: Theory vs. Experiment | Classical mechanics, nonlinear dynamics | Measurement, error analysis, plotting | 2 weeks | Lab report: measurements, theory prediction, error analysis, comparison |
| **P2** | Coupled Oscillators: Normal Modes | Lagrangian mechanics, linear algebra | Matrix eigenvalues, mode decomposition | 2 weeks | Write-up: derivation, calculated vs. observed frequencies, mode shapes |
| **P3** | Visualize Electric Fields | Electrostatics, vector visualization | Matplotlib, field line plotting | 1.5 weeks | Code + figures: dipole, quadrupole, superposition; vector field & equipotentials |
| **P4** | Discrete vs. Continuous Spectrum | Waves, Fourier analysis | Numerics, FFT | 1.5 weeks | Jupyter notebook: energy spectrum of standing wave; Fourier series convergence |
| **P5** | Particle in Box: Numerics vs. Analytical | Quantum mechanics, numerical ODE solvers | scipy.integrate, eigenvalue problem | 2 weeks | Code + analysis: energy levels, wavefunctions, comparison to analytical |
| **P6** | Thermal Diffusion 1D | Heat equation, PDEs, numerical stability | Finite difference schemes, stability analysis (CFL) | 2 weeks | Simulation: temperature evolution, Fourier's law verification, animation |

**Evaluation Rubric (Each Project):**

| **Criterion** | **Excellent (90–100%)** | **Good (80–89%)** | **Satisfactory (70–79%)** | **Needs Improvement (<70%)** |
|---|---|---|---|---|
| **Physics Understanding** | Correct theory; deep insight; connects to broader context | Correct derivations; applies concepts accurately | Theory mostly correct but some conceptual gaps | Significant misunderstandings |
| **Calculation / Code** | Correct numerical results; clean, documented code; error handling | Correct results; functional code; minimal comments | Results correct but code inefficient or poorly organized | Incorrect calculations or non-functional code |
| **Experimental Design / Measurement** | Excellent control of variables; systematic error identified & minimized; appropriate precision | Adequate experimental design; errors quantified; reasonable precision | Experimental design adequate; error analysis incomplete | Poor experimental design; inadequate error handling |
| **Data Analysis & Visualization** | Clear figures with labels, legends, units; error bars correct; proper statistical tests | Figures present; mostly clear; error analysis done | Figures present but may lack clarity or detail | Missing or unintelligible figures |
| **Write-up / Communication** | Clear, concise, well-organized; explains methodology and results; proper citations | Well-organized; most results explained; adequate citations | Organized but some lack of clarity; incomplete explanations | Poorly organized or confusing |

---

### C. Intermediate Projects (Yr 2–3, Difficulty 2–3)

| **#** | **Title** | **Physics Content** | **Computational / Experimental** | **Duration** |
|---|---|---|---|---|
| **P7** | Bifurcation in Driven Damped Pendulum | Nonlinear dynamics, chaos | Numerical integration; bifurcation diagram; Lyapunov exponent calculation | 3 weeks |
| **P8** | Scattering from Lennard-Jones Potential | Classical/quantum scattering | Numerical cross-section computation; Born approximation comparison | 3 weeks |
| **P9** | Band Structure of 1D Crystal (Tight-Binding) | Condensed matter, Bloch theorem | Matrix diagonalization; density of states; analytical vs. numerical | 3 weeks |
| **P10** | Finite Element Method: Heat Conduction in 2D | PDEs, numerical methods | FEM implementation (or use FEniCS library); convergence testing | 4 weeks |
| **P11** | Spectroscopy: Absorption in Real Material | Experimental optics | Design spectrometer setup; measure absorption spectrum; fit Lorentzian | 4 weeks |
| **P12** | Quantum Variational Principle for Helium Atom | Quantum mechanics, many-body | Optimize trial wavefunction; compare to He ground state energy | 3 weeks |

---

### D. Advanced / Capstone Projects (Yr 4+, Difficulty 3–4)

| **#** | **Title** | **Physics Content** | **Integration** | **Duration** |
|---|---|---|---|---|
| **P13** | Monte Carlo Simulation of Ising Model | Statistical mechanics, phase transitions | Critical behavior; magnetic susceptibility; compare to Landau theory | 4 weeks |
| **P14** | Quantum Scattering Amplitude (Born Approximation) | Quantum mechanics, scattering theory | Numerical integration of scattering amplitude; partial-wave decomposition | 4 weeks |
| **P15** | Numerical GR: Schwarzschild Geodesics | General relativity, numerics | Solve geodesic equations; visualize light deflection; test numerical stability | 5 weeks |
| **P16** | QED Loop Corrections (1-Loop Electron Self-Energy) | Quantum field theory | Feynman diagrams; numerical integration; renormalization | 6 weeks |
| **P17** | Experimental Precision Measurement | Experimental design, error analysis | Design experiment to measure fundamental constant (e.g., e/m, g, c); achieve <1% precision | 6–8 weeks |
| **P18** | Research Proposal & Literature Review | Research methods, critical thinking | Propose novel thesis project; literature synthesis; present findings | 8–10 weeks |

---

## VII. COMPUTATIONAL & LABORATORY TOOLCHAIN

### A. Essential Software & Installation

**Operating System:** Linux (Ubuntu recommended) or macOS; Windows with WSL2

**Programming Language:** Python 3.10+

**Essential Packages:**

```bash
# Core numerics
pip install numpy scipy matplotlib

# Data analysis
pip install pandas scikit-learn

# Jupyter environment
pip install jupyter jupyterlab

# Physics-specific
pip install qutip sympy astropy

# Version control
git (system package)

# Optional: Advanced numerics
pip install numba scikit-sparse  # for performance-critical code
pip install fenics  # finite element (advanced)
```

**IDEs:**
- **Jupyter Lab:** Primary for exploration and teaching
- **VS Code + Python Extension:** For larger projects and version control
- **PyCharm Community:** Full-featured IDE (optional)

**Reference:**
- NumPy Tutorial: https://numpy.org/learn/
- SciPy Tutorial: https://docs.scipy.org/ (with examples)
- Matplotlib: https://matplotlib.org/stable/tutorials/

---

### B. Laboratory Equipment (Home / Small Lab)

**Basic Optics Lab (~$500–1000):**
- Laser pointers (red 650nm, green 532nm): $10–30 each
- Optical bench rail system + holders: $100–200
- Lenses (various focal lengths), apertures, mirrors: $50–100
- Diffraction gratings, slits: $20–50
- Photodiode + simple detector circuit: $50–100
- Screen/white paper, ruler, protractor

**Basic Mechanics Lab (~$300–600):**
- Air track + carts: $100–200
- Photogate timers (or smartphone app): $50–100
- Spring set + mass hangers: $30–50
- Pendulum apparatus: $20–50
- Video analysis software (Tracker, free): Free

**Basic Electromagnetism Lab (~$200–400):**
- Multimeter: $15–30
- Power supply (adjustable DC, 0–30V): $50–100
- Resistor/capacitor/inductor kit: $20–50
- Oscilloscope (used, analog): $50–150
- Coils, magnets, iron filings: $20–50

**Data Acquisition:**
- Raspberry Pi + sensors: $50–100
- Arduino + sensor shields: $30–50
- USB temperature/pressure sensors: $20–50

**Safe Practices:**
- Always use current limiting resistors
- High-voltage experiments: use isolated power supplies
- Laser safety: appropriate eyewear, diffuse reflections avoided
- Check local regulations for radiation/radioactive sources (advanced)

---

## VIII. RESEARCH PREPARATION & LITERATURE

### A. Transition to Independent Research

**Timeline to Research Readiness:** Typically Year 3–4

**Steps:**

1. **Year 1–2:** Master undergraduate core (Sections II); build problem-solving skills (Section V.B)
2. **Year 2–3:** Begin reading review papers in subfields of interest
3. **Year 3:** Start reading primary literature; identify potential advisors; explore research groups
4. **Year 3–4:** Join research group; begin directed research; preliminary thesis work

**How to Read Physics Papers (3-Pass Method):**

**Pass 1 (5–10 min):** Get the gist
- Read: Title, abstract, conclusion
- Note: Main question, methods used, key results
- Output: One-paragraph summary; decide if worth deeper reading

**Pass 2 (20–30 min):** Understand structure and main results
- Skim: Figures, tables, section headings
- Skip: Dense derivations, unfamiliar jargon
- Output: Identify assumptions, key equations, experimental procedures

**Pass 3 (60+ min):** Deep comprehension (for paper central to your work)
- Read: Entire paper; derivations, literature references
- Note: Unfamiliar concepts → external references
- Output: Detailed notes, identified gaps or errors, relation to your work

**Tools:**

- **arXiv.org:** Physics preprints (organized by topic)
- **Inspirehep.net:** Particle physics database with citations
- **PhysicsReviews (APS):** Official journal repository
- **Zotero / Mendeley:** Bibliography management
- **Obsidian / Roam Research:** Note-taking with bidirectional links (Zettelkasten method)

---

### B. Key Review Papers by Field

**General Resources:**
- **ArXiv:** Search by category (astro-ph, cond-mat, gr-qc, hep-th, hep-ex, nucl-th, nucl-ex, physics, quant-ph)
- **Reviews of Modern Physics:** Excellent overview papers (usually free after embargo)
- **Annual Review of Physics:** Yearly updates on hot topics

**Seminal Theoretical Physics Papers (Historical Context):**

1. Einstein (1905): "On the Electrodynamics of Moving Bodies" – Special relativity
2. Einstein (1916): "The Foundation of the General Theory of Relativity" – General relativity
3. Heisenberg (1927): "Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik" – Uncertainty principle
4. Dirac (1928): "The Quantum Theory of the Electron" – Dirac equation
5. Feynman (1948–1949): "Space-Time Approach to Quantum Electrodynamics" – Feynman diagrams + path integrals

---

## IX. TIME ALLOCATION & SEQUENCING

### A. Full-Time Learning Path (4 Years)

**Assumptions:** 40 hours/week (typical graduate student load)

| **Year** | **Semester 1** | **Semester 2** | **Summer** | **Focus** | **Total Hours** |
|---|---|---|---|---|---|
| **1** | Classical Mechanics (40 h) | E&M (40 h) | Computational basics (80 h); Review math | Undergraduate core; math consolidation | ~240 |
| **2** | Quantum Mechanics (40 h) | Thermo/Stat Mech (40 h) | Research rotation; problem sets (120 h) | Quantum foundations; GRE prep begins | ~280 |
| **3** | Advanced QM + Scattering (40 h) | Advanced E&M + Jackson (40 h) | Begin research project (160 h); coursework | Specialization; research initiation | ~320 |
| **4** | QFT Part 1 (40 h) | QFT Part 2 or GR (40 h) | Thesis research (240 h); elective depth | Research focus; thesis development | ~360 |

**Total 4-Year Commitment:** ~1,200 classroom/study hours + ~480+ research hours = 1,680+ hours

---

### B. Part-Time Learning Path (6 Years)

**Assumptions:** 20 hours/week (working student, career-changer)

| **Year** | **Semester 1** | **Semester 2** | **Summer** | **Focus** |
|---|---|---|---|---|
| **1** | Classical Mechanics (20 h) | E&M intro (20 h) | Math review, light review (40 h) | Pace slower; time for reflection |
| **2** | E&M continued (20 h) | Quantum Mechanics intro (20 h) | Computational practice (40 h) | Steady progress |
| **3** | Quantum continued (20 h) | Thermo/Stat Mech (20 h) | GRE prep (60 h) | Transitions to specialization |
| **4** | Advanced QM (20 h) | Advanced E&M or Classical Mech (20 h) | Begin research (60 h) | Depth building |
| **5** | QFT or GR or Elective (20 h) | QFT or GR continued (20 h) | Research (80 h) | Major specialization |
| **6** | Elective depth (20 h) | Thesis prep / seminars (20 h) | Thesis research (120 h) | Completion |

**Total 6-Year Commitment:** ~1,200 classroom/study hours + ~300+ research hours = 1,500+ hours

---

## X. MENTORSHIP, COMMUNITY & RESOURCES

### A. Building a Support System

**In-Person / Hybrid:**

1. **Find a Mentor (Advisor):** 
   - Ideally a researcher in field of interest
   - Meet weekly for 1–2 hours; discuss problem sets, paper reading, research directions
   - Mentors provide perspective on which topics are "hot" and where to focus

2. **Research Group:**
   - Typical: 5–15 students + postdocs working on related projects
   - Weekly group meetings: paper discussions, progress updates, brainstorming
   - Peer teaching and learning

3. **Study Groups:**
   - 2–4 peers meeting weekly to work through problem sets together
   - Coerce each other through hard material
   - Teach-back technique: explain problems to peers to deepen understanding

**Online Communities:**

- **r/Physics, r/PhysicsStudents, r/QuantumComputing:** Reddit (Q&A, discussions)
- **Physics Stack Exchange:** Focused technical Q&A
- **PhysicsForums.com:** Topic-specific forums; moderated; good quality
- **arXiv blog / blogs.arXiv.org:** Blog discussions of recent papers

**Workshops & Schools:**

- **Summer Schools:** CERN Summer School, Les Houches, TASI, etc. (~2 weeks, immersive)
- **Conferences:** APS March Meeting (condensed matter + interdisciplinary), ICTP schools (GR, QFT, etc.)
- **Online Courses:** MIT OCW, edX, Coursera (supplementary, not primary)

---

### B. Conferences & Competitions

**Undergraduate Competitions:**

- **Putnam Mathematics Competition:** December each year; develops problem-solving skills (relevant for physics students)
- **Science Olympiad Physics Events:** Regional/state/national competitions
- **APS Bridge Program:** Network of APS-affiliated programs for underrepresented groups

**Graduate Conferences:**

- **APS March Meeting:** Largest physics conference (March; typically New Orleans, Denver, etc.)
- **Summer Conferences:** GR-focused (International Conference on General Relativity and Gravitation), QFT schools, condensed matter meetings
- **Journal Clubs:** Weekly paper discussions at your institution

---

## XI. MASTER BOOKLIST (CSV FORMAT)

**Column Headers:**  
`Subject | Title | Author(s) | Edition/Year | Level | Why Recommended | Core Chapters | Problem Sources | Alternative | Cost`

[See attached CSV file for complete booklist with 80+ entries]

---

## XII. DIAGNOSTIC PROBLEM ARCHIVE

**Organization:** 60 problems grouped by subject and difficulty

**Subjects:** CM (classical mechanics), EM (electromagnetism), QM (quantum), TSM (thermo/stat mech), MAM (mathematical methods), EM2 (advanced E&M), CM2 (advanced mechanics), QM2 (advanced QM), GR (general relativity), CP (computational physics)

**Difficulty Scale:** 1 (fluency check) → 5 (research-level challenge)

[60 problems with solutions available in supplementary archive]

---

## XIII. SOFTWARE TUTORIALS & CODE NOTEBOOKS

**Provided Separately (Jupyter notebooks):**

1. `numpy_essentials.ipynb` – Array operations, linear algebra
2. `scipy_integration.ipynb` – ODE and PDE solving
3. `matplotlib_publication.ipynb` – Professional plotting
4. `harmonic_oscillator_rk4.ipynb` – First numerical project
5. `eigenvalue_normal_modes.ipynb` – Coupled systems
6. `schrodinger_spectral.ipynb` – Quantum wavefunction solver
7. `monte_carlo_integration.ipynb` – MC methods basics
8. `git_workflow.ipynb` – Version control for reproducibility

---

## XIV. EXECUTIVE CHECKLIST FOR END-OF-ROADMAP

**By completion of this roadmap, you should be able to:**

- [ ] **Solve Lagrangian/Hamiltonian systems** with constraints, gauge invariance, and canonical transformations
- [ ] **Apply Maxwell's equations** to boundary-value problems; compute radiation fields; understand wave propagation
- [ ] **Compute quantum observables** using operator methods, perturbation theory, scattering amplitudes, Green's functions
- [ ] **Derive thermodynamic quantities** from partition functions; understand phase transitions and critical phenomena
- [ ] **Perform Fourier analysis** on complex integrals; apply residue theorem; work with asymptotic expansions
- [ ] **Design & execute precision experiments** with systematic error control, proper uncertainty quantification, statistical analysis
- [ ] **Implement numerical solvers** for ODEs (RK4), PDEs (finite difference, finite element), eigenvalue problems
- [ ] **Understand geometric & physical optics**; diffractive phenomena; laser systems basics
- [ ] **Calculate band structures** and electronic properties in solids from tight-binding or mean-field models
- [ ] **Transform between frames** (Lorentz, non-inertial); understand special & general relativistic corrections
- [ ] **Model incompressible/viscous flows**; apply boundary layer theory; understand turbulence basics
- [ ] **(Elective) Compute cross-sections** in particle physics; understand decay rates, conservation laws
- [ ] **(Elective) Analyze plasma instabilities** and electromagnetic wave propagation in magnetized media
- [ ] **(Elective) Model biomolecular dynamics** or atmospheric thermodynamics (field-specific)
- [ ] **Critique & synthesize** peer-reviewed literature; identify research gaps; propose novel directions
- [ ] **Mentor junior students** in problem-solving and physics understanding
- [ ] **Propose & defend** a thesis project with novelty, feasibility, and significance
- [ ] **Implement best practices** in computational reproducibility (version control, documentation, testing)
- [ ] **Communicate physics clearly** to diverse audiences (technical papers, talks, general public)
- [ ] **Identify career pathways** (academia, national labs, industry, policy) aligned with your interests

---

## XV. FINAL RECOMMENDATIONS & CAVEATS

### A. Pace & Flexibility

1. **No Two Physicists Learn Alike:** Adjust emphasis based on interests and strengths. E.g., experimentalists may focus more on lab methods and less on QFT; theoreticians vice versa.

2. **Revisit Often:** Quantum mechanics, for instance, will feel new each time you return to it with more mathematical maturity.

3. **Build Breadth, Then Depth:** Undergraduate years: broad competency. Graduate years: deep specialization.

### B. Known Pitfalls

1. **Textbook Overload:** Don't try to master all recommended books. Choose 1–2 primary sources per topic; use others as references.

2. **Problem Set Avoidance:** Physics is a doing discipline. Problems ≠ optional. Aim for 50–70% problem coverage in each core.

3. **Math Gaps:** If you feel lost, revisit prerequisites. Struggling with PDE methods? Go back to ODE techniques. No shame in iteration.

4. **Isolated Learning:** Join study groups, research groups, seminars. Physics is social.

### C. Updating This Roadmap

Physics education evolves. New textbooks, online resources, and pedagogies emerge yearly. Revisit every 2 years; adjust based on:

- Emergence of new standard texts
- Updated OCW courses (MIT, Berkeley, etc.)
- New computational tools (e.g., automatic differentiation with JAX, neural operators)
- Job market feedback (what skills employers actually need)

---

## References & Acknowledgments

**Primary Sources Consulted:**

- Physics Education Research literature (PER); AAPT proceedings
- Canonical textbooks (Goldstein, Griffiths, Jackson, Peskin & Schroeder, etc.)
- MIT OpenCourseWare physics curriculum
- APS Forum on Education resources
- Graduate program physics syllabi (Berkeley, Stanford, MIT, Princeton, Cambridge)
- GRE Physics Test specifications (ETS, 2024)

---

**END OF ROADMAP DOCUMENT**

---

**Suggested Usage:**

1. **Skim full document** to understand overall structure
2. **Focus on your current stage** (e.g., if Year 1: focus on Sections I–II)
3. **Bookmark booklist** and problem archive for reference
4. **Return periodically** to reassess progress and adjust timelines
5. **Share with mentors/advisors** for personalized feedback

---

*Version 1.0 • Comprehensive Physics Learning Roadmap • 2026*
