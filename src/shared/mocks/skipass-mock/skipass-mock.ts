import { Skipass } from "~entities/skipass";
export const skipasses: Skipass[] = [
  {
    name: "Дневной",
    cost: 3150,
    duration: "01.01.2025 8:30 - 01.01.2025 16:00",
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
        skiPassDuration: "01.01.2025 8:30 - 01.01.2025 16:00",
      },
    ],
  },
  {
    name: "Полуденный",
    cost: 2150,
    duration: "01.01.2025 12:30 - 01.01.2025 16:00",
    id: "2",
    agents: [],
  },
  {
    name: "Вечерний",
    cost: 1150,
    duration: "01.01.2025 16:00 - 01.01.2025 22:00",
    id: "3",
    agents: [],
  },
  {
    name: "Дневной",
    cost: 3150,
    duration: "01.01.2025 8:30 - 01.01.2025 16:00",
    id: "4",
    agents: [],
  },
  {
    name: "Полуденный",
    cost: 2150,
    duration: "01.01.2025 12:30 - 01.01.2025 16:00",
    id: "5",
    agents: [],
  },
  {
    name: "Вечерний",
    cost: 1150,
    duration: "01.01.2025 16:00 - 01.01.2025 22:00",
    id: "6",
    agents: [],
  },
];
