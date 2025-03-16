import { Route, Routes, Navigate} from 'react-router'
import { PageTemplate } from './components/PageTemplate'

export const RouterComponents = ({ Components }) => {
    const { HomePage, GalleryPage, Page404, RootLayout } = Components

    return (
        <Routes>
            <Route index element={<PageTemplate Content={HomePage} Layout={RootLayout} />}/>
            <Route path='/gallery' element={<PageTemplate Content={GalleryPage} Layout={RootLayout} />}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
            <Route path='/404' element={<Page404 />}/>
        </Routes>
    )
}