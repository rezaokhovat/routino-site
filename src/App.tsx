import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { PodcastPage } from './pages/PodcastPage'
import { StudioPage } from './pages/StudioPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="studio" element={<StudioPage />} />
        <Route path="podcast" element={<PodcastPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
