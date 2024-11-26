import { fullDateFormatter } from "@/utils/dateFormatter";
import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  visits: number;
  progress: number;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive" | "suspended";
  vehicleStatus: "assigned" | "unassigned";
  role: "support" | "admin";
  createdAt: Date | string;
  subRows?: Person[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
    age: faker.number.int(40),
    email: `${faker.person.firstName().toLowerCase()}${faker.person.lastName().toLowerCase()}@gmail.com`,
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    phoneNumber: faker.phone.number(),
    createdAt: fullDateFormatter(faker.date.anytime()),
    role: faker.helpers.shuffle<Person["role"]>([
      "support",
      "admin"
    ])[0]!,
    status: faker.helpers.shuffle<Person["status"]>([
      "active",
      "inactive",
      "suspended",
    ])[0]!,
    vehicleStatus: faker.helpers.shuffle<Person["vehicleStatus"]>([
      "assigned",
      "unassigned"
    ])[0]!,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}