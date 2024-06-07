export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  PlaceModel: Symbol.for('PlaceModel'),
  PlaceService: Symbol.for('PlaceService'),
  ReviewModel: Symbol.for('ReviewModel'),
  ReviewService: Symbol.for('ReviewService'),
  UserController: Symbol.for('UserController'),
  PlaceController: Symbol.for('PlaceController'),
} as const;
