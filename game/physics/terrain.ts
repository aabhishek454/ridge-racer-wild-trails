import { MapConfig } from "@/game/config/maps";

export interface TerrainPoint {
  x: number;
  y: number;
}

export class TerrainGenerator {
  private seed: number;
  private config: MapConfig;
  private points: TerrainPoint[] = [];
  private segmentWidth = 40;
  private generatedUntil = 0;

  constructor(config: MapConfig, seedOffset = 0) {
    this.config = config;
    this.seed = config.terrainSeedBase + seedOffset;
    this.generateInitial(0, 80);
  }

  private hash(n: number): number {
    const x = Math.sin(n * 12.9898 + this.seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  private noise(x: number): number {
    const i = Math.floor(x);
    const f = x - i;
    const a = this.hash(i);
    const b = this.hash(i + 1);
    const u = f * f * (3 - 2 * f);
    return a * (1 - u) + b * u;
  }

  private fractalNoise(x: number): number {
    let val = 0;
    let amp = 1;
    let freq = 1;
    for (let o = 0; o < 4; o++) {
      val += this.noise(x * freq * this.config.hillFrequency * 1000) * amp;
      amp *= 0.5;
      freq *= 2;
    }
    return val;
  }

  private heightAt(x: number): number {
    const base = this.fractalNoise(x) * this.config.hillAmplitude;
    const mid = this.fractalNoise(x * 0.3 + 100) * this.config.hillAmplitude * 0.6;
    const detail = this.noise(x * 0.02 + this.seed) * this.config.roughness * 40;
    const trend = Math.sin(x * 0.0008) * 30;
    return 400 + base + mid + detail + trend;
  }

  generateInitial(fromX: number, count: number) {
    this.points = [];
    for (let i = 0; i < count; i++) {
      const x = fromX + i * this.segmentWidth;
      this.points.push({ x, y: this.heightAt(x) });
    }
    this.generatedUntil = fromX + (count - 1) * this.segmentWidth;
  }

  ensureAhead(playerX: number, lookAhead = 2000) {
    const needUntil = playerX + lookAhead;
    while (this.generatedUntil < needUntil) {
      const nextX = this.generatedUntil + this.segmentWidth;
      let y = this.heightAt(nextX);
      if (this.points.length > 0) {
        const prev = this.points[this.points.length - 1];
        const maxDelta = 55;
        if (Math.abs(y - prev.y) > maxDelta) {
          y = prev.y + Math.sign(y - prev.y) * maxDelta;
        }
      }
      this.points.push({ x: nextX, y });
      this.generatedUntil = nextX;
    }
  }

  cullBehind(playerX: number, keepBehind = 800) {
    const minKeep = playerX - keepBehind;
    while (this.points.length > 20 && this.points[0].x < minKeep) {
      this.points.shift();
    }
  }

  getPoints(): TerrainPoint[] {
    return this.points;
  }

  getHeightAt(x: number): number {
    if (this.points.length < 2) return 400;
    let i = 0;
    while (i < this.points.length - 1 && this.points[i + 1].x < x) i++;
    if (i >= this.points.length - 1) return this.points[this.points.length - 1].y;
    const a = this.points[i];
    const b = this.points[i + 1];
    const t = (x - a.x) / (b.x - a.x);
    const st = t * t * (3 - 2 * t);
    return a.y + (b.y - a.y) * st;
  }

  getVerticesForPhysics(fromX: number, toX: number): { x: number; y: number }[] {
    const verts: { x: number; y: number }[] = [];
    for (const p of this.points) {
      if (p.x >= fromX - 50 && p.x <= toX + 50) {
        verts.push({ x: p.x, y: p.y });
      }
    }
    if (verts.length < 2) {
      verts.push({ x: fromX, y: 500 }, { x: toX, y: 500 });
    }
    return verts;
  }
}
