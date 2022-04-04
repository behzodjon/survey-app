<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="px-3 py-2 text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block w-4 h-4 -mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div v-if="surveys.data.length">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      <SurveyListItem
        v-for="(survey, index) in surveys.data"
        :key="survey.id"
        :survey="survey"
        class="opacity-0 animate-fade-in-down"
        :style="{ animationDelay: `${index * 0.1}s` }"
        @delete="deleteSurvey(survey)"
      />
    </div>
    <div class="flex justify-center mt-5">
      <nav
        class="relative z-0 inline-flex justify-center -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <a
          v-for="(link, i) of surveys.links"
          :key="i"
          :disabled="!link.url"
          href="#"
          @click.prevent="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium border whitespace-nowrap"
          :class="[
            link.active
              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
            i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
            i === surveys.links.length - 1 ? 'rounded-r-md' : '',
          ]"
          v-html="link.label"
        ></a>
      </nav>
    </div>
    </div>
    <div class="flex justify-center" v-else>
      No data...
    </div>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue";
import SurveyListItem from "../components/SurveyListItem.vue";


const surveys = computed(() => store.state.surveys);

store.dispatch("getSurveys");

//delete survey
function deleteSurvey(survey) {
  if (confirm("Are you sure")) {
    store.dispatch("deleteSurvey", survey.id).then(() => {
      store.dispatch("getSurveys");
    });
  }
}

function getForPage(link) {
  if (!link.url || link.active) {
    return
  }

store.dispatch("getSurveys", { url: link.url });
}
</script>

<style lang="scss" scoped>
</style>