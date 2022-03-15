import React from "react";

const SelectAvatar = (props) => {
  const avatars = [
    "avatar-1",
    "avatar-2",
    "avatar-3",
    "avatar-4",
    "avatar-5",
    "avatar-6",
    "avatar-7",
    "avatar-8",
  ];

  const changeAvatar = (e) => {
    props.changeAvatar(e.target.src.split("img/")[1].split(".")[0]);
    props.closeAvatar();
  };

  return (
    <div className="user__avatars">
      <div className="user__avatars--list">
        <p>Change avatar:</p>
        <ul>
          {avatars.map((avatar) => (
            <li key={avatar} onClick={changeAvatar}>
              <img src={`/img/${avatar}.png`} alt="test" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectAvatar;
