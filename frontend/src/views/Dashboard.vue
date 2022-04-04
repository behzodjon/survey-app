<template>
  <PageComponent title="Dashboard">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <div
      v-else
      class="grid grid-cols-1 gap-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        class="flex flex-col order-1 p-3 text-center bg-white shadow-md animate-fade-in-down lg:order-2"
        style="animation-delay: 0.1s"
      >
        <h3 class="text-2xl font-semibold">Total Surveys</h3>
        <div
          class="flex items-center justify-center flex-1 pb-4 font-semibold text-8xl"
        >
          {{ data.totalSurveys }}
        </div>
      </div>
      <div
        class="flex flex-col order-2 p-3 text-center bg-white shadow-md lg:order-4 animate-fade-in-down"
        style="animation-delay: 0.2s"
      >
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div
          class="flex items-center justify-center flex-1 pb-4 font-semibold text-8xl"
        >
          {{ data.totalAnswers }}
        </div>
      </div>
      <div
        class="order-3 row-span-2 p-4 bg-white shadow-md animate-fade-in-down lg:order-1"
      >
        <h3 class="text-2xl font-semibold">Latest Survey</h3>
        <div v-if="data.latestSurvey">
          <img
            :src="data.latestSurvey.image_url"
            class="w-[240px] mx-auto"
            alt=""
          />
          <h3 class="mb-3 text-xl font-bold">{{ data.latestSurvey.title }}</h3>
          <div class="flex justify-between mb-1 text-sm">
            <div>Create Date:</div>
            <div>{{ data.latestSurvey.created_at }}</div>
          </div>
          <div class="flex justify-between mb-1 text-sm">
            <div>Expire Date:</div>
            <div>{{ data.latestSurvey.expire_date }}</div>
          </div>
          <div class="flex justify-between mb-1 text-sm">
            <div>Status:</div>
            <div>{{ data.latestSurvey.status ? "Active" : "Draft" }}</div>
          </div>
          <div class="flex justify-between mb-1 text-sm">
            <div>Questions:</div>
            <div>{{ data.latestSurvey.questions }}</div>
          </div>
          <div class="flex justify-between mb-3 text-sm">
            <div>Answers:</div>
            <div>{{ data.latestSurvey.answers }}</div>
          </div>
          <div class="flex justify-between">
            <router-link
              :to="{ name: 'SurveyView', params: { id: data.latestSurvey.id } }"
              class="flex px-4 py-2 text-sm text-indigo-500 transition-colors border border-transparent rounded-md hover:bg-indigo-700 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Survey
            </router-link>

            <button
              class="flex px-4 py-2 text-sm text-indigo-500 transition-colors border border-transparent rounded-md hover:bg-indigo-700 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              View Answers
            </button>
          </div>
        </div>
        <div v-else class="py-16 text-center text-gray-600">
          Your don't have surveys yet
        </div>
      </div>
      <div
        class="order-4 row-span-2 p-3 bg-white shadow-md lg:order-3 animate-fade-in-down"
        style="animation-delay: 0.3s"
      >
        <div class="flex items-center justify-between px-2 mb-3">
          <h3 class="text-2xl font-semibold">Latest Answers</h3>

          <a
            href="javascript:void(0)"
            class="text-sm text-blue-500 hover:decoration-blue-500"
          >
            View all
          </a>
        </div>

        <div v-if="data.latestAnswers.length">
          <a
            href="#"
            v-for="answer of data.latestAnswers"
            :key="answer.id"
            class="block p-2 hover:bg-gray-100/90"
          >
            <div class="font-semibold">{{ answer.survey.title }}</div>
            <small>
              Answer Made at:
              <i class="font-semibold">{{ answer.end_date }}</i>
            </small>
          </a>
        </div>
        <div v-else class="py-16 text-center text-gray-600">
          Your don't have answers yet
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch("getDashboardData");
</script>

<style scoped></style>