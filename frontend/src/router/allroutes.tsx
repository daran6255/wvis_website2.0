import ApiDocs from '../clients/ApiDocs';
import ContactPage from '../components/common/contact';
// import ANewsletter from '../pages/a_newsletter';
import About from '../pages/about';
import AdminBlogForm from '../pages/admin/admin_blog';
import AdminEbookForm from '../pages/admin/admin_ebook';
import AdminNewsletterForm from '../pages/admin/admin_newsletter';
import Blog from '../pages/blog';
import BlogDetails from '../pages/BlogDetails';
import Dashboard from '../pages/dashboard';
import EbookPage from '../pages/ebook';
import Home from '../pages/home';
import Login from '../pages/login';
import Newsletter from '../pages/newsletter';
import PageNotFound from '../pages/others/pagenotfound';
// import ResourcePage from '../pages/resource';
import Signup from '../pages/signup';

const authProtectedRoutes = [
    { path: '/a/dashboard', component: <Dashboard /> },
    { path: '/a/newsletter', component: <AdminNewsletterForm /> },
    { path: '/a/blog', component: <AdminBlogForm /> },
    { path: '/a/ebook', component: <AdminEbookForm /> },

];

const publicRoutes = [
    { path: '/', component: <Home /> },
    { path: '/about', component: <About /> },
    { path: '/newsletters', component: <Newsletter /> },
    { path: '/blogs', component: <Blog /> },
    { path: '/blogs/:id', component: <BlogDetails /> },
    { path: '/ebooks', component: <EbookPage/> },
    // { path: '/resources', component: <ResourcePage/> },
    { path: '/contact', component: <ContactPage/> },     
    { path: '/signup', component: <Signup /> },
    { path: '/login', component: <Login /> },
    { path: '/api/docs', component: <ApiDocs /> },
    // { path: '/a/newsletter', component: <AdminNewsletterForm /> },
    // Page Not Found route
    { path: '/page-not-found', component: <PageNotFound /> }
];

export { authProtectedRoutes, publicRoutes };
