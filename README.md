# Aurelius
Aurelius is an enterprise‑grade decentralized governance and treasury orchestration platform designed for modern DAOs and on‑chain organizations. Built with performance, security, and automation at its core

## ✨ Vision

Aurelius is crafted to feel less like a typical Web3 dashboard and more like a **digital boardroom for decentralized organizations** — opinionated, secure, and highly automated.

---

## 🚀 Core Capabilities

### 🏛️ Governance Engine

- Proposal lifecycle management (draft → review → vote → execution)
- Transparent, on-chain voting with verifiable results
- Role-aware permissions for contributors, councils, and delegates

### 🤖 Intelligence Layer

- AI-assisted proposal drafting and impact summaries
- Governance health insights and voting pattern analysis
- Automated workflow suggestions for recurring DAO operations

### 🔐 Authentication & Access

- Passkey-based, passwordless authentication
- Secure session handling with lib-side enforcement
- Granular access control for sensitive actions

### 💰 Treasury Orchestration

- Multi-signature treasury controls
- Transaction simulation and approval flows
- Audit-friendly financial activity tracking

### ⚙️ Smart Contract Infrastructure

- Rust-based Soroban contracts on Stellar
- Deterministic execution for governance and treasury logic
- Optimized for scalability and low-cost operations

---

## 🧰 Technology Stack

### Frontend

- **Next.js 14** (App Router + selective Pages Router)
- **TypeScript** for type-safe UI logic
- **Tailwind CSS** + **shadcn/ui** for a refined, accessible interface

### Backend & Services

- **Supabase** for database, auth, and lib-side rendering support
- Service-oriented API structure for long-term scalability

### Smart Contracts

- **Rust** + **Soroban SDK**
- Native Stellar network integration

### Tooling & Performance

- **Bun** for ultra-fast dependency management and builds
- Pre-commit hooks and linting for code quality

---

## 🏗 Monorepo Layout
```
Aurelius/
├── .husky/ # Git hooks & quality gates
├── apps/
│ ├── console/ # Governance & treasury dashboard
│ ├── contracts/ # Stellar Soroban smart contracts
│ ├── portal/ # Public-facing DAO interface
│ │ ├── app/ # App Router views
│ │ ├── components/ # Design system & UI blocks
│ │ ├── hooks/ # Domain-specific React hooks
│ │ ├── lib/ # Utilities and helpers
│ │ ├── public/ # Static assets
│ │ ├── config/ # Environment & runtime config
│ │ └── README.md
├── packages/
│ └── core/ # Shared clients, schemas, utilities
├── services/
│ └── data/ # Supabase access layer & APIs
├── docs/ # Architecture & protocol docs
├── bun.lock
├── package.json
└── README.md
```


---

## 🏃 Local Development

### Requirements

- Node.js **18+**
- **Bun** runtime
- Git

### Setup

```bash
git clone https://github.com/your-org/aurelius-dao-suite.git
cd aurelius-dao-suite
bun install
bun dev
```
### Configure environment variables:
```
NEXT_PUBLIC_DATA_API_URL=your_supabase_url
NEXT_PUBLIC_DATA_ANON_KEY=your_supabase_anon_key
```
