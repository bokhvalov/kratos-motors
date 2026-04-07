import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ScrollToTop } from './components/ScrollToTop'
import { Layout } from './components/layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ServicesPage } from './pages/ServicesPage'
import { SportsCarBuildsPage } from './pages/SportsCarBuildsPage'
import { BrandPage } from './pages/BrandPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './i18n'

function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="sports-car-builds" element={<SportsCarBuildsPage />} />
          <Route path="privacy-policy" element={<PrivacyPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path=":brand" element={<BrandPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
