import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "/user/login",
    beforeEnter: AuthRequired,
    children:[
        {
          path: "owner",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/account/owner"),
          children:[
            {
              path: "pets",
              component: () => 
              import(/* webpackChunkName: "user" */ "./views/account/owner/pets/index.vue"),
            },
            {
              path: "pet/:id",
              component: () => 
              import(/* webpackChunkName: "user" */ "./views/account/owner/pet/index.vue"),
              children:[
                {
                  path: "all",
                  component: () => 
                  import(/* webpackChunkName: "user" */ "./views/account/owner/pet/all/index.vue"),
                },
                {
                  path: "schedule",
                  component: () => 
                  import(/* webpackChunkName: "user" */ "./views/account/owner/pet/schedule/index.vue"),
                },
                {
                  path: "vaccines",
                  component: () => 
                  import(/* webpackChunkName: "user" */ "./views/account/owner/pet/vaccines/index.vue"),
                },
                {
                  path: "appointements",
                  component: () => 
                  import(/* webpackChunkName: "user" */ "./views/account/owner/pet/appointements/index.vue"),
                },
                {
                  path: "bath",
                  component: () => 
                  import(/* webpackChunkName: "user" */ "./views/account/owner/pet/bath/index.vue"),
                },
                {
                  path: "food",
                  component: () => 
                  import(/* webpackChunkName: "user" */ "./views/account/owner/pet/food/index.vue"),
                },
              ],
            },
            {
              path: "profile",
              component: () => 
              import(/* webpackChunkName: "user" */ "./views/account/owner/profile/index.vue"),
            },
            {
              path: "market",
              component: () => 
              import(/* webpackChunkName: "user" */ "./views/account/owner/market"),
            }
          ]
        },
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },    
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
