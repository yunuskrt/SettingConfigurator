import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CountryView from '@/views/CountryView.vue'
import ModificationView from '@/views/ModificationView.vue'

import { auth } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

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

let isAuthenticated = false
let isAuthResolved = false

// set up the auth state observer
onAuthStateChanged(auth, (user) => {
	isAuthenticated = !!user
	isAuthResolved = true
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

	// wait until auth state is resolved
	if (!isAuthResolved) {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			isAuthenticated = !!user
			isAuthResolved = true
			unsubscribe()

			handleNavigation(to, from, next)
		})
	} else {
		handleNavigation(to, from, next)
	}

	function handleNavigation(to, from, next) {
		if (requiresAuth && !isAuthenticated) {
			if (to.path !== '/signin') {
				next('/signin')
			} else {
				next()
			}
		} else if (!requiresAuth && isAuthenticated && to.path === '/signin') {
			next('/') // redirect to home if authenticated and trying to access login page
		} else {
			next() // proceed to the route
		}
	}
})

export default router
