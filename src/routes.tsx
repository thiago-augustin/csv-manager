import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CSVReader from 'pages/Home';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<CSVReader />} />
            </Routes>
        </Router>
    );
}