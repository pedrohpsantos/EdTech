import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../../assets/dashboard.css';

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
    breadcrumbs: string[];
    customTopbarElement?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, subtitle, breadcrumbs, customTopbarElement }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <Topbar title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} customTopbarElement={customTopbarElement} />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
