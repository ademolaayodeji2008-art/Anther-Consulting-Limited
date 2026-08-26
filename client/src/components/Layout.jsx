import Header from './Header.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

/**
 * Layout — wraps every page with the shared Header, Footer,
 * and the floating WhatsApp button.
 */
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-body text-body">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
