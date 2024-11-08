import { openDeleteGuestPopup, openDeleteCoachPopup, openDeleteSkiPassPopup, openEditGuestPopup, openEditCoachPopup, openEditSkiPassPopup } from "~features/popup/popupSlice";
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
    callback: openEditGuestPopup(),
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
    callback: openEditCoachPopup(),
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
    text: "Назначить посетителя",
    callback: openDeleteSkiPassPopup(),
  },
  {
    id: "1",
    text: "Редактировать",
    callback: openEditSkiPassPopup(),
  },
  {
    id: "2",
    text: "Удалить",
    callback: openDeleteSkiPassPopup(),
  },
];