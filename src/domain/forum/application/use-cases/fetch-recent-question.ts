import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

interface FetchRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class FetchRecentquestionUseCase {
  constructor(private questionsrepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionsrepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
