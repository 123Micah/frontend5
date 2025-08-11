import { createRouter, createWebHistory } from 'vue-router';

// Views
import Home from '../pages/Home.vue';
import AdminLogin from '../pages/admin/Login.vue';
import AdminDashboard from '../pages/admin/Dashboard.vue';
import CreateTest from '../pages/admin/CreateTest.vue';
import Testlist from '../pages/admin/TestList.vue';
import Submissions from '../pages/admin/Submissions.vue';

import StudentRegister from '../pages/student/Register.vue';
import StudentLogin from '../pages/student/Login.vue';
import StudentDashboard from '../pages/student/Dashboard.vue';
import TakeTest from '../pages/student/TakeTest.vue';
import TestResult from '../pages/student/Results.vue';
import TestIntro from '../pages/student/TestIntro.vue';

const routes = [
  // Public
  { path: '/', name: 'Home', component: Home },

  // Admin
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin/dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/admin/create-test', name: 'CreateTest', component: CreateTest },
  { path: '/admin/tests', name: 'Testlist', component: Testlist, props: true },
  { path: '/admin/tests/:id', name: 'AdminTestView', component: () => import('../pages/admin/AdminTestView.vue'), props: true },
  { path: '/admin/submissions', name: 'Submissions', component: Submissions },

  // Student
  { path: '/student/register', name: 'StudentRegister', component: StudentRegister },
  { path: '/student/login', name: 'StudentLogin', component: StudentLogin },
  { path: '/student/dashboard', name: 'StudentDashboard', component: StudentDashboard },
  { path: '/student/test/:id', name: 'TakeTest', component: TakeTest, props: true },
  { path: '/student/result', name: 'TestResult', component: TestResult, props: route => ({ result: route.params.result }) },
  { path: '/student/test/:id/intro', name: 'TestIntro', component: TestIntro, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

 
  if (to.name === 'StudentRegister') {
    return next();
  }

  


 

  next(); 
});


export default router;
