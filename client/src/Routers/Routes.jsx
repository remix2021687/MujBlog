import { Route, Routes, Navigate} from 'react-router'
import { PageTemplate } from './components/PageTemplate'

export const RouterComponents = ({ Components }) => {
    const { HomePage, AuthPage, AdminPage, GalleryPage, Page404, AdminLayout, RootLayout } = Components

    return (
        <Routes>
            <Route index element={<PageTemplate Content={HomePage} Layout={RootLayout} />}/>
            <Route path='/gallery' element={<PageTemplate Content={GalleryPage} Layout={RootLayout} />}/>
            <Route path='/admin' element={<PageTemplate Content={AdminPage} Layout={AdminLayout} />}/>
            <Route path='/admin/login' element={<AuthPage />}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
            <Route path='/404' element={<Page404 />}/>
        </Routes>
    )
}