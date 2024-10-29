import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { ListContainer } from "~widgets/list-container";
import { Navbar } from "~widgets/navbar";
import {
  openAddGuestPopup,
  openAddCoachPopup,
  openAddSkiPassPopup,
} from "~features/popup/popupSlice";
import { fetchCoaches, setChosenCoach } from "~entities/coach/coachSlice";
import { fetchGuests, setChosenGuest } from "~entities/guest/guestSlice";
import {
  fetchSkipasses,
  setChosenSkipass,
} from "~entities/skipass/skipassSlice";
import { AddButton } from "~shared/add-button";
import { ContainerLayout } from "~shared/container-layout";
import { convertAge } from "~shared/lib/convertAge";
import {
  guestMenuItems,
  coachMenuItems,
  skipassMenuItems,
} from "~shared/lib/menu-items";
import { routes } from "~shared/lib/routes-names";
import { PageLayout } from "~shared/page-layout";
import { PersonItem } from "~shared/person-item";
import { SkipassItem } from "~shared/skipass-item";
import { StatusWrapper } from "~shared/status-wrapper";

const personItemsNumber: number = 10;
const skipassesItemsNumber: number = 3;

const MainPage = () => {
  const guests = useAppSelector((state) => state.guests.guestsData);
  const guestsStatus = useAppSelector((state) => state.guests.status);
  const coachesStatus = useAppSelector((state) => state.coaches.status);
  const coaches = useAppSelector((state) => state.coaches.coachesData);
  const skipasses = useAppSelector((state) => state.skipasses.skipassData);
  const skipassesStatus = useAppSelector((state) => state.skipasses.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGuests({ page: 0, size: personItemsNumber }));
    dispatch(fetchCoaches({ page: 0, size: personItemsNumber }));
    dispatch(fetchSkipasses({ page: 0, size: skipassesItemsNumber }));
  }, [dispatch]);

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
                menuItems={
                  guest.coachId ? guestMenuItems.slice(1) : guestMenuItems
                }
                getData={setChosenGuest(guest)}
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
                getData={setChosenCoach(coach)}
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
          <StatusWrapper status={skipassesStatus}>
            {skipasses.map((skipass) => (
              <SkipassItem
                key={skipass.id}
                cost={skipass.cost}
                duration={skipass.duration}
                menuItems={skipassMenuItems}
                getData={setChosenSkipass(skipass)}
              />
            ))}
          </StatusWrapper>
        </ListContainer>
      </ContainerLayout>
    </PageLayout>
  );
};

export default MainPage;
