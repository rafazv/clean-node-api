/* eslint-disable @typescript-eslint/consistent-type-definitions */

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
}

export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
