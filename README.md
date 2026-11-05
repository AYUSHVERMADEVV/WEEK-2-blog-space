# BlogSpace — Editorial Publishing Platform

BlogSpace is a modern, editorial-style blogging web application inspired by publications like *Medium*, *The Atlantic*, and *Substack*. Designed with calm off-white paper aesthetics, high-contrast serif typography, and rich visual storytelling, BlogSpace offers readers and writers an intentional sanctuary for long-form essays, technical reflections, and creative craft.

Built strictly with React.js, JavaScript, React Router DOM, Tailwind CSS, and browser LocalStorage (no complex backend or database setup required).

---

## 🌟 Key Features

### 1. Home Page & Lead Editorial
- **Hero Section**: Elegant typographic marquee introducing the publication with clear calls to action ("Explore Stories" & "Start Writing").
- **Featured Lead Article**: Dominant editorial banner card with full image framing, author byline, reading time, and excerpt.
- **Latest Publications**: Responsive 3-column card grid displaying curated stories with smooth hover elevation.
- **Pre-loaded Sample Library**: Ships with 6 realistic, richly written articles spanning Architecture, Technology, Culture, Craft, Design, and Philosophy.
- **Publication Manifesto**: Highlights BlogSpace's focus on depth, silence, and thoughtful reflection.

### 2. Explore & Search Archive
- **Live Search**: Instant client-side search matching against article titles, author names, categories, and summary descriptions.
- **Interactive Category Filtering**: Clean segmented topic pills (Architecture, Technology, Culture, Craft, Design, Philosophy, All) with responsive horizontal scrolling.
- **Sorting Modes**: Sort stories by *Newest First*, *Oldest First*, or *Longest Read*.
- **Empty State**: Thoughtful, friendly fallback when no results match, with one-click filter resets and a quick link to draft a new story.

### 3. Comprehensive Article Details View (`/blog/:id`)
- **Full Reading Experience**: Long-form article presentation with drop caps, section subheadings, pull quotes, and bullet lists.
- **Reading Progress Bar**: Subtle top progress indicator showing real-time scroll depth.
- **Author Profile Card**: Prominent author avatar, name, and biographical background.
- **Quick Actions**: One-click link copying to clipboard with toast notification, Edit Story button, and Delete Story button.
- **Related Articles**: "More Stories From BlogSpace" curation rail at the foot of each post.
- **Graceful 404 Handling**: Custom "Article Not Found" state for invalid or removed blog IDs.

### 4. Create & Publish Blog (`/create`)
- **Clean Form Fields**: Title, Author Name, Role/Bio, Topic Category (standard presets + custom topic input), Cover Image, Short Excerpt, and Full Content.
- **Quick Preset Image Picker**: One-click selection from 6 high-resolution editorial photograph covers or custom image URL input.
- **Live Reader Preview**: Toggle instantly between the raw editor and the formatted article preview before publishing.
- **Field Validation**: Inline error alerts checking minimum lengths and required fields.
- **Immediate Persistence**: New posts appear at the top of the publication and persist across page refreshes.

### 5. Edit & Delete Capabilities (`/edit/:id`)
- **Revision Workflow**: Edit any existing story with pre-populated form fields and update timestamps.
- **Accessible Confirmation Dialog**: Custom modal dialog preventing accidental post deletion.
- **Zero Refresh Lag**: State updates instantaneously across the UI and LocalStorage.

### 6. Professional About Page (`/about`)
- Platform history, the Three Editorial Pillars (Depth over Clickbait, Tactile Reading, Privacy & Local Autonomy), Contributor Writing Guidelines, and technical architecture specs.

### 7. Reliable LocalStorage Data Engine
- Preserves all initial, newly created, edited, and deleted stories.
- Never overwrites user updates with sample data on refresh.
- Includes a handy "Reset Sample Data" utility in the footer for effortless re-testing.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Functional UI components, custom hooks, and state management |
| **JavaScript (ESNext)** | Clean modern JavaScript without TypeScript overhead |
| **Vite** | Fast development server and production bundler |
| **React Router DOM 7** | Client-side routing (`/`, `/explore`, `/blog/:id`, `/create`, `/edit/:id`, `/about`) |
| **Tailwind CSS 4** | Editorial styling, responsive grid layouts, and color variables |
| **LocalStorage API** | Offline-first client-side data persistence |
| **Lucide React** | Lightweight icons for functional interactive affordances |

---

## 📂 Project Structure

```
├── index.html                  # HTML entry point with Newsreader & Plus Jakarta Sans fonts
├── metadata.json               # Application metadata and description
├── package.json                # Project dependencies and run scripts
├── src/
│   ├── assets/images/          # High-fidelity editorial photographs
│   ├── components/             # Reusable React components
│   │   ├── BlogCard.jsx        # Story card with standard and featured variants
│   │   ├── BlogForm.jsx        # Form for creating and editing articles with live preview
│   │   ├── CategoryFilter.jsx  # Interactive horizontal category filters
│   │   ├── DeleteConfirmModal.jsx # Accessible deletion confirmation dialog
│   │   ├── Footer.jsx          # Publication footer with navigation and reset utility
│   │   ├── Navbar.jsx          # Top bar adhering to the 3-zone contract
│   │   ├── SearchBar.jsx       # Search input with clear button
│   │   └── Toast.jsx           # Floating feedback notification component
│   ├── context/
│   │   └── BlogContext.jsx     # Centralized state management & LocalStorage synchronization
│   ├── data/
│   │   └── sampleBlogs.js      # 6 curated initial articles and preset cover images
│   ├── pages/
│   │   ├── AboutPage.jsx       # About BlogSpace, manifesto & guidelines
│   │   ├── BlogDetailsPage.jsx # Full article reading experience & actions
│   │   ├── CreateBlogPage.jsx  # Blog creation page
│   │   ├── EditBlogPage.jsx    # Blog editing page
│   │   ├── ExplorePage.jsx     # Searchable, filterable story archive
│   │   ├── HomePage.jsx        # Hero, featured story & latest articles
│   │   └── NotFoundPage.jsx    # Custom 404 page
│   ├── App.jsx                 # Route declarations and root layout
│   ├── index.css               # Editorial CSS theme variables and custom scrollbar
│   └── main.jsx                # React root mount
```

---

## 🚀 Setup & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open application**:
   Visit `http://localhost:3000` in your web browser.

---

## 📸 Recommended Screenshots for Internship Submission

For your project submission or portfolio presentation, capture the following screenshots:

1. **Home Page Hero & Featured Story**: Showcase the clean editorial title, typography, and large featured lead card.
2. **Explore Page with Active Search / Filter**: Demonstrate the interactive category pills and instant search results grid.
3. **Blog Details Page**: Show the full article layout featuring the cover image, drop cap, pull quotes, and reading progress bar.
4. **Create Story with Live Preview**: Show the BlogForm with the "Live Reader Preview" tab active.
5. **Delete Confirmation Dialog**: Demonstrate the clean modal confirming post deletion.
6. **Mobile Responsive View**: Capture the mobile layout in DevTools showing the hamburger menu and single-column cards.
