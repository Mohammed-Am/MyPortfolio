# Mohammed Amouzoun — Portfolio

Personal portfolio website for Mohammed Amouzoun, WordPress Developer & AI Automation Specialist.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + CSS animations
- **Font**: Inter (Google Fonts)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

All editable content lives in one file:

**`/data/content.ts`**

Edit this file to update:
- Personal info (`siteConfig`)
- Hero section text (`heroContent`)
- About bio and highlights (`aboutContent`)
- Skills and proficiency levels (`skillsContent`)
- Projects (`projectsContent`)
- Services offered (`servicesContent`)
- Timeline / experience (`timelineContent`)
- Contact details (`contactContent`)

## Adding Your CV

Place your CV PDF at:
```
/public/cv-mohammed-amouzoun.pdf
```

The "Download CV" button in the hero section will automatically link to it.

## Replacing Placeholder Images

Project image placeholders are currently emoji-based. To add real screenshots:

1. Add your images to `/public/images/`
2. Update the `image` fields in `data/content.ts`
3. Use Next.js `<Image>` component in the Projects component

## Deploying to Vercel

The easiest deployment method:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — no configuration needed
4. Click Deploy

Or deploy via CLI:

```bash
npm install -g vercel
vercel
```

## Project Structure

```
Portfolio/
├── app/
│   ├── globals.css       # Global styles, CSS variables, animations
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page — assembles all sections
├── components/
│   ├── Navbar.tsx        # Sticky nav with mobile menu
│   ├── Hero.tsx          # Full-screen hero with typewriter
│   ├── About.tsx         # Bio + highlight cards
│   ├── Skills.tsx        # Skill bars grouped by category
│   ├── Projects.tsx      # Featured + project grid
│   ├── Services.tsx      # Services offered grid
│   ├── Timeline.tsx      # Experience/education timeline
│   ├── Contact.tsx       # Contact form + info
│   └── Footer.tsx        # Footer with nav links
├── data/
│   └── content.ts        # All site content — edit here
├── lib/
│   └── utils.ts          # cn() utility for class merging
├── public/               # Static files (CV, images)
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## Contact

Mohammed Amouzoun — recrutement@izemx.com — [github.com/Mohammed-Am](https://github.com/Mohammed-Am)
