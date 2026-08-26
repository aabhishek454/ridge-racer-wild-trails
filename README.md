# Ridge Racer: Wild Trails

A complete original **2D physics hill-climbing game** built with Next.js, Matter.js, TypeScript, Tailwind CSS, and Zustand.

Drive wild trails, collect coins, upgrade vehicles, unlock maps, and complete missions. Fully playable in the browser (desktop + mobile), ready for Vercel.

## Features

- Real 2D vehicle physics (chassis, wheels, suspension, air control, flips)
- Procedural terrain with hills, jumps, valleys
- 6 unique vehicles with different handling
- 5 maps (Green Valley → Neon Wasteland)
- Engine / Grip / Suspension / Fuel upgrades
- Coins, fuel cans, checkpoints, flips, airtime rewards
- Missions & local progression (localStorage)
- Smooth camera, particles, HUD, touch controls
- Pause / restart / results screens
- Settings (volume, graphics, FPS, reset)

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Matter.js physics
- Zustand + persist
- Tailwind CSS 3
- HTML5 Canvas rendering

## Installation

```bash
cd ridge-racer-final
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### CLI
```bash
npm install -g vercel
vercel
```

### GitHub
1. Push this folder to a GitHub repository.
2. Open [vercel.com](https://vercel.com) → New Project.
3. Import the repository.
4. Framework preset: **Next.js** (auto-detected).
5. Deploy.

No environment variables or custom server required.

## Controls

| Action        | Desktop             | Mobile       |
|---------------|---------------------|--------------|
| Accelerate    | → / D               | GAS button   |
| Brake/Reverse | ← / A / Space       | BRAKE button |
| Pause         | P / Esc             | Pause button |
| Restart       | R (after crash)     | Retry button |

While airborne, accelerate/brake also rotate the vehicle for flips.

## Project Structure

```
app/               # Pages (menu, garage, maps, game, missions, settings)
components/        # UI + GameCanvas, HUD, controls
game/
  config/          # Vehicles, maps, constants
  physics/         # Matter.js engine, vehicle, terrain
store/             # Zustand game store + localStorage
```

## Architecture Notes

- Game loop runs outside React via `requestAnimationFrame`.
- Physics world is created/destroyed per run.
- Terrain streams chunks ahead and culls behind the player.
- All browser APIs are guarded for SSR (`"use client"`, localStorage fallback).
- Save data is versioned under key `ridge-racer-save-v1`.

## License

Original game code and art direction created for this project.  
Do not copy proprietary assets from other games.

Enjoy the trails!
