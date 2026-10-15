# FutureMind AI 3.0 OS — UI Design System

This document outlines the visual language, token structure, and key utility classes powering the user interface of the **FutureMind AI 3.0 OS**. Use this reference inside Figma and FigJam to construct visually matching layouts.

---

## 1. Color Palette (Cyber & Celestial Theme)

The UI leverages a combination of a cyberpunk tech-stack palette and celestial gold gradients.

| Color Name | Token (Tailwind) | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Space Black** | `cyber-bg` | `#080C14` | Body background |
| **Space Card** | `cyber-card` | `#0E1524` | Card & container panels background |
| **Tech Navy** | `cyber-border` | `#1F2E4D` | Outer panels border |
| **Active Highlight**| `cyber-hover` | `#1A263E` | Navigation hover backgrounds |
| **Neon Cyan** | `cyber-teal` | `#00F2FE` | Primary CTA, links, and success state glow |
| **Tech Blue** | `cyber-blue` | `#4FACFE` | Secondary highlights and buttons |
| **Celestial Gold** | Custom Glass | `rgba(212,175,55)`| Borders, glowing indicators, headers |
| **Mystical Purple**| `cyber-purple` | `#9D4EDD` | Astrological and Tarot components |
| **Vedic Amber** | `cyber-amber` | `#FBBF24` | Warning highlights and KP Dasha alerts |
| **Error Rose** | `cyber-rose` | `#F43F5E` | Alert states, system failures |
| **Muted Slate** | `cyber-dim` | `#64748B` | Labels, details, timestamps |
| **Pure Text** | `cyber-text` | `#E2E8F0` | Default body readable text |

---

## 2. Typography

*   **Primary Display Header**: `Poppins` or `Outfit`
    *   *Usage*: Page titles, panel titles, large metric labels.
    *   *Weight*: Light (300) for titles, Semibold (600) for UI section tags.
*   **Body & Telemetry Font**: `Inter` or `system-ui`
    *   *Usage*: Reports, paragraphs, metadata descriptions.
    *   *Weight*: Regular (400), Medium (500).
*   **Terminal & System Code**: `JetBrains Mono` or `Fira Code`
    *   *Usage*: Live Websocket logs, debugging, system inputs.
    *   *Weight*: Light (300), Regular (400).

---

## 3. UI Component Specifications

### Space Ambient Background (`.v4-deep-space`)
*   **Gradients**: `radial-gradient(circle at 50% 50%, #0c1226 0%, #060914 100%)`
*   **Parallax Stars**: Small semi-transparent white radial dots animating slowly in the background to simulate deep space.
*   **Auroras**: Blurry radial light points (`#00F2FE` and `#ec4899`) with slow shifting animations on screen margins.

### Golden Celestial Glass Card (`.v4-glass-card`)
*   **Background**: `rgba(9, 13, 24, 0.65)`
*   **Backdrop Filter**: `blur(18px)`
*   **Borders**: `1px solid rgba(212, 175, 55, 0.35)`
*   **Box Shadow**: 
    *   Default: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.2)`
    *   Hover: `0 16px 48px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.3)`
*   **Hover Interaction**: Translates up by `-1.5px` with a bezier curve transition (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 4. Key Interactive States

*   **Selected Tabs**: Underlined with Cyan (`#00d4ff`) and text-shadow glow (`0 0 8px rgba(0,212,255,0.5)`).
*   **Muted Buttons**: Transparent background with solid `rgba(255,255,255,0.06)` border. On hover, background glows with corresponding module accent color (e.g. Amber or Purple) at `10%` opacity.
