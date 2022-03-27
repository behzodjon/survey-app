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
      </div></template
    >
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
         <SurveyListItem
          v-for="(survey, ind) in surveys"
          :key="survey.id"
          :survey="survey"
          class="opacity-1 animate-fade-in-down"
          :style="{ animationDelay: `${ind * 0.1}s` }"
          @delete="deleteSurvey(survey)"
        />
    </div>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue";
import SurveyListItem from "../components/SurveyListItem.vue";


const surveys = computed(() => store.state.surveys.data);

store.dispatch("getSurveys");

//delete survey
function deleteSurvey(survey) {
  if (confirm("Are you sure")) {
    store.dispatch("deleteSurvey", survey.id).then(() => {
           store.dispatch("getSurveys");
    });
  }
}
</script>

<style lang="scss" scoped>
</style>