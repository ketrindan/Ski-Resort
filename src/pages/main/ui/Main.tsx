import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { ListContainer } from "~widgets/list-container";
import { Navbar } from "~widgets/navbar";
import {
  openAddGuestPopup,
  openAddCoachPopup,
  openAddSkiPassPopup,
} from "~features/popup/popupSlice";
import { fetchCoaches } from "~entities/coach/coachSlice";
import { fetchGuests } from "~entities/guest/guestSlice";
import { AddButton } from "~shared/add-button";
import { ContainerLayout } from "~shared/container-layout";
import { convertAge } from "~shared/lib/convertAge";
import { routes } from "~shared/lib/routes-names";
import { Status } from "~shared/lib/status";
import { CardMenuItem } from "~shared/menu/api";
import { PageLayout } from "~shared/page-layout";
import { PersonItem } from "~shared/person-item";
import { SkipassItem } from "~shared/skipass-item";
import { StatusWrapper } from "~shared/status-wrapper";
import { skipasses } from "../../../shared/mocks/mocks";

const guestMenuItems: CardMenuItem[] = [
  {
    id: "0",
    text: "Назначить тренера",
  },
  {
    id: "1",
    text: "Редактировать",
  },
  {
    id: "2",
    text: "Удалить",
  },
];

const coachMenuItems: CardMenuItem[] = [
  {
    id: "0",
    text: "Назначить посетителя",
  },
  {
    id: "1",
    text: "Редактировать",
  },
  {
    id: "2",
    text: "Удалить",
  },
];

const skipassMenuItems: CardMenuItem[] = [
  {
    id: "0",
    text: "Назначить посетителя",
  },
  {
    id: "1",
    text: "Редактировать",
  },
  {
    id: "2",
    text: "Удалить",
  },
];

const personItemsNumber: number = 10;

const MainPage = () => {
  const guests = useAppSelector((state) => state.guests.guestsData);
  const guestsStatus = useAppSelector((state) => state.guests.status);
  const coachesStatus = useAppSelector((state) => state.coaches.status);
  const coaches = useAppSelector((state) => state.coaches.coachesData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (guestsStatus === Status.idle) {
      dispatch(fetchGuests({ page: 0, size: personItemsNumber }));
    }
    if (coachesStatus === Status.idle) {
      dispatch(fetchCoaches({ page: 0, size: personItemsNumber }));
    }
  }, [guestsStatus, coachesStatus, dispatch]);

  return (
    <PageLayout>
      <Navbar />
      <ContainerLayout>
        <ListContainer
          title={"Посетители"}
          actionButton={
            <AddButton
              btnText="Добавить нового"
              handleClick={() => dispatch(openAddGuestPopup())}
            />
          }
          main
          link={routes.guests}
        >
          <StatusWrapper status={guestsStatus}>
            {guests.map((guest) => (
              <PersonItem
                key={guest.id}
                title={`${guest.name} ${guest.surname}`}
                subtitle={convertAge(guest.birthDate)}
                menuItems={guestMenuItems}
              />
            ))}
          </StatusWrapper>
        </ListContainer>
        <ListContainer
          title={"Инструкторы"}
          actionButton={
            <AddButton
              btnText="Добавить нового"
              handleClick={() => dispatch(openAddCoachPopup())}
            />
          }
          main
          link={routes.coaches}
        >
          <StatusWrapper status={coachesStatus}>
            {coaches.map((coach) => (
              <PersonItem
                key={coach.id}
                title={`${coach.name} ${coach.surname}`}
                subtitle={coach.category}
                img={coach.photo}
                menuItems={coachMenuItems}
              />
            ))}
          </StatusWrapper>
        </ListContainer>
        <ListContainer
          title={"Ски-пассы"}
          actionButton={
            <AddButton
              btnText="Добавить новый"
              handleClick={() => dispatch(openAddSkiPassPopup())}
            />
          }
          main
          link={routes.skipasses}
        >
          {skipasses.slice(0, 3).map((skipass) => (
            <SkipassItem
              key={skipass.id}
              cost={skipass.cost}
              duration={skipass.duration}
              menuItems={skipassMenuItems}
            />
          ))}
        </ListContainer>
      </ContainerLayout>
    </PageLayout>
  );
};

export default MainPage;
