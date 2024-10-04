import { useAppDispatch } from "~app/store/hooks";
import { ListContainer } from "~widgets/list-container";
import { Navbar } from "~widgets/navbar";
import { openAddSkiPassPopup } from "~features/popup/popupSlice";
import { AddButton } from "~shared/add-button";
import { ContainerLayout } from "~shared/container-layout";
import { CardMenuItem } from "~shared/menu/api";
import { PageLayout } from "~shared/page-layout";
import { SkipassItem } from "~shared/skipass-item";
import { skipasses } from "./skipasses.mock";

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

const SkipassesPage = () => {
  const dispatch = useAppDispatch();

  return (
    <PageLayout>
      <Navbar />
      <ContainerLayout>
        <ListContainer
          title={"Ски-пассы"}
          actionButton={
            <AddButton
              btnText="Добавить новый"
              handleClick={() => dispatch(openAddSkiPassPopup())}
            />
          }
        >
          {skipasses.map((skipass) => (
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

export default SkipassesPage;
