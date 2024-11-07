import { Skipass } from "~entities/skipass";
export const skipasses: Skipass[] = [
  {
    cost: 3150,
    duration: "Дневной 8:30-16:00",
    id: "1",
    agents: [
      {
        birthDate: "01.11.1998",
        id: "1",
        name: "Татьяна",
        surname: "Ларина",
        coachId: "2",
        coachNameSurname: "Борис Сидоров",
        coachCategory: "Лыжи. Опыт 5 лет.",
        skiPassId: "1",
        skiPassCost: 3150,
        skiPassDuration: "Дневной 8:30-16:00",
      },
    ],
  },
  {
    cost: 2150,
    duration: "Полуденный 12:30-16:00",
    id: "2",
    agents: [],
  },
  {
    cost: 1150,
    duration: "вечерний 16:00-22:00",
    id: "3",
    agents: [],
  },
  {
    cost: 3150,
    duration: "Дневной 8:30-16:00",
    id: "4",
    agents: [],
  },
  {
    cost: 2150,
    duration: "Полуденный 12:30-16:00",
    id: "5",
    agents: [],
  },
  {
    cost: 1150,
    duration: "вечерний 16:00-22:00",
    id: "6",
    agents: [],
  },
];
