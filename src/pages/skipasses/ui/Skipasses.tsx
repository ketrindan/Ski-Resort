import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { ListContainer } from "~widgets/list-container";
import { Navbar } from "~widgets/navbar";
import { openAddSkiPassPopup } from "~features/popup/popupSlice";
import {
  fetchSkipasses,
  setChosenSkipass,
} from "~entities/skipass/skipassSlice";
import { AddButton } from "~shared/add-button";
import { ContainerLayout } from "~shared/container-layout";
import { skipassMenuItems } from "~shared/lib/menu-items";
import { Status } from "~shared/lib/status";
import { TChangePageCallback } from "~shared/lib/types";
import { PageLayout } from "~shared/page-layout";
import { SkipassItem } from "~shared/skipass-item";
import { StatusWrapper } from "~shared/status-wrapper";

const itemsNumber: number = 5;

const SkipassesPage = () => {
  const [page, setPage] = useState(1);

  const handlePageChange: TChangePageCallback = useCallback(
    (event, value) => {
      setPage(value);
    },
    [setPage],
  );

  const skipasses = useAppSelector((state) => state.skipasses.skipassData);
  const status = useAppSelector((state) => state.skipasses.status);
  const pages = useAppSelector((state) => state.skipasses.pages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === Status.idle) {
      dispatch(fetchSkipasses({ page: 0, size: itemsNumber }));
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchSkipasses({ page: page - 1, size: itemsNumber }));
  }, [page, dispatch]);

  return (
    <PageLayout>
      <Navbar />
      <ContainerLayout>
        <ListContainer
          title={"Ски-пассы"}
          page={page}
          onPageChange={handlePageChange}
          totalPages={pages}
          actionButton={
            <AddButton
              btnText="Добавить новый"
              handleClick={() => dispatch(openAddSkiPassPopup())}
            />
          }
        >
          <StatusWrapper status={status}>
            {skipasses.map((skipass) => (
              <SkipassItem
                key={skipass.id}
                name={skipass.name}
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

export default SkipassesPage;
