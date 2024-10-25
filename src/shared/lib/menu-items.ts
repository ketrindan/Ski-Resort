import { openDeleteGuestPopup, openDeleteCoachPopup, openDeleteSkiPassPopup } from "~features/popup/popupSlice";
import { CardMenuItem } from "~shared/menu/api";

export const guestMenuItems: CardMenuItem[] = [
  {
    id: "0",
    text: "Назначить тренера",
    callback: openDeleteGuestPopup(),
  },
  {
    id: "1",
    text: "Редактировать",
    callback: openDeleteGuestPopup(),
  },
  {
    id: "2",
    text: "Удалить",
    callback: openDeleteGuestPopup(),
  },
];

export const coachMenuItems: CardMenuItem[] = [
  {
    id: "0",
    text: "Назначить посетителя",
    callback: openDeleteCoachPopup(),
  },
  {
    id: "1",
    text: "Редактировать",
    callback: openDeleteCoachPopup(),
  },
  {
    id: "2",
    text: "Удалить",
    callback: openDeleteCoachPopup(),
  },
];

export const skipassMenuItems: CardMenuItem[] = [
  {
    id: "0",
    text: "Редактировать",
    callback: openDeleteSkiPassPopup(),
  },
  {
    id: "1",
    text: "Удалить",
    callback: openDeleteSkiPassPopup(),
  },
];