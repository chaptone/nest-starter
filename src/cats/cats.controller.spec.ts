import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('find empty cats', () => {
    it('should return empty cats', async () => {
      expect(await catsController.findAll()).toHaveLength(0)
    });
  });

  describe('Add 1 cat and get', () => {
    it('should return a cat', async () => {
      await catsController.create({ name: 'bobo', age: 1, breed: 'O' } )
      expect(await catsController.findAll()).toHaveLength(1)
    });
  });
});
