import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import MainPage from '../pages/MainPage.vue';
import NoteEditor from '../pages/NoteEditor.vue';

Vue.use(VueRouter);

function checkValidEditNoteRoute(queryId: string) {
  return (
    store.state.notesList.find((note) => note.id === queryId)
    || store.state.newlyCreatedNote.id === queryId
  );
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/edit',
    name: 'NoteEditor',
    component: NoteEditor,
    props: (route) => ({ noteId: route.query.id }),
    beforeEnter(toR, fromR, next) {
      // validate route
      const queryId = toR.query?.id;
      if (!queryId || !checkValidEditNoteRoute(queryId.toString())) next('/');
      else next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
