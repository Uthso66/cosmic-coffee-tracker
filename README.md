# ☕🌌 Cosmic Coffee Tracker

### Next.js + Supabase + React Three Fiber + GSAP

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge\&logo=three.js\&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge\&logo=greensock\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

A **slightly unhinged but intentional** coffee-tracking app where every coffee you log becomes a **star in a galaxy** — and deleting one causes a **small cosmic explosion** (because why not).

This project mixes **real data persistence** with **playful 3D visuals**, built to explore how far UI feedback can go before it becomes ridiculous.
(Spoiler: explosions are still acceptable.)

👉 **Live Demo**
[https://cosmic-coffee-tracker-eqodyhnfo-uthsos-projects.vercel.app/](https://cosmic-coffee-tracker-eqodyhnfo-uthsos-projects.vercel.app/)

---

## 🚀 What This App Does

* Log different types of coffee ☕
* Each coffee becomes a **star** in a 3D galaxy 🌌
* Click a star → it **explodes** 💥 → coffee is deleted
* Coffee mood + type affect color and vibe
* Data persists using Supabase (this is not fake UI)

Yes, it’s a tracker.
No, it didn’t need to be 3D.
That’s the point.

---

## 🧠 Core Features (a.k.a. the fun engineering bits)

* ☕ **Coffee Logger**

    * One-click logging with predefined coffee types & moods
    * Caffeine amount calculated automatically (espresso vs others)

* 🗄️ **Supabase Persistence**

    * Real database (`coffees` table)
    * Insert, fetch, delete — no mock data, no localStorage lies

* 🌌 **3D Galaxy Visualization**

    * Built with **React Three Fiber** + **drei**
    * Each coffee maps to a star with a deterministic position
    * Color-coded by coffee type

* 💥 **Exploding Stars**

    * Clicking a star triggers:

        * GSAP-driven scale animations
        * Particle explosion using Three.js meshes
        * Synced UI + database deletion

* 🎬 **Motion & Feedback**

    * GSAP entry animations for stars
    * Smooth scaling, easing, and visual reinforcement
    * UI always reacts to user intent (no dead clicks)

---

## 🧱 Tech Stack

| Layer             | Technology                              |
| ----------------- | --------------------------------------- |
| **Framework**     | Next.js (App Router, Client Components) |
| **Language**      | TypeScript                              |
| **Database**      | Supabase                                |
| **3D / Graphics** | React Three Fiber, drei, Three.js       |
| **Animation**     | GSAP                                    |
| **Styling**       | Tailwind CSS                            |
| **Deployment**    | Vercel                                  |

---

## 🎯 Why This Project Exists (honest version)

This project was built to:

* Combine **real backend data** with **non-traditional UI**
* Practice syncing **React state ↔ database ↔ 3D scene**
* Explore **delight-driven UX** instead of pure productivity
* Prove that playful interfaces can still be technically clean

It’s not meant to optimize caffeine intake.
It *is* meant to show curiosity, control, and comfort across the stack.

---

## 🎞️ Animation & Interaction Breakdown

### 🌠 Star Lifecycle

* Stars scale in with GSAP when coffees load
* Each star is tied to a real database row
* Removing a coffee removes it visually and persistently

### 💥 Explosion System

* Clicking a star spawns particle meshes
* Particles disperse with randomized velocity
* Scale decays per frame for a natural fade-out
* After animation completes → database delete finalizes

### 🧼 React Hygiene

* Proper cleanup of animation state
* Controlled side effects
* No runaway frames or leaking refs

---

## 💻 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Uthso66/cosmic-coffee-tracker.git
cd cosmic-coffee-tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4️⃣ Run the app

```bash
npm run dev
```

Open:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Notes

* Designed as a **frontend + interaction experiment**
* Not optimized for massive datasets (first 20 stars rendered)
* Best experienced on desktop
* Intentionally playful, intentionally overkill

---

## 🧔 Author

**Uthso**
*Software QA Engineer • Security Enthusiast • AI/ML Hobbyist*

🐙 GitHub: [https://github.com/Uthso66](https://github.com/Uthso66)
💼 LinkedIn: [https://www.linkedin.com/in/tarikul-islam-uthso/](https://www.linkedin.com/in/tarikul-islam-uthso/)

---

## 🪄 License

MIT License © 2025 Uthso

