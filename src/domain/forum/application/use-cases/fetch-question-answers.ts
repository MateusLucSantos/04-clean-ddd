import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswerUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
