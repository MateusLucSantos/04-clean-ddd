import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Either, right } from '@/core/either'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswerUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

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

    return right({
      answers,
    })
  }
}
