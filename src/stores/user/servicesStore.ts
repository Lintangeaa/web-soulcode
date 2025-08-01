import { create } from 'zustand'

export interface Service {
  id: string
  name: string
  description: string
  price: number // in Rupiah
  duration: string
  features: string[]
  category: 'website' | 'chatbot' | 'api' | 'mobile' | 'consultation'
}

interface ServicesState {
  services: Service[]
  isLoading: boolean
  isInitialized: boolean
  fetchServices: () => Promise<void>
}

const dummyServices: Service[] = [
  { id: '1', name: 'Website Development', description: 'Custom website development dengan teknologi modern dan responsive design', price: 15000000, duration: '4-6 weeks', category: 'website', features: ['Custom Design & Development', 'Responsive Design', 'SEO Optimization', 'Content Management System', 'Domain & Hosting Setup', '3 Months Support'] },
  { id: '2', name: 'E-commerce Website', description: 'Website toko online lengkap dengan sistem pembayaran', price: 25000000, duration: '6-8 weeks', category: 'website', features: ['Custom E-commerce Platform', 'Payment Gateway Integration', 'Inventory Management', 'Order Management System', 'Admin Dashboard', '6 Months Support'] },
  { id: '3', name: 'Chatbot Development', description: 'AI-powered chatbot untuk customer support dan automation', price: 8000000, duration: '2-3 weeks', category: 'chatbot', features: ['AI-Powered Chatbot', 'Multi-language Support', 'Integration with CRM', 'Analytics Dashboard', 'Custom Training', '3 Months Support'] },
  { id: '4', name: 'API Development', description: 'RESTful API development dengan dokumentasi dan testing', price: 12000000, duration: '3-4 weeks', category: 'api', features: ['RESTful API Development', 'API Documentation', 'Testing & Quality Assurance', 'Security Implementation', 'Performance Optimization', '3 Months Support'] },
  { id: '5', name: 'Mobile App Development', description: 'Native mobile app development untuk iOS dan Android', price: 35000000, duration: '8-12 weeks', category: 'mobile', features: ['Native iOS & Android Apps', 'UI/UX Design', 'Backend API Development', 'App Store Deployment', 'Push Notifications', '6 Months Support'] },
  { id: '6', name: 'IT Consultation', description: 'Konsultasi teknologi untuk optimasi bisnis', price: 2000000, duration: '1-2 weeks', category: 'consultation', features: ['Technology Assessment', 'System Architecture Review', 'Performance Optimization', 'Security Audit', 'Migration Planning', '1 Month Support'] }
]

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  isLoading: false,
  isInitialized: false,

  fetchServices: async () => {
    set({ isLoading: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    set({ 
      services: dummyServices, 
      isLoading: false, 
      isInitialized: true 
    })
  }
})) 