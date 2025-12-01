import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/quizzes/add",
    name: "addQuiz",
    component: () => import("@/views/quizzes/AddQuiz.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/quizzes/:quizId",
    name: "editQuiz",
    component: () => import("@/views/quizzes/EditQuiz.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/questions",
    name: "listQuestions",
    component: () => import("@/views/questions/ListQuestions.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/quizzes",
    name: "listQuizzes",
    component: () => import("@/views/quizzes/ListQuizzes.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/questions/add",
    name: "addQuestion",
    component: () => import("@/views/questions/AddQuestion.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/questions/:questionId",
    name: "editQuestion",
    component: () => import("@/views/questions/EditQuestion.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/users",
    name: "listUsers",
    component: () => import("@/views/users/ListUsers.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/users/add",
    name: "addUser",
    component: () => import("@/views/users/AddUser.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/users/:userId",
    name: "editUser",
    component: () => import("@/views/users/EditUser.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/animals",
    name: "listAnimals",
    component: () => import("@/views/animals/ListAnimals.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/animals/:animalId",
    name: "editAnimal",
    component: () => import("@/views/animals/EditAnimal.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/animals/add",
    name: "addAnimal",
    component: () => import("@/views/animals/AddAnimal.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/sponsors",
    name: "listSponsors",
    component: () => import("@/views/sponsors/ListSponsors.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/sponsors/:sponsorId",
    name: "editSponsor",
    component: () => import("@/views/sponsors/EditSponsor.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/sponsors/add",
    name: "addSponsor",
    component: () => import("@/views/sponsors/AddSponsor.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/experts",
    name: "listExperts",
    component: () => import("@/views/experts/ListExperts.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/experts/:expertId",
    name: "editExpert",
    component: () => import("@/views/experts/EditExpert.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/admin/experts/add",
    name: "addExpert",
    component: () => import("@/views/experts/AddExpert.vue"),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/profile/edit",
    name: "editProfile",
    component: () => import("@/views/EditProfile.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/ranking",
    name: "ranking",
    component: () => import("@/views/Ranking.vue"),
    meta: {
      rule: "user"
    }
  },
  
  {
    path: "/quizzes",
    name: "quizzes",
    component: () => import("@/views/Quizzes.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/quizzes/:quizId",
    name: "quiz",
    component: () => import("@/views/Quiz.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/animals",
    name: "animals",
    component: () => import("@/views/Animals.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/animals/:animalId",
    name: "animal",
    component: () => import("@/views/Animal.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/sponsors",
    name: "sponsors",
    component: () => import("@/views/sponsors/ListSponsors.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/experts",
    name: "experts",
    component: () => import("@/views/experts/ListExperts.vue"),
    meta: {
      rule: "user"
    }
  },
  // Redirect to 404 page, if no match found
  {
    path: "*",
    component: () => import("@/views/Error404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Navigation guard to protect admin routes
router.beforeEach((to, from, next) => {
  const userType = store.getters['auth/getUserType'];
  
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (userType !== 'admin') {
      // Not an admin, redirect to home
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
