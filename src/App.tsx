import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SiteLayout } from './SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PackageDetailPage } from './pages/PackageDetailPage'
import { PackagesPage } from './pages/PackagesPage'
import { PodcastPage } from './pages/PodcastPage'
import { StudioPage } from './pages/StudioPage'
import { packageDetailPath, packagesPath } from './packages/offerPackages'

function LegacyPackagesRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? packageDetailPath(slug) : packagesPath} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="studio" element={<StudioPage />} />
        <Route path="studio/packages" element={<PackagesPage />} />
        <Route path="studio/packages/:slug" element={<PackageDetailPage />} />
        <Route path="podcast" element={<PodcastPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="packages" element={<LegacyPackagesRedirect />} />
        <Route path="packages/:slug" element={<LegacyPackagesRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
