'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import Header from './components/header'


const AppLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-100">
                <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                <SidebarInset>
                        <Header />
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            {children}
                        </div>
                    </SidebarInset>
                </main>
            </SidebarProvider>
        </div>
        </AuthProvider>

    )
}

export default AppLayout