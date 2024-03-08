import styled from "styled-components";
import { devices } from "../../utils/devices";
import IconBoard from "../UI/Icons/IconBoard";
import { useContext, useState } from "react";
import { DataContext } from "../../store/DataContext";
import { SideBarContext } from "../../store/SideBarContext";
import AddBoard from "../AddEditBoard/AddBoard";
import Modal from "../Modal";

const StyledSideBarMenu = styled.div`
  width: 276px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-top: 15px;
  & h2 {
    color: #828fa3;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
    margin-left: 32px;
  }

  @media ${devices.tablet} {
    width: 240px;
    margin-top: 32px;
  }

  @media ${devices.mobile} {
    margin-top: 0px;
  }
`;

const Menu = styled.menu`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  & li {
    width: 100%;
    list-style: none;
  }
`;

export const MenuBtn = styled.button`
  width: 100%;
  display: flex;
  gap: 16px;
  border: none;
  outline: none;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#635fc7" : "transparent"};
  padding: 15px 32px 15px 32px;
  border-radius: 0px 100px 100px 0px;
  color: ${({ $isSelected }) => ($isSelected ? "#FFF" : "#828fa3")};
  font-size: 0.9375rem;
  font-weight: 700;
  transition: 0.3s;

  svg {
    fill: ${({ $isSelected }) => ($isSelected ? "#FFF" : "")};
  }

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#635fc7" : "#f4f7fd"};
    color: ${({ $isSelected }) => ($isSelected ? "#FFF" : " #635fc7")};
  }

  &:focus,
  &:active {
    background-color: #635fc7;
    color: #fff;
  }

  &:hover svg {
    fill: ${({ $isSelected }) => ($isSelected ? "#FFF" : " #635fc7")};
  }

  &:focus svg,
  &:active svg {
    fill: #fff;
  }
`;

const CreateBtn = styled(MenuBtn)`
  color: #635fc7;

  &:focus,
  &:active {
    background-color: transparent;
    color: #635fc7;
  }
  &:hover {
    background-color: #f4f7fd;
  }
  &:focus svg,
  &:active svg {
    fill: #635fc7;
  }
`;

export default function SideBarMenu() {
  const [isAddEditBoardOpen, setAddEditBoardOpen] = useState(false);
  const { handleSideBarHidden } = useContext(SideBarContext);
  const { selectedProjectId, projectArray, selectNewProject } =
    useContext(DataContext);
  function handleOpenModal() {
    setAddEditBoardOpen(true);
  }
  return (
    <>
      <StyledSideBarMenu>
        <h2>ALL BOARDS ({projectArray.length})</h2>
        <Menu>
          {projectArray.map((project) => (
            <li key={project.id}>
              <MenuBtn
                onClick={() => {
                  selectNewProject(project.id);
                  handleSideBarHidden();
                }}
                $isSelected={selectedProjectId === project.id}
              >
                <IconBoard></IconBoard>
                <span>{project.name}</span>
              </MenuBtn>
            </li>
          ))}
          <li>
            <CreateBtn onClick={handleOpenModal}>
              <IconBoard fill="#635FC7"></IconBoard>
              <span>+ Create New Board</span>
            </CreateBtn>
          </li>
        </Menu>
      </StyledSideBarMenu>
      <Modal isOpen={isAddEditBoardOpen} setIsOpen={setAddEditBoardOpen}>
        <AddBoard setIsOpen={setAddEditBoardOpen}></AddBoard>
      </Modal>
    </>
  );
}
