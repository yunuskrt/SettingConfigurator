import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CountryView from '@/views/CountryView.vue'
import ModificationView from '@/views/ModificationView.vue'

import { auth } from '@/firebaseConfig'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/signin',
		name: 'signin',
		component: SignInView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/register',
		name: 'register',
		component: RegisterView,
	},
	{
		path: '/:code',
		name: 'country',
		component: CountryView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/modification',
		name: 'modification',
		component: ModificationView,
		meta: {
			requiresAuth: true,
		},
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
	const isAuthenticated = !!auth.currentUser // Use currentUser for sync check
	if (requiresAuth && !isAuthenticated) {
		if (to.path !== '/signin') {
			next('/signin')
		} else {
			next()
		}
	} else if (!requiresAuth && isAuthenticated && to.path === '/signin') {
		next('/') // Redirect to home if authenticated and trying to access login page
	} else {
		next() // Proceed to the route
	}
})

export default router
