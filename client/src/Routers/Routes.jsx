import { Route, Routes } from 'react-router'
import { PageTemplate } from './components/PageTemplate'

export const RouterComponents = ({ Components }) => {
    const { HomePage, RootLayout } = Components

    return (
        <Routes>
            <Route index element={<PageTemplate Content={HomePage} Layout={RootLayout} />}/>
            
        </Routes>
    )
}