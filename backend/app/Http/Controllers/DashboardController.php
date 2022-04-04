<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        //total number of surveys
        $total = Survey::query()->whereUserId($user->id)->count();

        //latest survey
        $latest = Survey::query()->whereUserId($user->id)->latest('created_at')->first();

        //total number of answers
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        //latest 5 answers
        $latestAnswers = SurveyAnswer::query()
        ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        ->where('surveys.user_id', $user->id)
        ->orderBy('end_date','DESC')
        ->limit(5)
        ->getModels('survey_answers.*');

        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyDashboardResource($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
        ];
    }
}
