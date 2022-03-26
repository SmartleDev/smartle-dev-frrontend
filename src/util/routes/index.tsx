import { lazy } from 'react';

// Lazy loaded components to improve base performance.
const Home = lazy(() => import('../../pages/home'));
const Courses = lazy(() => import('../../pages/courses'));
const Course = lazy(() => import('../../pages/course'));
// const About = lazy(() => import('../../pages/about'));
const Enterprise = lazy(() => import('../../pages/enterprise'));
const Legal = lazy(() => import('../../pages/legal'));
const PrivacyPolicy = lazy(() => import('../../pages/privacyPolicy'));
const Error = lazy(() => import('../../pages/error'));

interface RouteType {
	exact?: boolean;
	path?: string;
	element: any;	
	key: string;
	title: string;
	show: boolean;
}


const routes: Array<RouteType> = [
	{
		element: <Home />,
		key: 'home',    
		exact: true,
		path: '/',
		title: 'Home',
		show:true
	},	
	{
		element: <Courses />,
		key: 'courses',
		path: '/courses',
		title: 'Explore courses',
		show:true
	},
	{
		element: <Course />,
		key: 'course',
		path: '/course/:id',
		title: '{--Course--}',
		show:false
	},
	{
		element: <Enterprise />,
		key: 'enterprise',
		path: '/enterprise',
		title: 'Smartle for Enterprise',
		show:true
	},
	{
		element: <Legal />,
		key: 'legal',
		path: '/terms-of-service',
		title: 'Terms of Service',
		show:false
	},
	{
		element: <PrivacyPolicy />,
		key: 'privacy-policy',
		path: '/privacy-policy',
		title: 'Privacy Policy',
		show:false
	},
	{
		element: <Error />,
		path:'*',
		key: 'error',
		title: 'Error',
		show:false
	}
];

export default routes;
