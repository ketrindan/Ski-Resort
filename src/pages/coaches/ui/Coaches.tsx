import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { ListContainer } from "~widgets/list-container";
import { Navbar } from "~widgets/navbar";
import { openAddCoachPopup } from "~features/popup/popupSlice";
import { fetchCoaches } from "~entities/coach/coachSlice";
import { AddButton } from "~shared/add-button";
import { ContainerLayout } from "~shared/container-layout";
import { Status } from "~shared/lib/status";
import { TChangePageCallback } from "~shared/lib/types";
import { CardMenuItem } from "~shared/menu/api";
import { PageLayout } from "~shared/page-layout";
import { PersonItem } from "~shared/person-item";
import { StatusWrapper } from "~shared/status-wrapper";

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

const itemsNumber: number = 26;

const CoachesPage = () => {
  const [page, setPage] = useState(1);

  const handlePageChange: TChangePageCallback = (event, value) => {
    setPage(value);
  };

  const coaches = useAppSelector((state) => state.coaches.coachesData);
  const status = useAppSelector((state) => state.coaches.status);
  const pages = useAppSelector((state) => state.coaches.pages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === Status.idle) {
      dispatch(fetchCoaches({ page: 0, size: itemsNumber }));
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchCoaches({ page: page - 1, size: itemsNumber }));
  }, [page, dispatch]);

  return (
    <PageLayout>
      <Navbar />
      <ContainerLayout>
        <ListContainer
          title={"Инструкторы"}
          page={page}
          onPageChange={handlePageChange}
          totalPages={pages}
          actionButton={
            <AddButton
              btnText="Добавить нового"
              handleClick={() => dispatch(openAddCoachPopup())}
            />
          }
        >
          <StatusWrapper status={status}>
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
      </ContainerLayout>
    </PageLayout>
  );
};

export default CoachesPage;
