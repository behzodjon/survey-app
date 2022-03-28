<template>
  <div>
    <PageComponent title="View or create a survey">
      <template v-slot:header>
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ route.params.id ? model.title : "Create a Survey" }}
          </h1>
          <div class="flex">
            <a
              :href="`/view/survey/${model.slug}`"
              target="_blank"
              v-if="model.slug"
              class="flex px-4 py-2 mr-2 text-sm text-indigo-500 transition-colors border border-transparent rounded-md hover:bg-indigo-700 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Public link
            </a>
            <button
              v-if="route.params.id"
              type="button"
              @click="deleteSurvey()"
              class="px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="inline-block w-5 h-5 -mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Delete Survey
            </button>
          </div>
        </div>
      </template>
      <div v-if="surveyLoading" class="flex justify-center">Loading...</div>
      <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <!-- Survey Fields -->
          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <!-- Image -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div class="flex items-center mt-1">
                <img
                  v-if="model.image_url"
                  :src="model.image_url"
                  :alt="model.title"
                  class="object-cover w-64 h-48"
                />
                <span
                  v-else
                  class="flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-[80%] w-[80%] text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  class="relative px-3 py-2 ml-5 overflow-hidden text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <input
                    type="file"
                    @change="onImageChoose"
                    class="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer "
                  />
                  Change
                </button>
              </div>
            </div>
            <!--/ Image -->

            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                type="text"
                name="title"
                id="title"
                v-model="model.title"
                autocomplete="survey_title"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <!--/ Title -->

            <!-- Description -->
            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  v-model="model.description"
                  autocomplete="survey_description"
                  class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe your survey"
                />
              </div>
            </div>
            <!-- Description -->

            <!-- Expire Date -->
            <div>
              <label
                for="expire_date"
                class="block text-sm font-medium text-gray-700"
                >Expire Date</label
              >
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                v-model="model.expire_date"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <!--/ Expire Date -->

            <!-- Status -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  v-model="model.status"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700"
                  >Active</label
                >
              </div>
            </div>
            <!--/ Status -->
          </div>
          <!--/ Survey Fields -->

          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <h3
              class="flex items-center justify-between text-2xl font-semibold"
            >
              Questions

              <!-- Add new question -->
              <button
                type="button"
                @click="addQuestion()"
                class="flex items-center px-4 py-1 text-sm text-white bg-gray-600 rounded-sm hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add Question
              </button>
              <!--/ Add new question -->
            </h3>
            <div
              v-if="!model.questions.length"
              class="text-center text-gray-600"
            >
              You don't have any questions created
            </div>
            <div
              v-for="(question, index) in model.questions"
              :key="question.id"
            >
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </div>

          <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </PageComponent>
  </div>
</template>

<script setup>
import store from "../store";
import { computed, ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const route = useRoute();
const router = useRouter();
const surveyLoading = computed(() => store.state.currentSurvey.loading);
let model = ref({
  title: "",
  status: false,
  description: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

// TODO learn this watch code
watch(
  () => store.state.currentSurvey.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status !== "draft",
    };
  }
);
if (route.params.id) {
  store.dispatch("getSurvey", route.params.id);
}

function onImageChoose(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result;
    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: "",
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter(
    (q) => q.id !== question.id
  );
}
function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

//create or update survey
function saveSurvey() {
  store.dispatch("saveSurvey", model.value).then(({ data }) => {
    store.commit('notify',{
      type:"success",
      message:'Survey was sucessfully saved!'
    })
    router.push({
      name: "SurveyView",
      params: { id: data.data.id },
    });
  });
}

//delete survey
function deleteSurvey() {
  if (confirm("Are you sure")) {
    store.dispatch("deleteSurvey", model.value.id).then(() => {
      router.push({
        name: "Surveys",
      });
    });
  }
}
</script>

<style lang="scss" scoped>
</style>