const logger = console;

export const getScore = (score) => {
  logger.log('this is the score: ', score);
  switch (true) {
  case (score >= 0.4):
    return 'this is a very positive statement';
  case (score >= 0):
    return 'this is a somewhat positive statement';
  case (score >= -0.4):
    return 'this is a somewhat negative statement';
  case (score >= -0.8):
    return 'this is a very negative statement';
  default:
    return 'something went wrong with your score, try again! : ) ';
  }
};