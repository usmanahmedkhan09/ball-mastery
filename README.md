# InstinctFC - Soccer Field Training Companion

A Progressive Web App for soccer players to access professional training drills with video demonstrations, equipment lists, and detailed instructions. Perfect for use on the training ground!

## 🎯 Features

### Field Training Drills with Videos
- **📹 YouTube Video Demonstrations** - Watch before you practice
- **🎒 Equipment Lists** - Know what you need before heading out
- **📋 Step-by-Step Instructions** - Clear setup and execution guides
- **💡 Coaching Points** - Professional tips for each drill
- **📈 Progressions** - Ways to make drills harder as you improve

### Drill Categories
- **🔺 Passing** - Triangles, rondos, possession drills
- **🥅 Shooting** - Finishing, power, placement training
- **🎯 Dribbling** - Close control, 1v1 skills
- **⚡ Agility** - Speed, coordination, footwork
- **⚽ Technical** - Ball mastery, first touch
- **🏃 Small-Sided Games** - Game-realistic training

### App Features
- ✅ **Progressive Web App** - Install on any device
- 📱 **Works Offline** - Access drills without internet
- ✓ **Completion Tracking** - Mark drills as complete
- 📊 **Progress Statistics** - View your training history
- 🎨 **Mobile-First Design** - Perfect for use at the field

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd instinctfc
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Generate static site
npm run generate
```

## 🏗️ Project Structure

```
instinctfc/
├── app.vue                    # Root app component
├── assets/
│   └── css/
│       └── main.css          # Global styles with Tailwind
├── components/
│   ├── layout/               # Header, Footer
│   └── ui/                   # YouTube embed, etc.
├── pages/
│   ├── index.vue             # Home page
│   ├── drills/
│   │   ├── index.vue         # Drills listing
│   │   └── [id].vue          # Individual drill detail
│   └── stats.vue             # Progress tracking
├── stores/
│   └── drillStore.ts         # Pinia store for drills
├── types/
│   └── drill.ts              # TypeScript types
├── public/                   # Static assets
├── nuxt.config.ts            # Nuxt configuration
└── package.json
```

## 🎨 Technology Stack

- **Framework**: Nuxt 3
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Pinia
- **PWA**: @vite-pwa/nuxt
- **Utilities**: VueUse

## 📱 PWA Setup

The app is configured as a PWA and includes:
- Service worker for offline functionality
- Web app manifest
- Install prompts

### Adding PWA Icons

Create the following icons and place them in the `public` folder:
- `public/pwa-192x192.png` (192x192px)
- `public/pwa-512x512.png` (512x512px)

Use a tool like [Favicon Generator](https://realfavicongenerator.net/) to create these.

## 🎮 How to Use

1. **Browse Drills**: Navigate to the Drills page
2. **Select Category**: Filter by passing, shooting, dribbling, etc.
3. **Watch Video**: View the demonstration on YouTube
4. **Check Equipment**: See what you need
5. **Read Instructions**: Follow the setup steps
6. **Practice**: Go to the field and train!
7. **Mark Complete**: Track your progress

## 📊 Data Storage

All completion data is stored locally using `localStorage`:
- Drill completions
- Progress statistics
- Training history

No data is sent to external servers - everything stays on your device.

## 🔧 Adding New Drills

Edit `stores/drillStore.ts` and add new drill objects to the array:

```typescript
{
  id: 'my-new-drill',
  name: 'My New Drill',
  category: 'passing',
  difficulty: 'intermediate',
  description: 'Description here',
  instructions: ['Step 1', 'Step 2', ...],
  equipment: ['Cones', 'Balls', ...],
  keyPoints: ['Point 1', 'Point 2', ...],
  videoUrl: 'YOUTUBE_VIDEO_ID', // Just the ID, not full URL
  playersNeeded: '3-5',
  spaceRequired: '15x15m',
  duration: 10,
  icon: '⚽',
  color: '#10b981',
}
```

## 📹 Adding YouTube Videos

1. Find your training video on YouTube
2. Get the video ID from the URL (e.g., `https://youtube.com/watch?v=VIDEO_ID_HERE`)
3. Add just the `VIDEO_ID` to the drill's `videoUrl` property

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] User accounts and cloud sync
- [ ] Custom drill creation
- [ ] Team sharing features
- [ ] Training programs/plans
- [ ] Achievement system
- [ ] Social features
- [ ] Multi-language support
- [ ] Video recording integration

## 💡 Inspired By

This app is inspired by professional soccer training methodologies and apps like SwitchedOn that focus on accessible, effective training content.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Train smarter. Play better. ⚽🏆**
