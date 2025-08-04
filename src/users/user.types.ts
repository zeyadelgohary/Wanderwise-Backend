export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  friends?: string[];
  tripsHistory?: string[];
  likes?: string[];
};

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
};

enum InteractionType {
  SEARCH = "search",
  LIKE = "like",
  RATE = "rate",
}

export default InteractionType;
