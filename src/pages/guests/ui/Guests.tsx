import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { ListContainer } from "~widgets/list-container";
import { Navbar } from "~widgets/navbar";
import { openAddGuestPopup } from "~features/popup/popupSlice";
import { fetchGuests, setChosenGuest } from "~entities/guest/guestSlice";
import { AddButton } from "~shared/add-button";
import { ContainerLayout } from "~shared/container-layout";
import { convertAge } from "~shared/lib/convertAge";
import { guestMenuItems } from "~shared/lib/menu-items";
import { Status } from "~shared/lib/status";
import { TChangePageCallback } from "~shared/lib/types";
import { PageLayout } from "~shared/page-layout";
import { PersonItem } from "~shared/person-item";
import { StatusWrapper } from "~shared/status-wrapper";

const itemsNumber: number = 26;

const GuestsPage = () => {
  const [page, setPage] = useState(1);

  const handlePageChange: TChangePageCallback = useCallback(
    (event, value) => {
      setPage(value);
    },
    [setPage],
  );

  const guests = useAppSelector((state) => state.guests.guestsData);
  const status = useAppSelector((state) => state.guests.status);
  const pages = useAppSelector((state) => state.guests.pages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === Status.idle) {
      dispatch(fetchGuests({ page: 0, size: itemsNumber }));
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchGuests({ page: page - 1, size: itemsNumber }));
  }, [page, dispatch]);

  return (
    <PageLayout>
      <Navbar />
      <ContainerLayout>
        <ListContainer
          title={"Посетители"}
          page={page}
          onPageChange={handlePageChange}
          totalPages={pages}
          actionButton={
            <AddButton
              btnText="Добавить нового"
              handleClick={() => dispatch(openAddGuestPopup())}
            />
          }
        >
          <StatusWrapper status={status}>
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
      </ContainerLayout>
    </PageLayout>
  );
};

export default GuestsPage;
