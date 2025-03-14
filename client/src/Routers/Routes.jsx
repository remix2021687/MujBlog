import { Route, Routes } from 'react-router'
import { PageTemplate } from './components/PageTemplate'

export const RouterComponents = ({ Components }) => {
    const { HomePage, GalleryPage, RootLayout } = Components

    return (
        <Routes>
            <Route index element={<PageTemplate Content={HomePage} Layout={RootLayout} />}/>
            <Route path='/gallery' element={<PageTemplate Content={GalleryPage} Layout={RootLayout} />}/>
        </Routes>
    )
}