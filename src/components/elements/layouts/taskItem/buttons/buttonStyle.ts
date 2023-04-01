import { css } from "@emotion/react";

export const deleteButtonStyle = css`
  float: right;
  font-size: 15px;
  padding: 2px;
  transform: translateY(-90%);
  border: 1px solid;
  border-radius: 4px;
  border-color : white;
  :hover {
    color: red;
    border-color : red;
  }
`;

export const editButtonStyle = (isEditing: boolean) => {

  const editingColor = "rgb(70, 70, 200)";

  const color = isEditing ? editingColor : "white";

  return css`
    float: right;
    padding: 2px;
    margin-right: 20px;
    font-size: 15px;
    transform: translateY(-90%);
    color: ${color};
    border: 1px solid;
    border-radius: 4px;
    border-color : ${color};

    :hover {
      color: ${editingColor};
      border-color : ${editingColor};
    }
  `;
};
